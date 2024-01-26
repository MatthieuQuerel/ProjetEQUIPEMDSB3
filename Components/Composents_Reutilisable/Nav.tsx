import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

interface IProps {}

const NavBar: React.FC<IProps> = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log("Compte Parent")}>
        <Link to='/Compte/CompteParent'>
          <Text style={styles.buttonText}>Compte Parent</Text>
        </Link>
      </TouchableOpacity>

      <TouchableOpacity  onPress={() => console.log("Tache")}>
        <Link to='/Compte/CompteParent/Tache'>
          <Text style={styles.buttonText}>Tache</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    
    flexDirection: 'row',
    justifyContent: 'space-around',
   
    width: 400,
    backgroundColor: 'white',
    height: 70,
  },

  buttonText: {
    backgroundColor: '#007BFF',
    color: 'white',
    paddingTop: 13,
    width: 120,
    height: 50,
    fontSize: 16,
    textAlign: 'center',
   
  },
});

export default NavBar;

