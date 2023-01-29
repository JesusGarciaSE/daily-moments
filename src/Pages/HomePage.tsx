import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
