
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface OngletAjoueRecompenseProps {
  user?: string;
}
interface PlayerData {
    Nom: string;
    Name: string;
    idPlayer: number;
  }

interface OngletAjoueRecompenseState {
  NomRecompense: string;
  Point: number;
  Description: string;
  NameEnfant: string;
  idPlayer: number;
  Abonement: number; // si 1 routine sinon non routine 
  playerData: PlayerData[];
}

const OngletAjoueRecompense: React.FC<OngletAjoueRecompenseProps> = ({ user }) => {
 
  const [activeTab, setActiveTab] = useState<number>(1);
  // const [selectedValue, setSelectedValue] = useState<string>('');
  // const [selectedPenaliter, setSelectedValue] = useState<string>('');
  const [selectedNameValue, setSelectedNameValue] = useState<string>('');
  const [state, setState] = useState<OngletAjoueRecompenseState>({
    Point: 0, // Utilisation d'une chaîne de caractères pour le champ numérique
    NomRecompense:'',
    Description: '',
    NameEnfant: '', // Nom de l'enfant sélectionné
    idPlayer: 0, // ID du joueur sélectionné
    Abonement: 0,
    playerData: [],

  });

  const handleChange = (fieldName: keyof OngletAjoueRecompenseState, value: string | number) => {
    setState((prevState: OngletAjoueRecompenseState) => ({ ...prevState, [fieldName]: value }));
  };

  useEffect(() => {
    if (user) {
      fetch(`http://192.168.1.116:8082/Avatar/${user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Échec de la requête');
          }
          return response.json();
        })
        .then(data => {
          console.log('OK', data);
          setState((prevState: OngletAjoueRecompenseState) => ({
            ...prevState,
            playerData: data,
          }));
          
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données :', error);
        });
    }
  }, [user]);

  const ChampsRemplie = async () => {
   if(state.Description !== ''){
    state.Abonement = 0
   } else{
    state.Abonement = 1
   }
    if (
      
      state.NomRecompense !== '' &&
      state.Point !== 0 &&
      state.NameEnfant !== '' 
      ) {

    
    } else {
      console.log('Tous les champs sont requis');
    }
  };

  return (
    <View>
         <View>
      
    
              <Text style={styles.sectionTitle}>Recompense</Text>
            <TextInput
  style={styles.input}
  placeholder="Nom de la tâche"
  keyboardType="default"
   value={state.NomRecompense}
  onChangeText={text => handleChange('NomRecompense', text)}
/>
<Text style={styles.sectionTitle}>Description</Text>
<TextInput
 style={[styles.input, styles.descriptionInput]}
placeholder="Description"
 keyboardType="default"
value={state.Description}
 onChangeText={text => handleChange('Description', text)}
 />

            <Text style={styles.sectionTitle}>Nombre de point</Text>
            <TextInput
  style={styles.input}
  placeholder="Point"
  keyboardType="numeric"
  value={state.Point.toString()}
  onChangeText={text => handleChange('Point', text)}
/>



             <Text style={styles.sectionTitle}>Choix enfants</Text>
            {state.playerData && state.playerData.map((item: PlayerData, index: number) => (
  <TouchableOpacity style={styles.card} key={index}>
    <RNPickerSelect
  onValueChange={(value) => handleChange('NameEnfant', value)}
  items={state.playerData.map((item: PlayerData) => ({
    label: item.Name,
    value: item.idPlayer.toString(),
  }))}
  value={state.NameEnfant}
  style={pickerSelectStyles}
/>
  </TouchableOpacity>
))} 
            <Button title="Valider" onPress={ChampsRemplie} />

   
      </View>
    </View >
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  cardPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor:'green',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputAndroid: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default OngletAjoueRecompense;