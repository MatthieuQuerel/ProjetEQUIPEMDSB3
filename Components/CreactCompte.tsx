import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-native';
import { TextInput, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface CreactCompteState {
  username: string;
  lastName: string;
  email: string;
  password: string;
}

const CreactCompte: React.FC = () => {
  const [state, setState] = useState<CreactCompteState>({
    username: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (fieldName: keyof CreactCompteState, value: string) => {
    setState((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const ChampsRemplie = async () => {
    const { username, lastName, email, password } = state;

    if (username === '' || lastName === '' || email === '' || password === '') {
      Alert.alert("Tous les champs ne sont pas remplis");
    } else {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            name: state.username,
            lastName: state.lastName,
            Mail: state.email,
            Password: state.password,
          }),
        };

        const response = await fetch('http://192.168.1.116:8082/CreactCompte', options);

        if (response.ok) {
          console.log('Envoi avec succès');
          navigate(`/Compte/${email}`);
        } else {
          console.log('Erreur envoi form data');
        }
      } catch (error) {
        console.error('Erreur requete :', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createAccountButton} onPress={() => console.log("Créer compte")}>
        <Link to="/">
          <Text style={styles.createAccountText}>Retour</Text>
        </Link>
      </TouchableOpacity>
      <Text style={styles.title}>Créez votre compte</Text>

      <TextInput
        style={styles.input}
        value={state.username}
        onChangeText={(text) => handleChange('username', text)}
        placeholder="Username"
        placeholderTextColor="#F4B322"
      />
      <TextInput
        style={styles.input}
        value={state.lastName}
        onChangeText={(text) => handleChange('lastName', text)}
        placeholder="Last Name"
        placeholderTextColor="#F4B322"
      />
      <TextInput
        style={styles.input}
        value={state.email}
        onChangeText={(text) => handleChange('email', text)}
        placeholder="Mail"
        placeholderTextColor="#F4B322"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={state.password}
        onChangeText={(text) => handleChange('password', text)}
        placeholder="Password"
        placeholderTextColor="#F4B322"
        secureTextEntry
      />
      <TouchableOpacity style={styles.Button} onPress={ChampsRemplie}>
        <Text style={styles.ButtonText}>Inscription</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFF',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
  },
  Button: {  
    marginTop: 16,
    backgroundColor: '#EB4651', 
    borderRadius: 8, 
    paddingVertical: 8, 
    paddingHorizontal: 10, 
    alignItems: 'center', 
    borderColor: 'white',
    borderWidth: 1, 
  },
  
  ButtonText: {
    color: '#F4B322', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 20,
    color: '#EB4651',
    width: 168,
    height: 40,
    top: 3,
    left: 1,
    fontFamily: 'sans-serif',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'left', 
  },
  input: {
    height: 40,
    borderColor: '#F4B322',
    color: '#EB4651',
    backgroundColor: '#FFFF',
    borderWidth: 1,
    borderRadius: 8, 
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  signupButton: {
    
    color: 'orange',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
 
  createAccountButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    marginTop: 16,
    backgroundColor: '#F4B322', 
    margin: 23,
    borderRadius: 8, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center', 
    
    borderColor: 'white',
  },
  createAccountText: { 
    color: '#EB4651', 
  },
});

export default CreactCompte;



// CreactCompteState et IProps: Ces sont des interfaces TypeScript qui définissent les types pour l'état (CreactCompteState) et les propriétés (IProps) du composant.

// CreactCompte Class Component: C'est une classe React qui étend la classe Component. Elle gère l'état du composant (this.state) et contient des méthodes pour mettre à jour cet état.

// constructor: Le constructeur de la classe, où l'état initial du composant est défini. Ici, this.state est initialisé avec des champs vides pour username, lastName, email, et password.

// handleChange Method: Cette méthode est appelée lorsqu'un champ de saisie (TextInput) change. Elle met à jour l'état du composant en utilisant this.setState.

// render Method: C'est la méthode principale qui retourne la structure du composant. Elle utilise des composants React Native tels que View, Text, TextInput, Button, et TouchableOpacity pour construire l'interface utilisateur. Les styles définis dans styles sont appliqués aux différents éléments.

// StyleSheet.create: Il crée un objet de styles à partir des styles définis. Cela optimise les performances en évitant la ré-création des objets de style à chaque rendu.

// En résumé, le composant CreactCompte est une page de création de compte avec des champs de saisie pour le nom d'utilisateur, le nom, l'e-mail, le mot de passe, et un bouton de création de compte. Les états de ces champs sont gérés par la classe, et les styles sont définis à l'aide de la méthode StyleSheet.create.