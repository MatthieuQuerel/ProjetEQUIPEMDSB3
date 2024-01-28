import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ButtonNav from "./Composents_Reutilisable/Button";
import OngletAjouterTache from "./Composents_Reutilisable/OngletAjouterTache";
import { useParams } from 'react-router-native';
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
  return (
    <View>
     
          <Text>Ajouter tache</Text>
        <OngletAjouterTache />
      </View>

      
  );
};


export default AjouterTache;
