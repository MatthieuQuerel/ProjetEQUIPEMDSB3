
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useParams } from 'react-router-dom'; 
import Nav from "./Composents_Reutilisable/Nav";
import BarHead from "./Composents_Reutilisable/BarHead";
import OngletRecompense from "./Composents_Reutilisable/OngletRecompence"
const Prenium = () => {
 

  return (
    <View style={styles.container}>
      <BarHead  />
      <View style={styles.navBarOnglet}>
    < OngletRecompense />
    </View>
    <View style={styles.navBarContainer}> 
            <Nav/>
            </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 40,
        position: 'relative',
  },
  navBarOnglet: {
    paddingTop : 20,
    flexDirection: 'row', // Pour aligner les éléments horizontalement
    justifyContent: 'space-between', // Pour répartir l'espace entre les éléments
    marginBottom:64,
  },
    navBarContainer: {
      width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0A0700',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
  },
  
});

export default Prenium;
