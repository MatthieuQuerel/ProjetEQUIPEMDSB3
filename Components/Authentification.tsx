import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useNavigate } from 'react-router-native';

interface AuthentificationState {
  email: string;
  password: string;
}

interface IProps {}

const Authentification: React.FC<IProps> = () => {
  const [state, setState] = useState<AuthentificationState>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (fieldName: keyof AuthentificationState, value: string) => {
    setState((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const ChampsRemplie = async () => {
    const { email, password } = state;

    if (email === '' || password === '') {
      alert('Il manque des infos');
    } else {
      try {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            Mail: email,
            Password: password,
          }),
        };

        const response = await fetch('http://192.168.1.116:8082/Authentification', options);

        if (response.ok) {
          const responseData = await response.json();
          if(responseData !=""){
            console.log('Réponse du serveur:', responseData);
            console.log('Réponse du serveur:', responseData.Mail);
            navigate('/Compte');
          }else{
            console.log('Réponse du serveur NULLLLL:', responseData);
          }
         
        } else {
          console.log('Erreur lors de la requête :', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la requête  :', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentification</Text>
      <TextInput
        style={styles.input}
        value={state.email}
        onChangeText={(text) => handleChange('email', text)}
        placeholder="email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={state.password}
        onChangeText={(text) => handleChange('password', text)}
        placeholder="Password"
        secureTextEntry
      />

      <Button title="Login" onPress={ChampsRemplie} />

      <TouchableOpacity style={styles.createAccountButton} onPress={() => console.log('Login pressed')}>
        <Link to="/CreactCompte">
          <Text style={styles.createAccountText}>Créer Compte</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  createAccountButton: {
    marginTop: 16,
  },
  createAccountText: {
    color: 'blue',
    backgroundColor: 'white',
  },
});

export default Authentification;


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
// import { Link, useNavigate } from 'react-router-native';
// React : Importe le module principal de React.
// useState : Un hook de React permettant de gérer l'état dans les composants de fonction.
// View, Text, TextInput, Button, TouchableOpacity, StyleSheet : Composants et styles de React Native pour la construction de l'interface utilisateur.
// Link, useNavigate : Importe les fonctionnalités de navigation de react-router-native.
// Définition des interfaces :

// typescript
// Copy code
// interface AuthentificationState {
//   email: string;
//   password: string;
// }

// interface IProps {}
// AuthentificationState : Interface définissant la structure de l'état du composant.
// IProps : Interface pour les propriétés du composant (dans ce cas, elle est vide).
// Définition du composant principal :

// typescript
// Copy code
// const Authentification: React.FC<IProps> = () => {
// const Authentification: React.FC<IProps> : Définit un composant fonctionnel React avec des propriétés de type IProps.
// Gestion de l'état avec useState :

// typescript
// Copy code
// const [state, setState] = useState<AuthentificationState>({
//   email: '',
//   password: '',
// });
// useState est utilisé pour déclarer et gérer l'état du composant. state est l'objet d'état, et setState est la fonction pour mettre à jour cet état.
// Récupération de la fonction de navigation avec useNavigate :

// typescript
// Copy code
// const navigate = useNavigate();
// useNavigate est un hook qui retourne la fonction de navigation permettant de naviguer entre les différentes pages.
// Gestion du changement des champs avec handleChange :

// typescript
// Copy code
// const handleChange = (fieldName: keyof AuthentificationState, value: string) => {
//   setState((prevState) => ({ ...prevState, [fieldName]: value }));
// };
// handleChange est une fonction qui met à jour l'état en fonction du champ modifié.
// Fonction pour le traitement du formulaire ChampsRemplie :

// typescript
// Copy code
// const ChampsRemplie = async () => {
//   // ... (voir la suite dans le code)
// };
// Cette fonction est appelée lorsque le bouton "Login" est pressé. Elle vérifie si les champs sont remplis, effectue une requête POST vers le serveur avec les informations d'authentification, et navigue vers la page /Compte en cas de succès.
// Rendu du composant avec les éléments d'interface utilisateur :

// typescript
// Copy code
// return (
//   <View style={styles.container}>
//     {/* ... (voir la suite dans le code) */}
//   </View>
// );
// La fonction renvoie le JSX qui représente l'interface utilisateur du composant.
// Styles avec StyleSheet :

// typescript
// Copy code
// const styles = StyleSheet.create({
//   // ... (voir la suite dans le code)
// });
// Utilisation de StyleSheet.create pour définir les styles des composants.
// Export par défaut du composant :

// typescript
// Copy code
// export default Authentification;
// Exporte le composant Authentification pour pouvoir l'utiliser dans d'autres parties de l'application.
// C'est une explication générale du code. Si vous avez des questions spécifiques sur une partie du code, n'hésitez pas à demander des éclaircissements supplémentaires.