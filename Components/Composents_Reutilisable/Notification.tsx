import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface NotificationProps {
  isVisible: boolean;
  onDismiss: () => void;
  User: string;
}

interface PlayerRecompenseNotification {
  PlayerName: string;
  PlayerPoints: number;
  Recompense: string;
  RewardCreationDate: string;
}

const Notification: React.FC<NotificationProps> = ({ isVisible, onDismiss, User }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [playerRecompenseNotification, setPlayerRecompenseNotification] = useState<PlayerRecompenseNotification[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isVisible) {
        setModalVisible(true);
        try {
          const responseUser = await fetch(`http://192.168.1.116:8082/playerRecompenseNotification/${User}`);
          if (!responseUser.ok) {
            throw new Error('Échec de la requête pour récupérer les données de l\'utilisateur');
          }
          const userData = await responseUser.json();
          setPlayerRecompenseNotification(userData);
        } catch (error) {
          console.error('Erreur lors de la récupération des données :', error);
        }
      } else {
        dismissNotification();
      }
    };

    fetchData();

    return () => {
      setPlayerRecompenseNotification([]);
    };
  }, [isVisible, User]);

  const dismissNotification = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      onDismiss();
    });
  };
  
  return (
    <View>
      <Modal isVisible={isVisible} onBackdropPress={dismissNotification}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Notifications :</Text>
          <ScrollView horizontal={false}>
            {playerRecompenseNotification.map((notification, index) => (
              <TouchableOpacity key={index} onPress={dismissNotification}>
                <View style={styles.card}>
                  <Text style={styles.cardText}>Player: {notification.PlayerName}</Text>
                  <Text style={styles.cardText}>Points: {notification.PlayerPoints}</Text>
                  <Text style={styles.cardText}>Récompense: {notification.Recompense}</Text>
                  <Text style={styles.cardText}>Date de création: {notification.RewardCreationDate}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Notification;
