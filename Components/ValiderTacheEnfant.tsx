import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-native';

interface TaskData {
  Point: number;
  temporellement: string;
  Rulse: string;
  Name: string;
  Description: string;
  idRulse: number;
}

const ValiderTacheEnfant: React.FC = () => {
  const { User, id } = useParams();
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if (User !== '' && id !== '') {
        const response = await fetch(`http://192.168.1.116:8082/AfficherDeEnfant/${User}/${id}`);
        if (!response.ok) {
          throw new Error('Échec de la requête pour récupérer les données de la tâche');
        }
        const taskData: TaskData[] = await response.json();
        setTasks(taskData);
      }
    } catch (error) {
      console.error('Erreur requête :', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [User, id]);

  const ValiderTache = async (idRulse: number) => {
    try {
      const response = await fetch(`http://192.168.1.116:8082/ValiderTache/${idRulse}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modifier: 1 }), 
      });
      if (!response.ok) {
        throw new Error('Échec de la requête pour valider la tâche');
      }
      fetchData();
      // Mettre à jour l'état pour refléter les changements dans l'interface utilisateur si nécessaire
    } catch (error) {
      console.error('Erreur lors de la validation de la tâche :', error);
    }
  };

  return (
    <View style={styles.container}>
        
      <Text style={styles.appName}>Tâches</Text>
      <ScrollView horizontal={false}>
      {tasks.map((task, index) => (
      <View key={index} style={[styles.card, index % 2 === 0 ? { backgroundColor: '#F4B322' } : { backgroundColor: '#0A0700' }]}>
      <Text style={[styles.text, index % 2 !== 0 && styles.whiteText]}>{task.Name}</Text>
      <Text style={[styles.text, index % 2 !== 0 && styles.whiteText]}>Tache : {task.Rulse}</Text>
      <Text style={[styles.text, index % 2 !== 0 && styles.whiteText]}>Points: {task.Point}</Text>
      <Text style={[styles.text, index % 2 !== 0 && styles.whiteText]}>Fréquence: {task.temporellement}</Text>
      <Text style={[styles.text, index % 2 !== 0 && styles.whiteText]}>Description: {task.Description}</Text>
      <TouchableOpacity 
        onPress={() => ValiderTache(task.idRulse)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>
    </View>
      ))}
      </ScrollView>
      <TouchableOpacity  onPress={() => navigate(`/Compte/${User}`)}>
                <Text style={styles.buttonRetour}>Retour Compte</Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    appName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 33,
    },
    card: {
      backgroundColor: '#f5f5f5',
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      width: '100%',
    },
    button: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      marginTop: 33,
    },
    buttonRetour: {
        backgroundColor: '#007bff',
        justifyContent: 'flex-start',
        alignItems: 'flex-start', // Alignement du contenu à gauche
        padding: 10,
        borderRadius: 5,
        marginTop: 23,
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center', // Alignement du texte à gauche
      },
    text: {
      color: '#000', // Couleur du texte par défaut
    },
    whiteText: {
      color: '#fff', // Couleur du texte en blanc
    },
  });
  

export default ValiderTacheEnfant;
