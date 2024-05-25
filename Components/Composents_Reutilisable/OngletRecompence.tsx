import Payement from "./Payements"
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import ButtonNav from "./Button";
import {useNavigate} from 'react-router-native';
import { useParams } from 'react-router-native';
import { Link } from 'react-router-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

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
    const [errorRecompense, setErrors] = useState("");
    
    
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

                    if (activeTab === 2 && abonnement === null) {
                        setAbonnement(data.abonnement || 0); // Assuming `data.abonnement` indicates premium status
                      }else {
                        setAbonnement(data.abonnement || 1);
                      }
                    // Mettez à jour l'état avec les données reçues ici
                    console.log("Données reçues :", data);
                    setTasks(data); // Met à jour l'état avec les données reçues
                } catch (err) {
                    console.error(err);
                    setErrors("Impossible d'afficher les informations !!");
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
                setErrors("Impossible d'afficher les informations !!");
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
    console.log( abonnement + "le test de la fen pour l abonement")
    console.log(buildLink(0,0,[]))
    return (
        <View>
            <View style={styles.tabBar}>
                <TouchableOpacity onPress={() => changeTab(1)} style={[styles.tabButton, activeTab === 1 && styles.activeTab]}>
                    <Text>standard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeTab(2)} style={[styles.tabButton, activeTab === 2 && styles.activeTab]}>
                    <Text>premium</Text>
                </TouchableOpacity>
            </View>

            <View>
               
                    <React.Fragment>
                        {activeTab === 1 && (
                          
                            <React.Fragment>
                            {errorRecompense && <Text style={{ color: 'red' }}>{errorRecompense}</Text>}
     
                                <Text style={[styles.titre]} >partie standard</Text>
                                <ScrollView horizontal={false} style={{ maxHeight: 500 }}>
                                {tasks.map((task, index) => (
  <TouchableOpacity key={index} onPress={() => navigate(buildLink(1, 0, task))}>
    <View style={[styles.card, { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#EB4651' }]}>
      <Text style={[styles.cardText, styles.bold, styles.center,index % 2 === 1 ? { color: 'white' } : null]}> {task.Recompense}</Text>
      <Text style={[styles.cardText, styles.bold, styles.center,index % 2 === 1 ? { color: 'white' } : null]}> {task.Description}</Text>
      <View style={styles.iconTextContainer}>
      {index % 2 === 1 ?(
            <Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
             <Path d="M4.42773 4.625H7.06445C9.37891 0.787109 12.9824 0.640625 15.1504 1.05078C15.502 1.10938 15.7656 1.37305 15.8242 1.72461C16.2344 3.89258 16.0879 7.49609 12.25 9.81055V12.4473C12.25 13.1797 11.8398 13.8828 11.1953 14.2637L8.61719 15.7871C8.38281 15.9336 8.11914 15.9336 7.91406 15.7871C7.67969 15.6699 7.5625 15.4355 7.5625 15.1719V11.832C7.5625 11.1582 7.29883 10.5137 6.83008 10.0449C6.36133 9.57617 5.7168 9.3125 5.04297 9.3125H1.70312C1.43945 9.3125 1.20508 9.19531 1.08789 8.96094C0.941406 8.75586 0.941406 8.49219 1.08789 8.25781L2.61133 5.67969C2.99219 5.03516 3.69531 4.625 4.42773 4.625ZM13.4219 4.625C13.4219 4.21484 13.1875 3.83398 12.8359 3.62891C12.4551 3.42383 12.0156 3.42383 11.6641 3.62891C11.2832 3.83398 11.0781 4.21484 11.0781 4.625C11.0781 5.06445 11.2832 5.44531 11.6641 5.65039C12.0156 5.85547 12.4551 5.85547 12.8359 5.65039C13.1875 5.44531 13.4219 5.06445 13.4219 4.625ZM5.86328 14.6445C4.86719 15.6699 2.93359 15.8457 1.82031 15.875C1.35156 15.9043 0.970703 15.5234 1 15.0547C1.0293 13.9414 1.20508 12.0078 2.23047 11.0117C3.22656 10.0156 4.86719 10.0156 5.86328 11.0117C6.85938 12.0078 6.85938 13.6484 5.86328 14.6445ZM4.48633 13.5898C4.83789 13.2676 4.83789 12.7109 4.48633 12.3887C4.16406 12.0371 3.60742 12.0371 3.28516 12.3887C2.99219 12.6816 2.9043 13.209 2.875 13.5898C2.875 13.8242 3.05078 14 3.28516 14C3.66602 13.9707 4.19336 13.8828 4.48633 13.5898Z" fill="#F4B322"/>
            </Svg>
            ) : (
            <Svg width="17" height="16" viewBox="0 0 17 16" fill="none" >
            <Path d="M4.42773 4.625H7.06445C9.37891 0.787109 12.9824 0.640625 15.1504 1.05078C15.502 1.10938 15.7656 1.37305 15.8242 1.72461C16.2344 3.89258 16.0879 7.49609 12.25 9.81055V12.4473C12.25 13.1797 11.8398 13.8828 11.1953 14.2637L8.61719 15.7871C8.38281 15.9336 8.11914 15.9336 7.91406 15.7871C7.67969 15.6699 7.5625 15.4355 7.5625 15.1719V11.832C7.5625 11.1582 7.29883 10.5137 6.83008 10.0449C6.36133 9.57617 5.7168 9.3125 5.04297 9.3125H1.70312C1.43945 9.3125 1.20508 9.19531 1.08789 8.96094C0.941406 8.75586 0.941406 8.49219 1.08789 8.25781L2.61133 5.67969C2.99219 5.03516 3.69531 4.625 4.42773 4.625ZM13.4219 4.625C13.4219 4.21484 13.1875 3.83398 12.8359 3.62891C12.4551 3.42383 12.0156 3.42383 11.6641 3.62891C11.2832 3.83398 11.0781 4.21484 11.0781 4.625C11.0781 5.06445 11.2832 5.44531 11.6641 5.65039C12.0156 5.85547 12.4551 5.85547 12.8359 5.65039C13.1875 5.44531 13.4219 5.06445 13.4219 4.625ZM5.86328 14.6445C4.86719 15.6699 2.93359 15.8457 1.82031 15.875C1.35156 15.9043 0.970703 15.5234 1 15.0547C1.0293 13.9414 1.20508 12.0078 2.23047 11.0117C3.22656 10.0156 4.86719 10.0156 5.86328 11.0117C6.85938 12.0078 6.85938 13.6484 5.86328 14.6445ZM4.48633 13.5898C4.83789 13.2676 4.83789 12.7109 4.48633 12.3887C4.16406 12.0371 3.60742 12.0371 3.28516 12.3887C2.99219 12.6816 2.9043 13.209 2.875 13.5898C2.875 13.8242 3.05078 14 3.28516 14C3.66602 13.9707 4.19336 13.8828 4.48633 13.5898Z" fill="#EB4651"/>
            </Svg>
            )}
      <Text style={[styles.cardText, styles.bold, styles.center,index % 2 === 1 ? { color: 'white' } : null]}> {task.Point}</Text>
      </View>
      <Text style={[styles.cardText, styles.bold, styles.center,index % 2 === 1 ? { color: 'white' } : null]}>Récompense pour: {task.Name}</Text>
      <Text style={[styles.center, { opacity: 0 }]}>IdEnfant: {task.IdPlayer}</Text>
      <Text style={[styles.center, { opacity: 0 }]}>IdRecompense: {task.IdRecompense}</Text>
    </View>
  </TouchableOpacity>
))}
</ScrollView>
                                <TouchableOpacity style={styles.button} onPress={() => console.log(`+ clicked`)}>
                <Link to={buildLink(0,0,[])}>
                <LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>+</Text>
                    </LinearGradient>
                </Link>
            </TouchableOpacity>
                                        

                            </React.Fragment>
                        )}
                        
                        {activeTab === 2  && (
                              <React.Fragment >
                                {errorRecompense && <Text style={{ color: 'red' }}>{errorRecompense}</Text>}
                             <Text  style={[styles.titre]}>partie premiume</Text>
                                    {abonnement === 0 ? ( 
                                        <Payement />
                                    ) : (
                                        <ScrollView horizontal={false} style={{ maxHeight: 500}}>
                                        {tasks.map((task, index) => (
                                         <TouchableOpacity  onPress={() => navigate(buildLink(1,1,task))}>
                                        
                                              <View key={index} style={[styles.card, { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#EB4651' }]}>
                                                <Text style={[styles.cardText, styles.bold, styles.center,index % 2 === 1 ? { color: 'white' } : null]}> {task.RecompenseAdmin}</Text>
                                                <Text style={[styles.cardText, styles.bold, styles.center,index % 2 === 1 ? { color: 'white' } : null]}> {task.Description}</Text>
                                                <View style={styles.iconTextContainer}>
                                                {index % 2 === 1 ?(
                                                    <Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                    <Path d="M4.42773 4.625H7.06445C9.37891 0.787109 12.9824 0.640625 15.1504 1.05078C15.502 1.10938 15.7656 1.37305 15.8242 1.72461C16.2344 3.89258 16.0879 7.49609 12.25 9.81055V12.4473C12.25 13.1797 11.8398 13.8828 11.1953 14.2637L8.61719 15.7871C8.38281 15.9336 8.11914 15.9336 7.91406 15.7871C7.67969 15.6699 7.5625 15.4355 7.5625 15.1719V11.832C7.5625 11.1582 7.29883 10.5137 6.83008 10.0449C6.36133 9.57617 5.7168 9.3125 5.04297 9.3125H1.70312C1.43945 9.3125 1.20508 9.19531 1.08789 8.96094C0.941406 8.75586 0.941406 8.49219 1.08789 8.25781L2.61133 5.67969C2.99219 5.03516 3.69531 4.625 4.42773 4.625ZM13.4219 4.625C13.4219 4.21484 13.1875 3.83398 12.8359 3.62891C12.4551 3.42383 12.0156 3.42383 11.6641 3.62891C11.2832 3.83398 11.0781 4.21484 11.0781 4.625C11.0781 5.06445 11.2832 5.44531 11.6641 5.65039C12.0156 5.85547 12.4551 5.85547 12.8359 5.65039C13.1875 5.44531 13.4219 5.06445 13.4219 4.625ZM5.86328 14.6445C4.86719 15.6699 2.93359 15.8457 1.82031 15.875C1.35156 15.9043 0.970703 15.5234 1 15.0547C1.0293 13.9414 1.20508 12.0078 2.23047 11.0117C3.22656 10.0156 4.86719 10.0156 5.86328 11.0117C6.85938 12.0078 6.85938 13.6484 5.86328 14.6445ZM4.48633 13.5898C4.83789 13.2676 4.83789 12.7109 4.48633 12.3887C4.16406 12.0371 3.60742 12.0371 3.28516 12.3887C2.99219 12.6816 2.9043 13.209 2.875 13.5898C2.875 13.8242 3.05078 14 3.28516 14C3.66602 13.9707 4.19336 13.8828 4.48633 13.5898Z" fill="#F4B322"/>
                                                    </Svg>
                                                     ) : (
                                                    <Svg width="17" height="16" viewBox="0 0 17 16" fill="none" >
                                                    <Path d="M4.42773 4.625H7.06445C9.37891 0.787109 12.9824 0.640625 15.1504 1.05078C15.502 1.10938 15.7656 1.37305 15.8242 1.72461C16.2344 3.89258 16.0879 7.49609 12.25 9.81055V12.4473C12.25 13.1797 11.8398 13.8828 11.1953 14.2637L8.61719 15.7871C8.38281 15.9336 8.11914 15.9336 7.91406 15.7871C7.67969 15.6699 7.5625 15.4355 7.5625 15.1719V11.832C7.5625 11.1582 7.29883 10.5137 6.83008 10.0449C6.36133 9.57617 5.7168 9.3125 5.04297 9.3125H1.70312C1.43945 9.3125 1.20508 9.19531 1.08789 8.96094C0.941406 8.75586 0.941406 8.49219 1.08789 8.25781L2.61133 5.67969C2.99219 5.03516 3.69531 4.625 4.42773 4.625ZM13.4219 4.625C13.4219 4.21484 13.1875 3.83398 12.8359 3.62891C12.4551 3.42383 12.0156 3.42383 11.6641 3.62891C11.2832 3.83398 11.0781 4.21484 11.0781 4.625C11.0781 5.06445 11.2832 5.44531 11.6641 5.65039C12.0156 5.85547 12.4551 5.85547 12.8359 5.65039C13.1875 5.44531 13.4219 5.06445 13.4219 4.625ZM5.86328 14.6445C4.86719 15.6699 2.93359 15.8457 1.82031 15.875C1.35156 15.9043 0.970703 15.5234 1 15.0547C1.0293 13.9414 1.20508 12.0078 2.23047 11.0117C3.22656 10.0156 4.86719 10.0156 5.86328 11.0117C6.85938 12.0078 6.85938 13.6484 5.86328 14.6445ZM4.48633 13.5898C4.83789 13.2676 4.83789 12.7109 4.48633 12.3887C4.16406 12.0371 3.60742 12.0371 3.28516 12.3887C2.99219 12.6816 2.9043 13.209 2.875 13.5898C2.875 13.8242 3.05078 14 3.28516 14C3.66602 13.9707 4.19336 13.8828 4.48633 13.5898Z" fill="#EB4651"/>
                                                    </Svg>
                                                 )}
                                                <Text style={[styles.cardText, styles.bold, styles.center,index % 2 === 1 ? { color: 'white' } : null]}> {task.Point}</Text>
                                                </View>
                                                <Text style={[styles.cardText, styles.bold, styles.center,index % 2 === 1 ? { color: 'white' } : null]}>Récompense pour: {task.Name}</Text>
                                                <Text style={[ styles.center,{opacity:0}]}>IdPlayer: {task.IdPlayer}</Text>
                                                <Text style={[ styles.center,{opacity:0}]}>IdRecompense: {task.IdRecompense}</Text>
                                                <Text style={[ styles.center,{opacity:0}]}>IdRecompense: {task.IdRecompenseAdmin}</Text>
                                              </View>
                                           
                                         </TouchableOpacity>
                                        ))}
                                        </ScrollView>
                                    )}
                                     <TouchableOpacity style={[styles.button, abonnement === 0 && { opacity: 0 }]} disabled={abonnement === 0} onPress={() => console.log(`+ clicked`)}>
                <Link to={buildLink(0,1,[])}>
                <LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
                    <Text style={styles.buttonText}>+</Text>
                 </LinearGradient>
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
        backgroundColor: '#F4B322',
    },
    tabButton: {
        padding: 10,
    },
    activeTab: {
        backgroundColor: '#F4B322',
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 160,
      },
      linearGradient: {
        width: 400,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
      },
      titre:{
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color:'#EB4651',
      },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 6,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: '#F4B322',
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
        color: '#FFFF',
      },
      
})

export default OngletRecompense;
