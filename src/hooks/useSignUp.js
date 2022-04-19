import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export const useSignUp = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const signUpUser = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      setErrorMessage('This email already has an account.');
    });
  };

  return { signUpUser, errorMessage };
};
