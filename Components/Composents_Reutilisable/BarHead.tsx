// import React,{ useState } from 'react';
// import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
// import Svg, { Path } from 'react-native-svg';
// import Notification from '../Composents_Reutilisable/Notification'
// import { useParams } from 'react-router-dom'; 
// interface BarHeadProps {
//   // Assurez-vous que logoSource n'est pas undefined
// }

// const BarHead: React.FC<BarHeadProps> = () => {

//   const  param = useParams()
//   const User = param.User 
//   const [notifications, setNotifications] = useState(0);
//   const [showNotification, setShowNotification] = useState(false); // État pour afficher ou masquer la notification

  

//   const handleNotificationDismiss = () => {
//     setShowNotification(false); // Masquer la notification lorsque vous appuyez dessus
//   };
//   return (
//     <View style={styles.container}>
//       <Image  source={require('../../assets/Logo.png')} 
//         style={styles.logo}
//       /> 
     
//      <TouchableOpacity style={styles.button} onPress={handleNotificationDismiss}>
//      <Svg width="60" height="40" viewBox="0 0 23 24" fill="none">
//   <Path d="M11.5 0C12.2969 0 13 0.703125 13 1.5V2.4375C16.4219 3.09375 19 6.14062 19 9.75V10.6406C19 12.8438 19.7969 15 21.25 16.6406L21.5781 17.0156C22 17.4844 22.0938 18.0938 21.8594 18.6562C21.625 19.1719 21.0625 19.5 20.5 19.5H2.5C1.89062 19.5 1.32812 19.1719 1.09375 18.6562C0.859375 18.0938 0.953125 17.4844 1.375 17.0156L1.70312 16.6406C3.15625 15 4 12.8438 4 10.6406V9.75C4 6.14062 6.57812 3.09375 10 2.4375V1.5C10 0.703125 10.6562 0 11.5 0ZM13.6094 23.1562C13.0469 23.7188 12.2969 24 11.5 24C10.7031 24 9.90625 23.7188 9.34375 23.1562C8.78125 22.5938 8.5 21.7969 8.5 21H11.5H14.5C14.5 21.7969 14.1719 22.5938 13.6094 23.1562Z" fill="#F4B322"/>
// </Svg>
//       </TouchableOpacity>
//       {/* Afficher la notification si showNotification est vrai */}
//       {showNotification && (
//         <Notification  isVisible={showNotification} onDismiss={handleNotificationDismiss},User />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row', // Disposition en ligne pour placer les éléments côte à côte
//     justifyContent: 'space-between', // Pour que les éléments soient espacés équitablement
//     alignItems: 'center',
//     paddingTop: 10, 
//     paddingHorizontal: 20, 
//     marginBottom: 40,
//   },
//   logo: {
//     width: 230, 
//     height: 70, 
//   },
//   button: {
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//   },

// });

// export default BarHead;
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Notification from '../Composents_Reutilisable/Notification';
import { useParams } from 'react-router-dom'; 

interface BarHeadProps {
  // Assurez-vous que logoSource n'est pas undefined
}

const BarHead: React.FC<BarHeadProps> = () => {
  const param = useParams();
  const User = param.User; 
  const [showNotification, setShowNotification] = useState(false);

  const handleNotificationDismiss = () => {
    setShowNotification(false);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logo.png')} style={styles.logo} />
      <TouchableOpacity style={styles.button} onPress={() => setShowNotification(true)}>
        <Svg width="60" height="40" viewBox="0 0 23 24" fill="none">
          <Path d="M11.5 0C12.2969 0 13 0.703125 13 1.5V2.4375C16.4219 3.09375 19 6.14062 19 9.75V10.6406C19 12.8438 19.7969 15 21.25 16.6406L21.5781 17.0156C22 17.4844 22.0938 18.0938 21.8594 18.6562C21.625 19.1719 21.0625 19.5 20.5 19.5H2.5C1.89062 19.5 1.32812 19.1719 1.09375 18.6562C0.859375 18.0938 0.953125 17.4844 1.375 17.0156L1.70312 16.6406C3.15625 15 4 12.8438 4 10.6406V9.75C4 6.14062 6.57812 3.09375 10 2.4375V1.5C10 0.703125 10.6562 0 11.5 0ZM13.6094 23.1562C13.0469 23.7188 12.2969 24 11.5 24C10.7031 24 9.90625 23.7188 9.34375 23.1562C8.78125 22.5938 8.5 21.7969 8.5 21H11.5H14.5C14.5 21.7969 14.1719 22.5938 13.6094 23.1562Z" fill="#EB4651"/>
        </Svg>
      </TouchableOpacity>
      {showNotification && User && <Notification isVisible={true} onDismiss={handleNotificationDismiss} User={User} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  logo: {
    width: 120,
    height: 40,
  },
  button: {
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BarHead;

