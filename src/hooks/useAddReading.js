import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useUser } from '../hooks/useUser';

export const useAddReading = () => {
  const { userUID } = useUser();

  const addReading = async (readingInputs) => {
    await addDoc(collection(db, userUID), {
      dia: readingInputs.diastolic,
      sys: readingInputs.systolic,
      pulse: readingInputs.pulse,
      month: readingInputs.month,
      day: readingInputs.day,
      year: readingInputs.year,
      time: readingInputs.time,
      created: Timestamp.now(),
    });
  };

  return { addReading };
};
