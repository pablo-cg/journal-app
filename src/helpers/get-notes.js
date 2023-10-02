import { collection, getDocs } from 'firebase/firestore/lite';
import { firestore } from '../firebase/config';

export async function getNotes(uid = '') {
  const collectionRef = collection(firestore, `${uid}/journal/notes`);

  const { docs } = await getDocs(collectionRef);

  const notes = docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return notes;
}
