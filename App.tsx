import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [count,setCount] = useState(0)
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start workeding on your app!</Text>
      
      <Text>{count}</Text>
      <Button title = 'test' onPress={()=> setCount(count + 1)}/>
      <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
