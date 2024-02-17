import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import BarHead from "./Composents_Reutilisable/BarHead";
import NavBar from "./Composents_Reutilisable/Nav";
import { useParams } from 'react-router-dom';

interface ProfilProps {};

const Profil: React.FC<ProfilProps> = () => {
    const [ProfilsParent, setProfilsParent] = useState<any[]>([]);
    const [ProfilsEnfant, setProfilsEnfant] = useState<any[]>([]);
    const params = useParams();
  
    useEffect(() => {
        if (params) {
            fetch(`http://192.168.1.116:8082/Profils/${params.User}`)
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

            fetch(`http://192.168.1.116:8082/ProfilsEnfant/${params.User}`)
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
                    console.log("Impossible d'afficher les informations !!");
                });
        }
    }, [params]);

    return (
        <View>
            <BarHead />
            <Text style={styles.title}>Profil</Text>
            
            <View style={styles.container}>
                {/* Affichage des tâches parent */}
                {ProfilsParent.map((Profils, index) => (
                    <TouchableOpacity key={index} onPress={() => console.log("Créer compte")}>
                        <Link to={`/Compte/${params.User}/CompteParent/Profils/ModifierProfil`}>
                            <View style={[styles.card, styles.parentCard]}>
                                <Text style={styles.bold}>{Profils.name} {Profils.Lastname}</Text>
                                {/* Affichez d'autres données de la tâche parent si nécessaire */}
                            </View>
                        </Link>
                    </TouchableOpacity>
                ))}
                
                {/* Affichage des tâches enfant */}
                {ProfilsEnfant.map((Profils, index) => (
                    <View key={index} style={[styles.card, styles.childCard]}>
                        <Text style={styles.bold}>{Profils.Name}</Text>
                        <Text>Nombre de point: {Profils.point}</Text> 
                        <Text>Nombre de tâche faites : {Profils.Mail}</Text>
                        <Text>Nombre de tâche non faites : {Profils.Valider0}</Text>
                        {/* Affichez d'autres données de la tâche enfant si nécessaire */}
                    </View  >
                ))}
            </View>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // Centrer les éléments horizontalement
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30, // Augmentez la taille du padding
        marginVertical: 15, // Augmentez la marge verticale
        borderWidth: 4, // Augmentez l'épaisseur de la bordure
        borderColor: '#4CAF50', // Couleur de la bordure
        width: '60%', // Ajustez la largeur selon votre mise en page
    },
    parentCard: {
        width: '100%', // Augmentez la largeur de la carte parent
    },
    childCard: {
        width: '65%', // Redéfinir la largeur de la carte enfant
        alignItems: 'flex-start', // Aligner les éléments à gauche
    },
    bold: {
        fontWeight: 'bold', // Mettre le texte en gras
        fontSize: 20, // Augmentez la taille du texte
    },
    title: {
        fontSize: 24, // Augmentez la taille du titre
        textAlign: 'center', // Centrer le titre
        marginBottom: 10, // Ajouter une marge en bas du titre
    },
});

export default Profil;
