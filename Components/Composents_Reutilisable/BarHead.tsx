import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

interface BarHeadProps {
  // Assurez-vous que logoSource n'est pas undefined
}

const BarHead: React.FC<BarHeadProps> = () => {


  const [notifications, setNotifications] = React.useState(0);

  const handleNotificationPress = () => {
    // Logique pour gérer les notifications
    setNotifications(notifications + 1);
  };

  return (
    <View style={styles.container}>
      <Image  source={require('../../assets/Logo.png')} 
        style={styles.logo}
      />
      <TouchableOpacity style={styles.button} onPress={handleNotificationPress}>
        <Text style={styles.buttonText}>Notification ({notifications})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    width: 400, 
    backgroundColor: 'white', 
  },
  logo: {
    width: 250, 
    height: 80, 
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BarHead;
