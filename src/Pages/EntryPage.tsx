import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { firestore } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<any>();
  useEffect(() => {
    const docRef = doc(firestore, "entries", id);
    getDoc(docRef).then((doc) => {
      console.log(doc);
      const entry = {id: doc.id, ...doc.data() }
      setEntry(entry);
    })
  }, [id])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>{entry?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {entry?.description}
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
