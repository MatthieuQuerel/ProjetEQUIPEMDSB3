//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View ,Text} from 'react-native';
import { NativeRouter,Routes, Route ,Link} from 'react-router-native';

import Compte from './Components/Compte';
import Authentification from './Components/Authentification';
import CreactCompte from './Components/CreactCompte';
import Erreur from './Components/Erreur';

export default function App() {
  return (
    
    <NativeRouter>
  
        

    <Routes>
      <Route path="/" element={<Authentification />} />
      <Route path="/CreactCompte" element={<CreactCompte />} />
      <Route path="/Compte" element={<Compte />} />
      <Route path="*" element={<Erreur />} />
    </Routes>
   
  </NativeRouter>
  );
}


