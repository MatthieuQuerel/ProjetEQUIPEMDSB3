import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ButtonNav from "./Button";
import { useParams } from 'react-router-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';

interface OngletTacheProps {};

const OngletTache: React.FC<OngletTacheProps> = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [tasks, setTasks] = useState<any[]>([]); 
  const params = useParams();
  const [errorTache, setErrorTache] = useState(""); 

  useEffect(() => {
    let Valide = 0; 

    if (activeTab === 2) {
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
       
        setTasks(data); // Met à jour l'état avec les données reçues
      })
      .catch(err => {
        console.log(err);
        console.log("Impossible d'afficher les informations !!");
        setErrorTache("Impossible d'afficher les informations !!");
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
          <Text style={styles.bold}>A faire</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeTab(2)} style={[styles.tabButton, activeTab === 2 && styles.activeTab]}>
          <Text style={styles.bold} >Faites</Text>
        </TouchableOpacity>
      </View>

      <View>
        {activeTab === 1 && (
          <React.Fragment>
            <Text style={[styles.titre]}>Tâches actives</Text>
            {errorTache && <Text style={{ color: 'red' }}>{errorTache}</Text>}
            <ScrollView style={styles.scrollView}>
              {tasks.map((task, index) => (
                <View key={index} style={[styles.card, { backgroundColor: index % 2 === 0 ? '#FFFF' : '#EB4651' }]}>
                  <View style={styles.row}>
                 <SvgXml xml={task.ImageSVG} />
                 <View style={{marginLeft: 10}}>
                <Text style={[styles.cardText, styles.bold, styles.center, index % 2 === 1 ? { color: 'white' } : null]}>{task.Rulse}</Text>
               <Text style={[styles.cardText, styles.bold, styles.center, index % 2 === 1 ? { color: 'white' } : null]}>{task.Description}</Text>
               <Text style={[styles.cardText, styles.bold, styles.center, index % 2 === 1 ? { color: 'white' } : null]}>Tâche pour: {task.Name}</Text>
              </View>
              </View>
                <View style={styles.row}>
                <View style={styles.iconTextContainer}>
                  {index % 2 === 1 ? (
               <Svg width="16" height="15" viewBox="0 0 16 15" fill="none">
               <Path d="M8 0.75C10.4883 0.75 12.7852 2.08984 14.043 4.25C15.3008 6.4375 15.3008 9.08984 14.043 11.25C12.7852 13.4375 10.4883 14.75 8 14.75C5.48438 14.75 3.1875 13.4375 1.92969 11.25C0.671875 9.08984 0.671875 6.4375 1.92969 4.25C3.1875 2.08984 5.48438 0.75 8 0.75ZM7.34375 4.03125V7.75C7.34375 7.96875 7.45312 8.1875 7.61719 8.29688L10.2422 10.0469C10.543 10.2656 10.9531 10.1836 11.1719 9.88281C11.3633 9.58203 11.2812 9.17188 10.9805 8.95312L8.65625 7.42188V4.03125C8.65625 3.67578 8.35547 3.375 8 3.375C7.61719 3.375 7.34375 3.67578 7.34375 4.03125Z" fill="#F4B322"/>
                </Svg>
                  ) : (
              <Svg width="16" height="15" viewBox="0 0 16 15" fill="none">
              <Path d="M8 0.75C10.4883 0.75 12.7852 2.08984 14.043 4.25C15.3008 6.4375 15.3008 9.08984 14.043 11.25C12.7852 13.4375 10.4883 14.75 8 14.75C5.48438 14.75 3.1875 13.4375 1.92969 11.25C0.671875 9.08984 0.671875 6.4375 1.92969 4.25C3.1875 2.08984 5.48438 0.75 8 0.75ZM7.34375 4.03125V7.75C7.34375 7.96875 7.45312 8.1875 7.61719 8.29688L10.2422 10.0469C10.543 10.2656 10.9531 10.1836 11.1719 9.88281C11.3633 9.58203 11.2812 9.17188 10.9805 8.95312L8.65625 7.42188V4.03125C8.65625 3.67578 8.35547 3.375 8 3.375C7.61719 3.375 7.34375 3.67578 7.34375 4.03125Z" fill="#EB4651"/>
                 </Svg>
                    )}
                    <Text style={[styles.cardText, styles.bold, styles.center, index % 2 === 1 ? { color: 'white' } : null]}> {task.temporellement}</Text>
                  </View>
                  <View style={styles.iconTextContainer}>
                     {index % 2 === 1 ?(
                    <Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                      <Path d="M4.42773 4.625H7.06445C9.37891 0.787109 12.9824 0.640625 15.1504 1.05078C15.502 1.10938 15.7656 1.37305 15.8242 1.72461C16.2344 3.89258 16.0879 7.49609 12.25 9.81055V12.4473C12.25 13.1797 11.8398 13.8828 11.1953 14.2637L8.61719 15.7871C8.38281 15.9336 8.11914 15.9336 7.91406 15.7871C7.67969 15.6699 7.5625 15.4355 7.5625 15.1719V11.832C7.5625 11.1582 7.29883 10.5137 6.83008 10.0449C6.36133 9.57617 5.7168 9.3125 5.04297 9.3125H1.70312C1.43945 9.3125 1.20508 9.19531 1.08789 8.96094C0.941406 8.75586 0.941406 8.49219 1.08789 8.25781L2.61133 5.67969C2.99219 5.03516 3.69531 4.625 4.42773 4.625ZM13.4219 4.625C13.4219 4.21484 13.1875 3.83398 12.8359 3.62891C12.4551 3.42383 12.0156 3.42383 11.6641 3.62891C11.2832 3.83398 11.0781 4.21484 11.0781 4.625C11.0781 5.06445 11.2832 5.44531 11.6641 5.65039C12.0156 5.85547 12.4551 5.85547 12.8359 5.65039C13.1875 5.44531 13.4219 5.06445 13.4219 4.625ZM5.86328 14.6445C4.86719 15.6699 2.93359 15.8457 1.82031 15.875C1.35156 15.9043 0.970703 15.5234 1 15.0547C1.0293 13.9414 1.20508 12.0078 2.23047 11.0117C3.22656 10.0156 4.86719 10.0156 5.86328 11.0117C6.85938 12.0078 6.85938 13.6484 5.86328 14.6445ZM4.48633 13.5898C4.83789 13.2676 4.83789 12.7109 4.48633 12.3887C4.16406 12.0371 3.60742 12.0371 3.28516 12.3887C2.99219 12.6816 2.9043 13.209 2.875 13.5898C2.875 13.8242 3.05078 14 3.28516 14C3.66602 13.9707 4.19336 13.8828 4.48633 13.5898Z" fill="#F4B322"/>
                    </Svg>
                  ) : (
                  <Svg width="17" height="16" viewBox="0 0 17 16" fill="none" >
                  <Path d="M4.42773 4.625H7.06445C9.37891 0.787109 12.9824 0.640625 15.1504 1.05078C15.502 1.10938 15.7656 1.37305 15.8242 1.72461C16.2344 3.89258 16.0879 7.49609 12.25 9.81055V12.4473C12.25 13.1797 11.8398 13.8828 11.1953 14.2637L8.61719 15.7871C8.38281 15.9336 8.11914 15.9336 7.91406 15.7871C7.67969 15.6699 7.5625 15.4355 7.5625 15.1719V11.832C7.5625 11.1582 7.29883 10.5137 6.83008 10.0449C6.36133 9.57617 5.7168 9.3125 5.04297 9.3125H1.70312C1.43945 9.3125 1.20508 9.19531 1.08789 8.96094C0.941406 8.75586 0.941406 8.49219 1.08789 8.25781L2.61133 5.67969C2.99219 5.03516 3.69531 4.625 4.42773 4.625ZM13.4219 4.625C13.4219 4.21484 13.1875 3.83398 12.8359 3.62891C12.4551 3.42383 12.0156 3.42383 11.6641 3.62891C11.2832 3.83398 11.0781 4.21484 11.0781 4.625C11.0781 5.06445 11.2832 5.44531 11.6641 5.65039C12.0156 5.85547 12.4551 5.85547 12.8359 5.65039C13.1875 5.44531 13.4219 5.06445 13.4219 4.625ZM5.86328 14.6445C4.86719 15.6699 2.93359 15.8457 1.82031 15.875C1.35156 15.9043 0.970703 15.5234 1 15.0547C1.0293 13.9414 1.20508 12.0078 2.23047 11.0117C3.22656 10.0156 4.86719 10.0156 5.86328 11.0117C6.85938 12.0078 6.85938 13.6484 5.86328 14.6445ZM4.48633 13.5898C4.83789 13.2676 4.83789 12.7109 4.48633 12.3887C4.16406 12.0371 3.60742 12.0371 3.28516 12.3887C2.99219 12.6816 2.9043 13.209 2.875 13.5898C2.875 13.8242 3.05078 14 3.28516 14C3.66602 13.9707 4.19336 13.8828 4.48633 13.5898Z" fill="#EB4651"/>
                  </Svg>
                     )}
                    <Text style={[styles.cardText, styles.bold, styles.center, index % 2 === 1 ? { color: 'white' } : null]}> {task.point}</Text>
                  </View>
                </View>
              </View>
              
              ))}
            </ScrollView>
            <View>
              <ButtonNav name="+" chemin={`/Compte/${params.User}/CompteParent/Tache/AjouterTache`} />
            </View>
          </React.Fragment>
        )}
        {activeTab === 2 && (
          <React.Fragment>
            <Text  style={[styles.titre]}>Tâches terminées</Text>
            {errorTache && <Text style={{ color: 'red' }}>{errorTache}</Text>}
            <ScrollView style={styles.scrollView}>
              {tasks.map((task, index) => (
                <View key={index} style={[styles.card, { backgroundColor: index % 2 === 0 ? '#FFFF' : '#EB4651' }]}>
                   <View style={styles.row}>
    <SvgXml xml={task.ImageSVG} />
    <View style={{marginLeft: 10}}>
      <Text style={[styles.cardText, styles.bold, styles.center, index % 2 === 1 ? { color: 'white' } : null]}>{task.Rulse}</Text>
      <Text style={[styles.cardText, styles.bold, styles.center, index % 2 === 1 ? { color: 'white' } : null]}>{task.Description}</Text>
      <Text style={[styles.cardText, styles.bold, styles.center, index % 2 === 1 ? { color: 'white' } : null]}>Tâche pour: {task.Name}</Text>
    </View>
  </View>
                <View style={styles.row}>
                  <View style={styles.iconTextContainer}>
                  {index % 2 === 1 ? (
    <Svg width="16" height="15" viewBox="0 0 16 15" fill="none">
      <Path d="M8 0.75C10.4883 0.75 12.7852 2.08984 14.043 4.25C15.3008 6.4375 15.3008 9.08984 14.043 11.25C12.7852 13.4375 10.4883 14.75 8 14.75C5.48438 14.75 3.1875 13.4375 1.92969 11.25C0.671875 9.08984 0.671875 6.4375 1.92969 4.25C3.1875 2.08984 5.48438 0.75 8 0.75ZM7.34375 4.03125V7.75C7.34375 7.96875 7.45312 8.1875 7.61719 8.29688L10.2422 10.0469C10.543 10.2656 10.9531 10.1836 11.1719 9.88281C11.3633 9.58203 11.2812 9.17188 10.9805 8.95312L8.65625 7.42188V4.03125C8.65625 3.67578 8.35547 3.375 8 3.375C7.61719 3.375 7.34375 3.67578 7.34375 4.03125Z" fill="#F4B322"/>
    </Svg>
  ) : (
    <Svg width="16" height="15" viewBox="0 0 16 15" fill="none">
      <Path d="M8 0.75C10.4883 0.75 12.7852 2.08984 14.043 4.25C15.3008 6.4375 15.3008 9.08984 14.043 11.25C12.7852 13.4375 10.4883 14.75 8 14.75C5.48438 14.75 3.1875 13.4375 1.92969 11.25C0.671875 9.08984 0.671875 6.4375 1.92969 4.25C3.1875 2.08984 5.48438 0.75 8 0.75ZM7.34375 4.03125V7.75C7.34375 7.96875 7.45312 8.1875 7.61719 8.29688L10.2422 10.0469C10.543 10.2656 10.9531 10.1836 11.1719 9.88281C11.3633 9.58203 11.2812 9.17188 10.9805 8.95312L8.65625 7.42188V4.03125C8.65625 3.67578 8.35547 3.375 8 3.375C7.61719 3.375 7.34375 3.67578 7.34375 4.03125Z" fill="#EB4651"/>
    </Svg>
  )}
                    <Text style={[styles.cardText, styles.bold, styles.center, index % 2 === 1 ? { color: 'white' } : null]}> {task.temporellement}</Text>
                  </View>
                  <View style={styles.iconTextContainer}>
                     {index % 2 === 1 ?(
                    <Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                      <Path d="M4.42773 4.625H7.06445C9.37891 0.787109 12.9824 0.640625 15.1504 1.05078C15.502 1.10938 15.7656 1.37305 15.8242 1.72461C16.2344 3.89258 16.0879 7.49609 12.25 9.81055V12.4473C12.25 13.1797 11.8398 13.8828 11.1953 14.2637L8.61719 15.7871C8.38281 15.9336 8.11914 15.9336 7.91406 15.7871C7.67969 15.6699 7.5625 15.4355 7.5625 15.1719V11.832C7.5625 11.1582 7.29883 10.5137 6.83008 10.0449C6.36133 9.57617 5.7168 9.3125 5.04297 9.3125H1.70312C1.43945 9.3125 1.20508 9.19531 1.08789 8.96094C0.941406 8.75586 0.941406 8.49219 1.08789 8.25781L2.61133 5.67969C2.99219 5.03516 3.69531 4.625 4.42773 4.625ZM13.4219 4.625C13.4219 4.21484 13.1875 3.83398 12.8359 3.62891C12.4551 3.42383 12.0156 3.42383 11.6641 3.62891C11.2832 3.83398 11.0781 4.21484 11.0781 4.625C11.0781 5.06445 11.2832 5.44531 11.6641 5.65039C12.0156 5.85547 12.4551 5.85547 12.8359 5.65039C13.1875 5.44531 13.4219 5.06445 13.4219 4.625ZM5.86328 14.6445C4.86719 15.6699 2.93359 15.8457 1.82031 15.875C1.35156 15.9043 0.970703 15.5234 1 15.0547C1.0293 13.9414 1.20508 12.0078 2.23047 11.0117C3.22656 10.0156 4.86719 10.0156 5.86328 11.0117C6.85938 12.0078 6.85938 13.6484 5.86328 14.6445ZM4.48633 13.5898C4.83789 13.2676 4.83789 12.7109 4.48633 12.3887C4.16406 12.0371 3.60742 12.0371 3.28516 12.3887C2.99219 12.6816 2.9043 13.209 2.875 13.5898C2.875 13.8242 3.05078 14 3.28516 14C3.66602 13.9707 4.19336 13.8828 4.48633 13.5898Z" fill="#F4B322"/>
                    </Svg>
) : (
<Svg width="17" height="16" viewBox="0 0 17 16" fill="none" >
<Path d="M4.42773 4.625H7.06445C9.37891 0.787109 12.9824 0.640625 15.1504 1.05078C15.502 1.10938 15.7656 1.37305 15.8242 1.72461C16.2344 3.89258 16.0879 7.49609 12.25 9.81055V12.4473C12.25 13.1797 11.8398 13.8828 11.1953 14.2637L8.61719 15.7871C8.38281 15.9336 8.11914 15.9336 7.91406 15.7871C7.67969 15.6699 7.5625 15.4355 7.5625 15.1719V11.832C7.5625 11.1582 7.29883 10.5137 6.83008 10.0449C6.36133 9.57617 5.7168 9.3125 5.04297 9.3125H1.70312C1.43945 9.3125 1.20508 9.19531 1.08789 8.96094C0.941406 8.75586 0.941406 8.49219 1.08789 8.25781L2.61133 5.67969C2.99219 5.03516 3.69531 4.625 4.42773 4.625ZM13.4219 4.625C13.4219 4.21484 13.1875 3.83398 12.8359 3.62891C12.4551 3.42383 12.0156 3.42383 11.6641 3.62891C11.2832 3.83398 11.0781 4.21484 11.0781 4.625C11.0781 5.06445 11.2832 5.44531 11.6641 5.65039C12.0156 5.85547 12.4551 5.85547 12.8359 5.65039C13.1875 5.44531 13.4219 5.06445 13.4219 4.625ZM5.86328 14.6445C4.86719 15.6699 2.93359 15.8457 1.82031 15.875C1.35156 15.9043 0.970703 15.5234 1 15.0547C1.0293 13.9414 1.20508 12.0078 2.23047 11.0117C3.22656 10.0156 4.86719 10.0156 5.86328 11.0117C6.85938 12.0078 6.85938 13.6484 5.86328 14.6445ZM4.48633 13.5898C4.83789 13.2676 4.83789 12.7109 4.48633 12.3887C4.16406 12.0371 3.60742 12.0371 3.28516 12.3887C2.99219 12.6816 2.9043 13.209 2.875 13.5898C2.875 13.8242 3.05078 14 3.28516 14C3.66602 13.9707 4.19336 13.8828 4.48633 13.5898Z" fill="#EB4651"/>
</Svg>

                     )}
                    <Text style={[styles.cardText, styles.bold, styles.center, index % 2 === 1 ? { color: 'white' } : null]}> {task.point}</Text>
                  </View>
                </View>
              </View>
              ))}
            </ScrollView>
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
    padding: 6,
    backgroundColor: '#F4B322',
  },
  tabButton: {
    padding: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row', // Added flexDirection: 'row'
    alignItems: 'center',
    justifyContent: 'center', // Use justifyContent for horizontal alignment
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  activeTab: {
    backgroundColor: '#F4B322',
  },
  titre:{
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color:'#EB4651',
  },
  scrollView: {
    maxHeight: 300, // Définissez une hauteur maximale pour la vue défilante
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 6,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: '#F4B322',
    width: 400, // Définissez la largeur sur 100% pour occuper toute la largeur de la vue défilante
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
});

export default OngletTache;
