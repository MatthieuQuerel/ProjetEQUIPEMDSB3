import {Component, ReactNode}  from 'react';
import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import NavBar from "./Composents_Reutilisable/Nav"
import BarHead from "./Composents_Reutilisable/BarHead";
import { Link } from 'react-router-native';
// import Onglet from "./Composents_Reutilisable/Onglet";
interface CompteTache {
 
}
interface IProps {
}

const Tache: React.FC<IProps> = () => {
   
        return(

            <View style={styles.container}>
              <BarHead  />
         <TouchableOpacity  onPress={() => console.log("Créer compte")}>
          <Link to='/Compte/CompteParent'>
            <Text>Retour</Text>
          </Link>
        </TouchableOpacity>
      
            <Text style={styles.appName}>Tache</Text>
            {/* <Onglet /> */}
            <NavBar />
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
export default Tache ;