//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View ,Text} from 'react-native';
import { NativeRouter,Routes, Route ,Link} from 'react-router-native';

import Compte from './Components/Compte';
import Authentification from './Components/Authentification';
import CreactCompte from './Components/CreactCompte';
import CompteEnfant from './Components/CompteEnfant';
import CompteParent  from './Components/CompteParent';
import Tache  from './Components/Tache';

import Erreur from './Components/Erreur';

export default function App() {
  return (
    
    <NativeRouter>
  
        

    <Routes>
      <Route path="/" element={<Authentification />} />
      <Route path="/CreactCompte" element={<CreactCompte />} />
      <Route path="/Compte" element={<Compte />} />
      <Route path="/Compte/CompteEnfant" element={<CompteEnfant />} />
      <Route path="/Compte/CompteParent" element={<CompteParent />} /> 
      <Route path="/Compte/CompteParent/Tache" element={<Tache />} />
      <Route path="*" element={<Erreur />} />
    </Routes>
   
  </NativeRouter>
  );
}


