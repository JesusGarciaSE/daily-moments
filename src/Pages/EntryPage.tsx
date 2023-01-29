import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { trash as trashIcon } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import { firestore } from '../firebase'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { Entry, toEntry } from '../models';
import { useAuth } from '../Auth';

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();
  useEffect(() => {
    const docRef = doc(firestore, `users/${userId}/entries`, id);
    getDoc(docRef).then((doc) => { setEntry(toEntry(doc)); }) }
  , [userId, id])

  const handleDelete = async () => {
    const docRef = doc(firestore, `users/${userId}/entries`, id);
    await deleteDoc(docRef);
    history.goBack();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>{entry?.date}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trashIcon} slot="icon-only"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{entry?.title}</h2>
        <img src={entry?.pictureUrl} alt={entry?.title} />
        <p>{entry?.description}</p>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
