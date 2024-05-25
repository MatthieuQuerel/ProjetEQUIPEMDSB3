import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useParams } from 'react-router-dom';
import NavBar from "./Composents_Reutilisable/Nav";
import ButtonNav from "./Composents_Reutilisable/Button";
import { useNavigate } from 'react-router-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

interface ModifierProfilProps {};

const ModifierProfil: React.FC<ModifierProfilProps> = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [ProfilsParent, setProfilsParent] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>(''); // Explicitement spécifier le type d'erreur

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(params.User+"test 20000555")
                const response = await fetch(`http://192.168.1.116:8082/Profils/${params.User}`);
                if (!response.ok) {
                    throw new Error('Échec de la requête');
                }
                const data = await response.json();
                console.log("Data fetched ddd :", data); // Ajoutez ce log pour afficher les données récupérées
                setProfilsParent(data);
                // Set the initial values for mail and password if ProfilsParent has data
              
            } catch (error: any) { // Spécifier le type d'erreur comme 'any'
                console.error(error);
                console.log("Impossible d'afficher les informations !!");
            }
        };
        fetchData();
    }, [params]);
    
    const handleSave = async () => {
        try {
            if(name !== "" && lastname !== "" && mail !== "" && password !== "") {
                console.log("Saving data: ", { name, lastname, mail, password }); // Ajoutez ce log pour afficher les données à envoyer
                const response = await fetch(`http://192.168.1.116:8082/Profils/${params.User}/Modification`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        lastname,
                        mail,
                        password,
                    }),
                });
                console.log("Response from server:", response); // Ajoutez ce log pour afficher la réponse du serveur
                if (!response.ok) {
                    throw new Error('Échec de la requête');
                }
            } else {
                throw new Error('Toutes les données sont requises');
            }
        } catch (error: any) { // Spécifier le type d'erreur comme 'any'
            console.error(error);
            setErrorMessage(error.message); // Mettre à jour le message d'erreur
            Alert.alert('Erreur', error.message); // Afficher une alerte avec le message d'erreur
        }
    };
    

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate(`/Compte/${params.User}/CompteParent/Profils`)} style={styles.iconButton}>     
                <Svg width="27" height="24" viewBox="0 0 27 24" fill="none" style={styles.icon}>
                    <Path d="M1.21875 12.8047L11.5312 22.6484C12.1172 23.1758 12.9961 23.1758 13.5234 22.5898C14.0508 22.0039 14.0508 21.125 13.4648 20.5977L5.67188 13.1562H25.5938C26.4141 13.1562 27 12.5703 27 11.75C27 10.9883 26.4141 10.3438 25.5938 10.3438H5.67188L13.4648 2.96094C14.0508 2.43359 14.0508 1.49609 13.5234 0.96875C12.9961 0.382812 12.0586 0.382812 11.5312 0.910156L1.21875 10.7539C0.925781 11.0469 0.75 11.3984 0.75 11.75C0.75 12.1602 0.925781 12.5117 1.21875 12.8047Z" fill="#050505"/>
                </Svg>  
            </TouchableOpacity>

            <View style={styles.inputsContainer}>
                {ProfilsParent.map((Profils, index) => (
                    <View key={index} style={styles.inputContainer}>
                        <View style={[styles.cardParent]}>
                            <Svg width="150" height="150" viewBox="0 0 150 150" fill="none">
                                <Rect x="0.5" y="0.5" width="149" height="149" rx="74.5" fill="#F4B322" stroke="#0A0700"/>
                                <Path d="M58.3816 66.9981L58.3816 66.998L58.3789 66.9933C54.7661 60.8377 54.7625 53.0966 58.3803 46.7724C62.0003 40.6063 68.6064 36.6594 75.8334 36.6594C82.8971 36.6594 89.5042 40.6043 93.1255 46.7724C96.743 53.0966 96.7394 60.8377 93.1269 66.9933L93.1269 66.9933L93.1242 66.998C89.5066 73.32 82.904 77.1087 75.8334 77.1087C68.5994 77.1087 61.998 73.3181 58.3816 66.9981ZM68.4213 85.8804H83.0844C98.7581 85.8804 111.427 98.6072 111.427 114.363C111.427 116.658 109.415 118.558 107.093 118.558H44.4125C42.1128 118.558 40.2396 116.679 40.2396 114.363C40.2396 98.6035 52.7512 85.8804 68.4213 85.8804Z" fill="#0A0700" stroke="#0A0700"/>
                            </Svg>

                            <View style={styles.nameContainer}>
                            <Text style={[styles.bold, { marginLeft: 10 }]}>{Profils.Lastname}</Text>
                                <Text style={[styles.bold,styles.Nom]}>{Profils.name}</Text> 
                            </View>
                        </View>
                        
                        <TextInput
                            style={[styles.input]}
                            placeholder={Profils.name || 'Nom'}
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={[styles.input]}
                            placeholder={Profils.Lastname || 'Nom de famille'}
                            value={lastname}
                            onChangeText={setLastname}
                        />
                        <TextInput
                            style={[styles.input]}
                            placeholder={Profils.Mail || 'E-mail'}
                            value={mail}
                            onChangeText={setMail}
                        />
                        <TextInput
                            style={[styles.input]}
                            placeholder={Profils.Password || "**********"}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>
                ))}
            </View>

            <View style={[styles.ButtonChamps]}> 
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
                        <Text style={styles.buttonNavigation}>Enregistrer</Text>
                    </LinearGradient> 
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigate(`/`)}>
                    <LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
                        <Text style={styles.buttonNavigation} >Déconnexion</Text>
                    </LinearGradient> 
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigate(`/Compte/${params.User}`)}>
                    <LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
                        <Text style={styles.buttonNavigation}>Compte</Text>
                    </LinearGradient>  
                </TouchableOpacity>
            </View>

            <View style={styles.navBarContainer}>
                <NavBar />
            </View>

            {errorMessage !== '' && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop : 40,
        justifyContent: 'center',
    },
    linearGradient: {
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    iconButton: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Aligne les éléments au début
    },
    icon: {
        marginRight: 10, // Ajoute de la marge à droite de l'icône
    },
    button: {
        marginTop: 5,
        width: 100,
        height: 50,
        backgroundColor: 'black', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1, 
        borderColor: '#FAB322', 
    },
    navBarContainer: {
        width: '100%', // Utilisation de la largeur totale disponible
        flexDirection: 'row', // Pour aligner les éléments horizontalement
        justifyContent: 'space-between', // Pour répartir l'espace entre les éléments
        paddingTop : 90,
        alignItems: 'center', // Pour aligner les éléments verticalement au centre
    },
    title: {
        fontSize: 14,
        color: '#FFFF',
    },
    inputsContainer: {
        width: '100%',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    Nom: {
        margin: 10,
    },
    cardParent: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginVertical: 20, 
        alignItems: 'center',
        alignSelf: 'center', // Centre les cartes parent horizontalement
        width: '100%',
    },
    ButtonChamps: {
        alignItems: 'center',
    },
    input: {
        height: 40,
        color: '#F4B322',
        borderWidth: 1,
        borderColor: '#F4B322',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        fontWeight: 'bold',
    },
    nameContainer: {
        marginTop: 10,
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonNavigation: {
        fontSize: 14,
        color: '#FFFF',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default ModifierProfil;



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity,Alert  } from 'react-native';
// import { useParams } from 'react-router-dom';
// import NavBar from "./Composents_Reutilisable/Nav";
// import ButtonNav from "./Composents_Reutilisable/Button";
// import { useNavigate } from 'react-router-native';
// import Svg, { Path, Rect } from 'react-native-svg';
// import { LinearGradient } from 'expo-linear-gradient';

// interface ModifierProfilProps {};

// const ModifierProfil: React.FC<ModifierProfilProps> = () => {
//     const navigate = useNavigate();
//     const params = useParams();
//     const [ProfilsParent, setProfilsParent] = useState<any[]>([]);
//     const [name, setName] = useState('');
//     const [lastname, setLastname] = useState('');
//     const [mail, setMail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] =  useState<string>('');
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(`http://192.168.1.116:8082/Profils/${params.User}`);
//                 if (!response.ok) {
//                     throw new Error('Échec de la requête');
//                 }
//                 const data = await response.json();
//                 console.log("Data fetched:", data); // Ajoutez ce log pour afficher les données récupérées
//                 setProfilsParent(data);
//                 // Set the initial values for mail and password if ProfilsParent has data
              
//             } catch (error) {
//                 console.error(error);
//                 console.log("Impossible d'afficher les informations !!");
//             }
//         };
//         fetchData();
//     }, [params]);
    
//     const handleSave = async () => {
//         try {
//             if(name !== "" && lastname !== "" && mail !== "" && password !== "") {
//             console.log("Saving data: ", { name, lastname, mail, password }); // Ajoutez ce log pour afficher les données à envoyer
//             const response = await fetch(`http://192.168.1.116:8082/Profils/${params.User}/Modification`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     name,
//                     lastname,
//                     mail,
//                     password,
//                 }),
//             });
//             console.log("Response from server:", response); // Ajoutez ce log pour afficher la réponse du serveur
//             if (!response.ok) {
//                 throw new Error('Échec de la requête');
//             }

//         }else{
//             throw new Error('Toutes les données sont requises');
//         }
//             // Si la mise à jour réussit, vous pouvez effectuer des actions supplémentaires ici
//         } catch (error) {
//             console.error(error);
//             setErrorMessage(error.message); // Mettre à jour le message d'erreur
//             Alert.alert('Erreur', error.message);
//         }
//     };
    

//     return (
//         <View style={styles.container}>
//            <TouchableOpacity onPress={() => navigate(`/Compte/${params.User}/CompteParent/Profils`)} style={styles.iconButton}>     
//     <Svg width="27" height="24" viewBox="0 0 27 24" fill="none" style={styles.icon}>
//         <Path d="M1.21875 12.8047L11.5312 22.6484C12.1172 23.1758 12.9961 23.1758 13.5234 22.5898C14.0508 22.0039 14.0508 21.125 13.4648 20.5977L5.67188 13.1562H25.5938C26.4141 13.1562 27 12.5703 27 11.75C27 10.9883 26.4141 10.3438 25.5938 10.3438H5.67188L13.4648 2.96094C14.0508 2.43359 14.0508 1.49609 13.5234 0.96875C12.9961 0.382812 12.0586 0.382812 11.5312 0.910156L1.21875 10.7539C0.925781 11.0469 0.75 11.3984 0.75 11.75C0.75 12.1602 0.925781 12.5117 1.21875 12.8047Z" fill="#050505"/>
//     </Svg>  
// </TouchableOpacity>

//             <View style={styles.inputsContainer}>
//                 {ProfilsParent.map((Profils, index) => (
//                     <View key={index} style={styles.inputContainer}>
//                                                     <View style={[styles.cardParent]}>
//                          <Svg width="150" height="150" viewBox="0 0 150 150" fill="none">
//                                     <Rect x="0.5" y="0.5" width="149" height="149" rx="74.5" fill="#F4B322" stroke="#0A0700"/>
//                                     <Path d="M58.3816 66.9981L58.3816 66.998L58.3789 66.9933C54.7661 60.8377 54.7625 53.0966 58.3803 46.7724C62.0003 40.6063 68.6064 36.6594 75.8334 36.6594C82.8971 36.6594 89.5042 40.6043 93.1255 46.7724C96.743 53.0966 96.7394 60.8377 93.1269 66.9933L93.1269 66.9933L93.1242 66.998C89.5066 73.32 82.904 77.1087 75.8334 77.1087C68.5994 77.1087 61.998 73.3181 58.3816 66.9981ZM68.4213 85.8804H83.0844C98.7581 85.8804 111.427 98.6072 111.427 114.363C111.427 116.658 109.415 118.558 107.093 118.558H44.4125C42.1128 118.558 40.2396 116.679 40.2396 114.363C40.2396 98.6035 52.7512 85.8804 68.4213 85.8804Z" fill="#0A0700" stroke="#0A0700"/>
//                                 </Svg>

//                                 <View style={styles.nameContainer}>
//                                 <Text style={styles.bold}>{Profils.Lastname}</Text>
//                                 <Text style={[styles.bold,styles.Nom]}>{Profils.name}</Text> 
//                                 </View>
//                                 </View>
                        
// <TextInput
//      style={[styles.input]}
//     placeholder={Profils.name || 'Nom'}
//     value={name}
//     onChangeText={setName}
// />
// <TextInput
//      style={[styles.input]}
//     placeholder={Profils.Lastname || 'Nom de famille'}
//     value={lastname}
//     onChangeText={setLastname}
// />
// <TextInput
//      style={[styles.input]}
//     placeholder={Profils.Mail || 'E-mail'}
//     value={mail}
//     onChangeText={setMail}
// />
// <TextInput
//      style={[styles.input]}
//     placeholder={Profils.Password || "**********"}
//     value={password}
//     onChangeText={setPassword}
//     secureTextEntry={true}
// />
// </View>
//                 ))}
//             </View>
//             <View style={[styles.ButtonChamps]}> 
//             <TouchableOpacity style={styles.button} onPress={handleSave}>
//             <LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
//                 <Text style={styles.buttonNavigation}>Enregistrer</Text>
//                 </LinearGradient> 
//             </TouchableOpacity>
            
//             <TouchableOpacity style={styles.button} onPress={() => navigate(`/`)}>    
//             <LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
//             <Text style={styles.buttonNavigation} >Déconnexion</Text>
//             </LinearGradient> 
//             </TouchableOpacity>
            
//             <TouchableOpacity style={styles.button} onPress={() => navigate(`/Compte/${params.User}`)}>
//             <LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
//                 <Text style={styles.buttonNavigation}>Compte</Text>
//                 </LinearGradient>  
//             </TouchableOpacity>
            
//             </View>
//             <View style={styles.navBarContainer}>
//             <NavBar />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop : 40,
        
//         justifyContent: 'center',
//     },
//     linearGradient: {
//         width: 100,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 8,
//       },
//     iconButton: {
//         flexDirection: 'row',
//         alignItems: 'flex-start', // Aligne les éléments au début
//     },
    
//     icon: {
//         marginRight: 10, // Ajoute de la marge à droite de l'icône
//     },
//     button: {
//         marginTop: 5,
//         width: 100,
//         height: 50,
//         backgroundColor: 'black', 
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 8,
//         borderWidth: 1, 
//         borderColor: '#FAB322', 
//       },

//     navBarContainer: {
//         width: '100%', // Utilisation de la largeur totale disponible
//         flexDirection: 'row', // Pour aligner les éléments horizontalement
//         justifyContent: 'space-between', // Pour répartir l'espace entre les éléments
//        paddingTop : 90,
        
//         alignItems: 'center', // Pour aligner les éléments verticalement au centre
//     },
//     title: {
//         fontSize: 14,
        
      
//     color: '#FFFF',
//     },
//     inputsContainer: {
//         width: '100%',
//         marginBottom: 20,
//     },
//     inputContainer: {
    
//         marginBottom: 20,
//     },
//     Nom: {
//         margin: 10,
//     },
//     cardParent: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         paddingVertical: 20,
//         paddingHorizontal: 30,
//         marginVertical: 20, 
//         alignItems: 'center',
//         alignSelf: 'center', // Centre les cartes parent horizontalement
//         width: '100%',
//     },
//     ButtonChamps: {
//         alignItems: 'center',
//     },
//     input: {
//         height: 40,
//         color: '#F4B322',
//         borderWidth: 1,
//         borderColor: '#F4B322',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//        // backgroundColor: '#0A0700',
//         width: '100%',
//         fontWeight: 'bold',
//     },
//     nameContainer: {
//         marginTop: 10,
//     },
//     bold: {
//         fontWeight: 'bold',
//         fontSize: 20,
//     },
//     // button: {
//     //     backgroundColor: '#4CAF50',
//     //     padding: 10,
//     //     color: 'white',
//     //     textAlign: 'center',
//     //     margin: 10,
//     //     borderRadius: 5,
//     //     width: '100%',
//     // },
//     // buttonNavigation: {
//     //     backgroundColor: '#0A0700',
//     //     padding: 10,
//     //     color: '#F4B322',
//     //     textAlign: 'center',
//     //     margin: 10,
//     //     borderRadius: 5,
//     //     width: 150,
//     // },
//     buttonNavigation: {
//         fontSize: 14,
//         color: '#FFFF',
//     },
// });

// export default ModifierProfil;
