import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const AlertsReminders = () => {
  const alerts = [
    { id: '1', title: 'Renew your Car Insurance', description: 'Your car insurance will expire in 10 days.' },
    { id: '2', title: 'Health Checkup', description: 'Schedule your annual health checkup under your health policy.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alerts & Reminders</Text>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  alertCard: {
    backgroundColor: '#FFEBEE',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AlertsReminders;
