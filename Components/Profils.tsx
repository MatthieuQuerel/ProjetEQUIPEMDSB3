import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,ScrollView} from 'react-native';
import { Link } from 'react-router-native';
import BarHead from "./Composents_Reutilisable/BarHead";
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import NavBar from "./Composents_Reutilisable/Nav";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-native';

interface ProfilProps {};

const Profil: React.FC<ProfilProps> = () => {
    const [ProfilsParent, setProfilsParent] = useState<any[]>([]);
    const [ProfilsEnfant, setProfilsEnfant] = useState<any[]>([]);
    const params: any = useParams();
    const [Erreur, setErreur] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (params) {
            fetch(`http://10.54.90.21:8082/Profils/${params.User}`)
                .then(reponse => {
                    if (!reponse.ok) {
                        throw new Error('Échec de la requête');
                    }
                    return reponse.json();
                })
                .then(data => {
                    setProfilsParent(data);
                })
                .catch(err => {
                    console.log(err);
                    console.log("Impossible d'afficher les informations !!");
                });

            fetch(`http://10.54.90.21:8082/ProfilsEnfant/${params.User}`)
                .then(reponse => {
                    if (!reponse.ok) {
                        throw new Error('Échec de la requête');
                    }
                    return reponse.json();
                })
                .then(data => {
                    setProfilsEnfant(data);
                })
                .catch(err => {
                    console.log(err);
                    setErreur("Pas d'enfant");
                    console.log("Impossible d'afficher les informations !!");
                });
        }
    }, [params]);

    return (

        <View style={styles.container}>
             <ScrollView horizontal={false}>
            <BarHead />
            <View style={styles.line}></View>
            <View style={styles.container}>
                {/* Affichage des tâches parent */}
                {ProfilsParent.map((Profils, index) => (
                    <TouchableOpacity key={`parent_${index}`} onPress={() =>navigate(`/Compte/${params.User}/CompteParent/Profils/ModifierProfil`)}>
                        {/* <Link to={`/Compte/${params.User}/CompteParent/Profils/ModifierProfil`}> */}
                            <View style={[styles.cardParent, styles.parentCard]}>
                                <Svg width="150" height="150" viewBox="0 0 150 150" fill="none">
                                    <Rect x="0.5" y="0.5" width="149" height="149" rx="74.5" fill="#F4B322" stroke="#0A0700"/>
                                    <Path d="M58.3816 66.9981L58.3816 66.998L58.3789 66.9933C54.7661 60.8377 54.7625 53.0966 58.3803 46.7724C62.0003 40.6063 68.6064 36.6594 75.8334 36.6594C82.8971 36.6594 89.5042 40.6043 93.1255 46.7724C96.743 53.0966 96.7394 60.8377 93.1269 66.9933L93.1269 66.9933L93.1242 66.998C89.5066 73.32 82.904 77.1087 75.8334 77.1087C68.5994 77.1087 61.998 73.3181 58.3816 66.9981ZM68.4213 85.8804H83.0844C98.7581 85.8804 111.427 98.6072 111.427 114.363C111.427 116.658 109.415 118.558 107.093 118.558H44.4125C42.1128 118.558 40.2396 116.679 40.2396 114.363C40.2396 98.6035 52.7512 85.8804 68.4213 85.8804Z" fill="#0A0700" stroke="#0A0700"/>
                                </Svg>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.bold}>{Profils.name}</Text> 
                                    <Text style={styles.bold}>{Profils.Lastname}</Text>
                                </View>
                            </View>
                        {/* </Link> */}
                    </TouchableOpacity>
                ))}
                 
                {ProfilsEnfant.length === 0 ? (
                    <Text>{Erreur}</Text>
                ) : (
                   
                    ProfilsEnfant.map((Profils, index) => (
                        <TouchableOpacity key={`enfant_touchable_${index}`} onPress={() =>navigate(`/Compte/${params.User}/CompteParent/Profils/AjouterEnfant/${Profils.IdPlayer}`)}> 
                            <View key={`enfant_${index}`} style={[styles.card, styles.childCard,index % 2 === 0 ? { backgroundColor: '#F4B322' } : { backgroundColor: '#EB4651' }]}>
                                <View style={{marginHorizontal: 40,  alignItems: 'center', justifyContent: 'center' }}>
                                    {index % 2 === 0 ? (
                                        <Svg width="50" height="50" viewBox="0 0 40 40" fill="none">
                                            <Rect width="40" height="40" rx="20" fill="#FFFFFF"/>
                                            <Path d="M20 19.75C18.0234 19.75 16.2188 18.7188 15.2305 17C14.2422 15.3242 14.2422 13.2188 15.2305 11.5C16.2188 9.82422 18.0234 8.75 20 8.75C21.9336 8.75 23.7383 9.82422 24.7266 11.5C25.7148 13.2188 25.7148 15.3242 24.7266 17C23.7383 18.7188 21.9336 19.75 20 19.75ZM18.0234 21.8125H21.9336C26.1875 21.8125 29.625 25.25 29.625 29.5039C29.625 30.1914 29.0234 30.75 28.3359 30.75H11.6211C10.9336 30.75 10.375 30.1914 10.375 29.5039C10.375 25.25 13.7695 21.8125 18.0234 21.8125Z" fill="#EB4651"/>
                                        </Svg>
                                    ) : (
                                        <Svg width="50" height="50" viewBox="0 0 40 40" fill="none">
                                        <Rect x="0.5" y="0.5" width="40" height="40" rx="20" fill="#F4B322" stroke="#0A0700"/>
                                        <Path d="M20 19.75C18.0234 19.75 16.2188 18.7188 15.2305 17C14.2422 15.3242 14.2422 13.2188 15.2305 11.5C16.2188 9.82422 18.0234 8.75 20 8.75C21.9336 8.75 23.7383 9.82422 24.7266 11.5C25.7148 13.2188 25.7148 15.3242 24.7266 17C23.7383 18.7188 21.9336 19.75 20 19.75ZM18.0234 21.8125H21.9336C26.1875 21.8125 29.625 25.25 29.625 29.5039C29.625 30.1914 29.0234 30.75 28.3359 30.75H11.6211C10.9336 30.75 10.375 30.1914 10.375 29.5039C10.375 25.25 13.7695 21.8125 18.0234 21.8125Z" fill="#FFFFFF"/>
                                    </Svg>
                                    )}
                                    <Text style={[styles.bold, { color: index % 1 === 0 ? '#FFFFFF' : '#050505' }]}>{Profils.Name}</Text>
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Svg width="14" height="13" viewBox="0 0 14 13" fill="none">
                                        <Path d="M3.74219 3.5H5.85156C7.70312 0.429688 10.5859 0.3125 12.3203 0.640625C12.6016 0.6875 12.8125 0.898438 12.8594 1.17969C13.1875 2.91406 13.0703 5.79688 10 7.64844V9.75781C10 10.3438 9.67188 10.9062 9.15625 11.2109L7.09375 12.4297C6.90625 12.5469 6.69531 12.5469 6.53125 12.4297C6.34375 12.3359 6.25 12.1484 6.25 11.9375V9.26562C6.25 8.72656 6.03906 8.21094 5.66406 7.83594C5.28906 7.46094 4.77344 7.25 4.23438 7.25H1.5625C1.35156 7.25 1.16406 7.15625 1.07031 6.96875C0.953125 6.80469 0.953125 6.59375 1.07031 6.40625L2.28906 4.34375C2.59375 3.82812 3.15625 3.5 3.74219 3.5ZM10.9375 3.5C10.9375 3.17188 10.75 2.86719 10.4688 2.70312C10.1641 2.53906 9.8125 2.53906 9.53125 2.70312C9.22656 2.86719 9.0625 3.17188 9.0625 3.5C9.0625 3.85156 9.22656 4.15625 9.53125 4.32031C9.8125 4.48438 10.1641 4.48438 10.4688 4.32031C10.75 4.15625 10.9375 3.85156 10.9375 3.5ZM4.89062 11.5156C4.09375 12.3359 2.54688 12.4766 1.65625 12.5C1.28125 12.5234 0.976562 12.2188 1 11.8438C1.02344 10.9531 1.16406 9.40625 1.98438 8.60938C2.78125 7.8125 4.09375 7.8125 4.89062 8.60938C5.6875 9.40625 5.6875 10.7188 4.89062 11.5156ZM3.78906 10.6719C4.07031 10.4141 4.07031 9.96875 3.78906 9.71094C3.53125 9.42969 3.08594 9.42969 2.82812 9.71094C2.59375 9.94531 2.52344 10.3672 2.5 10.6719C2.5 10.8594 2.64062 11 2.82812 11C3.13281 10.9766 3.55469 10.9062 3.78906 10.6719Z" fill="#050505"/>
                                    </Svg>
                                    <Text style={[ { color: index % 1 === 0 ? '#FFFFFF' : '#050505' }]}>  de point: {Profils.point}</Text> 
                                </View>
                                <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                                        <Path d="M10.5156 0.984375C10.8203 1.26562 10.8203 1.75781 10.5156 2.03906L4.51562 8.03906C4.23438 8.34375 3.74219 8.34375 3.46094 8.03906L0.460938 5.03906C0.15625 4.75781 0.15625 4.26562 0.460938 3.98438C0.742188 3.67969 1.23438 3.67969 1.51562 3.98438L4 6.44531L9.46094 0.984375C9.74219 0.679688 10.2344 0.679688 10.5156 0.984375Z" fill="#FAFAFA"/>
                                    </Svg>
                                    <Text style={[ { color: index % 1 === 0 ? '#FFFFFF' : '#050505' }]}>tâche faites : {Profils.Valider1}</Text>
                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center'  }}>
                                    <Svg width="9" height="9" viewBox="0 0 9 9" fill="none" >
                                        <Path d="M8.01562 2.03906L5.55469 4.5L8.01562 6.98438C8.32031 7.26562 8.32031 7.75781 8.01562 8.03906C7.73438 8.34375 7.24219 8.34375 6.96094 8.03906L4.5 5.57812L2.01562 8.03906C1.73438 8.34375 1.24219 8.34375 0.960938 8.03906C0.65625 7.75781 0.65625 7.26562 0.960938 6.98438L3.42188 4.5L0.960938 2.03906C0.65625 1.75781 0.65625 1.26562 0.960938 0.984375C1.24219 0.679688 1.73438 0.679688 2.01562 0.984375L4.5 3.44531L6.96094 0.984375C7.24219 0.679688 7.73438 0.679688 8.01562 0.984375C8.32031 1.26562 8.32031 1.75781 8.01562 2.03906Z" fill="#050505"/>
                                    </Svg>
                                    <Text style={[ { color: index % 1 === 0 ? '#FFFFFF' : '#050505' }]} >tâche en retard : {Profils.Valider0}</Text>
                                </View>       
                                <Text style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center',opacity:0  }}>IdPlayer: {Profils.IdPlayer}</Text>  
                            </View  >
                        </ TouchableOpacity>
                    ))
                   
                    
                )}
             
                <View style={[styles.ajouterEnfant] } >
                    <TouchableOpacity onPress={() =>navigate(`/Compte/${params.User}/CompteParent/Profils/AjouterEnfant/0`)}>
                        <Svg width="160" height="175" viewBox="0 0 148 168" fill="none">
                            <Rect x="0.6" y="0.5" width="140" height="160" rx="19.5" fill="#F2F2F2"/>
                            <Rect x="0.5" y="0.5" width="140" height="160" rx="19.5" stroke="#F4B322" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="20 20"/>
                            <Circle cx="64" cy="79" r="28.5" fill="#F2F2F2" stroke="#F4B322"/>
                            <Path d="M65.375 71.1875V77.375H71.5625C72.293 77.375 72.9375 78.0195 72.9375 78.75C72.9375 79.5234 72.293 80.125 71.5625 80.125H65.375V86.3125C65.375 87.0859 64.7305 87.6875 64 87.6875C63.2266 87.6875 62.625 87.0859 62.625 86.3125V80.125H56.4375C55.6641 80.125 55.0625 79.5234 55.0625 78.75C55.0625 78.0195 55.6641 77.375 56.4375 77.375H62.625V71.1875C62.625 70.457 63.2266 69.8125 64 69.8125C64.7305 69.8125 65.375 70.457 65.375 71.1875Z" fill="#F4B322"/>
                        </Svg>
                    </TouchableOpacity>
                </View  >
            </View>
            <View style={styles.navBarContainer}>
                <NavBar />
            </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 30,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    cardParent: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginVertical: 20,
        width: '45%',
        alignItems: 'center',
        alignSelf: 'center', // Centre les cartes parent horizontalement
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 29,
        marginHorizontal: 10,
        padding: 15,
        marginVertical: 5,
        borderWidth: 4,
        width: '45%',
        alignSelf: 'center', // Centre les cartes enfants horizontalement
    },
    parentCard: {
        width: '100%',
    },
    childCard: {
        width: '45%',
        alignItems: 'flex-start',
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    navBarContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 80,
    },
    line: {
        borderBottomColor: 'EB4651',
        borderBottomWidth: 1,
        width: '50%',
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: -1,
    },
    nameContainer: {
        marginTop: 10,
    },
    ajouterEnfant: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
});




export default Profil;

