import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const useLogin = () => {
  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).catch((err) => {
      console.log(err.message);
    });
  };

  return { loginUser };
};
