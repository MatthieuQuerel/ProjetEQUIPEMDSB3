const express = require('express')
const mysql = require('mysql')
const app = express()
const bodyParser = require('body-parser')
const port = 8082

const stripe = require('stripe')('sk_test_51OQ4atDvUzqU5phQNI86jWKdxTAoXeaUeb7gpO5LyDxGF86JtpToYxON07CCP71qlP5wCcHohWnE36MhoBD8KZtL00j2wUiGl6')

app.use(express.json())
app.use(bodyParser.json())
app.use(express.static('public'))

async function conection () {
  try {
    const Connection = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      port: '8889',
      password: '',
      database: 'mdsprojetb3test'
    })
    console.log('Connexion à la base de données MySQL établie')
    return Connection
  } catch (err) {
    console.error('Erreur lors de la connexion à la base de données :', err)
    throw err
  }
}

function executerequete (Connection, reqete) {
  return new Promise((resolve, reject) => {
    Connection.query(reqete, (err, res) => {
      if (err) {
        reject(err)
        return
      }

      resolve(res)
      return res

    })
  })
}
/// ///////////////////////////////////Partie Requet///////////////////////////////

/// //////////////////////////////////créé compte ////////////////////////////////

app.post('/CreactCompte', async (req, res) => {
  const connection = await conection()

  const formData = req.body
  console.log(formData)
  console.log(formData.Lastname)


  if (!formData || !formData.Mail || !formData.Password) {
    console.error('Données manquantes dans la requête.')
    res.status(400).json({ message: 'Données manquantes dans la requête.' })
    return
  }

  const queryGet = `SELECT Mail,Password FROM user WHERE Mail = '${formData.Mail}' and Password = '${formData.Password}'`
  const queryPoste = `INSERT INTO user (name,Lastname,Mail,Password) VALUES ('${formData.name}','${formData.LastName}','${formData.Mail}','${formData.Password}')`

  try {
    const data = await executerequete(connection, queryGet)


    if (data && data.length > 0) {
      console.error('Erreur lors de la récupération des données compte exist :')
      res.status(500).json({ message: 'compte exist ' })
    } else {
      await executerequete(connection, queryPoste)
      res.status(500).json({ message: 'compte créé' })
    }
  
    const queryGet = `SELECT Mail,Password FROM user WHERE Mail = '${formData.Mail}' and Password = '${formData.Password}'`;
    const queryPoste = `INSERT INTO user (name,Lastname,Mail,Password) VALUES ('${formData.name}','${formData.LastName}','${formData.Mail}','${formData.Password}')`;
    
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


// // Fonction pour générer un token JWT
// const generateToken = (userId) => {
//   return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' }); // Vous pouvez modifier la durée de validité selon vos besoins
// };

app.post("/Authentification", async (req, res) => {
    const connection = await conection(); // Utilisez la fonction conection définie
//   // Récupérer le mot de passe haché depuis la base de données
// // Remplacer cela par la logique appropriée pour récupérer le mot de passe associé à l'email fourni
// const hashedPasswordFromDB = '...';

// // Vérifier si les mots de passe correspondent
// const passwordMatch = bcrypt.compareSync(formData.Password, hashedPasswordFromDB);

// if (passwordMatch) {
//     // Les mots de passe correspondent, autoriser l'accès
// } else {
//     // Les mots de passe ne correspondent pas, refuser l'accès
// }
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


  // const verifyToken = (req, res, next) => {
  //   const token = req.headers.authorization?.split(' ')[1]; // Récupérer le token depuis l'en-tête Authorization
  //   if (!token) return res.status(401).json({ message: 'Accès non autorisé' });
  
  //   jwt.verify(token, 'your-secret-key', (err, decoded) => {
  //     if (err) return res.status(401).json({ message: 'Token invalide' });
  //     req.userId = decoded.userId; // Ajouter l'identifiant de l'utilisateur décrypté à l'objet de requête
  //     next(); // Passer à la prochaine fonction middleware
  //   });
  // };
  
  /////////////////////////////////////Récupération Tache////////////////////////////////
  app.get("/Tache/:mail/:Valide", async(req, res) => {
    const connection = await conection(); // Utilisez la fonction conection au lieu de conection
    const mail = req.params.mail; 
    const ValideTable = req.params.Valide;
    const query = `SELECT Nombre_de_point,Description, Valider, Rulse, player.Name FROM rulse INNER JOIN user ON rulse.IdUser = user.idUser INNER JOIN player ON rulse.IdPlayer = player.idPlayer WHERE user.Mail = '${mail}'and Valider =${ValideTable}  `
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

    return res.json(rulse)
  } catch (error) {
    console.log('req imposible', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

/// //////////////////////////////////Ajouter Tache ///////////////////////////////
/// //////////a revoire
app.post('/TacheAjoue', async (req, res) => {
  const connection = await conection() // Utilisez la fonction conection définie
  const formData = req.body

  console.log(formData.IDPlayer)
  const queryIdUser = `SELECT IdUser FROM player WHERE idPlayer = '${formData.IDPlayer}'`;
  console.log(queryIdUser)
  try {
    // Pour la date de création 
    const currentDate = new Date();
    const années = currentDate.getFullYear();
    const mois = currentDate.getMonth() + 1;
    const jour = currentDate.getDate();
    const DateCreation = `${années}-${mois}-${jour}`;
    // Exécution de la requête pour récupérer l'ID de l'utilisateur
    const dataIdUser = await executerequete(connection, queryIdUser);

    // Vérifiez si des données ont été récupérées
    if (dataIdUser.length > 0) {
      
      // Récupération de l'ID de l'utilisateur 
      const idUser = dataIdUser[0].IdUser;
   
      // Construction de la requête SQL avec l'ID de l'utilisateur récupéré
      const query = `INSERT INTO rulse (Rulse, Penalite, Nombre_de_point, Description, type, IdUser, IdPlayer, Valider, DateCreation) VALUES ('${formData.NomTache}', '${formData.Penalitee}', '${formData.point}', '${formData.Description}', '${formData.Recurence}', '${idUser}', '${formData.IDPlayer}', '0','${DateCreation}')`//,'${DateCreation}'//, DateCreation
                    
      console.log(query )
      // Exécution de la requête SQL pour ajouter la tâche
      await executerequete(connection, query)

      console.log('Tâche ajoutée avec succès')
      res.status(200).json({ message: 'Tâche ajoutée avec succès' })
    } else {
      console.log("ID d'utilisateur non trouvé")
      res.status(404).json({ message: "ID d'utilisateur non trouvé" })
    }
  } catch (err) {
    console.error('Erreur lors de l\'exécution de la requête :', err)
    res.status(500).json({ message: 'Erreur lors de l\'exécution de la requête' })
  }
})

/// //////////////////////////////////Récupération Avatar enfant Ajouter Tache ////////////////////////////////
app.get('/Avatar/:mail', async (req, res) => {
  const connection = await conection() // Utilisez la fonction conection au lieu de conection
  const mail = req.params.mail
  const query = `SELECT avatar.Nom , player.Name,idPlayer,user.Mail FROM player INNER JOIN user ON player.IdUser = user.idUser INNER JOIN avatar ON player.idAvatard = avatar.idAvatard WHERE user.Mail = '${mail}'`
  try {
    const data = await executerequete(connection, query)
    const Player = data.map((Player) => ({
      Nom: Player.Nom,
      Name: Player.Name,
      idPlayer: Player.idPlayer
    }))

    return res.json(Player)
  } catch (error) {
    console.log('req imposible', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

/// ////////////////////////////////recuperer profil parent  Page Profils.tsx et Page ModificationProfil.tsx  //////////////////////////////////////////////////////////////////////
app.get('/Profils/:mail', async (req, res) => {
  const connection = await conection() // Utilisez la fonction conection au lieu de conection
  const mail = req.params.mail

///////////////////////////////////////afficher tout les tache pour acceil /////////////////////////////////////////////////
app.get("/ToutTache/:mail",async(req,res) => {

  
    const Mail = req.params.mail;
    const connection = await conection();
    
    const query = `SELECT player.Name, Rulse, type, Nombre_de_point FROM rulse INNER JOIN player ON rulse.IdPlayer = player.idPlayer INNER JOIN user ON rulse.IdUser= user.idUser WHERE user.Mail = '${Mail}' ORDER BY rulse.DateCreation LIMIT 5`
    try {
 
    const data =   await executerequete(connection,query)

const RulseAcceil = data.map((RulseAcceil) => ({
  Point: RulseAcceil.Nombre_de_point,
  temporellement:RulseAcceil.type === 1 ? "souvent" : "une fois",
  Rulse: RulseAcceil.Rulse,
  Name: RulseAcceil.Name,
}));
console.log(RulseAcceil)
return res.json(RulseAcceil);
  }catch(error){
    console.log("Error d'envoie erreur ")
    res.status(500).json({ error: 'Une erreur est survenue lors de la l afichage des tache.'});
  }
})

  /////////////////////////////////////Récupération Avatar enfant Ajouter Tache ////////////////////////////////
  app.get("/Avatar/:mail", async(req, res) => {
    const connection = await conection(); // Utilisez la fonction conection au lieu de conection
    const mail = req.params.mail;
    const query = `SELECT avatar.Nom , player.Name,idPlayer,user.Mail FROM player INNER JOIN user ON player.IdUser = user.idUser INNER JOIN avatar ON player.idAvatard = avatar.idAvatard WHERE user.Mail = '${mail}'`
    try {
      const data = await executerequete(connection, query);
      console.log("back data");
     console.log(data);
      // const Players = data.map((Player) => ({ //petit bug donc je donne direct le data 
      //   Nom: Player.Nom,
      //   Name: Player.Name,
      //   idPlayer: Player.idPlayer,
      // }));
      
      
      return res.json(data);
  
    } catch (error) {
      console.log("req imposible", error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
////////////////////////////////////Modifier Tache //////////////////////////////////////////
app.put("/ModificationTache/:mail", async (req, res) => {

  const connection = await conection(); // Utilisez la fonction conection au lieu de conection
  const Mail = req.params.mail;
  //recuperer id modification
  let {Rulse, Penalite, Nombre_de_point, Description, type, IdUser, IdPlayer, Valider, DateCreation} = req.body;
  const query = `
      UPDATE rulse 
      SET 
      rulse.Rulse = '${Rulse}', 
      rulse.Penalite = '${Penalite}', 
      rulse.Nombre_de_point = '${Nombre_de_point}', 
      rulse.Description = '${Description}' 
      rulse.type = '${type}' 
      rulse.IdUser = '${IdUser}' 
      rulse.IdPlayer = '${IdPlayer}'
      rulse.Valider = '${Valider}';
      rulse.DateCreation = '${DateCreation}'`;

  console.log(query); // Pour vérifier que la requête est correcte dans la console du serveur

  try {
 
      await executerequete(connection, query);
      return res.json({ message: "Mise à jour Recompense réussie" });
  } catch (error) {
      console.log("Requête impossible", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
//////////////////////////////////////supression Tache  /////////////////////////////////////////////////////
app.delete("/SupresionTache/:mail", async (req, res) => {
  try {
    const Mail = req.params.mail;
      const idToDelete = req.body.id; 
    const connection = await conection();
    if(idToDelete > 0){
      console.log(idToDelete)
      
    const query =`DELETE FROM rulse WHERE idRulse = '${idToDelete}'`;
    await executerequete(connection, query);
      return res.json({ message: "Mise à jour de Récompense réussie"});
    }else{
      return res.json({ message: "Suprésion de Récompense échoué"});
    }
 
  } catch (error) {
    console.error("Error sup:", error);
    res.status(500).json({ error: 'Error sup.' });
  }
    
})
  
///////////////////////////////////recuperer profil parent  Page Profils.tsx et Page ModificationProfil.tsx  //////////////////////////////////////////////////////////////////////
  app.get("/Profils/:mail", async(req, res) => {
    const connection = await conection(); // Utilisez la fonction conection au lieu de conection
    const mail = req.params.mail;
  
   
    const query = `SELECT user.name ,user.Lastname ,user.Mail,user.Password ,user.idUser FROM user WHERE user.Mail = '${mail}'`

    return res.json(user)
  } catch (error) {
    console.log('req imposible', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

/// //////////////////////////////recuperer profil Enfant partie parents //////////////////////////////////////////////////////////////////
app.get('/ProfilsEnfant/:mail', async (req, res) => {
  const connection = await conection() // Utilisez la fonction conection au lieu de conection
  const mail = req.params.mail

  const query = `SELECT player.Point, player.Name, 
    COUNT(CASE WHEN rulse.Valider = 1 THEN 1 END) AS count_valider_1, 
    COUNT(CASE WHEN rulse.Valider = 0 THEN 1 END) AS count_valider_0 
FROM player 
INNER JOIN user ON player.IdUser = user.idUser 
INNER JOIN rulse ON rulse.IdPlayer = player.idPlayer 
WHERE user.Mail = '${mail}' 
GROUP BY player.Point, player.Name;`

  try {
    const data = await executerequete(connection, query)
    const rulse = data.map((rulse) => ({
      point: rulse.Point,
      Name: rulse.Name,
      Valider1: rulse.count_valider_1,
      Valider0: rulse.count_valider_0

      // IMG: rulse.IMG,
    }))

  const connection = await conection(); 
  const Mail = req.params.mail;
  
  const { name, lastname, mail, password } = req.body; 

  const query = `
      UPDATE user 
      SET 
      user.name = '${name}', 
      user.Lastname = '${lastname}', 
      user.Mail = '${mail}', 
      user.Password = '${password}' 
      WHERE 
      user.Mail = '${Mail}'`

  console.log(query);

  try {
    await executerequete(connection, query)
    return res.json({ message: 'Mise à jour réussie' })
  } catch (error) {
      console.log("Requête impossible", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
///////////////////////////////////////afficher tout les recompense pour acceil /////////////////////////////////////////////////
app.get("/ToutRecompense/:mail",async(req,res) => {

  
  const Mail = req.params.mail;
  const connection = await conection();
  
  const query = `SELECT player.Name, Recompense, Description, recompense.Point FROM recompense  INNER JOIN player ON recompense.Players = player.idPlayer  INNER JOIN user ON recompense.users= user.idUser  WHERE user.Mail = '${Mail}'  AND Abonnement = 0 ORDER BY recompense.DateCreation LIMIT 5`
  try {

  const data =   await executerequete(connection,query)

const recompenseAcceil = data.map((recompenseAcceil) => ({
Point: recompenseAcceil.Point,
Description:recompenseAcceil.Description,
Recompense: recompenseAcceil.Recompense,
Name: recompenseAcceil.Name,
}));
console.log(recompenseAcceil)
return res.json(recompenseAcceil);
}catch(error){
  console.log("Error d'envoie erreur ")
  res.status(500).json({ error: 'Une erreur est survenue lors de la l afichage des tache.'});
}
})
////////////////////////////////////// abonement preniume /////////////////////////////////////////////////////

app.get("/AbonnerPrenium/:mail", async(req, res) => {
  const connection = await conection(); // Utilisez la fonction conection au lieu de conection
  const Mail = req.params.mail;
  console.log(Mail)
  const query = `SELECT Abonner FROM user WHERE Mail = '${Mail}'`
const queryRecompense = `SELECT player.Name, recompense.Point, recompense.Recompense, recompenseAdmin.RecompenseAdmin, recompenseAdmin.description,Recompense.idRecompense FROM recompense  INNER JOIN user ON recompense.users = user.idUser   INNER JOIN player ON recompense.Players = player.idPlayer  LEFT JOIN recompenseAdmin ON recompense.RecompenseAdmin = recompenseAdmin.idRecompenseAdmin WHERE user.Mail = '${Mail}' AND recompense.Abonnement = 1`
//const queryRecompense = `SELECT player.Name,Recompense.Point,RecompenseAdmin.RecompenseAdmin,RecompenseAdmin.description FROM recompense INNER JOIN user ON Recompense.users = user.idUser  INNER JOIN player ON Recompense.Players = player.idPlayer  INNER JOIN RecompenseAdmin ON RecompenseAdmin.idRecompenseAdmin =Recompense.idRecompense  WHERE user.Mail = '${Mail}'`// AND Abonnement = '1'

  try {
    const data = await executerequete(connection, query);
    const abonnement = data.map((Abonement) => ({
      Abonner: Abonement.Abonner,
    }));
   
    if (abonnement[0].Abonner === 0) {
      
      return res.json(abonnement);
      
  } else {
   
      const data = await executerequete(connection, queryRecompense);
      const RecompensePrenium = data.map((recompensePrenium) => ({
          Name: recompensePrenium.Name,
          Point: recompensePrenium.Point,
          RecompenseAdmin: recompensePrenium.RecompenseAdmin,
          Description: recompensePrenium.description,
          IdRecompense: recompensePrenium.idRecompense,
      }));
      return res.json(RecompensePrenium);
  }

  } catch (error) {
    console.log("req imposible", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
/////////////////////////////////////////abonement standard//////////////////////////////////////////
app.get("/AbonnerStandard/:mail", async(req, res) => {
  const connection = await conection(); // Utilisez la fonction conection au lieu de conection
  const Mail = req.params.mail;
  
  const query = `SELECT player.Name,Recompense.Point,Recompense.Description,Recompense.Recompense,Recompense.idRecompense FROM Recompense INNER JOIN user ON Recompense.users = user.idUser  INNER JOIN player ON Recompense.Players = player.idPlayer  WHERE user.Mail = '${Mail}' AND Abonnement = '0'`

  try {
    const data = await executerequete(connection, query)
    const RecompenseStandard = data.map((recompenseStandard) => ({
      Name: recompenseStandard.Name,
      Point: recompenseStandard.Point,
      Description: recompenseStandard.Description,
      Recompense: recompenseStandard.Recompense,
      IdRecompense: recompenseStandard.idRecompense,
      
    }));
  
       return res.json(RecompenseStandard);
    
     


    }))

    return res.json(RecompenseStandard)
  } catch (error) {
    console.log('req imposible', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
/////////////////////////////////////////récompense adrmin dans combo pour ajouté ////////////////////////////////////////
app.get("/RecompenseAdmin", async(req, res) => {
  const connection = await conection(); // Utilisez la fonction conection au lieu de conection
 
  
  const queryRecompenseAdmin = `SELECT RecompenseAdmin,description,idRecompenseAdmin  FROM recompenseadmin WHERE Flag = '0'`

  try {
    const data = await executerequete(connection, queryRecompenseAdmin)
    const RecompenseAdmin = data.map((Recompenseadmin) => ({
      RecompenseAdmin: Recompenseadmin.RecompenseAdmin,
      description: Recompenseadmin.description,
      idRecompenseAdmin : Recompenseadmin.idRecompenseAdmin ,
    }));
  
       return res.json(RecompenseAdmin);
    
     

    return res.json(RecompenseAdmin)
  } catch (error) {
    console.log('req imposible', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
/////////////////////////////////////Ajouter récompense ////////////////////////////////////////////
app.post("/AjoutRecompense/:mail", async(req, res) => {
  
  const connection = await conection(); // Utilisez la fonction conection au lieu de conection
  const Mail = req.params.mail;
  const recompenseData = req.body;
  const queryIdUser = `SELECT IdUser FROM player WHERE idPlayer = '${recompenseData.IDPlayer}'`;
  const dataIdUser = await executerequete(connection, queryIdUser);
  const idUsers = dataIdUser[0].IdUser;

  const Date = new date()
    const années = Date.getFullYear()
    const mois = Date.getMonth()+1
    const jour = Date.getDate()
    const DateCreation = `${années}-${mois}-${jour}`;
    
  
 let queryAbonement  = ""

if (recompenseData.Abonement === '0'){
  queryAbonement = `INSERT IGNORE INTO recompense (users, Players, Recompense, Abonnement, RecompenseAdmin, Point, Description,DateCreation) VALUES ('${idUsers}', '${recompenseData.IDPlayer}', '${recompenseData.NomRecompense}', '${recompenseData.Abonement}', NULL, '${recompenseData.Point}', '${recompenseData.Description}','${DateCreation}')`
 console.log("je vais dans bonement standerd")
}else{
  queryAbonement = `INSERT IGNORE INTO recompense (users, Players, Recompense, Abonnement, RecompenseAdmin, Point, Description,DateCreation) VALUES ('${idUsers}', '${recompenseData.IDPlayer}', NULL, '${recompenseData.Abonement}', '${recompenseData.NomRecompense}', '${recompenseData.Point}', NULL ,'${DateCreation}')`
}
  try {
    const data = await executerequete(connection, queryAbonement)
    console.log(data)
    if (data !== undefined || data !== null) {
      return res.status(200).json({ message: 'récompense ajouté' })
    } else {
      res.status(500).json({ error: 'récompense non ajouté' })
    }
  } catch (error) {
    console.log('req imposible', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
////////////////////////////////////Modifier réccompense //////////////////////////////////////////
app.put("/Modification/:mail", async (req, res) => {

  const connection = await conection(); // Utilisez la fonction conection au lieu de conection
  const Mail = req.params.mail;
  let {PlayerID,UserID,Recompense,Abonement,RecompenseAdmin,Point, Description} = req.body;
 
  // console.log(PlayerID)
  // console.log(UserID)
  // console.log(Recompense)
  // console.log(Abonement) 
  // console.log(RecompenseAdmin) 
  // console.log(Point) 
  // onsole.log(Description)
  const query = `
      UPDATE Recompense 
      SET 
      Recompense.name = '${PlayerID}', 
      Recompense.Lastname = '${UserID}', 
      Recompense.Mail = '${Recompense}', 
      Recompense.Password = '${Abonement}' 
      Recompense.Password = '${RecompenseAdmin}' 
      Recompense.Password = '${Point}' 
      Recompense.Password = '${Description}'`

  console.log(query) // Pour vérifier que la requête est correcte dans la console du serveur

  try {
    await executerequete(connection, query)
    return res.json({ message: 'Mise à jour Recompense réussie' })
  } catch (error) {
    console.log('Requête impossible', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
});
//////////////////////////////////////supression Récompense  /////////////////////////////////////////////////////
app.delete("/SupresionRecompense/:mail", async (req, res) => {
  try {
    const Mail = req.params.mail;
      const idToDelete = req.body.id; 
    const connection = await conection();
    if(idToDelete > 0){
      console.log(idToDelete)
      
    const query =`DELETE FROM recompense WHERE idRecompense = '${idToDelete}'`;
    await executerequete(connection, query);
      return res.json({ message: "Mise à jour de Récompense réussie"});
    }else{
      return res.json({ message: "Suprésion de Récompense échoué"});
    }
 
  } catch (error) {
    console.error("Error sup:", error);
    res.status(500).json({ error: 'Error sup.' });
  }
    
})



/////////////////////////////////////coter strapie//////////////////////////////////////////////////

/// //////////////////////////////////coter strapie//////////////////////////////////////////////////

app.post('/Abonnement/:mail', async (req, res) => {
  try {
    const Mail = req.params.mail
    const { payment_method } = req.body
    const connection = await conection()
    const query = `UPDATE user SET Abonner = 1 WHERE Mail = '${Mail}'`
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 12000, //process.env.STRIPE_Pice,//12000,
      currency: 'eur',
      payment_method,
      confirm: true,
      //

      // **Add the automatic_payment_methods configuration here:**
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      }
    })

    console.log(paymentIntent.client_secret)
    if (paymentIntent.client_secret !== undefined) {
      const data = await executerequete(connection, query)

      res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } else {
      res.status(500).json({ error: 'Une erreur est survenue lors de l ajoue en basse' })
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du paiement.' })
  }
})
// app.post('/Abonnement/:mail', async (req, res) => {
//   const mail = req.params.mail;
//   const payload = req.body;

//   try {
//     const paymentData = {
//       amount: payload.amount,
//       currency: payload.currency,
//       payment_method_types: payload.payment_method_types
//     };

//     const paymentIntent = await stripe.paymentIntents.create(paymentData);

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     res.status(500).json({ error: 'Une erreur est survenue lors de la création du paiement.' });
//   }
// });

app.listen(port, () => {
  console.log('Le serveur est en cours d\'exécution sur http://192.168.1.116:' + port)
})
