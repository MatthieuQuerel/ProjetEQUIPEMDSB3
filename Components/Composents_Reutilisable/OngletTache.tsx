import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ButtonNav from "./Button";

import { useParams } from 'react-router-native';

interface OngletTacheProps {};

const OngletTache: React.FC<OngletTacheProps> = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [tasks, setTasks] = useState<any[]>([]); // État pour stocker les tâches
  const params = useParams();
  
  useEffect(() => {
    let Valide = 0; // Initialisez la variable Valide en dehors du bloc useEffect

    if (activeTab === 2) { // Vérifiez la condition pour définir la valeur de Valide
      Valide = 1;
    }

    if (params) {
      fetch(`http://192.168.1.116:8082/Tache/${params.User}/${Valide}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(reponse => {
        if (!reponse.ok) {
          throw new Error('Échec de la requête');
        }
        console.log(reponse.ok); // Laissez cette ligne pour voir si la requête a réussi
        return reponse.json();
      })
      .then(data => {
        // Mettez à jour l'état avec les données reçues ici
        console.log("Données reçues :", data);
        setTasks(data); // Met à jour l'état avec les données reçues
      })
      .catch(err => {
        console.log(err);
        console.log("Impossible d'afficher les informations !!");
      });
    }
  }, [activeTab, params]);

  const changeTab = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <View>
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => changeTab(1)} style={[styles.tabButton, activeTab === 1 && styles.activeTab]}>
          <Text>A faire</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeTab(2)} style={[styles.tabButton, activeTab === 2 && styles.activeTab]}>
          <Text>Faites</Text>
        </TouchableOpacity>
        
      </View>

      <View>
        {activeTab === 1 && (
          <React.Fragment>
         
           
            {tasks.map((task, index) => (
              <View key={index} style={[styles.card, task.Valider === 0 ? styles.redCard : styles.greenCard]}>
                <Text style={[styles.cardText, styles.bold, styles.center]}>Rulse: {task.Rulse}</Text>
                <Text style={[styles.cardText, styles.bold, styles.center]}>Description: {task.Description}</Text>
                <Text style={[styles.cardText, styles.bold, styles.center]}>point: {task.point}</Text>
                <Text style={[styles.cardText, styles.bold, styles.center]}>Name: {task.Name}</Text>
                {/* <Text>Valider: {task.Valider}</Text>                 */}
              </View>
            ))}
            <ButtonNav name="+" chemin={`/Compte/${params.User}/CompteParent/Tache/AjouterTache`} />
          </React.Fragment>
        )}
        {activeTab === 2 && (
           <React.Fragment>
          
          
          {tasks.map((task, index) => (
            <View key={index} style={[styles.card, task.Valider === 0 ? styles.redCard : styles.greenCard]}>
              <Text style={[styles.cardText, styles.bold, styles.center]}>Rulse: {task.Rulse}</Text>
              <Text style={[styles.cardText, styles.bold, styles.center]}>Description: {task.Description}</Text>
              <Text style={[styles.cardText, styles.bold, styles.center]}>point: {task.point}</Text>
              <Text style={[styles.cardText, styles.bold, styles.center]}>Name: {task.Name}</Text>
              {/* <Text>Valider: {task.Valider}</Text>                 */}
            </View>
          ))}
          <ButtonNav name="+" chemin={`/Compte/${params.User}/CompteParent/Tache/AjouterTache`} />
        
        </React.Fragment>
        )}
        
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#eee',
  },
  tabButton: {
    padding: 10,
  },
  activeTab: {
    backgroundColor: 'lightblue',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#ddd',
    width: 400,
  },
  cardText: {
    marginBottom: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
  },
  redCard: {
    backgroundColor: 'red',
  },
  greenCard: {
    backgroundColor: 'green',
  },
});

export default OngletTache;
