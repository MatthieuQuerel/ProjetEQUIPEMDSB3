import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useParams } from 'react-router-dom'; 
import {useNavigate} from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect } from 'react-native-svg';

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

interface OngletAjoueRecompenseState { // interface
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
  const AjoueModification= param.AjoueModification;
  const ID = param.ID
  const abonementString = param.Abonement;
  const paramchamps = param.paramTab;
  const navigate = useNavigate();
  const [AjoutModifier, setAjoutModifier] = useState(false);
  const [ModifierValeurModifier, setModifierValeurModifier] = useState(true);

  const [state, setState] = useState<OngletAjoueRecompenseState>({ 
    Point: 0,
    NomRecompense: '',
    Description: '',
    NameEnfant: '',
    Abonement: 0,
    playerData: [],
    recompenseDataAdmin: [],
  });
  
  let IDCard: string | undefined;
     if (ID !== undefined) {
      IDCard = ID.split('=')[1];
    }
    let ModificationValue: string | undefined;
    if (AjoueModification !== undefined) {
      ModificationValue = AjoueModification.split('=')[1];
    } 
    
  const AfficherValeurModifier = () => {
    const cleanParamTab: string = param.paramTab?.replace('paramTab=,', '') || "";
    
   
  if (ModificationValue === '1') {
    setAjoutModifier(true);
  }else{
    setAjoutModifier(false);
  }
   
    //console.log('AjoueModifications si a 1:', ModificationValue);
    
  
    if (cleanParamTab !== "" && ModificationValue === '1' ) {
      try {
        const paramchamps = JSON.parse(cleanParamTab);

        let Abonementvaleur: string | number | undefined;

        if (abonementString !== undefined) {
           Abonementvaleur = abonementString.split('=')[1].trim();
           }
           console.log("cleanParamTab",cleanParamTab)
           console.log("Abonementvaleur",Abonementvaleur)
        if(Abonementvaleur === '0'){
//           console.log("///////////////////////////////////////////////////////////////")
// enlevé le + de ma chaine 
paramchamps.Recompense = paramchamps.Recompense.replace(/\+/g, ' ');
paramchamps.Description = paramchamps.Description.replace(/\+/g, ' ');
// asignez les valeurs selon si c'est prenium ou non 
        if (state.Point !== paramchamps.Point || 
            state.NomRecompense !== paramchamps.Recompense || 
            state.Description !== paramchamps.Description || 
            state.NameEnfant !== paramchamps.idEnfant) {
          setState(prevState => ({
            ...prevState,
            Point: paramchamps.Point,
            NomRecompense: paramchamps.Recompense,
            Description: paramchamps.Description,
            NameEnfant: paramchamps.idEnfant,
          }));
        
        }
      }else{
        if (state.Point !== paramchamps.Point || 
          state.NomRecompense !== paramchamps.idRecompenseAdmin || 
          state.NameEnfant !== paramchamps.idEnfant) {
        setState(prevState => ({
          ...prevState,
          Point: paramchamps.Point,
          NomRecompense: paramchamps.idRecompenseAdmin,
          NameEnfant: paramchamps.idEnfant,
        
        }));
      }
      }
        
       
      } catch (error) {
        console.error('Erreur lors de l\'analyse de paramchamps :', error);
      }
    } else {
      console.error('param.paramTab est vide ou non défini ou AjoueModification n\'est pas égal à 1 ou ChangeValue n\'est pas égal à 0');
    }
  }
  
  // Appelez la fonction AfficherValeurModifier
  if(ModifierValeurModifier && ID !=""){
    AfficherValeurModifier();
    setModifierValeurModifier(false)
    setAjoutModifier(true)
  }
  useEffect(() => {
    if (paramchamps === undefined || ID === "") {
      setAjoutModifier(false);
    }
  }, [paramchamps, ID]);

