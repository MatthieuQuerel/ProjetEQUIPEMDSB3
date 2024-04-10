import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useParams } from 'react-router-dom'; 
import {useNavigate} from 'react-router-native';
interface OngletAjoueRecompenseProps {
  user?: string;
}

interface PlayerData {
  Nom: string;
  Name: string;
  idPlayer: number;
}

interface RecompenseDataAdmin {
  RecompenseAdmin: string;
  description: string;
  idRecompenseAdmin: number; 
}

interface OngletAjoueRecompenseState {
  NomRecompense: string;
  Point: number;
  Description: string;
  NameEnfant: string;
  Abonement: number;
  playerData: PlayerData[];
  recompenseDataAdmin: RecompenseDataAdmin[];
}

const OngletAjoueRecompense: React.FC<OngletAjoueRecompenseProps> = () => {
  const  param = useParams()
  const User = param.User 
  const AjoueModifications = param.AjoueModifications
  const ID = param.ID
  const abonementString = param.Abonement;
  const paramchamps = param.paramTab;

  console.log('ID:', ID);
  console.log('abonementString:', abonementString);
  console.log('paramchamps:', paramchamps);
  console.log('AjoueModifications:', AjoueModifications);
  console.log('////////////////////////////////////////////////////////////////////////////');

  const [AjoutModifier, setAjoutModifier] = useState(false);
  //const [Abonements, setAbonements] = useState(false);
  const [state, setState] = useState<OngletAjoueRecompenseState>({ 
    Point: 0,
    NomRecompense: '',
    Description: '',
    NameEnfant: '',
    Abonement: 0,
    playerData: [],
    recompenseDataAdmin: [],
  });
  const navigate = useNavigate();
// récuperation de l'abonement client
  useEffect(() => {
   
    if (abonementString !== undefined) { 
      const valeurAbonement = abonementString.split('=')[1].trim();
      console.log(" valeurAbonement : " + valeurAbonement);
    
      if (valeurAbonement === '1') {
        console.log("je fuis dans le true");
        setState(prevState => ({ ...prevState, Abonement: 1 }));
      } else if (valeurAbonement === '0') {
        console.log("je fuis dans le false");
        setState(prevState => ({ ...prevState, Abonement: 0 }));
      } else {
        console.log("La valeur de abonementString n'est ni '0' ni '1'.");
      }
    } else {
      console.log("La variable abonementString est undefined.");
    }

if (AjoueModifications) {
  setAjoutModifier(true);
}
  }, [AjoueModifications]);





  const handleChange = (fieldName: keyof OngletAjoueRecompenseState, value: string | number) => {
    setState(prevState => ({ ...prevState, [fieldName]: value }));
  };

// affichage combo enfant et combo recompense 
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(User)
        if (User) {
          console.log("dans le users")

          const responseUser = await fetch(`http://192.168.1.116:8082/Avatar/${User}`);
          console.log(responseUser)
          if (!responseUser.ok) {
            throw new Error('Échec de la requête pour récupérer les données de l\'utilisateur');
          }
          console.log("recuperation enfant")
          const userData = await responseUser.json();
          console.log(userData)
          setState(prevState => ({ ...prevState, playerData: userData }));
         
        }
  console.log(state.Abonement)
        if (state.Abonement === 1) {
          console.log(state.Abonement + " le Abonements inter")
          const responseAdmin = await fetch(`http://192.168.1.116:8082/RecompenseAdmin`);
          if (!responseAdmin.ok) {
            throw new Error('Échec de la requête pour récupérer les données de récompense');
          }
          const adminData = await responseAdmin.json();
          setState(prevState => ({ ...prevState, recompenseDataAdmin: adminData }));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [User, state.Abonement]);

  const ChampsRemplie = async () => {
    try {
     
console.log(AjoutModifier)
      if (state.NomRecompense !== '' && state.Point !== 0 && state.NameEnfant !== '') {
        const URL = AjoutModifier ? `http://192.168.1.116:8082/Modification/${User}` : `http://192.168.1.116:8082/AjoutRecompense/${User}`;
        console.log(URL)
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            NomRecompense: state.NomRecompense,
            Point: state.Point,
            Abonement: state.Abonement,
            IDPlayer: state.NameEnfant,
            Description: state.Description,  
            ID:ID,                         
          }), 
        })
        
        
        console.log(response)
        if (response.ok) {
          console.log('Envoi avec succès');
        } else {
          console.log('Erreur envoi form data');
          //setState(prevState => ({ ...prevState, NomRecompense: '', Point: 0, Abonement: 0, NameEnfant: '', Description: '' }));
        }
      } else {
        console.log('Tous les champs sont requis');
      }
    } catch (error) {
      console.error('Erreur requête :', error);
    }
  };

  const SupEnregistrement = async () => {
    try {
       //const IDs = 11// remetre ID
     if (state.NomRecompense !== '' && state.Point !== 0 && state.NameEnfant !== '') {
        const options = {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json; charset=utf-8', 
          },
          body: JSON.stringify({        
            id: ID,                    
          }), 
        };
        const response = await fetch(`http://192.168.1.116:8082/SupresionRecompense/${User}`, options);
        if (!response.ok) {
          console.log('Erreur dans la suppression');              
        } else {
          console.log('Suppression avec succès');
        }
      }
    } catch (error) {
      console.error('champs non remplie')
    }
  };
  console.log(state.Abonement + " le dernier  des abonement")
  return (
    <View>
    
    <TouchableOpacity style={styles.retourButton} onPress={() => navigate(`/Compte/${param.User}/CompteParent/Recompense`)}>     
  <Text style={styles.buttonText}>Retour</Text>     
</TouchableOpacity>

<TouchableOpacity style={styles.supprimerButton} onPress={SupEnregistrement}>
  <Text style={styles.buttonText}>Supprimer Récompense</Text>
</TouchableOpacity>
      <View>
        { state.Abonement === 0 ?(
        <>
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
</>
 )  : state.Abonement === 1 ? (    
  <>
<Text style={styles.sectionTitle}>Recompense</Text>
<RNPickerSelect
  onValueChange={(value) => handleChange('NomRecompense', value)}
  items={state.recompenseDataAdmin.map((item: RecompenseDataAdmin) => ({
    label: item.RecompenseAdmin,
    value: item.idRecompenseAdmin.toString(),
  }))}
  value={state.NomRecompense}
  style={pickerSelectStyles}
/>


{state.NomRecompense !== '' && (
  
  <Text style={styles.sectionTitle}>
    <Text style={styles.sectionTitle}>Description : </Text>
    {state.recompenseDataAdmin.find(item => item.idRecompenseAdmin.toString() === state.NomRecompense)?.description}
  </Text>
)}

</>
) : null}
</View>

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
 
  retourButton: {  
    marginTop: 25,
    backgroundColor: 'black', 
    borderRadius: 8, 
    paddingVertical: 8, 
    paddingHorizontal: 10, 
    alignItems: 'center', 
    borderColor: 'white',
    borderWidth: 1, 
    width: 100, 
  },
  
  supprimerButton: {  
    marginTop: 16,
    backgroundColor: 'black', 
    borderRadius: 8, 
    paddingVertical: 8, 
    paddingHorizontal: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderColor: 'white',
    borderWidth: 1, 
    width: 160, 
    alignSelf: 'flex-end', 
  },
  
  
  buttonText: {
    color: 'orange', 
    fontSize: 16,
    fontWeight: 'bold',
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