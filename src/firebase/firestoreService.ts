import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebaseConfig";
import { TextConstants } from "../utils/textConstants";
import { randomTime } from "../utils/helper";

export const handleCreate = async (prompt: string, logoStyle: string) => {
  try {
    const docRef = await addDoc(collection(db, "logoRequests"), {
      prompt,
      status: TextConstants.Pending,
      logoStyle: logoStyle,
      createdAt: new Date(),
    });

    setTimeout(() => {
      updateStatus(docRef.id);
    }, randomTime);

    return docRef.id;
  } catch (error) {
    console.error("Error creating request:", error);
    throw new Error("Failed to create request");
  }
};

const updateStatus = async (userId: any) => {
  try {
    const userRef = doc(db, "logoRequests", userId);

    await updateDoc(userRef, {
      status: TextConstants.Completed,
      artLogo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShHmC69gsNbIIVnwBXE9U9RHspXKKQGrb_ew&s",
    });
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const subscribeToStatus = (
  requestId: string,
  callback: (status: string, imageUrl: string | null) => void
) => {
  const unsub = onSnapshot(doc(db, "logoRequests", requestId), (snap) => {
    if (!snap.exists()) return;

    const data = snap.data();

    callback(data.status, data.artLogo || null);
  });

  return unsub;
};
