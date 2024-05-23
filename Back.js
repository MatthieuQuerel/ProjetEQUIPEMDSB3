const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const port = 8082;

const stripe = require('stripe')('sk_test_51OQ4atDvUzqU5phQNI86jWKdxTAoXeaUeb7gpO5LyDxGF86JtpToYxON07CCP71qlP5wCcHohWnE36MhoBD8KZtL00j2wUiGl6');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));


//const jwt = require('jsonwebtoken');

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
    const query = `SELECT Nombre_de_point,Description,type, Valider, Rulse,image.SVG, player.Name FROM rulse INNER JOIN image ON rulse.IDIcons = image.imageID INNER JOIN user ON rulse.IdUser = user.idUser INNER JOIN player ON rulse.IdPlayer = player.idPlayer WHERE user.Mail = '${mail}'and Valider =${ValideTable}`
    try {
      const data = await executerequete(connection, query);
      const rulse = data.map((rulse) => ({
        point: rulse.Nombre_de_point,
        Description: rulse.Description,
        temporellement:rulse.type === 1 ? "souvent" : "une fois",
        Valider: rulse.Valider,
        Rulse: rulse.Rulse,
        Name: rulse.Name,
        ImageSVG: rulse.SVG,
      }));
      return res.json(rulse);
  
    } catch (error) {
      console.log("req imposible", error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  })
  /////////////////////////////////////Ajouter Tache ///////////////////////////////
