import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Entry, toEntry } from '../models';

const HomePage: React.FC = () => {

  const [entries, setEntries] = useState<Entry[]>([])
  useEffect(() => {
    const entriesRef = collection(firestore, 'entries');
    getDocs(entriesRef).then(({ docs }) => { setEntries(docs.map(toEntry)); })
  }, [])
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
              <IonItem button key={entry.id} routerLink={`/my/entries/${entry.id}`}>{entry.title}</IonItem>
            )
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
