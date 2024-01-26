import React, { useState } from 'react';

// Définition du type pour les propriétés du composant
type OngletProps = {};

const Onglet: React.FC<OngletProps> = () => {
  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState<number>(1);

  // Fonction pour changer l'onglet actif
  const changeTab = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div>
      {/* Barre d'onglets */}
      <div>
        <button onClick={() => changeTab(1)} className={activeTab === 1 ? 'active' : ''}>
          Onglet 1
        </button>
        <button onClick={() => changeTab(2)} className={activeTab === 2 ? 'active' : ''}>
          Onglet 2
        </button>
        <button onClick={() => changeTab(3)} className={activeTab === 3 ? 'active' : ''}>
          Onglet 3
        </button>
      </div>

      {/* Contenu des onglets */}
      <div>
        {activeTab === 1 && <div>Contenu de l'onglet 1</div>}
        {activeTab === 2 && <div>Contenu de l'onglet 2</div>}
        {activeTab === 3 && <div>Contenu de l'onglet 3</div>}
      </div>
    </div>
  );
};

export default Onglet;
