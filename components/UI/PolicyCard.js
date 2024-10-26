import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const PolicyCard = ({ policy, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{policy.policyType}</Text>
      <Text style={styles.description}>{policy.description}</Text>
      <Text style={styles.details}>Premium: {policy.amount}</Text>
      <Text style={styles.details}>Coverage: {policy.coverage}</Text>
      <Text style={styles.details}>Status: {policy.status}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  details: {
    fontSize: 12,
    color: '#333',
  },
});

export default PolicyCard;
