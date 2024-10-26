import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import useClaims from '../../hooks/useClaim';

const Claims = ({ navigation }) => {
  const { claims, loading } = useClaims();

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return { backgroundColor: '#FFF3E0', icon: 'hourglass-empty', color: '#FFA726' };
      case 'verifying':
        return { backgroundColor: '#E3F2FD', icon: 'autorenew', color: '#42A5F5' };
      case 'approved':
        return { backgroundColor: '#E8F5E9', icon: 'check-circle', color: '#66BB6A' };
      default:
        return { backgroundColor: '#f9f9f9', icon: 'error', color: '#BDBDBD' };
    }
  };

  if (loading) {
    return <Text>Loading claims...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Claims</Text>
      <FlatList
        data={claims}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const statusStyle = getStatusStyle(item.status);
          return (
            <View style={[styles.claimCard, { backgroundColor: statusStyle.backgroundColor }]}>
              <View style={styles.claimHeader}>
                <Icon name={statusStyle.icon} size={24} color={statusStyle.color} />
                <Text style={[styles.claimType, { color: statusStyle.color }]}>{item.type}</Text>
              </View>
              <Text style={styles.claimDetails}>Date: {item.date}</Text>
              <Text style={styles.claimDetails}>Status: {item.status}</Text>
              <Text style={styles.claimDetails}>Claimed Amount: {item.amount}</Text>
            </View>
          );
        }}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Submit a New Claim"
          onPress={() => navigation.navigate('ClaimSubmission')}
          buttonStyle={styles.submitButton}
          titleStyle={styles.submitButtonText}
          icon={<Icon name="add-circle" size={20} color="white" />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  claimCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
  },
  claimHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  claimType: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  claimDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Claims;
