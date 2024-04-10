import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useParams } from 'react-router-dom'; 

const Paiement = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const apiKey = 'sk_test_51OQ4atDvUzqU5phQNI86jWKdxTAoXeaUeb7gpO5LyDxGF86JtpToYxON07CCP71qlP5wCcHohWnE36MhoBD8KZtL00j2wUiGl6';

  const { confirmPayment } = useStripe();
  

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage(''); 
   
    const timer = setTimeout(async () => {
      try {
       
      } catch (error : any) {
        console.error('Erreur :', error);
        setErrorMessage(error.message || 'Une erreur est survenue.');
      } finally {
        setLoading(false); 
      }
    }, 1000);

    try {
     
      const response = await fetch(`http://192.168.1.116:8082/Abonnement/${params.User}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`, 
        },
        body: JSON.stringify({ payment_method: 'pm_card_visa' }),
      });

      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de la récupération du client secret.');
      }

      const data = await response.json();
      console.log(data)
      setClientSecret(data.clientSecret);
      console.log(data.clientSecret)
     // const ClientSecret = data.clientSecret;
      if (clientSecret === ''){
        console.log('Paiement non confirmé')
        setErrorMessage('Une erreur est survenue lors du paiement.');
      }else{
        console.log('Paiement confirmé')
        setErrorMessage('Paiement confirmé');
      }
      // const { paymentIntent, error } = await confirmPayment(ClientSecret);
      // console.log( paymentIntent);
      // console.log(data.clientSecret)
      // console.log( ClientSecret);
  
      // if (error) {
       
      //   console.error('Erreur de confirmation du paiement :', error);
      //   setErrorMessage(error.message || 'Une erreur est survenue lors du paiement.');
      //   throw error; // Relancer pour une gestion potentielle côté serveur
      // }

      // console.log('Paiement confirmé :', paymentIntent);


    } catch (error : any) {
      console.error('Erreur :', error);
      setErrorMessage(error.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false); 
      clearTimeout(timer);
    }
  };


  

  return (
    <View style={styles.container}>
      <Text>Premium :</Text>
      <Text>12€</Text>
      
      <View style={styles.cardFieldContainer}>
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: 'Numéro de carte',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={styles.cardField}
        />
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <Button title={loading ? 'Chargement...' : 'Valider'} disabled={loading} onPress={handleSubmit} />
      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
     
    },
    cardFieldContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: 10,
    },
    cardField: {
      width: '100%',
      height: 50,
    },
  });

export default Paiement;
