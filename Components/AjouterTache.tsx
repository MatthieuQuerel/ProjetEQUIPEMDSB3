import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ButtonNav from "./Composents_Reutilisable/Button";
import OngletAjouterTache from "./Composents_Reutilisable/OngletAjouterTache";
import { useParams } from 'react-router-native';
import { useNavigate } from 'react-router-native';
import Svg, { Path, Rect } from 'react-native-svg';

// Définition du type pour les propriétés du composant
type AjouterTacheProps = {
  // email: string;
};

const AjouterTache: React.FC<AjouterTacheProps> = () => {
  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState<number>(1);

  // Fonction pour changer l'onglet actif
  const changeTab = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };
  const params = useParams();
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate(`/Compte/${params.User}/CompteParent/Tache`)} style={styles.iconButton}>
        <Svg width="27" height="24" viewBox="0 0 27 24" fill="none" style={styles.icon}>
          <Path d="M1.21875 12.8047L11.5312 22.6484C12.1172 23.1758 12.9961 23.1758 13.5234 22.5898C14.0508 22.0039 14.0508 21.125 13.4648 20.5977L5.67188 13.1562H25.5938C26.4141 13.1562 27 12.5703 27 11.75C27 10.9883 26.4141 10.3438 25.5938 10.3438H5.67188L13.4648 2.96094C14.0508 2.43359 14.0508 1.49609 13.5234 0.96875C12.9961 0.382812 12.0586 0.382812 11.5312 0.910156L1.21875 10.7539C0.925781 11.0469 0.75 11.3984 0.75 11.75C0.75 12.1602 0.925781 12.5117 1.21875 12.8047Z" fill="#050505" />
        </Svg>
      </TouchableOpacity>

      <Text style={styles.title}>Ajouter une tâche</Text>

      <OngletAjouterTache user={params.User} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    
    paddingTop: 40,
  },
  iconButton: {
    marginBottom: 10, // Ajoute de la marge en bas de l'icône
  },
  icon: {
    marginRight: 10, // Ajoute de la marge à droite de l'icône
  },
  title: {
    alignItems: 'center', // Centrer les éléments horizontalement
    fontWeight: 'bold',
    fontSize: 24, // Taille de la police de caractères
  },
});

export default AjouterTache;

