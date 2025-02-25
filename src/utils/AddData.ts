import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export const AddDataToFirestore = async (collectionName:string,data:object) => {
    try {
        const docRef = await addDoc(collection(db, collectionName),data);
        console.log("Document written with ID: ", docRef.id);
        return docRef
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}