import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../config/firebaseConfig'
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { Alert } from 'react-native';

const usePolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [userId, setUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setPolicies([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPolicies = async () => {
      if (!userId) return;

      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setPolicies(data.policies || []);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching policies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [userId]);

  const handleDeactivatePress = (policy) => {
    setSelectedPolicy(policy);
    setModalVisible(true);
  };

  const handleModalSubmit = async () => {
    try {
      if (selectedPolicy && cancellationReason) {
        const docRef = await addDoc(collection(db, 'cancellations'), {
          policyId: selectedPolicy.policyId,
          userId: userId,
          reason: cancellationReason,
          cancellationDate: new Date(),
        });
        Alert.alert('Success', `Policy Deactivation submitted successfully with ID: ${docRef.id}`);
        setCancellationReason('');
        setModalVisible(false);
      } else {
        console.log('Please enter a cancellation reason.');
      }
    } catch (error) {
      console.error('Error deactivating policy:', error);
    }
  };

  return {
    policies,
    loading,
    modalVisible,
    setModalVisible,
    cancellationReason,
    setCancellationReason,
    handleDeactivatePress,
    handleModalSubmit,
  };
};

export default usePolicies;
