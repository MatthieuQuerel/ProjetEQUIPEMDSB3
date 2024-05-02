import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface OngletAjouterTacheProps {
  user?: string;
}

interface PlayerData {
  Nom: string;
  Name: string;
  idPlayer: number;
}

interface OngletAjouterTacheState {
  NomTache: string;
  point: number;
  Penalitee: string;
  Description: string;
  NameEnfant: string;
  idPlayer: number;
  Recurence: number; // si 1 routine sinon non routine 
  playerData: PlayerData[];
}

const OngletAjouterTache: React.FC<OngletAjouterTacheProps> = ({ user }) => {
 
  const [activeTab, setActiveTab] = useState<number>(1);
  // const [selectedValue, setSelectedValue] = useState<string>('');
  // const [selectedPenaliter, setSelectedValue] = useState<string>('');
  const [selectedNameValue, setSelectedNameValue] = useState<string>('');
  const [state, setState] = useState<OngletAjouterTacheState>({
    NomTache: '',
    point: 0, // Utilisation d'une chaîne de caractères pour le champ numérique
    Penalitee: '', // Utilisation d'une chaîne de caractères pour la pénalité
    Description: '',
    NameEnfant: '', // Nom de l'enfant sélectionné
    idPlayer: 0, // ID du joueur sélectionné
    Recurence: 0,
    playerData: [],
  });

  const changeTab = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  const handleChange = (fieldName: keyof OngletAjouterTacheState, value: string | number) => {
    setState((prevState: OngletAjouterTacheState) => ({ ...prevState, [fieldName]: value }));
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
          setState((prevState: OngletAjouterTacheState) => ({
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
    console.log( state.NomTache);
      console.log( state.point);
      console.log( state.Penalitee);
      console.log( state.Description);
      console.log( state.NameEnfant);
      console.log( state.Recurence);
      if(activeTab === 1){
        state.Recurence = 0
      }else{
        state.Recurence = 1
      }
     
    if (
      
      state.NomTache !== '' &&
      state.point !== 0 &&
      state.Penalitee !== '' &&
      state.Description !== '' &&
      state.NameEnfant !== '' 
     // state.Recurence !== 0
      // selectedValue !== '' &&
      // selectedNameValue !== ''
    ) {
      try {
        console.log("entre dans le try")
        const options = {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json; charset=utf-8', 
          },
          body: JSON.stringify({
            NomTache: state.NomTache,
            point: state.point,
            Penalitee: state.Penalitee,
            IDPlayer: state.NameEnfant,
            Description: state.Description,
            Recurence: state.Recurence,
          }), 
        };
        
        const response = await fetch(`http://192.168.1.116:8082/TacheAjoue`, options);///Compte/${user}/CompteParent/Tache

const responseData = await response.json();
        if (responseData !="") {
          
          console.log('Envoi avec succès');
          // state.NomTache=''
          // state.point=0
          // state.Penalitee=''
          // state.NameEnfant=''
          // state.Description=''
          // state.Recurence=''
        } else {
          console.log('Erreur envoi form data');
          state.NomTache=''
          state.point=0
          state.Penalitee=''
          state.NameEnfant=''
          state.Description=''
          state.Recurence=0
        }
      } catch (error) {
        console.error('Erreur requete :', error);
      }
    } else {
      console.log('Tous les champs sont requis');
    }
  };

  return (
    <View>
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => changeTab(1)} style={[styles.tabButton, activeTab === 1 && styles.activeTab]}>
          <Text>Une fois</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeTab(2)} style={[styles.tabButton, activeTab === 2 && styles.activeTab]}>
          <Text>Routine</Text>
        </TouchableOpacity>
      </View>

      <View>
        {activeTab === 1 && (
          //////////la patie onglet 1
          <React.Fragment>
             <Text style={styles.sectionTitle}>tache</Text>
            <TextInput
  style={styles.input}
  placeholder="Nom de la tâche"
  keyboardType="default"
  value={state.NomTache}
  onChangeText={text => handleChange('NomTache', text)}
/>


            <Text style={styles.sectionTitle}>Nombre de point</Text>
            <TextInput
  style={styles.input}
  placeholder="Point"
  keyboardType="numeric"
  value={state.point.toString()}
  onChangeText={text => handleChange('point', text)}
/>


            <Text style={styles.sectionTitle}>Pénalité</Text>
            <RNPickerSelect
  onValueChange={(value) => handleChange('Penalitee', value)}
  items={[
    { label: 'Faible', value: 'Faible' },
    { label: 'Moyen', value: 'Moyen' },
    { label: 'Difficile', value: 'Difficile' },
  ]}
  value={state.Penalitee}
  style={pickerSelectStyles}
/>

<View>
  <Text style={styles.sectionTitle}>Choix enfants</Text>
  <TouchableOpacity style={styles.card}>
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
</View>


            <Text style={styles.sectionTitle}>Description</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description"
              keyboardType="default"
              value={state.Description}
              onChangeText={text => handleChange('Description', text)}
            />

<View style={[styles.buttonContainer, { justifyContent: 'center', alignItems: 'center' }]}>
  <Button title="Valider" onPress={ChampsRemplie} color="black" />
</View>

          </React.Fragment>
        )}
        {activeTab === 2 && (
          ///////////////la patie ongle 2
          <React.Fragment>
              <Text style={styles.sectionTitle}>tache</Text>
            <TextInput
  style={styles.input}
  placeholder="Nom de la tâche"
  keyboardType="default"
  value={state.NomTache}
  onChangeText={text => handleChange('NomTache', text)}
/>


            <Text style={styles.sectionTitle}>Nombre de point</Text>
            <TextInput
  style={styles.input}
  placeholder="Point"
  keyboardType="numeric"
  value={state.point.toString()
  
  }
  onChangeText={text => handleChange('point', text)}
/>


            <Text style={styles.sectionTitle}>Pénalité</Text>
            <RNPickerSelect
  onValueChange={(value) => handleChange('Penalitee', value)}
  items={[
    { label: 'Faible', value: 'Faible' },
    { label: 'Moyen', value: 'Moyen' },
    { label: 'Difficile', value: 'Difficile' },
  ]}
  value={state.Penalitee}
  placeholder="Penalitee"
  style={pickerSelectStyles}
/>

            <View>
  <Text style={styles.sectionTitle}>Choix enfants</Text>
  <TouchableOpacity style={styles.card}>
    <RNPickerSelect
      onValueChange={(value) => handleChange('NameEnfant', value)}
      items={state.playerData.map((item: PlayerData) => ({
        label: item.Name,
        value: item.idPlayer.toString(),
      }))}
      value={state.NameEnfant}
      placeholder="Choix de l'enfant"
      style={pickerSelectStyles}
    />
  </TouchableOpacity>
</View>

            <Text style={styles.sectionTitle}>Description</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description"
              keyboardType="default"
              value={state.Description}
              onChangeText={text => handleChange('Description', text)}
            />

<View style={[styles.buttonContainer, { justifyContent: 'center', alignItems: 'center' }]}>
  <Button title="Valider" onPress={ChampsRemplie} color="black" />
</View>



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
    backgroundColor: '#F4B322',
   
  },
  tabButton: {
    padding: 10,
  },
  buttonContainer: {
   
    padding: 12,
    borderRadius: 8,
 
    width: 400,
  },
  activeTab: {
    backgroundColor: '#F4B322',
  },
  card: {
    borderColor: '#F4B322',
    borderWidth: 1,
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
    borderColor: '#F4B322',
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

export default OngletAjouterTache;