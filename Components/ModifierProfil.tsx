import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useParams } from 'react-router-dom';
import NavBar from "./Composents_Reutilisable/Nav";
import ButtonNav from "./Composents_Reutilisable/Button";

interface ModifierProfilProps {};

const ModifierProfil: React.FC<ModifierProfilProps> = () => {
    const params = useParams();
    const [ProfilsParent, setProfilsParent] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://192.168.1.116:8082/Profils/${params.User}`);
                if (!response.ok) {
                    throw new Error('Échec de la requête');
                }
                const data = await response.json();
                console.log("Data fetched:", data); // Ajoutez ce log pour afficher les données récupérées
                setProfilsParent(data);
                // Set the initial values for mail and password if ProfilsParent has data
              
            } catch (error) {
                console.error(error);
                console.log("Impossible d'afficher les informations !!");
            }
        };
        fetchData();
    }, [params]);
    
    const handleSave = async () => {
        try {
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
            // Si la mise à jour réussit, vous pouvez effectuer des actions supplémentaires ici
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.inputsContainer}>
                {ProfilsParent.map((Profils, index) => (
                    <View key={index} style={styles.inputContainer}>
                        <Text style={styles.title}>Modifier Profil {Profils.name} {Profils.Lastname}</Text>
                        <TextInput
    style={styles.input}
    placeholder={Profils.name || 'Nom'}
    value={name}
    onChangeText={setName}
/>
<TextInput
    style={styles.input}
    placeholder={Profils.Lastname || 'Nom de famille'}
    value={lastname}
    onChangeText={setLastname}
/>
<TextInput
    style={styles.input}
    placeholder={Profils.Mail || 'E-mail'}
    value={mail}
    onChangeText={setMail}
/>
<TextInput
    style={styles.input}
    placeholder={Profils.Password || "**********"}
    value={password}
    onChangeText={setPassword}
    secureTextEntry={true}
/>
                    </View>
                ))}
            </View>
            <TouchableOpacity onPress={handleSave}>
                <Text style={styles.button}>Enregistrer</Text>
            </TouchableOpacity>
            <ButtonNav name="Déconnexion" chemin={`/`} /> 
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    inputsContainer: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        color: 'white',
        textAlign: 'center',
        margin: 10,
        borderRadius: 5,
        width: '100%',
    },
});

export default ModifierProfil;
