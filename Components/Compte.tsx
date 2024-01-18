
import {Component, ReactNode}  from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,Alert} from 'react-native';


import { Link } from 'react-router-native';
interface CompteState {
  username: string;
  lastName: string;
  email: string;
  password: string; 
}
interface IProps {
}

const Compte: React.FC<IProps> = () => {
   
        return(

            <View style={styles.container}>
         
      
            <Text style={styles.appName}>Maître Kebabier</Text>

            <TouchableOpacity style={styles.button} onPress={() => console.log('Parent')}>
             <Text style={styles.buttonText}>Parent</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.button} onPress={() => console.log('Enfant')}>
               <Text style={styles.buttonText}>Enfant</Text>
              </TouchableOpacity>
           
          </View>

        )
    }

const styles = StyleSheet.create({
    button: {
        marginTop: 16,
        width: '100%',
        height: 70,
        backgroundColor: 'Green', // Couleur de fond du bouton
        justifyContent: 'center', // Alignement vertical au centre
        alignItems: 'center', // Alignement horizontal au centre
        borderRadius: 8, // Coins arrondis
      },
      buttonText: {
        fontSize: 18,
        color: 'white', // Couleur du texte du bouton
      },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    appName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
   
  });
export default Compte ;