
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useParams } from 'react-router-dom'; 
import Nav from "./Composents_Reutilisable/Nav";
import OngletRecompense from "./Composents_Reutilisable/OngletRecompence"
const Prenium = () => {
 

  return (
    <View style={styles.container}>
    < OngletRecompense />
    <View style={styles.navBarContainer}> 
            <Nav/>
            </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  navBarContainer: {
    flex: 2,
    justifyContent: 'center', 
    paddingTop: 80,
  },
  
});

export default Prenium;