app.post("/TacheAjoue", async (req, res) => {
  
  const connection = await conection(); // Utilisez la fonction conection définie
  const formData = req.body;

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
      const query = `INSERT INTO rulse (Rulse, Penalite, Nombre_de_point, Description, type, IdUser, IdPlayer, Valider, DateCreation,IDIcons) VALUES ('${formData.NomTache}', '${formData.Penalitee}', '${formData.point}', '${formData.Description}', '${formData.Recurence}', '${idUser}', '${formData.IDPlayer}', '0','${DateCreation}','${formData.IDimage}')`//,'${DateCreation}'//, DateCreation
                    
      console.log(query )
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

///////////////////////////////////////afficher tout les tache pour acceil /////////////////////////////////////////////////
app.get("/ToutTache/:mail",async(req,res) => {

  
    const Mail = req.params.mail;
    const connection = await conection();
    
    const query = `SELECT player.Name, Rulse, type, Nombre_de_point,image.SVG FROM rulse INNER JOIN player ON rulse.IdPlayer = player.idPlayer INNER JOIN image ON rulse.IDIcons = image.imageID INNER JOIN user ON rulse.IdUser= user.idUser WHERE user.Mail = '${Mail}' ORDER BY rulse.DateCreation LIMIT 5`
    try {
 
    const data =   await executerequete(connection,query)

const RulseAcceil = data.map((RulseAcceil) => ({
  Point: RulseAcceil.Nombre_de_point,
  temporellement:RulseAcceil.type === 1 ? "souvent" : "une fois",
  Rulse: RulseAcceil.Rulse,
  Name: RulseAcceil.Name,
  ImageSVG: RulseAcceil.SVG,
}));

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
    const query = `SELECT  player.Name,idPlayer,user.Mail FROM player INNER JOIN user ON player.IdUser = user.idUser WHERE user.Mail = '${mail}'`
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
    /////////////////////////////////////Récupération icons ajouter Tache ////////////////////////////////
  app.get("/Icons", async(req, res) => {
    const connection = await conection(); 
    const mail = req.params.mail;
    const query = `SELECT imageID,Nom,SVG FROM image`
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
    COUNT(CASE WHEN rulse.Valider = 0 THEN 1 END) AS count_valider_0,
    player.idPlayer
FROM player 
left JOIN user ON player.IdUser = user.idUser 
left JOIN rulse ON rulse.IdPlayer = player.idPlayer 
WHERE user.Mail = '${mail}' 
GROUP BY player.Point, player.Name;`
  
    try {
      const data = await executerequete(connection, query);
      const rulse = data.map((rulse) => ({
        point: rulse.Point,
        Name: rulse.Name,
        Valider1: rulse.count_valider_1,
        Valider0: rulse.count_valider_0,
        IdPlayer: rulse.idPlayer,
        
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
      user.Mail = '${Mail}'`;

  console.log(query);

  try {
 
      await executerequete(connection, query);
      return res.json({ message: "Mise à jour réussie" });
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
const queryRecompense = `SELECT player.Name ,player.idPlayer, recompense.Point, recompense.Recompense, recompenseAdmin.RecompenseAdmin ,recompenseAdmin.idRecompenseAdmin, recompenseAdmin.description,Recompense.idRecompense FROM recompense  INNER JOIN user ON recompense.users = user.idUser   INNER JOIN player ON recompense.Players = player.idPlayer  LEFT JOIN recompenseAdmin ON recompense.RecompenseAdmin = recompenseAdmin.idRecompenseAdmin WHERE user.Mail = '${Mail}' AND recompense.Abonnement = 1`
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
          IdPlayer: recompensePrenium.idPlayer,
          IdRecompenseAdmin: recompensePrenium.idRecompenseAdmin,    
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
  
  const query = `SELECT player.Name,player.idPlayer,Recompense.Point,Recompense.Description,Recompense.Recompense,Recompense.idRecompense FROM Recompense INNER JOIN user ON Recompense.users = user.idUser INNER JOIN player ON Recompense.Players = player.idPlayer  WHERE user.Mail = '${Mail}' AND Abonnement = '0'`
  try {
    const data = await executerequete(connection, query);
    const RecompenseStandard = data.map((recompenseStandard) => ({
      Name: recompenseStandard.Name,
      Point: recompenseStandard.Point,
      Description: recompenseStandard.Description,
      Recompense: recompenseStandard.Recompense,
      IdRecompense: recompenseStandard.idRecompense,
      IdPlayer: recompenseStandard.idPlayer, 
    }));
       return res.json(RecompenseStandard);

  } catch (error) {
    console.log("req imposible", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

/////////////////////////////////////////récompense adrmin dans combo pour ajouté ////////////////////////////////////////
app.get("/RecompenseAdmin", async(req, res) => {
  const connection = await conection(); // Utilisez la fonction conection au lieu de conection
 
  
  const queryRecompenseAdmin = `SELECT RecompenseAdmin,description,idRecompenseAdmin  FROM recompenseadmin WHERE Flag = '0'`

  try {
    const data = await executerequete(connection, queryRecompenseAdmin);
    const RecompenseAdmin = data.map((Recompenseadmin) => ({
      RecompenseAdmin: Recompenseadmin.RecompenseAdmin,
      description: Recompenseadmin.description,
      idRecompenseAdmin : Recompenseadmin.idRecompenseAdmin ,
    }));
  
       return res.json(RecompenseAdmin);
    
     

  } catch (error) {
    console.log("req imposible", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
/////////////////////////////////////Ajouter récompense ////////////////////////////////////////////
app.post("/AjoutRecompense/:mail", async(req, res) => {
  
  const connection = await conection(); 
  const Mail = req.params.mail;
  const recompenseData = req.body;
  const queryIdUser = `SELECT IdUser FROM player WHERE idPlayer = '${recompenseData.IDPlayer}'`;
  const dataIdUser = await executerequete(connection, queryIdUser);
  const idUsers = dataIdUser[0].IdUser;

  const currentDate = new Date();
  const années = currentDate.getFullYear();
  const mois = currentDate.getMonth() + 1;
  const jour = currentDate.getDate();
  const DateCreation = `${années}-${mois}-${jour}`;
    console.log(recompenseData.Abonement +"back ");
  
 let queryAbonement  = ""

if (recompenseData.Abonement === 0){
  queryAbonement = `INSERT IGNORE INTO recompense (users, Players, Recompense, Abonnement, RecompenseAdmin, Point, Description,DateCreation) VALUES ('${idUsers}', '${recompenseData.IDPlayer}', '${recompenseData.NomRecompense}', '${recompenseData.Abonement}', NULL, '${recompenseData.Point}', '${recompenseData.Description}','${DateCreation}')`
 
}else{
  queryAbonement = `INSERT IGNORE INTO recompense (users, Players, Recompense, Abonnement, RecompenseAdmin, Point, Description,DateCreation) VALUES ('${idUsers}', '${recompenseData.IDPlayer}', NULL, '${recompenseData.Abonement}', '${recompenseData.NomRecompense}', '${recompenseData.Point}', NULL ,'${DateCreation}')`
}
  try {
    const data = await executerequete(connection, queryAbonement); 
    console.log(data)
    if(data !== undefined|| data !== null){
      return res.status(200).json({message:"récompense ajouté"})
    }else{
      res.status(500).json({ error: 'récompense non ajouté' })
    }
      
  } catch (error) {
    console.log("req imposible", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


////////////////////////////////////Modifier réccompense //////////////////////////////////////////
app.put("/Modification/:mail", async (req, res) => {
  const connection = await conection(); // Assurez-vous que cette fonction est correctement définie
  const Mail = req.params.mail;
  console.log(Mail)
  const currentDate = new Date();
  const années = currentDate.getFullYear();
  const mois = currentDate.getMonth() + 1;
  const jour = currentDate.getDate();
  const DateCreation = `${années}-${mois}-${jour}`;
  const { IDPlayer, NomRecompense, Abonement, Point, Description,ID } = req.body;
  
  const queryIdUser = `SELECT IdUser FROM player WHERE idPlayer = '${IDPlayer}'`;
  const dataIdUser = await executerequete(connection, queryIdUser);
  const idUsers = dataIdUser[0].IdUser;
  console.log(idUsers)
  let query = `
      UPDATE Recompense 
      SET 
      Recompense.Players = '${IDPlayer}', 
      Recompense.users = '${idUsers}', 
      Recompense.Abonnement = '${Abonement}',  
      Recompense.Point = '${Point}', 
      Recompense.Description = '${Description}', 
      Recompense.DateCreation  = '${DateCreation}',`
     
  if (Abonement === 0) {
    query += ` Recompense.Recompense = '${NomRecompense}', Recompense.Description = '${Description}', Recompense.RecompenseAdmin = NULL`;
  } else {
    query += ` Recompense.RecompenseAdmin = '${NomRecompense}', Recompense.Description = NULL, Recompense.Recompense = NULL`;
  }

  query += ` WHERE Recompense.idRecompense = '${ID}'`;
console.log(query)
  try {
    await executerequete(connection, query);
    return res.json({ message: "Mise à jour Recompense réussie" });
  } catch (error) {
    console.log("Requête impossible", error);
    return res.status(500).json({ error: "Internal Server Error" });
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
/////////////////////////////////////player Recompense Notification/////////////////////////////////
app.get("/playerRecompenseNotification/:mail", async(req, res) => {
  const connection = await conection(); // Utilisez la fonction conection au lieu de conection
  const Mail = req.params.mail;
  
  const queryRecompenseNotification = `SELECT p.Name AS PlayerName, p.Point AS PlayerPoints, r.idRecompense, IFNULL(r.Recompense, ra.RecompenseAdmin) AS Recompense,  r.Point AS RewardPoints, r.DateCreation AS RewardCreationDate FROM user u INNER JOIN player p ON u.idUser = p.IdUser  INNER JOIN recompense r ON p.idPlayer = r.Players LEFT JOIN recompenseadmin ra ON r.RecompenseAdmin = ra.idRecompenseAdmin WHERE u.Mail = '${Mail}'  AND p.Point > r.Point ORDER BY r.DateCreation LIMIT 4;`

  try {
    const data = await executerequete(connection, queryRecompenseNotification);
const RecompenseNotification = data.map((Recompensenotification) => {
  const rewardDate = new Date(Recompensenotification.RewardCreationDate);
  const day = rewardDate.getDate().toString().padStart(2, '0'); 
  const month = (rewardDate.getMonth() + 1).toString().padStart(2, '0'); 
  const year = rewardDate.getFullYear(); 
  const formattedDate = `${day}-${month}-${year}`;

  return {
    PlayerName: Recompensenotification.PlayerName,
    PlayerPoints: Recompensenotification.PlayerPoints,
    Recompense: Recompensenotification.Recompense,
    RewardCreationDate: formattedDate, 
  };
});

  
       return res.json(RecompenseNotification);
    
     

  } catch (error) {
    console.log("req imposible", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

/////////////////////////////////////coter strapie//////////////////////////////////////////////////


app.post('/Abonnement/:mail', async (req, res) => {
  try {
    const Mail = req.params.mail;
    const { payment_method } = req.body;
    const connection = await conection();
    const query =`UPDATE user SET Abonner = 1 WHERE Mail = '${Mail}'`;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 6990, //process.env.STRIPE_Pice,//12000,
      currency: 'eur',
      payment_method: payment_method,
      confirm: true,
      //

      // **Add the automatic_payment_methods configuration here:**
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    
    console.log(paymentIntent.client_secret)
    if(paymentIntent.client_secret !== undefined){
      
      const data = await executerequete(connection,query)
      
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
   
    }else {
      res.status(500).json({ error: 'Une erreur est survenue lors de l ajoue en basse' });
    }
    
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création du paiement.' });
  }
});
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

//////////////////////////////////////////////////statistique///////////////////////////////////////////////////////////////////////////

app.get("/stat/:mail", async(req, res) => {
  const connection = await conection(); // Utilisez la fonction conection au lieu de conection
  const Mail = req.params.mail;
  
 const queryStatistique = `SELECT player.Point, player.Name,player.idPlayer FROM player left JOIN user ON player.IdUser = user.idUser  WHERE user.Mail = '${Mail}' GROUP BY player.Point, player.Name;`
  try {
    const data = await executerequete(connection, queryStatistique);
    const Statistique = data.map((statistique) => ({
      point: statistique.Point,
      name: statistique.Name,
      IdPlayer : statistique.idPlayer ,
    }));
    console.log(Statistique+ "dans le back")
       return res.json(Statistique);
  } catch (error) {
    console.log("req imposible", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
/////////////////////////////////////////////Partie Enfant ///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////Afficher enfant ////////////////////////////////////////////////////////////////////////
app.get("/AfficherModification/:id", async (req, res) => {
  const connection = await conection(); 

  const idPlayer = req.params.id;
 console.log("idPlayer : "+ idPlayer)
  const queryPlayer = `SELECT Name,TypePersone,Point,Age FROM player WHERE idPlayer = '${idPlayer}'`;

  const dataIdPlayer = await executerequete(connection, queryPlayer);
  console.log(dataIdPlayer)
  if(dataIdPlayer !== undefined || dataIdPlayer !== null){

    const ModifPlayer = dataIdPlayer.map((Modifplayer) => ({
      name: Modifplayer.Name,
      typePersone: Modifplayer.TypePersone,
      age : Modifplayer.Age ,
      point : Modifplayer.Point ,
    }));
  
    return res.status(200).json(ModifPlayer);
    
  } else {
    res.status(500).json({ error: 'récompense non ajoutée' })
  }
})

///////////////////////////////////////////////Suprimer enfant ///////////////////////////////////////////////////////////

app.delete("/SupresionEnfant/:mail", async (req, res) => {
  try {
    const Mail = req.params.mail;
      const idToDelete = req.body.id; 
    const connection = await conection();
    if(idToDelete > 0){
     
    const query =`DELETE FROM player WHERE idPlayer = '${idToDelete}'`;
    await executerequete(connection, query);
      return res.json({ message: "Supréssion player réussie"});
    }else{
      return res.json({ message: "Supréssion player échoué"});
    }
 
  } catch (error) {
    console.error("Error sup:", error);
    res.status(500).json({ error: 'Error sup.' });
  }
    
})

///////////////////////////////////////////////////Ajouter Enfant /////////////////////////////////////////////////////////////////
app.post("/AjoutEnfant/:mail", async(req, res) => {
  const connection = await conection(); 

  const Mail = req.params.mail;
  console.log(Mail)
  const Player = req.body;
  const queryIdUser = `SELECT idUser FROM user WHERE Mail = '${Mail}'`;
  const dataIdUser = await executerequete(connection, queryIdUser);

  const idUsers = dataIdUser[0].idUser;
  console.log(idUsers)
  const queryplayer = `INSERT IGNORE INTO player (IdUser, Name, TypePersone, Point, idAvatard, Age) VALUES ('${idUsers}', '${Player.Name}', '${Player.TypePersone}', '${Player.Point}', 0, '${Player.Age}')`
  
  try {
    console.log(queryplayer)
    const data = await executerequete(connection, queryplayer); 
    console.log(data)
    if(data !== undefined || data !== null){
      return res.status(200).json({message:"Enfant ajoutée"})
    } else {
      res.status(500).json({ error: 'Enfant non ajoutée' })
    }
  } catch (error) {
    console.log("Requête impossible", error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
  
})


////////////////////////////////////Modifier Enfant //////////////////////////////////////////
app.put("/ModificationEnfant/:id", async (req, res) => {
  const connection = await conection(); // Assurez-vous que cette fonction est correctement définie
  const IDPlayer = req.params.id;
  console.log(IDPlayer);
  
  const { ID, Name, Age, Point, TypePersone } = req.body;
  
  const queryIdUser = `SELECT IdUser FROM player WHERE idPlayer = '${IDPlayer}'`;
  const dataIdUser = await executerequete(connection, queryIdUser);
  const idUsers = dataIdUser[0].IdUser;
  console.log(idUsers);
  
  let query = `
      UPDATE player 
      SET 
      idPlayer = '${ID}', 
      IdUser = '${idUsers}', 
      Name = '${Name}',  
      Point = '${Point}', 
      TypePersone = '${TypePersone}', 
      Age = '${Age}'
      WHERE idPlayer = '${IDPlayer}'`;
     
  try {
    await executerequete(connection, query);
    return res.json({ message: "Mise à jour Recompense réussie" });
  } catch (error) {
    console.log("Requête impossible", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

////////////////////////////////////afficher enfant Bouton ////////////////////////////////////////
app.get("/Afficherenfant/:mail", async (req, res) => {
  try {
    const connection = await conection(); 

    const Mail = req.params.mail;
    console.log(Mail);
    const queryIdUser = `SELECT idUser FROM user WHERE Mail = '${Mail}'`;
    const dataIdUser = await executerequete(connection, queryIdUser);
    const idUsers = dataIdUser[0].idUser;
  
    const queryPlayer = `SELECT Name, idPlayer FROM player WHERE IdUser = '${idUsers}'`;
    const dataIdPlayer = await executerequete(connection, queryPlayer);
    
    if (dataIdPlayer.length > 0) {
      const AfficherPlayer = dataIdPlayer.map((Afficherplayer) => ({
        name: Afficherplayer.Name,
        idplayer: Afficherplayer.idPlayer,
      }));
  
      return res.status(200).json(AfficherPlayer);
    } else {
      return res.status(404).json({ error: 'Aucun joueur trouvé pour cet utilisateur' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données du joueur :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

/////////////////////////////////////////afficher tache du player////////////////////////////////////////////
app.get("/AfficherDeEnfant/:mail/:id",async(req,res) => {

  
  const Mail = req.params.mail;
  const Id = req.params.id;
  const connection = await conection();
  
  const query = `SELECT idRulse,player.Name, Rulse, type,image.SVG, Nombre_de_point FROM rulse INNER JOIN image ON rulse.IDIcons = image.imageID INNER JOIN player ON rulse.IdPlayer = player.idPlayer INNER JOIN user ON rulse.IdUser= user.idUser WHERE user.Mail = '${Mail}' and player.idPlayer = '${Id}'and Valider = '0'  ORDER BY rulse.DateCreation`
  try {

  const data =   await executerequete(connection,query)

const RulseAcceil = data.map((RulseAcceil) => ({
Point: RulseAcceil.Nombre_de_point,
temporellement:RulseAcceil.type === 1 ? "souvent" : "une fois",
Rulse: RulseAcceil.Rulse,
Name: RulseAcceil.Name,
Description: RulseAcceil.Description,
idRulse: RulseAcceil.idRulse,
ImageSVG: RulseAcceil.SVG,
}));
console.log(RulseAcceil)
return res.json(RulseAcceil);
}catch(error){
  console.log("Error d'envoie erreur ")
  res.status(500).json({ error: 'Une erreur est survenue lors de la l afichage des tache.'});
}
})
///////////////////////////////////////////////////////////Valider tache de l enfant /////////////////////////////////////////////////////////////
app.put("/ValiderTache/:idRulse", async (req, res) => {
  const connection = await conection(); // Assurez-vous que cette fonction est correctement définie
  const idRulse = req.params.idRulse;

  try {
    // Mettre à jour le champ `modifier` dans la table `rulse` pour l'enregistrement avec l'ID spécifié
    const query = `
      UPDATE rulse 
      SET Valider = 1
      WHERE idRulse = '${idRulse}'`;

    await executerequete(connection, query);
    return res.json({ message: "Mise à jour réussie" });
  } catch (error) {
    console.error("Requête impossible :", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
    console.log('Le serveur est en cours d\'exécution sur http://192.168.1.116:'+port);
  });