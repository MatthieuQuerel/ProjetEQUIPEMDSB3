import {Component, ReactNode}  from 'react';
import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';


import { Link } from 'react-router-native';
interface CompteEnfantState {
  // email: string;
}

const CompteEnfant: React.FC<CompteEnfantState> = () => {
   
        return(

            <View style={styles.container}>
         
      
            <Text style={styles.appName}>Compte Enfant</Text>

            
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
    appName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
   
  });
export default CompteEnfant ;