import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-native';
import Svg, { Path, Rect } from 'react-native-svg';

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
          const response = await fetch(`http://10.54.90.21:8082/Afficherenfant/${User}`);
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
      <TouchableOpacity style={styles.iconButton} onPress={() => navigate(`/Compte/${User}`)}>   
    <Svg width="27" height="24" viewBox="0 0 27 24" fill="none" style={styles.icon}>
        <Path d="M1.21875 12.8047L11.5312 22.6484C12.1172 23.1758 12.9961 23.1758 13.5234 22.5898C14.0508 22.0039 14.0508 21.125 13.4648 20.5977L5.67188 13.1562H25.5938C26.4141 13.1562 27 12.5703 27 11.75C27 10.9883 26.4141 10.3438 25.5938 10.3438H5.67188L13.4648 2.96094C14.0508 2.43359 14.0508 1.49609 13.5234 0.96875C12.9961 0.382812 12.0586 0.382812 11.5312 0.910156L1.21875 10.7539C0.925781 11.0469 0.75 11.3984 0.75 11.75C0.75 12.1602 0.925781 12.5117 1.21875 12.8047Z" fill="#050505"/>
    </Svg>    
    </TouchableOpacity>
      <Text style={styles.appName}>Compte Enfant</Text>
      {players.map((player, index) => (
        <TouchableOpacity 
          key={player.idplayer} 
          onPress={() => navigate(`/Compte/${User}/CompteEnfant/${player.idplayer}/ValiderTacheEnfant`)}
          style={[index % 2 === 0 ? styles.buttonEven : styles.buttonOdd, styles.button]}


         
        >
          <Text style={styles.buttonText}>{player.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 55,
    padding: 10,
    borderRadius: 5,
    marginTop: 13,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonEven: {
    backgroundColor: '#F4B322',
    
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    width: 50,
    height: 30,
    borderColor:'#FAB322'
  },
  buttonOdd: {
    width: 50,
    height: 30,
    backgroundColor: '#FAFAFA',
    
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor:'#FAB322'
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Aligne les éléments au début
    paddingTop: 35,
},

icon: {
    marginRight: 350, // Ajoute de la marge à droite de l'icône
},
});


export default CompteEnfant;
