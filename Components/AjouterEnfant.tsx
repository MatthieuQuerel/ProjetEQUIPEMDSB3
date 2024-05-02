import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView ,Button} from 'react-native';
import { useNavigate, useParams } from 'react-router-dom'; // Corrected import
import Svg, { Path, Rect } from 'react-native-svg';
interface AjouterEnfantProps {}

const AjouterEnfant: React.FC<AjouterEnfantProps> = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState<string>('');
  const [point, setPoint] = useState<number>(0);
  const [datenaissance, setDatenaissance] = useState<string>('');
  const [sexe, setSexe] = useState<string>('');

  const idCard = params.id ? parseInt(params.id) : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (idCard > 0) {
          const response = await fetch(`http://192.168.1.116:8082/AfficherModification/${idCard}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Échec de la requête pour récupérer les données de récompense');
          }
          const playerData = await response.json();
          if (Array.isArray(playerData) && playerData.length > 0) {
            // Supposons qu'il n'y ait qu'un seul joueur modifié dans la réponse
            const modifiedPlayer = playerData[0];
            setName(modifiedPlayer.name)
            setPoint(modifiedPlayer.point)
            setDatenaissance(modifiedPlayer.age)
            setSexe(modifiedPlayer.typePersone) 
          } else {
            console.error('Aucune donnée de joueur modifié reçue ou tableau vide');
          }
        }
      } catch (error) {
        console.error('Erreur requête :', error);
      }
    }
    fetchData()
  }, [idCard]);
  

  const handleChange = (fieldName: string, value: string | number) => {
    switch (fieldName) {
      case 'name':
        setName(value as string);
        break;
      case 'point':
        const pointValue = parseInt(value as string);
        setPoint(isNaN(pointValue) ? 0 : pointValue);
        break;
      case 'datenaissance':
        setDatenaissance(value as string);
        break;
      case 'sexe':
        setSexe(value as string);
        break;
      default:
        break;
    }
  };

  const ChampsRemplie = async () => {
    try {
      if (name !== '' && point !== 0 && datenaissance !== '' && sexe !== '') {
        let URL;
        let method;
        if (idCard > 0) {
          URL = `http://192.168.1.116:8082/ModificationEnfant/${idCard}`;
          method = 'PUT';
        } else {
          URL = `http://192.168.1.116:8082/AjoutEnfant/${params.User}`;
          method = 'POST';
        }
        const response = await fetch(URL, {
          method: method,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            Name: name,
            Point: point,
            TypePersone: sexe,
            Age: datenaissance,
            ID: idCard
          }),
        });
        if (response.ok) {
          console.log('Envoi avec succès');
          navigate(`/Compte/${params.User}/CompteParent/Profils`)
        } else {
          console.log('Erreur envoi form data');
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
      if (name !== '' && point !== 0 && datenaissance !== '' && idCard !== 0 && sexe !== '') {
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            id: idCard,
          }),
        };
        const response = await fetch(`http://192.168.1.116:8082/SupresionEnfant/${params.User}`, options);
        if (!response.ok) {
          console.log('Erreur dans la suppression');
        } else {
          console.log('Suppression avec succès');
          navigate(`/Compte/${params.User}/CompteParent/Profils`)
        }
      } else {
        alert('les champs ne sont pas remplis')
      }
    } catch (error) {
      console.error('champs non remplie')
    }
  };


  return (
    <ScrollView>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate(`/Compte/${params.User}/CompteParent/Profils`)} style={styles.iconButton}>
        <Svg width="27" height="24" viewBox="0 0 27 24" fill="none" style={styles.icon}>
          <Path d="M1.21875 12.8047L11.5312 22.6484C12.1172 23.1758 12.9961 23.1758 13.5234 22.5898C14.0508 22.0039 14.0508 21.125 13.4648 20.5977L5.67188 13.1562H25.5938C26.4141 13.1562 27 12.5703 27 11.75C27 10.9883 26.4141 10.3438 25.5938 10.3438H5.67188L13.4648 2.96094C14.0508 2.43359 14.0508 1.49609 13.5234 0.96875C12.9961 0.382812 12.0586 0.382812 11.5312 0.910156L1.21875 10.7539C0.925781 11.0469 0.75 11.3984 0.75 11.75C0.75 12.1602 0.925781 12.5117 1.21875 12.8047Z" fill="#050505" />
        </Svg>
      </TouchableOpacity>
      
        <TouchableOpacity style={styles.validerButton} onPress={SupEnregistrement}>
          <Text style={styles.buttonText}>Suprimer Enfant</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Ajouter un enfant</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom de l'enfant"
          value={name}
          onChangeText={(text) => handleChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Point de début"
          keyboardType="numeric"
          value={point !== undefined ? point.toString() : ''}
          onChangeText={(text) => handleChange('point', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date de naissance ex:28/02/2002"
          value={datenaissance}
          onChangeText={(text) => handleChange('datenaissance', text)}
        />
        <View style={styles.radioContainer}>
  <View style={styles.radioGroupContainer}>
    <TouchableOpacity style={styles.radioButton} onPress={() => handleChange('sexe', 'Garçon')}>
      <Text>Garçon</Text>
      {sexe === 'Garçon' && <Text>X</Text>}
    </TouchableOpacity>
    <TouchableOpacity style={styles.radioButton} onPress={() => handleChange('sexe', 'Fille')}>
      <Text>Fille</Text>
      {sexe === 'Fille' && <Text>X</Text>}
    </TouchableOpacity>
  </View>
</View>

        <View style={[styles.buttonContainer, { justifyContent: 'center', alignItems: 'center' }]}>
  <Button title="Valider" onPress={ChampsRemplie} color="black" />
</View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  icon: {
    marginRight: 10, // Ajoute de la marge à droite de l'icône
  },
  buttonContainer: {
    padding: 12,
    borderRadius: 8,
    width: 400,
  },
  radioGroupContainer: {
    borderWidth: 1, // Épaisseur de la bordure
    borderColor: '#F4B322', // Couleur de la bordure
    borderRadius: 8, // Rayon des coins du cadre
    padding: 8, // Espace intérieur du cadre
    width: 200,
    justifyContent: 'center',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconButton: {
    marginBottom: 10, // Ajoute de la marge en bas de l'icône
  },
  input: {
    height: 40,
    borderColor: '#F4B322',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
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

  validerButton: {
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
    color: '#F4B322', // Couleur du texte du bouton
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default AjouterEnfant;
