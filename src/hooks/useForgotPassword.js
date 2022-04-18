import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export const useForgotPassword = () => {
  const [forgotPasswordText, setForgotPasswordText] = useState('Forgot password?');

  const sendPasswordReset = (email) => {
    if (email === '') {
      setForgotPasswordText('Please enter your email address.');
      setTimeout(() => {
        setForgotPasswordText('Forgot password?');
      }, 2000);
    }
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setForgotPasswordText('Password reset email sent.');
        setTimeout(() => {
          setForgotPasswordText('Forgot password?');
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return { sendPasswordReset, forgotPasswordText };
};
