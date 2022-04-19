import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useUser } from './useUser';
import { useState, useEffect } from 'react';

export const useReadings = () => {
  const { userUID } = useUser();
  const [userReadings, setUserReadings] = useState(null);

  useEffect(() => {
    if (userUID) {
      const collRef = collection(db, `${userUID}`);
      const q = query(collRef, orderBy('created', 'desc'));
      onSnapshot(q, (snapshot) => {
        let tempReadings = [];
        snapshot.docs.forEach((doc) => {
          tempReadings.push({ id: doc.id, ...doc.data() });
        });
        setUserReadings(tempReadings);
      });
    }
  }, [userUID]);

  return { userReadings };
};
