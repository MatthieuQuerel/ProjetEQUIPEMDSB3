const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const port = 8082;

app.use(express.json());

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
  

app.listen(port, () => {
    console.log('Le serveur est en cours d\'exécution sur http://192.168.1.116:'+port);
  });