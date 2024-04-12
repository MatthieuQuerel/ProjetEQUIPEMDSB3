import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Routes, Route } from 'react-router-native';
import Compte from './Components/Compte';
import Authentification from './Components/Authentification';
import CreactCompte from './Components/CreactCompte';
import CompteEnfant from './Components/CompteEnfant';
import CompteParent from './Components/CompteParent';
import AjouterTache from './Components/AjouterTache';
import Profils from './Components/Profils';
import Prenium from './Components/Premium';
import Stats from './Components/Stats';
import ModifierProfil from './Components/ModifierProfil';
import Tache from './Components/Tache';
import OngleAjouterRecompense from './Components/Composents_Reutilisable/OngletAjoueRecompence';
import { StripeProvider } from '@stripe/stripe-react-native';
import Erreur from './Components/Erreur';
import Toast from 'react-native-toast-message';
import 'react-toastify/dist/ReactToastify.css';

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51OQ4atDvUzqU5phQVcuCtfT9JjTI0O81dDBDdCRPREbJzUQL3Pjg1cIiwPf1NnSLAFL8iWukbQ257RvFGmxZpcyu00SpBdnx7l';

export default function App() {
  return (
    <View style={styles.appContainer}>
   
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <NativeRouter>
          <Routes>
            <Route path="/" element={<Authentification />} />
            <Route path="/CreactCompte" element={<CreactCompte />} />
            <Route path="/Compte/:User" element={<Compte />} />
            <Route path="/Compte/:User/CompteEnfant" element={<CompteEnfant />} />
            <Route path="/Compte/:User/CompteParent" element={<CompteParent />} />
            <Route path="/Compte/:User/CompteParent/Profils" element={<Profils />} />
            <Route path="/Compte/:User/CompteParent/Profils/ModifierProfil" element={<ModifierProfil />} />
            <Route path="/Compte/:User/CompteParent/Recompense" element={<Prenium />} />
            <Route path="/Compte/:User/CompteParent/Prenium/AjouterRecompense/:AjoueModification/:Abonement/:paramTab/:ID" element={<OngleAjouterRecompense />} />
            <Route path="/Compte/:User/CompteParent/Tache" element={<Tache />} />
            <Route path="/Compte/:User/CompteParent/Tache/AjouterTache" element={<AjouterTache />} />
            <Route path="/Compte/:User/CompteParent/Stats" element={<Stats />} />
            <Route path="*" element={<Erreur />} />
          </Routes>
        </NativeRouter>
      </StripeProvider>
    
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    //backgroundColor: 'black',
  },
});