  useEffect(() => {
   
    if (abonementString !== undefined) { 
      const valeurAbonement = abonementString.split('=')[1].trim();
    
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

  }, []);

  
  const handleChange = (fieldName: keyof OngletAjoueRecompenseState, value: string | number) => {
    setState(prevState => ({ ...prevState, [fieldName]: value }));
  };

// affichage combo enfant et combo recompense 
  useEffect(() => { 
    const fetchData = async () => {
      try {
        console.log(User)
        if (User) {

          const responseUser = await fetch(`http://192.168.1.116:8082/Avatar/${User}`);
          console.log(responseUser)
          if (!responseUser.ok) {
            throw new Error('Échec de la requête pour récupérer les données de l\'utilisateur');
          }
        
          const userData = await responseUser.json();
       
          setState(prevState => ({ ...prevState, playerData: userData }));
         
        }
  
        if (state.Abonement === 1) {
          
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

  const ChampsRemplie = async () => { // ajoue et récompense
    try {
      if (state.NomRecompense !== '' && state.Point !== 0 && state.NameEnfant !== '') {
        let URL;
        let method;
// differente cas ajoue ou modif  selon var ModificationValue
if (ModificationValue === '1' && IDCard !== '') {
  URL = `http://192.168.1.116:8082/Modification/${User}`;
  method = 'PUT';

} else {
  URL = `http://192.168.1.116:8082/AjoutRecompense/${User}`;
  method = 'POST';
}
const response = await fetch(URL, {
  method: method,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify({
    NomRecompense: state.NomRecompense,
    Point: state.Point,
    Abonement: state.Abonement,
    IDPlayer: state.NameEnfant,
    Description: state.Description,
    ID: IDCard,
  }),
 
});



if (response.ok) {
  console.log('Envoi avec succès');
  navigate(`/Compte/${param.User}/CompteParent/Recompense`);
} else {
  console.log('Erreur envoi form data');
  // setState(prevState => ({ ...prevState, NomRecompense: '', Point: 0, Abonement: 0, NameEnfant: '', Description: '' }));
} 
      } else {
        console.log('Tous les champs sont requis');
      }
    } catch (error) {
      console.error('Erreur requête :', error);
    }
  };

  const SupEnregistrement = async () => {
    try { // supprimer récompense  grace à un ID
       //const IDs = 11// remetre ID
     if (state.NomRecompense !== '' && state.Point !== 0 && state.NameEnfant !== ''&& IDCard !== '' ) {
        const options = {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json; charset=utf-8', 
          },
          body: JSON.stringify({        
            id: IDCard,                    
          }), 
        };
        const response = await fetch(`http://192.168.1.116:8082/SupresionRecompense/${User}`, options); // fetch
        if (!response.ok) {
          console.log('Erreur dans la suppression');              
        } else {
          console.log('Suppression avec succès');
          navigate(`/Compte/${param.User}/CompteParent/Recompense`)
        }
      }else{
        alert('les champs ne sont pas remplis')
      }
    } catch (error) {
      console.error('champs non remplie')
    }
  };
  

  return (
    <View>
    
    <TouchableOpacity style={styles.iconButton} onPress={() => navigate(`/Compte/${param.User}/CompteParent/Recompense`)}>   
    <Svg width="27" height="24" viewBox="0 0 27 24" fill="none" style={styles.icon}>
        <Path d="M1.21875 12.8047L11.5312 22.6484C12.1172 23.1758 12.9961 23.1758 13.5234 22.5898C14.0508 22.0039 14.0508 21.125 13.4648 20.5977L5.67188 13.1562H25.5938C26.4141 13.1562 27 12.5703 27 11.75C27 10.9883 26.4141 10.3438 25.5938 10.3438H5.67188L13.4648 2.96094C14.0508 2.43359 14.0508 1.49609 13.5234 0.96875C12.9961 0.382812 12.0586 0.382812 11.5312 0.910156L1.21875 10.7539C0.925781 11.0469 0.75 11.3984 0.75 11.75C0.75 12.1602 0.925781 12.5117 1.21875 12.8047Z" fill="#050505"/>
    </Svg>    
    </TouchableOpacity>

<TouchableOpacity  style={[styles.supprimerButton, ModificationValue === "0" && { opacity: 0 }]} disabled={ModificationValue === '0'} onPress={SupEnregistrement}>
<LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>Supprimer Récompense</Text>
  </LinearGradient>
</TouchableOpacity>


      <View>
        { state.Abonement === 0 && paramchamps !== undefined?(
        <>
              <Text style={styles.sectionTitle}>Recompense</Text>
            <TextInput
  style={styles.input}
  placeholder="Nom de la tâche"
  keyboardType="default"
  value= {state.NomRecompense }
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
  placeholder="Récompense"
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

{/* <View>
<Text style={styles.sectionTitle}>Choix enfants</Text>
{state.playerData && state.playerData.map((item: PlayerData, index: number) => (
  <TouchableOpacity style={styles.card} key={index}>
    <RNPickerSelect
      onValueChange={(value) => handleChange('NameEnfant', value)}
      items={[{
        label: item.Name,
        value: item.idPlayer.toString(),
      }]}
      placeholder="Choix de l'enfant"
      value={state.NameEnfant}
      style={pickerSelectStyles}
    />
  </TouchableOpacity>
))}
</View> */}
            {/* <Button title="Valider" onPress={ChampsRemplie} />  */}
            <TouchableOpacity style={styles.button} onPress={ChampsRemplie}>
        <LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>Valider</Text>
          </LinearGradient>  
        </TouchableOpacity>
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
  button: {
    width: 20,
    height: 50,
    backgroundColor: 'black', 
    marginLeft: 200,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#FAB322', 
  },
  activeTab: {
    backgroundColor: 'lightblue',
  },
  linearGradient: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Aligne les éléments au début
    paddingTop: 35,
},

icon: {
    marginRight: 10, // Ajoute de la marge à droite de l'icône
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
 
  // retourButton: {  
  //   marginTop: 25,
  //   backgroundColor: 'black', 
  //   borderRadius: 8, 
  //   paddingVertical: 8, 
  //   paddingHorizontal: 10, 
  //   alignItems: 'center', 
  //   borderColor: 'white',
  //   borderWidth: 1, 
  //   width: 100, 
  // },
  
  supprimerButton: {  
    width: 200,
    height: 50,
    backgroundColor: 'black', 
    marginLeft: 200,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#FAB322', 
  },
  
  
  buttonText: {
    color: '#FFFFFF', 
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