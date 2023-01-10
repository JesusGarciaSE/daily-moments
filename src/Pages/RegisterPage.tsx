import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../Auth';
import { auth } from '../firebase'

const RegisterPage: React.FC = () => {
  const {loggedIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({loading: false, error: false});

  const handleRegister = async () => {
    try {
      setStatus({loading: true, error: false})
      const crednetial = await createUserWithEmailAndPassword(auth, email, password);
      console.log('credential:', crednetial);
    } catch(error) {
      console.log('error:', error)
      setStatus({loading: false, error: true})
    }
  } 

  if(loggedIn) {
    return <Redirect to="/my/entries"/>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
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
        {status.error && <IonLabel color="danger">Registration Failed</IonLabel>}
        <IonButton expand="block" onClick={handleRegister}>Create Account</IonButton>
        <IonButton expand="block" fill="clear" routerLink='/login'>Already have an account?</IonButton>
        <IonLoading isOpen={status.loading}></IonLoading>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
