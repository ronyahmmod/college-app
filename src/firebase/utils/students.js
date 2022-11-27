import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

export const addStudent = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "students"), data);
    return docRef;
  } catch (error) {
    return error;
  }
};
