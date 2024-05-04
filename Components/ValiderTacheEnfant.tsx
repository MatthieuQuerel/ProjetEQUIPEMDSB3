import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

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
        const response = await fetch(`http://10.54.90.21:8082/AfficherDeEnfant/${User}/${id}`);
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
      const response = await fetch(`http://10.54.90.21:8082/ValiderTache/${idRulse}`, {
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
      <View>
       <TouchableOpacity style={[styles.iconButton, { alignItems: 'flex-start' }]} onPress={() => navigate(`/Compte/${User}/CompteEnfant`)}>
  <Svg width="27" height="24" viewBox="0 0 27 24" fill="none" style={styles.icon}>
    <Path d="M1.21875 12.8047L11.5312 22.6484C12.1172 23.1758 12.9961 23.1758 13.5234 22.5898C14.0508 22.0039 14.0508 21.125 13.4648 20.5977L5.67188 13.1562H25.5938C26.4141 13.1562 27 12.5703 27 11.75C27 10.9883 26.4141 10.3438 25.5938 10.3438H5.67188L13.4648 2.96094C14.0508 2.43359 14.0508 1.49609 13.5234 0.96875C12.9961 0.382812 12.0586 0.382812 11.5312 0.910156L1.21875 10.7539C0.925781 11.0469 0.75 11.3984 0.75 11.75C0.75 12.1602 0.925781 12.5117 1.21875 12.8047Z" fill="#050505"/>
  </Svg>    
</TouchableOpacity>
</View>
      <Text style={styles.appName}>Tâches</Text>
      <ScrollView horizontal={false}>
      {tasks.map((task, index) => (
      <View key={index} style={[styles.card, index % 2 === 0 ? { backgroundColor: '#F4B322' } : { backgroundColor: '#FFFFFF' }]}>
      <Text style={[styles.text, index % 2 !== 0 && styles.whiteText]}>{task.Name}</Text>
      <Text style={[styles.text, index % 2 !== 0 && styles.whiteText]}>Tache : {task.Rulse}</Text>
      <Text style={[styles.text, index % 2 !== 0 && styles.whiteText]}>Points: {task.Point}</Text>
      <Text style={[styles.text, index % 2 !== 0 && styles.whiteText]}>Fréquence: {task.temporellement}</Text>
      <Text style={[styles.text, index % 2 !== 0 && styles.whiteText]}>Description: {task.Description}</Text>
      <TouchableOpacity onPress={() => ValiderTache(task.idRulse)} style={styles.button}>
      <LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
        <Text style={styles.buttonText}>Valider</Text>
        </LinearGradient> 
      </TouchableOpacity>
    </View>
      ))}
      </ScrollView>
      <TouchableOpacity style={styles.button}  onPress={() => navigate(`/Compte/${User}`)}>
      <LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
                <Text style={styles.buttonRetour}>Retour Compte</Text>
                </LinearGradient>  
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
    linearGradient: {
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
     
      borderColor:'#F4B322',
    },
    iconButton: {
      
      
      paddingTop: 35,
     
  },
  
  icon: {
      marginRight: 350, // Ajoute de la marge à droite de l'icône
  },
    card: {
      backgroundColor: '#f5f5f5',
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      width: '100%',
      borderColor: '#EB4651',
      borderWidth: 2,
    },
    button: {
      
      padding: 10,
      borderRadius: 5,
      marginTop: 33,
    },
    buttonRetour: {
        
        justifyContent: 'flex-start',
        alignItems: 'flex-start', // Alignement du contenu à gauche
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        color: '#FFFFFF',
      },
      buttonText: {
        color: '#FFFFFF',
        textAlign: 'center', // Alignement du texte à gauche
      },
    text: {
      color: '#000', // Couleur du texte par défaut
    },
    whiteText: {
      color: 'black', // Couleur du texte en blanc
    },
  });
  

export default ValiderTacheEnfant;
