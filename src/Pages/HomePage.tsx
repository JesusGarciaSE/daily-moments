import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { add as addIcon } from 'ionicons/icons'
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Entry, toEntry } from '../models';
import { useAuth } from '../Auth';

const HomePage: React.FC = () => {
  const { userId } = useAuth();

  const [entries, setEntries] = useState<Entry[]>([])
  useEffect(() => {
    const entriesRef = collection(firestore, `users/${userId}/entries`);
    const q = query(entriesRef, orderBy("date"))
    onSnapshot(q, ({docs}) => setEntries(docs.map(toEntry)))
  }, [userId])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {
            entries.map((entry) => 
              <IonItem button key={entry.id} routerLink={`/my/entries/view/${entry.id}`}>
                <IonThumbnail slot="end">
                  <IonImg src={entry.pictureUrl}></IonImg>
                </IonThumbnail>
                <IonLabel>
                  <h2>{entry.date}</h2>
                  <h3>{entry.title}</h3>
                </IonLabel>
              </IonItem>
            )
          }
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addIcon}/>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
