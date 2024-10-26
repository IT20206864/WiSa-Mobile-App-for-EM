import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Chip = ({ onPress }) => (
  <TouchableOpacity style={styles.chip} onPress={onPress}>
    <Text style={styles.chipText}>Deactivate</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#FF5722', 
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
  },
  chipText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Chip;
