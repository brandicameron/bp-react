import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

export const useUser = () => {
  const [userUID, setUserUID] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return { userUID, loggedIn };
};
