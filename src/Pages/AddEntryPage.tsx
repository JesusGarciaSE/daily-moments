import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../Auth';
import { firestore, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useHistory } from 'react-router';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    return () => {
      if(pictureUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pictureUrl);
      }
    }
  }, [pictureUrl])

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   if(event.target.files.length > 0) {
    const file = event.target.files.item(0);
    const pictureURL = URL.createObjectURL(file);
    setPictureUrl(pictureURL);
   }
  }

  async function savePicture(blobUrl, userId) {
    const pictureRef = ref(storage, `/users/${userId}/pictures/${Date.now()}`)
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const snapshot = await uploadBytes(pictureRef, blob);
    const url = await getDownloadURL(snapshot.ref);
    console.log('save picture:', url);
    return url;
  }

  const handleSubmit = async() => {
    const entriesRef = collection(firestore, `users/${userId}/entries`);
    const entryData = { date, title, pictureUrl, description };
    if(pictureUrl.startsWith('blob:')) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
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
            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={onFileChange}/>
            <img src={pictureUrl} alt="" onClick={() => fileInputRef.current.click()} style={{cursor: 'pointer'}}/>
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
