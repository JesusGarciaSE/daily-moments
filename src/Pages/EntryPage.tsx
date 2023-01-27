import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { firestore } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { Entry, toEntry } from '../models';
import { useAuth } from '../Auth';

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { userId } = useAuth();
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();
  useEffect(() => {
    const docRef = doc(firestore, `users/${userId}/entries`, id);
    getDoc(docRef).then((doc) => { setEntry(toEntry(doc)); }) }
  , [userId, id])
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
