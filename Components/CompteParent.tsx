import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ButtonNav from "./Composents_Reutilisable/Button";
import BarHead from "./Composents_Reutilisable/BarHead";
import NavBar from "./Composents_Reutilisable/Nav"
interface CompteParentState {
  
}

interface IProps {}

const CompteParent: React.FC<IProps> = () => {

  return (
    <View style={styles.container}>
      <BarHead  />
      <Text style={styles.appName}>Compte Parent</Text>
      <ButtonNav name="TACHE" chemin="/Compte/CompteParent/Tache" />
      <ButtonNav name="BOUTIQUE" chemin="/Compte/CompteParent" />
      <ButtonNav name="STATES" chemin="/Compte/CompteParent" />

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

