import React from 'react';
import { NativeRouter, Routes, Route } from 'react-router-native'; // Assurez-vous d'importer useParams depuis react-router-native
import Compte from './Components/Compte';
import Authentification from './Components/Authentification';
import CreactCompte from './Components/CreactCompte';
import CompteEnfant from './Components/CompteEnfant';
import CompteParent from './Components/CompteParent';
import AjouterTache from './Components/AjouterTache';
import Profils from './Components/Profils';
import Prenium from './Components/Premium';
import ModifierProfil from './Components/ModifierProfil';
import Tache from './Components/Tache';

import Erreur from './Components/Erreur';

// Définissez le type RouteParams
interface RouteParams {
  User: string;
}

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<Authentification />} />
        <Route path="/CreactCompte" element={<CreactCompte />} /> 
      
        <Route path="/Compte/:User" element={<Compte/>} />
        <Route path="/Compte/:User/CompteEnfant" element={<CompteEnfant />} />
        <Route path="/Compte/:User/CompteParent" element={<CompteParent />} />
        <Route path="/Compte/:User/CompteParent/Profils" element={<Profils />} /> 
        <Route path="/Compte/:User/CompteParent/Profils/ModifierProfil" element={<ModifierProfil />} />
        <Route path="/Compte/:User/CompteParent/Prenium" element={<Prenium />} />
        <Route path="/Compte/:User/CompteParent/Tache" element={<Tache />} />
        <Route path="/Compte/:User/CompteParent/Tache/AjouterTache" element={<AjouterTache />} />
        <Route path="*" element={<Erreur />} />
      </Routes>
    </NativeRouter>
  );
}
