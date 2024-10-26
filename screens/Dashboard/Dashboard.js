import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome to WiSa</Text>
      <Text style={styles.subtitle}>Your personal insurance assistant</Text>

      {/* Active Policies */}
      <TouchableOpacity onPress={() => navigation.navigate('Active Policies')}>
        <Card containerStyle={[styles.card, styles.policiesCard]}>
          <View style={styles.cardContent}>
            <Icon name="file" size={30} color="#ffffff" style={styles.icon} />
            <Text style={styles.sectionTitle}>Active Policies</Text>
          </View>
        </Card>
      </TouchableOpacity>

      {/* Recent Claims */}
      <TouchableOpacity onPress={() => navigation.navigate('Claims')}>
        <Card containerStyle={[styles.card, styles.claimsCard]}>
          <View style={styles.cardContent}>
            <Icon name="list" size={30} color="#ffffff" style={styles.icon} />
            <Text style={styles.sectionTitle}>Recent Claims</Text>
          </View>
        </Card>
      </TouchableOpacity>

      {/* Upcoming Payments */}
      <TouchableOpacity onPress={() => navigation.navigate('Upcoming Payments')}>
        <Card containerStyle={[styles.card, styles.paymentsCard]}>
          <View style={styles.cardContent}>
            <Icon name="credit-card" size={30} color="#ffffff" style={styles.icon} />
            <Text style={styles.sectionTitle}>Upcoming Payments</Text>
          </View>
        </Card>
      </TouchableOpacity>

      {/* Sign Out Button */}
      <View style={styles.signOutContainer}>
        <Button
          title="Sign Out"
          onPress={handleSignOut}
          buttonStyle={styles.signOutButton}
          titleStyle={styles.signOutButtonText}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7', 
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007BFF', 
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#555', 
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff', 
  },
  policiesCard: {
    backgroundColor: '#007BFF', 
  },
  claimsCard: {
    backgroundColor: '#FF9800', 
  },
  paymentsCard: {
    backgroundColor: '#4CAF50', 
  },
  alertsCard: {
    backgroundColor: '#F44336', 
  },
  signOutContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  signOutButton: {
    backgroundColor: '#d9534f',
    borderRadius: 12,
    paddingVertical: 12,
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Dashboard;
