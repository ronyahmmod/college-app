import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase.config";
import { setError } from "../../feature/error/errorSlice";

export const createUser = async (userAuth, dispatch) => {
  // step 1: check that email is already exist in the database
  // step 2: returen;
  // step 3: create user on the database
  const userRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userRef);
  const { email, displayName, photoURL, emailVerified } = userAuth;
  const createdAt = new Date();
  const role = "user";
  if (!userSnapshot.exists()) {
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        photoURL,
        emailVerified,
        role,
      });
    } catch (error) {
      dispatch(
        setError({
          errorCode: error.errorCode,
          errorMessage: error.errorMessage,
        })
      );
      console.error(error);
    }
  }
  const savedUserSnap = await getDoc(userRef);

  return {
    ...savedUserSnap.data(),
    id: savedUserSnap.id,
    createdAt: new Timestamp(
      savedUserSnap.data().createdAt.seconds,
      savedUserSnap.data().createdAt.nanoseconds
    )
      .toDate()
      .toLocaleString(),
  };
};
