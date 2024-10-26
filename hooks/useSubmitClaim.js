import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const useSubmitClaim = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        syncOfflineClaims();
      }
    });

    return () => unsubscribe();
  }, []);

  const submitClaim = async (claimData) => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'You must be signed in to submit a claim');
      return;
    }

    setLoading(true);
    try {
      let imageUrl = '';

      if (claimData.imageUri) {
        const imageName = claimData.imageUri.split('/').pop();
        const storageRef = ref(storage, `claims/${imageName}`);

        const response = await fetch(claimData.imageUri);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }

      const docRef = await addDoc(collection(db, 'claims'), {
        ...claimData,
        imageUri: imageUrl,
        createdAt: new Date(),
        userId: user.uid,
      });

      Alert.alert('Success', `Claim submitted successfully with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error submitting claim:', error);
      Alert.alert('Error', 'An error occurred while submitting the claim');
      
      // If there's an error or if the user is offline save the claim locally for later syncing
      await saveClaimToAsyncStorage(claimData);
    } finally {
      setLoading(false);
    }
  };

  const saveClaimToAsyncStorage = async (claimData) => {
    try {
      const existingClaims = await AsyncStorage.getItem('offlineClaims');
      const updatedClaims = existingClaims ? JSON.parse(existingClaims) : [];
      updatedClaims.push(claimData);
      await AsyncStorage.setItem('offlineClaims', JSON.stringify(updatedClaims));
      Alert.alert('Offline', 'Claim saved locally and will be submitted when online.');
    } catch (error) {
      console.error('Error saving claim to AsyncStorage:', error);
    }
  };

  const syncOfflineClaims = async () => {
    try {
      const existingClaims = await AsyncStorage.getItem('offlineClaims');
      if (existingClaims) {
        const claimsArray = JSON.parse(existingClaims);
        for (const claim of claimsArray) {
          await submitClaimToFirebase(claim);
        }
        // Clear AsyncStorage after syncing
        await AsyncStorage.removeItem('offlineClaims');
      }
    } catch (error) {
      console.error('Error syncing offline claims:', error);
    }
  };

  const submitClaimToFirebase = async (claimData) => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'You must be signed in to submit a claim');
      return;
    }

    try {
      let imageUrl = '';

      if (claimData.imageUri) {
        const imageName = claimData.imageUri.split('/').pop();
        const storageRef = ref(storage, `claims/${imageName}`);

        const response = await fetch(claimData.imageUri);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }

      const docRef = await addDoc(collection(db, 'claims'), {
        ...claimData,
        imageUri: imageUrl,
        createdAt: new Date(),
        userId: user.uid,
      });

      Alert.alert('Success', `Claim submitted successfully with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error submitting offline claim:', error);
      Alert.alert('Error', 'An error occurred while submitting the offline claim');
    }
  };

  return { submitClaim, loading };
};

export default useSubmitClaim;
