import { db } from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';
import { useUser } from '../hooks/useUser';

export const useDeleteReading = () => {
  const { userUID } = useUser();

  const deleteReading = async (id) => {
    try {
      await deleteDoc(doc(db, userUID, id));
    } catch (err) {
      console.log(err);
    }
  };

  return { deleteReading };
};
