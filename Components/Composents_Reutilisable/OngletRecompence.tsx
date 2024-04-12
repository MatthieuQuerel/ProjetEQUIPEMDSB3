import Payement from "./Payements"
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonNav from "./Button";
import {useNavigate} from 'react-router-native';
import { useParams } from 'react-router-native';
import { Link } from 'react-router-native';

interface paramLink {
  AjoueModification: number;
  Abonnement: number; 
  paramTab: string[];
  ID: number;
  }
  
const OngletRecompense = () => {
    const [activeTab, setActiveTab] = useState<number>(1);
    const [tasks, setTasks] = useState<any[]>([]); // État pour stocker les tâches
    const [abonnement, setAbonnement] = useState<number | null>(null); // État pour stocker l'abonnement
   

    const changeTab = (tabNumber: number) => {
        setActiveTab(tabNumber);
    };
    const params = useParams();
    const navigate = useNavigate();
    const [paramLink, setparamLink] = useState<paramLink>({  
        AjoueModification: 0,
        Abonnement: 0,
        paramTab: [""],
        ID: 0,
    });
    
 useEffect(() => {
        const fetchData = async () => {
            if (activeTab === 2 && params) {
                try {
                    const response = await fetch(`http://192.168.1.116:8082/AbonnerPrenium/${params.User}`, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });   
                    if (!response.ok) {
                        throw new Error('Échec de la requête');
                        return { }
                    }
                    const data = await response.json();   
                    // Mettez à jour l'état avec les données reçues ici
                    console.log("Données reçues :", data);
                    setTasks(data); // Met à jour l'état avec les données reçues
                } catch (err) {
                    console.error(err);
                    console.log("Impossible d'afficher les informations !!");
                }
            }else{
                try {
                const response = await fetch(`http://192.168.1.116:8082/AbonnerStandard/${params.User}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Échec de la requête');
                }
                console.log(response.ok); // Laissez cette ligne pour voir si la requête a réussi
                const data = await response.json();
                // Mettez à jour l'état avec les données reçues ici
                console.log("Données reçues :", data);
                setTasks(data); // Met à jour l'état avec les données reçues
                
            } catch (err) {
                console.error(err);
                console.log("Impossible d'afficher les informations !!");
            }
            }
        };   
        fetchData();
    }, [activeTab, params]);

    const buildLink = (BoutonAjoueModif: number,Typeabonement: number,task: any) => {
       
        if(BoutonAjoueModif === 1){
            paramLink.AjoueModification = 1 ;
    let  paramTabObj 
     if(Typeabonement == 0){
        console.log("tes dans le 0 pour modifier passe  ///////////////////////////////////////////")
        paramTabObj = {
            ID: task.IdRecompense.toString(),
            Recompense: task.Recompense,
            Description: task.Description,
            Point: task.Point.toString(),
            Name: task.Name,
            idEnfant: task.IdPlayer.toString(),
        };
     } else{
        paramTabObj = {
            ID: task.IdRecompense.toString(),
            Recompense: task.RecompenseAdmin,
            Description: task.Description,
            Point: task.Point.toString(),
            Name: task.Name,
            idEnfant: task.IdPlayer.toString(),
            idRecompenseAdmin: task.IdRecompenseAdmin.toString(),
        };
     }
           
            // Stringify the object and push it to paramTab array
            paramLink.paramTab.push(JSON.stringify(paramTabObj));
            paramLink.ID= task.IdRecompense.toString() // atribué id 
        }
        if(Typeabonement === 1){
            paramLink.Abonnement = 1 ;
        }else{
            console.log("Typeabonement est a 0")
            paramLink.Abonnement = 0 ;
        }
        const queryParams = new URLSearchParams({
            AjoueModification: paramLink.AjoueModification.toString(),
            Abonement: paramLink.Abonnement.toString(),
            paramTab: paramLink.paramTab.join(),
            ID: paramLink.ID.toString(), //paramLink.ID.toString(),
        }).toString();
        const queryStringWithSlashes = queryParams.split('&').join('/'); // Insert slashes between parameters
    
        return `/Compte/${params.User}/CompteParent/Prenium/AjouterRecompense${queryStringWithSlashes ? `/${queryStringWithSlashes}` : ''}`;     
    };
   
    console.log(paramLink.Abonnement.toString())
    console.log( paramLink.Abonnement)
    console.log(buildLink(0,0,[]))
    return (
        <View>
            <View style={styles.tabBar}>
                <TouchableOpacity onPress={() => changeTab(1)} style={[styles.tabButton, activeTab === 1 && styles.activeTab]}>
                    <Text>standard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeTab(2)} style={[styles.tabButton, activeTab === 2 && styles.activeTab]}>
                    <Text>prenium</Text>
                </TouchableOpacity>
            </View>

            <View>
               
                    <React.Fragment>
                        {activeTab === 1 && (
                            <React.Fragment>
     
     
                                <Text>partie standard</Text>
                                {tasks.map((task, index) => (
  <TouchableOpacity key={index} onPress={() => navigate(buildLink(1, 0, task))}>
    <View style={[styles.card]}>
      <Text style={[styles.cardText, styles.bold, styles.center]}>Recompense: {task.Recompense}</Text>
      <Text style={[styles.cardText, styles.bold, styles.center]}>Description: {task.Description}</Text>
      <Text style={[styles.cardText, styles.bold, styles.center]}>point: {task.Point}</Text>
      <Text style={[styles.cardText, styles.bold, styles.center]}>Name: {task.Name}</Text>
      <Text style={[styles.center, { opacity: 0 }]}>IdEnfant: {task.IdPlayer}</Text>
      <Text style={[styles.center, { opacity: 0 }]}>IdRecompense: {task.IdRecompense}</Text>
    </View>
  </TouchableOpacity>
))}
                                <TouchableOpacity style={styles.button} onPress={() => console.log(`+ clicked`)}>
                <Link to={buildLink(0,0,[])}>
                    <Text style={styles.buttonText}>+</Text>
                </Link>
            </TouchableOpacity>
                                        

                            </React.Fragment>
                        )}
                        
                        {activeTab === 2 && (
                              <React.Fragment>
                             <Text>partie preniume</Text>
                                    {abonnement === 0 ? (
                                        <Payement />
                                    ) : (
                                        tasks.map((task, index) => (
                                         <TouchableOpacity  onPress={() => navigate(buildLink(1,1,task))}>
                                        
                                              <View key={index} style={[styles.card]}>
                                                <Text style={[styles.cardText, styles.bold, styles.center]}>Recompense: {task.RecompenseAdmin}</Text>
                                                <Text style={[styles.cardText, styles.bold, styles.center]}>Description: {task.Description}</Text>
                                                <Text style={[styles.cardText, styles.bold, styles.center]}>Point: {task.Point}</Text>
                                                <Text style={[styles.cardText, styles.bold, styles.center]}>Name: {task.Name}</Text>
                                                <Text style={[ styles.center,{opacity:0}]}>IdPlayer: {task.IdPlayer}</Text>
                                                <Text style={[ styles.center,{opacity:0}]}>IdRecompense: {task.IdRecompense}</Text>
                                                <Text style={[ styles.center]}>IdRecompense: {task.IdRecompenseAdmin}</Text>
                                              </View>
                                           
                                         </TouchableOpacity>
                                        ))
                                    )}
                                     <TouchableOpacity style={styles.button} onPress={() => console.log(`+ clicked`)}>
                <Link to={buildLink(0,1,[])}>
                    <Text style={styles.buttonText}>+</Text>
                </Link>
            </TouchableOpacity>
                                </React.Fragment>
                            )}
                            </React.Fragment>
            </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#eee',
    },
    tabButton: {
        padding: 10,
    },
    activeTab: {
        backgroundColor: 'lightblue',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 14,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: 'blue',
        width: 400,
    },
    cardText: {
        marginBottom: 2,
    },
    bold: {
        fontWeight: 'bold',
    },
    center: {
        textAlign: 'center',
    },
    button: {
        marginTop: 10,
        width: '100%',
        height: 80,
        backgroundColor: 'black', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1, 
        borderColor: 'orange', 
      },
      buttonText: {
        fontSize: 24, 
        color: 'orange',
      },
})

export default OngletRecompense;
