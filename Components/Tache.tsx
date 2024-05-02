import {Component, ReactNode}  from 'react';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import NavBar from "./Composents_Reutilisable/Nav"
import { useParams } from 'react-router-native';
import BarHead from "./Composents_Reutilisable/BarHead";
import { Link } from 'react-router-native';
 import Onglet from "./Composents_Reutilisable/OngletTache";
interface CompteTache {
  // email: string;
}


const Tache: React.FC<CompteTache> = () => {
  const params = useParams();
  console.log(params.User);
        return(

            <View style={styles.container}>
              <BarHead  />
            <View style={styles.navBarOnglet}>
            <Onglet />
            </View>
            <View style={styles.navBarContainer}>
            <NavBar />
            </View>
          </View>

        )
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 40,
        position: 'relative', // Ajoutez cette ligne pour positionner les éléments enfants de manière absolue
      },
      
      navBarOnglet: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 290,
      },
      navBarContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0A0700',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0, // Positionne la barre de navigation en bas de l'écran
      },
    });
    
export default Tache ;