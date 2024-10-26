import React from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TextInput, Button, TouchableOpacity } from 'react-native';
import usePolicies from '../../hooks/usePolicies';
import PolicyCard from '../../components/UI/PolicyCard';
import Chip from '../../components/UI/Chip';

const ActivePolicies = () => {
  const {
    policies,
    loading,
    modalVisible,
    setModalVisible,
    cancellationReason,
    setCancellationReason,
    handleDeactivatePress,
    handleModalSubmit,
  } = usePolicies();

  const renderPolicy = ({ item }) => (
    <TouchableOpacity onPress={() => console.log(`Selected Policy: ${item.policyType}`)}>
      <View style={styles.policyCard}>
        <PolicyCard policy={item} />
        <Chip onPress={() => handleDeactivatePress(item)} title="Deactivate" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Policies</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={policies}
          renderItem={renderPolicy}
          keyExtractor={(item) => item.policyId}
        />
      )}

      {/* Modal for cancellation reason */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cancel Policy</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter cancellation reason"
              value={cancellationReason}
              onChangeText={setCancellationReason}
            />
            <Button title="Submit" onPress={handleModalSubmit} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="#FF0000" />
          </View>
        </View>
      </Modal>
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
    textAlign: 'center',
    marginBottom: 20,
  },
  policyCard: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: 'white',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ActivePolicies;
