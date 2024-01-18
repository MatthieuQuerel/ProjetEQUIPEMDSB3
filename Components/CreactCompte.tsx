import {Component}  from 'react';

import { Link } from 'react-router-native';
import { TextInput, Button, Text, View ,TouchableOpacity,StyleSheet,Alert} from 'react-native';

interface CreactCompteState {
  username: string;
  lastName: string;
  email: string;
  password: string; 
}
interface IProps {
}

class CreactCompte extends Component<IProps, CreactCompteState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

handleChange = (fieldName: keyof CreactCompteState, value: string) => {
  this.setState((prevState) => ({ ...prevState, [fieldName]: value }));
};

ChampsRemplie = async () => {
  const { username, lastName, email, password } = this.state;

  if (username === "" || lastName === "" || email === "" || password === "") {
    Alert.alert("Tous les champs ne sont pas remplis");
  } else {
    try {
      const options = {
        method: 'POST', // Méthode HTTP
        headers: {
          'Content-Type': 'application/json; charset=utf-8', // Spécifie que nous envoyons des données JSON
          // Vous pouvez ajouter d'autres en-têtes si nécessaire
        },
        
        body: JSON.stringify({
          name: this.state.username,
          lastName: this.state.lastName,
          Mail: this.state.email,
          Password: this.state.password,
        }), // Convertit les données en format JSON

      };

      const response = await fetch('http://192.168.1.116:8082/CreactCompte', options);//10.0.2.2
     
      // const responseData = await response.text();
      // console.log('Server Response:', responseData);

      if (response.ok) {
        console.log('Envoi avec succès');
      } else {
        console.log('Erreur envoi form data');
      }
    } catch (error) {
      console.error('Erreur requete :', error);
    }
  }
};
     render(){
    return(
        <View style={styles.container}>
               <TouchableOpacity style={styles.createAccountButton} onPress={() => console.log("Créer compte")}>
          <Link to="/">
            <Text style={styles.createAccountText}>Retour</Text>
          </Link>
        </TouchableOpacity>
        <Text style={styles.title}>Crée Compte</Text>
       
        <TextInput
          style={styles.input}
          value={this.state.username}
          onChangeText={(text) => this.handleChange('username', text)}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          value={this.state.lastName}
          onChangeText={(text) => this.handleChange('lastName', text)}
          placeholder="Last Name"
        />
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => this.handleChange('email', text)}
          placeholder="Mail"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => this.handleChange('password', text)}
          placeholder="Password"
          secureTextEntry
        />
  
        <Button title="Login" onPress={this.ChampsRemplie} />
        
      </View>
    );
  }
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 14,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 13,
    },
    createAccountButton: {
      marginTop: 16,
      backgroundColor: 'green',
      padding: 10,
      marginLeft:300,
      borderRadius: 5,
    },
    createAccountText: {
      color: 'white',
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      padding: 8,
      width: '100%',
    },
  });
export default CreactCompte

// CreactCompteState et IProps: Ces sont des interfaces TypeScript qui définissent les types pour l'état (CreactCompteState) et les propriétés (IProps) du composant.

// CreactCompte Class Component: C'est une classe React qui étend la classe Component. Elle gère l'état du composant (this.state) et contient des méthodes pour mettre à jour cet état.

// constructor: Le constructeur de la classe, où l'état initial du composant est défini. Ici, this.state est initialisé avec des champs vides pour username, lastName, email, et password.

// handleChange Method: Cette méthode est appelée lorsqu'un champ de saisie (TextInput) change. Elle met à jour l'état du composant en utilisant this.setState.

// render Method: C'est la méthode principale qui retourne la structure du composant. Elle utilise des composants React Native tels que View, Text, TextInput, Button, et TouchableOpacity pour construire l'interface utilisateur. Les styles définis dans styles sont appliqués aux différents éléments.

// StyleSheet.create: Il crée un objet de styles à partir des styles définis. Cela optimise les performances en évitant la ré-création des objets de style à chaque rendu.

// En résumé, le composant CreactCompte est une page de création de compte avec des champs de saisie pour le nom d'utilisateur, le nom, l'e-mail, le mot de passe, et un bouton de création de compte. Les états de ces champs sont gérés par la classe, et les styles sont définis à l'aide de la méthode StyleSheet.create.