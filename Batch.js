const mysql = require('mysql');
const port = 8082;

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

const executerequete=(Connection,reqete) =>{
    return new Promise((resolve,reject) => {
        Connection.query(reqete,(err,res)=>{
            if (err) {
                reject(err);
                return err;
               }
               
              resolve(res);
               return res ;
                
        })
    })
}

const Reqsql= 'SELECT  Valider,idRulse,type  FROM rulse WHERE rulse.type = 1 '
const connection = await conection();
try{
   const data = executerequete(connection,Reqsql)
   data.forEach(tache =>{
     const {idRulse,Valider,type}  = tache
    console.log(`Valider: ${Valider}, idRulse: ${idRulse}, type: ${type}`);
     if(type == 1 && Valider == 0){
        const ReqsqlModification = `UPDATE rulse SET rulse.Valider = 0 WHERE rulse.idRulse = '${idRulse}'`
        const data = executerequete(connection,ReqsqlModification)
        if(data = '' || data == undefined){
            return json({ error: "Internal Server Error" });
        } 
        return json({ message: idRulse +" Mise à jour réussie" });
     }
   })
} catch (error) {
console.error("Erreur lors de l'exécution de la requête SQL :", error);
} finally {
connection.end();
}
