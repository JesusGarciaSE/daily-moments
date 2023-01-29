import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useAuth } from '../Auth';
import { firestore } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useHistory } from 'react-router';

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const [description, setDescription] = useState('');

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   if(event.target.files.length > 0) {
    const file = event.target.files.item(0);
    const pictureURL = URL.createObjectURL(file);
    console.log('created URL:', pictureURL);
    setPictureUrl(pictureURL);
   }
  }

  const handleSubmit = async() => {
    const entriesRef = collection(firestore, `users/${userId}/entries`);
    const entryData = { date, title, description };
    const entryId = await addDoc(entriesRef, entryData);
    console.log('saved:', entryId.id);
    history.goBack()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonInput type="date" value={date} onIonChange={(event) => setDate(event.detail.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={title} onIonChange={(event) => setTitle(event.detail.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel> <br />
            <input type="file" accept="image/*" 
              onChange={onFileChange}/>
            <img src={pictureUrl} alt=""/>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea value={description} onIonChange={(event) => setDescription(event.detail.value)}/>
          </IonItem>
        </IonList>
        <IonButton expand="block" onClick={handleSubmit}>Save</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
