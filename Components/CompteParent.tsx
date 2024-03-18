import { View, Text, StyleSheet } from 'react-native';
import ButtonNav from "./Composents_Reutilisable/Button";
import { useParams } from 'react-router-native';
import BarHead from "./Composents_Reutilisable/BarHead";
import NavBar from "./Composents_Reutilisable/Nav"
interface CompteParentState {
  // email: string;
}

const CompteParent: React.FC<CompteParentState> = () => {
  const params = useParams();
 
  return (
    <View style={styles.container}>
      <BarHead  />
      <Text style={styles.appName}>Compte Parent</Text>
      <ButtonNav name="TACHE" chemin={`/Compte/${params.User}/CompteParent/Tache`} />
      <ButtonNav name="PROFIL" chemin={`/Compte/${params.User}/CompteParent/Profils`} />
      <ButtonNav name="RECOMPENSE" chemin={`/Compte/${params.User}/CompteParent/Prenium`}/>

      <NavBar />
    </View>
  );
};

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

export default CompteParent;

