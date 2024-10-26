import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker'; // For dropdown
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../../config/firebaseConfig';

const ClaimSubmissionForm = ({ onSubmit }) => {
  const [claimType, setClaimType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  const resetForm = () => {
    setClaimType('');
    setDescription('');
    setAmount('');
    setDate(new Date());
    setImageUri('');
  };

  const handleSubmit = () => {
    if (!claimType || !description || !amount || !date) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    const claimData = {
      claimType,
      description,
      amount,
      date: format(date, 'yyyy-MM-dd'),
      imageUri,
      status: "Submitted",
    };

    onSubmit(claimData);
    resetForm();
  };

  const handleCameraLaunch = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera was denied');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleGalleryLaunch = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access gallery was denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate) => {
    hideDatePicker();
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const fetchUserPolicies = async () => {
    try {
      const auth = getAuth(app);
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore(app);
        const userDoc = doc(db, 'users', user.uid); 
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          console.log(userData.policies)
          setPolicies(userData.policies || []); 
        } else {
          Alert.alert('Error', 'User not found in database');
        }
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
      Alert.alert('Error', 'Could not fetch user policies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPolicies();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.title}>Submit a Claim</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1565c0" />
      ) : (
        <>
          <Text style={styles.label}>Claim Type:</Text>
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={claimType}
              onValueChange={(itemValue) => setClaimType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Claim Type" value="" />
              {policies.map((policy, index) => (
                <Picker.Item key={index} label={policy.policyType} value={policy.policyType} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter claim description"
            multiline
            numberOfLines={4}
            placeholderTextColor="#b0bec5"
          />

          <Text style={styles.label}>Claim Amount:</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter claim amount"
            keyboardType="numeric"
            placeholderTextColor="#b0bec5"
          />

          <Text style={styles.label}>Claim Date:</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
            <Text style={styles.dateText}>{format(date, 'yyyy-MM-dd')}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.photoButton} onPress={handleCameraLaunch}>
              <Text style={styles.photoButtonText}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoButton} onPress={handleGalleryLaunch}>
              <Text style={styles.photoButtonText}>Pick from Gallery</Text>
            </TouchableOpacity>
          </View>

          {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null}

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Claim</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e3f2fd', // Light blue background to match the branding
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565c0', // Primary branding color
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#424242',
  },
  input: {
    height: 50,
    borderColor: '#b0bec5',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#424242',
  },
  dateInput: {
    height: 50,
    borderColor: '#b0bec5',
    borderWidth: 1,
    marginBottom: 15,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#424242',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  photoButton: {
    backgroundColor: '#42a5f5',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#1976d2', // Darker branding blue for submit button
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ClaimSubmissionForm;
