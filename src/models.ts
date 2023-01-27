import { DocumentSnapshot } from "firebase/firestore";

export interface Entry {
    id: string;
    title: string;
    description: string;
}

export function toEntry(doc: DocumentSnapshot): Entry {
    return { id: doc.id, ...doc.data() } as Entry;
}