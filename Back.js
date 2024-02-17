const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const port = 8082;

app.use(express.json());
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_API_SECRET);

async function conection (){
    try {
        const Connection  = await mysql.createPool({
            host: "localhost",
            user: 'root',
            port: '3307',
            password: '',
            database: 'mdsprojetb3test',
        });
        console.log('Connexion à la base de données MySQL établie');
        return Connection;
      } catch (err) {
        console.error('Erreur lors de la connexion à la base de données :', err);
        throw err;
      }
}

function executerequete(Connection,reqete){
    return new Promise((resolve,reject) => {
        Connection.query(reqete,(err,res)=>{
            if (err) {
                reject(err);
                return;
               }
               
              resolve(res);
               return res ;
                
        })
    })
}
//////////////////////////////////////Partie Requet///////////////////////////////



/////////////////////////////////////créé compte ////////////////////////////////

app.post('/CreactCompte', async (req, res) => {
    const connection = await conection();
  
    const formData = req.body;
    console.log(formData);
    console.log(formData.Lastname);
  
  
    if (!formData || !formData.Mail || !formData.Password) {
      console.error('Données manquantes dans la requête.');
      res.status(400).json({ message: 'Données manquantes dans la requête.' });
      return;
    }
  
    const queryGet = `SELECT Mail,Password FROM user WHERE Mail = '${formData.Mail}' and Password = '${formData.Password}'`;
    const queryPoste = `INSERT INTO user (name,Lastname,Mail,Password) VALUES ('${formData.name}','${formData.Lastname}','${formData.Mail}','${formData.Password}')`;
    
    try {
      const data = await executerequete(connection, queryGet);
   
  
      if (data && data.length > 0) {
        console.error('Erreur lors de la récupération des données compte exist :');
        res.status(500).json({ message: 'compte exist ' });
      } else {
        await executerequete(connection, queryPoste);
        res.status(500).json({ message: 'compte créé' });
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des données :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des données' });
    }
  });
/////////////////////////////////////authentification compte ////////////////////////////////
app.post("/Authentification", async (req, res) => {
    const connection = await conection(); // Utilisez la fonction conection définie
  
    const formData = req.body;
  
    const query = `SELECT Mail, Password FROM user WHERE Mail = '${formData.Mail}' AND Password = '${formData.Password}'`;
  
    try {
      const data = await executerequete(connection, query); // Utilisez la fonction executerequete définie
  
      const authentification = data.map((authentification) => ({
        Mail: authentification.Mail,
      }));
  
      return res.json(authentification);
    } catch (err) {
        console.error('Erreur lors de la récupération des données :', err);
    
      res.status(500).json({ message: 'Erreur lors de la récupération des données' });
    }
  });
  
  /////////////////////////////////////Récupération Tache////////////////////////////////
  app.get("/Tache/:mail/:Valide", async(req, res) => {
    const connection = await conection(); // Utilisez la fonction conection au lieu de conection
    const mail = req.params.mail;
    
    const ValideTable = req.params.Valide;
    console.log(ValideTable)
    const query = `SELECT Nombre_de_point,Description, Valider, Rulse, player.Name FROM rulse INNER JOIN user ON rulse.IdUser = user.idUser INNER JOIN player ON rulse.IdPlayer = player.idPlayer WHERE user.Mail = '${mail}'and Valider =${ValideTable}  `
  console.log(query)
    try {
      const data = await executerequete(connection, query);
      const rulse = data.map((rulse) => ({
        point: rulse.Nombre_de_point,
        Description: rulse.Description,
        Valider: rulse.Valider,
        Rulse: rulse.Rulse,
        Name: rulse.Name,
        //IMG: rulse.IMG,
      }));
      
      return res.json(rulse);
  
    } catch (error) {
      console.log("req imposible", error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })




  /////////////////////////////////////Ajouter Tache ///////////////////////////////
/////////////a revoire
app.post("/TacheAjoue", async (req, res) => {
  console.log("trouver")
  const connection = await conection(); // Utilisez la fonction conection définie
  const formData = req.body;
  console.log("dans la partie back")
  console.log(formData.IDPlayer)
  const queryIdUser = `SELECT IdUser FROM player WHERE idPlayer = '${formData.IDPlayer}'`;
console.log(queryIdUser)
  try {
    // Exécution de la requête pour récupérer l'ID de l'utilisateur
    const dataIdUser = await executerequete(connection, queryIdUser);
    console.log(dataIdUser)
    // Vérifiez si des données ont été récupérées
    if (dataIdUser.length > 0) {
      console.log("req good")
      // Récupération de l'ID de l'utilisateur
      const idUsers = dataIdUser[0].IdUser;
      
      console.log("avant exe")
      // Construction de la requête SQL avec l'ID de l'utilisateur récupéré
      const query = `INSERT IGNORE INTO rulse (Rulse, Penalite, Nombre_de_point, Description, type, idUser, idPlayer, Valider) VALUES ('${formData.NomTache}', '${formData.Penalitee}', '${formData.point}', '${formData.Description}', '${formData.Recurence}', '${idUsers}', '${formData.IDPlayer}', '0')`;
      console.log(query + "dhyufgrygfuyerfgyuregfyerf")
      // Exécution de la requête SQL pour ajouter la tâche
      await executerequete(connection, query);
      
      console.log('Tâche ajoutée avec succès');
      res.status(200).json({ message: 'Tâche ajoutée avec succès' });
    } else {
      console.log("ID d'utilisateur non trouvé");
      res.status(404).json({ message: "ID d'utilisateur non trouvé" });
    }
  } catch (err) {
    console.error('Erreur lors de l\'exécution de la requête :', err);
    res.status(500).json({ message: 'Erreur lors de l\'exécution de la requête' });
  }
});


  /////////////////////////////////////Récupération Avatar enfant Ajouter Tache ////////////////////////////////
  app.get("/Avatar/:mail", async(req, res) => {
    const connection = await conection(); // Utilisez la fonction conection au lieu de conection
    const mail = req.params.mail;
    const query = `SELECT avatar.Nom , player.Name,idPlayer,user.Mail FROM player INNER JOIN user ON player.IdUser = user.idUser INNER JOIN avatar ON player.idAvatard = avatar.idAvatard WHERE user.Mail = '${mail}'`
    try {
      const data = await executerequete(connection, query);
      const Player = data.map((Player) => ({
        Nom: Player.Nom,
        Name: Player.Name,
        idPlayer: Player.idPlayer,
      }));
     
      return res.json(Player);
  
    } catch (error) {
      console.log("req imposible", error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })

  
///////////////////////////////////recuperer profil parent  Page Profils.tsx et Page ModificationProfil.tsx  //////////////////////////////////////////////////////////////////////
  app.get("/Profils/:mail", async(req, res) => {
    const connection = await conection(); // Utilisez la fonction conection au lieu de conection
    const mail = req.params.mail;
  
   
    const query = `SELECT user.name ,user.Lastname ,user.Mail,user.Password ,user.idUser FROM user WHERE user.Mail = '${mail}'`

    try {
      const data = await executerequete(connection, query);
      const user = data.map((User) => ({
        name: User.name,
        Lastname: User.Lastname,
        Mail: User.Mail,
        Password: User.Password,
        id: User.idUser
        //IMG: rulse.IMG,
      }));
      
      return res.json(user);
  
    } catch (error) {
      console.log("req imposible", error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })

  /////////////////////////////////recuperer profil Enfant partie parents //////////////////////////////////////////////////////////////////
  app.get("/ProfilsEnfant/:mail", async(req, res) => {
    const connection = await conection(); // Utilisez la fonction conection au lieu de conection
    const mail = req.params.mail;
    
    const query = `SELECT player.Point, player.Name, 
    COUNT(CASE WHEN rulse.Valider = 1 THEN 1 END) AS count_valider_1, 
    COUNT(CASE WHEN rulse.Valider = 0 THEN 1 END) AS count_valider_0 
FROM player 
INNER JOIN user ON player.IdUser = user.idUser 
INNER JOIN rulse ON rulse.IdPlayer = player.idPlayer 
WHERE user.Mail = '${mail}' 
GROUP BY player.Point, player.Name;`
  
    try {
      const data = await executerequete(connection, query);
      const rulse = data.map((rulse) => ({
        point: rulse.Point,
        Name: rulse.Name,
        Valider1: rulse.count_valider_1,
        Valider0: rulse.count_valider_0,
        
        //IMG: rulse.IMG,
      }));
    
      return res.json(rulse);
  
    } catch (error) {
      console.log("req imposible", error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })

  /////////////////////////////////Modifier profil parent //////////////////////////////////////////////////////////////////

app.put("/Profils/:mail/Modification", async (req, res) => {
  console.log("1")
  const connection = await conection(); // Utilisez la fonction conection au lieu de conection
  const Mail = req.params.mail;
  console.log("2")
  const { name, lastname, mail, password } = req.body; // Assurez-vous d'avoir les nouveaux détails à mettre à jour
  console.log(name)
  console.log(lastname)
  console.log(mail)
  console.log(password)
  console.log(mail)
  const query = `
      UPDATE user 
      SET 
      user.name = '${name}', 
      user.Lastname = '${lastname}', 
      user.Mail = '${mail}', 
      user.Password = '${password}' 
      WHERE 
      user.Mail = '${Mail}'`;

  console.log(query); // Pour vérifier que la requête est correcte dans la console du serveur

  try {
    console.log("3")
      await executerequete(connection, query);
      console.log("4")
      return res.json({ message: "Mise à jour réussie" });
  } catch (error) {
      console.log("Requête impossible", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});




/////////////////////////////////////coter strapie//////////////////////////////////////////////////

module.exports = {
  async createSession(ctx) {
    // Logic to create a new payment session with Stripe
    // Use ctx.request.body to get any necessary data from the client

    // Example:
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    return session;
  },

  async confirmPayment(ctx) {
    try {
      const { paymentIntent } = ctx.request.body;
      const payment = await stripe.paymentIntents.retrieve(paymentIntent);
      // Effectuez les actions nécessaires en fonction du statut du paiement
      return payment;
    } catch (error) {
      console.error('Erreur lors de la confirmation du paiement :', error);
      throw error;
    }
  }
};




app.listen(port, () => {
    console.log('Le serveur est en cours d\'exécution sur http://192.168.1.116:'+port);
  });