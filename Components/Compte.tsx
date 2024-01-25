

import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import ButtonNav from "./Composents_Reutilisable/Button"

import { Link } from 'react-router-native';
interface CompteState {
  
}
interface IProps {
}

const Compte: React.FC<IProps> = () => {
 
        return(

            <View style={styles.container}>
         
      
            <Text style={styles.appName}>......//////</Text>

            <ButtonNav name="Parent" chemin="/Compte/CompteParent" /> 
             <ButtonNav name="Enfant" chemin="/Compte/CompteEnfant" />
            
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
export default Compte ;