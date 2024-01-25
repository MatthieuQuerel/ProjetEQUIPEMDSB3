import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

interface ButtonNav {
  name: string;
  chemin: string;
}

const ButtonNav: React.FC<ButtonNav> = ({ name, chemin }) => (
  <TouchableOpacity style={styles.button} onPress={() => console.log(`${name} clicked`)}>
    <Link to={chemin}>
      <Text style={styles.buttonText}>{name}</Text>
    </Link>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: '100%',
    height: 80,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
   
    color: 'blue',
  },
});

export default ButtonNav;