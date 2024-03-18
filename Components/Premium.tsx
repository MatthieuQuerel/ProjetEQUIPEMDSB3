
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useParams } from 'react-router-dom'; 
import OngletRecompense from "./Composents_Reutilisable/OngletRecompence"
const Prenium = () => {
 

  return (
    <View style={styles.container}>
    < OngletRecompense />
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
  
});

export default Prenium;
