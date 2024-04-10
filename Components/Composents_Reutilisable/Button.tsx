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
    backgroundColor: 'black', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: 'orange', 
  },
  buttonText: {
    fontSize: 24, 
    color: 'orange',
  },
});

export default ButtonNav;