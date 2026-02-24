import { addDoc, collection, getCountFromServer, query, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { UserWaitlistData } from "../types/waitlist";
import { FirebaseError } from "firebase/app";



export const addToWaitLIst = async (userData: UserWaitlistData) => {
    try {
        const waitListData = {
            ...userData,
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, "waitlist"), waitListData);
        return {
            success: true,
            id: docRef.id,
            message: "Successfully added to waitlist",
        };
    } catch (error) {
        const message =
            error instanceof FirebaseError ? error.message : "Unknown error occurred";

        return {
            success: false,
            error: message,
            message: "Failed to add to waitlist, please try again",
        };
    }
};


export const getCollectionItemCount = async (collectionName = "waitlist") => {
    const colRef = collection(db, collectionName)
    const snapshot = getCountFromServer(colRef)
    return (await snapshot).data().count
}

export const getFireStoreColumn = async (collectionName = "waitlist", column_name = "name") => {
    const colRef = collection(db, collectionName)
    const snapshot = await getDocs(colRef)
    const results = snapshot.docs.map(doc => doc.data()[column_name])
    return results
}