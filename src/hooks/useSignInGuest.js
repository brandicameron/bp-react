import { getAuth, signInAnonymously } from 'firebase/auth';

export const useSignInGuest = () => {
  const loginGuest = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        console.log('Guest user signed in.');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return { loginGuest };
};
