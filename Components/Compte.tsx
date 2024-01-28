import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import ButtonNav from "./Composents_Reutilisable/Button"
import { useParams } from 'react-router-native';
import { Link } from 'react-router-native';
interface CompteState {
  //email: string;
}

const Compte: React.FC<CompteState> = () => {
  //const { User } = useParams<RouteParams>();
  const params = useParams(); // récupérer le parametre email
  console.log(params.User);
        return(

            <View style={styles.container}>
         
         <TouchableOpacity onPress={() => console.log(` clicked`)}>
    <Link to={`/Compte/${params.User}/CompteParent`}>
      <Text >tet</Text>
    </Link>
  </TouchableOpacity>

      
            <Text style={styles.appName}>......//////</Text>
            <ButtonNav name="Parent" chemin={`/Compte/${params.User}/CompteParent`} /> 
            <ButtonNav name="Enfant" chemin={`/Compte/${params.User}/CompteEnfant`} />
            
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