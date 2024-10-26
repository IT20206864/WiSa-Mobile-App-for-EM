import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const UpcomingPayments = () => {
  const payments = [
    { id: '1', name: 'Health Insurance', dueDate: '2023-11-01', amount: '$200' },
    { id: '2', name: 'Car Insurance', dueDate: '2023-11-10', amount: '$150' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Payments</Text>
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.paymentCard}>
            <Text style={styles.paymentName}>{item.name}</Text>
            <Text>Due Date: {item.dueDate}</Text>
            <Text>Amount: {item.amount}</Text>
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
  paymentCard: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  paymentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UpcomingPayments;
