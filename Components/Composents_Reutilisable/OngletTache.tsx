import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ButtonNav from "./Button";
import { useParams } from 'react-router-native';

// Définition du type pour les propriétés du composant
interface OngletTacheProps {};

const OngletTache: React.FC<OngletTacheProps> = () => {
  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState<number>(1);

  // Fonction pour changer l'onglet actif
  const changeTab = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };
  const params = useParams();
  return (
    <View>
      {/* Barre d'onglets */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => changeTab(1)} style={[styles.tabButton, activeTab === 1 && styles.activeTab]}>
          <Text>A faire</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeTab(2)} style={[styles.tabButton, activeTab === 2 && styles.activeTab]}>
          <Text>Faites</Text>
        </TouchableOpacity>
        
      </View>

      {/* Contenu des onglets */}
      <View>
        {activeTab === 1 && (
        <React.Fragment>
            <Text>Contenu de l'onglet 1</Text>
            <ButtonNav name="+" chemin={`/Compte/${params.User}/CompteParent/Tache/AjouterTache`} />
        </React.Fragment>
        )
        }
        {activeTab === 2 && <Text>Contenu de l'onglet 2</Text>}
        {activeTab === 3 && <Text>Contenu de l'onglet 3</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#eee',
  },
  tabButton: {
    padding: 10,
  },
  activeTab: {
    backgroundColor: 'lightblue',
  },
});

export default OngletTache;
