import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../Auth';
import { auth } from '../firebase'

interface Props {
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const {loggedIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const crednetial = await signInWithEmailAndPassword(auth, email, password);
    console.log('credential:', crednetial);
    onLogin();
  }

  if(loggedIn) {
    return <Redirect to="/my/entries"/>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="email" value={email} onIonChange={(event) => setEmail(event.detail.value)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={(event) => setPassword(event.detail.value)}></IonInput>
          </IonItem>
        </IonList>
        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
