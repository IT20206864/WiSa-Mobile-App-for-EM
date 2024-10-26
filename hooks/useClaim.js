import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../config/firebaseConfig';


const useClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get user ID from Firebase Auth
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  useEffect(() => {
    const fetchClaims = async () => {
      if (!userId) return;

      try {
        const claimsRef = collection(db, 'claims');
        const q = query(claimsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const fetchedClaims = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClaims(fetchedClaims);
      } catch (error) {
        console.error('Error fetching claims:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [userId]); // Run effect when userId changes

  return { claims, loading };
};

export default useClaims;
