import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-native';

interface PlayerData {
  idplayer: number;
  name: string;
}

const CompteEnfant: React.FC = () => {
  const { User } = useParams();
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (User !== '') {
          const response = await fetch(`http://192.168.1.116:8082/Afficherenfant/${User}`);
          if (!response.ok) {
            throw new Error('Échec de la requête pour récupérer les données de récompense');
          }
          const playerData: PlayerData[] = await response.json();
          setPlayers(playerData);
        }
      } catch (error) {
        console.error('Erreur requête :', error);
      }
    }
    fetchData();
  }, [User]);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Compte Enfant</Text>
      {players.map((player, index) => (
        <TouchableOpacity 
          key={player.idplayer} 
          onPress={() => navigate(`/Compte/${User}/CompteEnfant/${player.idplayer}/ValiderTacheEnfant`)}
          style={[index % 2 === 0 ? styles.buttonEven : styles.buttonOdd]}
        >
          <Text style={styles.buttonText}>{player.name}</Text>
        </TouchableOpacity>
      ))}
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
    marginBottom: 16,
  },
  buttonEven: {
    backgroundColor: '#F4B322',
    padding: 20, // Augmentez la valeur du padding pour augmenter la taille du bouton
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonOdd: {
    backgroundColor: '#0A0700',
    padding: 20, // Augmentez la valeur du padding pour augmenter la taille du bouton
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});


export default CompteEnfant;
