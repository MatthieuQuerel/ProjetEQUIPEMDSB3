import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importer LinearGradient depuis expo-linear-gradient

interface ButtonNavProps {
  name: string;
  chemin: string;
}

const ButtonNav: React.FC<ButtonNavProps> = ({ name, chemin }) => (
  <TouchableOpacity style={styles.button} onPress={() => console.log(`${name} clicked`)}>
    <Link to={chemin}>
      <LinearGradient colors={['#EB4651', '#F4B322']} style={styles.linearGradient}>
        <Text style={styles.buttonText}>{name}</Text>
      </LinearGradient>
    </Link>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'orange',
  },
  linearGradient: {
    width: 400,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFF',
  },
});

export default ButtonNav;
