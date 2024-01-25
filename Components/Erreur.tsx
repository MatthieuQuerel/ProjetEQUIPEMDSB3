import { StatusBar } from 'expo-status-bar';
import ButtonNav from "./Composents_Reutilisable/Button"
import {Text, View ,StyleSheet } from 'react-native';

function Erreur() {
    return(
 <View style={styles.container}>
    <Text style={styles.errorText} >erreur de chemin</Text>
    <ButtonNav name="Retour" chemin="/" /> 
 </View>
)
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     padding: 16,
   },
   errorText: {
     fontSize: 48,
     color: 'red',
     marginBottom: 16,
   },
 });
export default Erreur