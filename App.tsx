import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Routes, Route } from 'react-router-native';
import Compte from './Components/Compte';
import Authentification from './Components/Authentification';
import CreactCompte from './Components/CreactCompte';
import PolitiqueConfidentialite from './Components/Politiqueconfidentialite';
import CGV from './Components/CGV';
import CompteEnfant from './Components/CompteEnfant';
import CompteParent from './Components/CompteParent';
import AjouterTache from './Components/AjouterTache';
import Profils from './Components/Profils';
import Prenium from './Components/Premium';
import ValiderTacheEnfant from './Components/ValiderTacheEnfant';
import Stats from './Components/Stats';
import ModifierProfil from './Components/ModifierProfil';
import Tache from './Components/Tache';
import OngleAjouterRecompense from './Components/Composents_Reutilisable/OngletAjoueRecompence';
import AjouterEnfant from './Components/AjouterEnfant';
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
          <Routes> // route dans l'application
            <Route path="/" element={<Authentification />} />
            <Route path="/PolitiqueConfidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/CreactCompte" element={<CreactCompte />} />
            <Route path="/Compte/:User" element={<Compte />} />
            <Route path="/Compte/:User/CompteEnfant" element={<CompteEnfant />} />
            <Route path="/Compte/:User/CompteEnfant/:id/ValiderTacheEnfant" element={<ValiderTacheEnfant />} />
            <Route path="/Compte/:User/CompteParent" element={<CompteParent />} />
            <Route path="/Compte/:User/CompteParent/Profils" element={<Profils />} />
            <Route path="/Compte/:User/CompteParent/Profils/AjouterEnfant/:id" element={<AjouterEnfant />} />
            <Route path="/Compte/:User/CompteParent/Profils/ModifierProfil" element={<ModifierProfil />} />
            <Route path="/Compte/:User/CompteParent/Recompense" element={<Prenium />} />
            <Route path="/Compte/:User/CompteParent/Recompense/CGV" element={<CGV />} />
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
  },
});


// Ce code définit le composant principal de l'application, nommé App, qui utilise React Native pour créer une interface utilisateur mobile. Il importe plusieurs modules nécessaires, notamment des composants de base de react-native comme StyleSheet et View, ainsi que des composants de routage de react-router-native comme NativeRouter, Routes et Route pour gérer la navigation au sein de l'application. Plusieurs composants spécifiques sont importés pour être utilisés dans les différentes routes de l'application, tels que Compte, Authentification, CreactCompte, PolitiqueConfidentialite, CGV, CompteEnfant, CompteParent, AjouterTache, Profils, Prenium, ValiderTacheEnfant, Stats, ModifierProfil, Tache, OngleAjouterRecompense, AjouterEnfant et Erreur. Le module StripeProvider de @stripe/stripe-react-native est utilisé pour intégrer les fonctionnalités de paiement de Stripe, avec une clé publique Stripe spécifiée.

// Le composant App commence par encapsuler l'ensemble de son contenu dans une vue (View) stylisée avec des styles définis dans styles.appContainer. Le StripeProvider est utilisé pour envelopper le NativeRouter, permettant ainsi l'utilisation des fonctionnalités de paiement Stripe dans toutes les routes définies. Les routes sont spécifiées à l'intérieur du composant Routes, chaque Route définissant un chemin d'accès spécifique et le composant à rendre pour ce chemin. Les chemins incluent la racine (/) qui rend le composant Authentification, ainsi que plusieurs chemins imbriqués pour gérer les comptes utilisateurs et les tâches. Les paramètres dynamiques des URL sont utilisés, par exemple, :User et :id, pour permettre la personnalisation des chemins basés sur l'utilisateur et d'autres identifiants.

// Enfin, un composant Toast de react-native-toast-message est inclus pour afficher des notifications toast dans l'application. Les styles sont définis à l'aide de StyleSheet.create pour structurer et styliser le conteneur principal de l'application.