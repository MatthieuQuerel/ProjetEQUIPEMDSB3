import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NavBar from './Composents_Reutilisable/Nav';
import { useParams } from 'react-router-native';
import BarHead from './Composents_Reutilisable/BarHead';

interface CompteStats {
  // email: string;
}

const Stats: React.FC<CompteStats> = () => {
  const params = useParams();
  console.log(params.User);

  return (
    <View style={styles.container}>
      <BarHead />
      <Text style={styles.appName}>State</Text>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Stats;
