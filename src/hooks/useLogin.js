import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useLogin = () => {
  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log('User signed in:', cred.user);
        // loginForm.reset();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { loginUser };
};
