// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import NavBar from './Composents_Reutilisable/Nav';
// import { useParams } from 'react-router-native';
// import BarHead from './Composents_Reutilisable/BarHead';

// interface CompteStats {
//   // email: string;
// }

// const Stats: React.FC<CompteStats> = () => {
//   const params = useParams();
//   console.log(params.User);

//   // Données de statistiques
//   const stats = [
//     { label: 'Enfant 1', value: 10 },
//     { label: 'Enfant 2', value: 20 },
//     { label: 'Enfant 3', value: 15 },
//     // Ajoutez d'autres statistiques au besoin
//   ];
//   const maxValue = Math.max(...stats.map(stat => stat.value));

//   // Calculer la largeur de chaque barre
//   const barWidth = 30;

//   // Calculer l'espace horizontal entre les barres
//   const horizontalSpacing = 20;

//   // Calculer la largeur totale du diagramme
//   const totalWidth = (barWidth + horizontalSpacing) * stats.length;

//   // Position du premier élément du diagramme
//   const initialX = 20;

//   return (
//     <View style={styles.container}>
//       <BarHead />
//       <Text style={styles.appName}>State</Text>
//       <View style={styles.statsContainer}>
//         <Text style={styles.statsTitle}>Statistiques</Text>
       
//         {stats.map((stat, index) => (
//           <View key={index} style={styles.statRow}>
//             <Text style={styles.statLabel}>{stat.label}</Text>
//             <Text style={styles.statValue}>{stat.value}</Text>
//           </View>
//         ))}
//       </View>
      
//       <NavBar />
     
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
   
//   },
//   appName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   statsContainer: {
//     marginTop: 20,
//   },
//   statsTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
 
//   statRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   statLabel: {
//     fontSize: 16,
//   },
//   statValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './Composents_Reutilisable/Nav';
import { useParams } from 'react-router-native';
import BarHead from './Composents_Reutilisable/BarHead';
import { BarChart } from 'react-native-chart-kit'; 

interface CompteStats {}
interface UserStat {
  name: string;
  point: number;
}

const Stats: React.FC<CompteStats> = () => {
  const params = useParams();
  console.log(params.User);

  // Déclarez defaultStats et setDefaultStats à l'aide de useState
  const [defaultStats, setDefaultStats] = useState<Array<{ label: string; value: number; }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.User) {
          const responseUser = await fetch(`http://192.168.1.116:8082/stat/${params.User}`);
          if (!responseUser.ok) {
            throw new Error('Échec de la requête pour récupérer les données de l\'utilisateur');
          }
          
          const userData = await responseUser.json();
          

          // Si aucune donnée n'est disponible, définissez une valeur par défaut
          const formattedData = userData.length > 0 ? 
            userData.map((userStat: UserStat) => ({ label: userStat.name, value: userStat.point })) :
            [{ label: "Introuvable", value: 0 }];

          // Mettre à jour l'état avec les nouvelles données
          setDefaultStats(formattedData);
          console.log(formattedData.point)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };
  
    fetchData();
  }, [params.User]); // Retirez defaultStats des dépendances
  
  // Afficher les données dans la console
  defaultStats.forEach(userStat => console.log(`Nom : ${userStat.label}, Point : ${userStat.value}`));

  const maxValue = Math.max(...defaultStats.map(userStat => userStat.value));

  // Calculer la largeur de chaque barre
  const barWidth = 40;

  // Calculer l'espace horizontal entre les barres
  const horizontalSpacing = 180;

  // Calculer la largeur totale du diagramme
  const totalWidth = (barWidth + horizontalSpacing) * defaultStats.length;

  // Position du premier élément du diagramme
  const initialX = 20;
  
  return (
    <View style={styles.container}>
      <BarHead />
      <Text style={styles.appName}>Statistiques</Text>
      <View style={styles.statsContainer}>
        
        {/* Ajouter le diagramme en bâtons ici */}
        <BarChart
          data={{
            labels: defaultStats.map(userStat => userStat.label),
            datasets: [
              {
                data: defaultStats.map(userStat => userStat.value),
              },
            ],
          }}
          width={totalWidth} // Utilisez la largeur totale calculée pour le diagramme
          height={400} 
          yAxisLabel={''} 
          yAxisSuffix={' '} 
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(235, 70, 81, ${opacity})`,
            style: {
              borderRadius: 20,
            },
          }}
          style={{
            marginVertical: 50,
            borderRadius: 20,
          }}
        />
      </View>
      
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    marginTop: 20,
  },
});

export default Stats;
