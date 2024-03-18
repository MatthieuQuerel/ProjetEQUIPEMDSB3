// import Payement from "./Payements"
// import React, { useState,useEffect } from 'react';
// import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
// import ButtonNav from "./Button";
// import payement from "./Payements"
// import { useParams } from 'react-router-native';
// const OngletRecompense = () => {
//     const [activeTab, setActiveTab] = useState<number>(1);
//     const [tasks, setTasks] = useState<any[]>([]); // État pour stocker les tâches
//     const changeTab = (tabNumber: number) => {
//         setActiveTab(tabNumber);
//       };
//       const params = useParams();
  
//       useEffect(() => {
//         const fetchData = async () => {
//             if (activeTab === 2 && params) {
//                 try {
//                     const response = await fetch(`http://192.168.1.116:8082/AbonnerPrenium/${params.User}`, {
//                         method: "GET",
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                     });
    
//                     if (!response.ok) {
//                         throw new Error('Échec de la requête');
//                     }
    
//                     console.log(response.ok); // Laissez cette ligne pour voir si la requête a réussi
    
//                     const data = await response.json();
    
//                     // Mettez à jour l'état avec les données reçues ici
//                     console.log("Données reçues :", data);
//                     setTasks(data); // Met à jour l'état avec les données reçues
//                 } catch (err) {
//                     console.error(err);
//                     console.log("Impossible d'afficher les informations !!");
//                 }
//             }else{
//                 try {
//                 const response = await fetch(`http://192.168.1.116:8082/AbonnerStandard/${params.User}`, {
//                     method: "GET",
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Échec de la requête');
//                 }

//                 console.log(response.ok); // Laissez cette ligne pour voir si la requête a réussi

//                 const data = await response.json();

//                 // Mettez à jour l'état avec les données reçues ici
//                 console.log("Données reçues :", data);
//                 setTasks(data); // Met à jour l'état avec les données reçues
                
//             } catch (err) {
//                 console.error(err);
//                 console.log("Impossible d'afficher les informations !!");
//             }
//             }
//         };
    
//         fetchData();
//     }, [activeTab, params]);
    
//     return ( 
//         <View >
//         <View style={styles.tabBar}>
//         <TouchableOpacity onPress={() => changeTab(1)} style={[styles.tabButton, activeTab === 1 && styles.activeTab]}>
//           <Text>standard</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => changeTab(2)} style={[styles.tabButton, activeTab === 2 && styles.activeTab]}>
//           <Text>prenium</Text>
//         </TouchableOpacity>
        
//       </View>

//       <View>
//         {activeTab === 1 && (
//           <React.Fragment>
//          <Text>partie standard </Text>
//             {tasks.map((task, index) => (
//               <View key={index} style={[styles.card]}>
//               <Text style={[styles.cardText, styles.bold, styles.center]}>Recompense: {task.Recompense}</Text>
//               <Text style={[styles.cardText, styles.bold, styles.center]}>Description: {task.Description}</Text>
//               <Text style={[styles.cardText, styles.bold, styles.center]}>point: {task.Point}</Text>
//               <Text style={[styles.cardText, styles.bold, styles.center]}>Name: {task.Name}</Text>

//               </View>
//             ))}
//             {/* <ButtonNav name="+" chemin={`/Compte/${params.User}/CompteParent/Tache/AjouterTache`} /> */}
//           </React.Fragment>
//         )}
//         {activeTab === 2 && (
//            <React.Fragment>
//             <Text>partie preniume </Text>
//           {tasks.map((task, index) => (
//             <View key={index} >
            
//              <Text style={[styles.cardText, styles.bold, styles.center]}>Recompense: {task.RecompenseAdmin}</Text>
//               <Text style={[styles.cardText, styles.bold, styles.center]}>Description: {task.Description}</Text>
//               <Text style={[styles.cardText, styles.bold, styles.center]}>point: {task.point}</Text>
//               <Text style={[styles.cardText, styles.bold, styles.center]}>Name: {task.Name}</Text>
//             </View>
//           ))}
//           {/* <ButtonNav name="+" chemin={`/Compte/${params.User}/CompteParent/Tache/AjouterTache`} /> */}
        
//         </React.Fragment>
//         )}
        
//       </View>
//         </View>
//      );
// }

// const styles = StyleSheet.create({
//     tabBar: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         padding: 10,
//         backgroundColor: '#eee',
//       },
//       tabButton: {
//         padding: 10,
//       },
//       activeTab: {
//         backgroundColor: 'lightblue',
//       },
//       card: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 14,
//         marginVertical: 5,
//         borderWidth: 2,
//         borderColor: 'blue',
//         width: 400,
//       },
//       cardText: {
//         marginBottom: 2,
//       },
//       bold: {
//         fontWeight: 'bold',
//       },
//       center: {
//         textAlign: 'center',
//       },
// })
// export default OngletRecompense ;


import Payement from "./Payements"
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonNav from "./Button";
import Nav from "./Nav";
import { useParams } from 'react-router-native';

const OngletRecompense = () => {
    const [activeTab, setActiveTab] = useState<number>(1);
    const [tasks, setTasks] = useState<any[]>([]); // État pour stocker les tâches
    const [abonnement, setAbonnement] = useState<number | null>(null); // État pour stocker l'abonnement

    const changeTab = (tabNumber: number) => {
        setActiveTab(tabNumber);
    };
    const params = useParams();

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
                    }
    
                    console.log(response.ok); // Laissez cette ligne pour voir si la requête a réussi
    
                    const data = await response.json();
    
                    // Mettez à jour l'état avec les données reçues ici
                    console.log("Données reçues :", data);
                    setTasks(data); // Met à jour l'état avec les données reçues
                    setAbonnement(data[0]?.Abonner)
                    
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
                                    <View key={index} style={[styles.card]}>
                                        <Text style={[styles.cardText, styles.bold, styles.center]}>Recompense: {task.Recompense}</Text>
                                        <Text style={[styles.cardText, styles.bold, styles.center]}>Description: {task.Description}</Text>
                                        <Text style={[styles.cardText, styles.bold, styles.center]}>point: {task.Point}</Text>
                                        <Text style={[styles.cardText, styles.bold, styles.center]}>Name: {task.Name}</Text>
                                    </View>
                                ))}
                                <ButtonNav name="+" chemin={`/Compte/${params.User}/CompteParent/Prenium/AjouterRecompense`} />
                            </React.Fragment>
                        )}
                        
                        {activeTab === 2 && (
                              <React.Fragment>
                             <Text>partie preniume</Text>
                                    {abonnement === 0 ? (
                                        <Payement />
                                    ) : (
                                        tasks.map((task, index) => (
                                            <View key={index} style={[styles.card]}>
                                                <Text style={[styles.cardText, styles.bold, styles.center]}>Recompense: {task.RecompenseAdmin}</Text>
                                                <Text style={[styles.cardText, styles.bold, styles.center]}>Description: {task.Description}</Text>
                                                <Text style={[styles.cardText, styles.bold, styles.center]}>Point: {task.Point}</Text>
                                                <Text style={[styles.cardText, styles.bold, styles.center]}>Name: {task.Name}</Text>
                                            </View>
                                        ))
                                    )}
                                    <ButtonNav name="+" chemin={`/Compte/${params.User}/CompteParent/Prenium/AjouterRecompense`} />
                                </React.Fragment>
                            )}
                            </React.Fragment>
            </View>
            <Nav/>
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
})

export default OngletRecompense;
