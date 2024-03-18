// import { View, Text,StyleSheet} from 'react-native';
// import ButtonNav from "./Composents_Reutilisable/Button"
// import { useParams } from 'react-router-native';
// import { Link } from 'react-router-native';
// interface CompteState {
//   //email: string;
// }

// const Compte: React.FC<CompteState> = () => {
//   //const { User } = useParams<RouteParams>();
//   const params = useParams(); // récupérer le parametre email
  
//         return(

//             <View style={styles.container}>
         

      
//             <Text style={styles.appName}>......//////</Text>
//             <ButtonNav name="Parent" chemin={`/Compte/${params.User}/CompteParent`} /> 
//             <ButtonNav name="Enfant" chemin={`/Compte/${params.User}/CompteEnfant`} />
            
//           </View>

//         )
//     }

// const styles = StyleSheet.create({
   
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 16,
//     },
//     appName: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 16,
//     },
   
//   });
// export default Compte ;
import React from 'react';
import { View, Text, StyleSheet ,Image} from 'react-native';
import ButtonNav from "./Composents_Reutilisable/Button"
import { useParams } from 'react-router-native';
import { Link } from 'react-router-native';

interface CompteState {
  //email: string;
}

const Compte: React.FC<CompteState> = () => {
  //const { User } = useParams<RouteParams>();
  const params = useParams(); // récupérer le parametre email
  
  return (
    <View style={styles.container}>
      
      <Image  source={require('../assets/Logo.png')} 
        style={styles.logo}
      />
      <ButtonNav name="Parent" chemin={`/Compte/${params.User}/CompteParent`} /> 
      <ButtonNav name="Enfant" chemin={`/Compte/${params.User}/CompteEnfant`} />
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
  
  logo: {
    width: 250, 
    height: 80, 
  },
});

export default Compte;