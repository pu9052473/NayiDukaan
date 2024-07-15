import { db } from "@/firebase/config";
import { collection, getDocs} from "firebase/firestore";

export const GetDataFromCollection = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs;
}