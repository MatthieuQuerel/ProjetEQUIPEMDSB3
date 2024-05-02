import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,ScrollView} from 'react-native';
import { useNavigate } from 'react-router-native';

interface PolitiqueConfidentialiteProps {}

const PolitiqueConfidentialite: React.FC<PolitiqueConfidentialiteProps> = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate(`/`)}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
      <ScrollView horizontal={false}>
      <Text style={styles.title}>Politique de Confidentialité</Text>
      <Text style={styles.content}>
        Responsable de Traitement : Puly {'\n'}
        Adresse : 4 Chem. de la Chatterie, 44800 Saint-Herblain {'\n'}
        E-mail de contact : Puly.contact@gmail.com {'\n'}
        Téléphone : 02 40 89 85 63 {'\n\n'}
        Finalités du Traitement des Données {'\n\n'}
        Les données collectées sont utilisées dans le but de : {'\n'}
        - Gérer les comptes utilisateurs {'\n'}
        - Personnaliser l'expérience utilisateur {'\n'}
        - Communiquer avec les utilisateurs {'\n'}
        - Améliorer et maintenir notre application {'\n'}
        - Fins commerciales et marketing {'\n\n'}
        Base Légale du Traitement des Données {'\n\n'}
        Le traitement des données personnelles est fondé sur : {'\n'}
        - Le consentement de l'utilisateur lors de l'inscription à l'application, étant donné que la collecte est obligatoire. {'\n\n'}
        Caractère Obligatoire ou Facultatif de la Collecte des Données {'\n\n'}
        La collecte des données est obligatoire pour la création d'un compte utilisateur. {'\n\n'}
        Destinataires des Données {'\n\n'}
        Les données collectées peuvent être communiquées à : {'\n'}
        - Firebase, notre hébergeur situé au 600 Amphitheatre Parkway, Mountain View, Californie, USA. Vous pouvez contacter Firebase pour toute question concernant la gestion des données hébergées sur leur plateforme via leur support : Lien vers le support de Firebase {'\n\n'}
        Durée de Conservation des Données {'\n\n'}
        Les données personnelles sont conservées pendant une période de 5 ans, conformément à la législation RGPD. {'\n\n'}
        Droits des Personnes Concernées {'\n\n'}
        Les personnes concernées disposent des droits suivants : {'\n'}
        - Droit d'accès {'\n'}
        - Droit de rectification {'\n'}
        - Droit d'effacement {'\n'}
        - Droit à la limitation du traitement {'\n\n'}
        Coordonnées du DPO (Délégué à la Protection des Données) ou du Référent {'\n\n'}
        Vous pouvez contacter notre DPO, Matthieu Querel, à l'adresse suivante : {'\n'}
        Matthieu Querel {'\n'}
        E-mail : Matthieu.querel@puly.com {'\n'}
        Téléphone : 02 30 49 33 29 {'\n\n'}
        Droit d'Introduire une Réclamation auprès de la CNIL {'\n\n'}
        Si vous estimez que le traitement de vos données personnelles n'est pas conforme à la réglementation, vous avez le droit d'introduire une réclamation auprès de la CNIL. {'\n\n'}
        Informations Complémentaires {'\n\n'}
        Nous collectons les données suivantes lors de votre inscription à notre application : {'\n'}
        - Nom {'\n'}
        - Prénom {'\n'}
        - Date de naissance {'\n'}
        - Sexe {'\n'}
        - E-mail {'\n'}
      </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});

export default PolitiqueConfidentialite;
