import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate ,useParams} from 'react-router-native';

interface CGVProps {}

const CGV: React.FC<CGVProps> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const User = params.User;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate(`/Compte/${params.User}/CompteParent/Recompense`)}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Conditions Générales de Vente (CGV)</Text>
      <Text style={styles.content}>
        1. Objet {'\n'}
        Les présentes conditions générales de vente régissent les modalités de vente et d'utilisation de l'application mobile Puly, proposée par Puly, située à Nantes. {'\n\n'}
        2. Abonnement {'\n'}
        L'utilisation de l'application Puly requiert un abonnement mensuel au prix de 6,99 €. Le paiement de l'abonnement est effectué de manière récurrente chaque mois. {'\n\n'}
        3. Processus de Commande {'\n'}
        L'abonnement à l'application Puly peut être souscrit directement depuis l'application, en fournissant les informations de paiement nécessaires. Le client est facturé automatiquement chaque mois pour la durée de son abonnement. {'\n\n'}
        4. Modalités de Paiement {'\n'}
        Le paiement de l'abonnement mensuel à l'application Puly s'effectue par carte bancaire via le système de paiement sécurisé intégré à l'application. {'\n\n'}
        5. Durée de l'Abonnement {'\n'}
        L'abonnement à l'application Puly est souscrit pour une durée indéterminée et est renouvelé automatiquement chaque mois, sauf résiliation par le client. {'\n\n'}
        6. Résiliation {'\n'}
        Le client peut résilier son abonnement à tout moment depuis l'application. La résiliation prendra effet à la fin de la période de facturation en cours. {'\n\n'}
        7. Prix {'\n'}
        Le prix de l'abonnement mensuel à l'application Puly est de 6,99 € TTC. Tout changement de prix sera notifié aux clients par avance. {'\n\n'}
        8. Droit de Rétractation {'\n'}
        Conformément à la législation en vigueur, le client dispose d'un droit de rétractation de 14 jours à compter de la souscription de l'abonnement. Toutefois, ce droit de rétractation ne s'applique pas à la fourniture de services numériques dont l'exécution a commencé avec l'accord préalable exprès du client. {'\n\n'}
        9. Support Client {'\n'}
        Pour toute question ou assistance concernant l'abonnement à l'application Puly, le client peut contacter le service clientèle à l'adresse e-mail suivante : Puly.contact@gmail.com. {'\n\n'}
        10. Modification des CGV {'\n'}
        Les présentes conditions générales de vente peuvent être modifiées à tout moment par Puly. Les clients seront informés de tout changement par les moyens appropriés, et les nouvelles conditions générales de vente entreront en vigueur dès leur publication sur l'application. {'\n\n'}
        Fait à Nantes, le 12/04/2024 {'\n\n'}
        Puly
      </Text>
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

export default CGV;
