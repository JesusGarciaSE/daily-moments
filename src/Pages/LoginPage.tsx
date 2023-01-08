import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect } from 'react-router';

interface Props {
  loggedIn: Boolean,
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({loggedIn, onLogin }) => {
  if(loggedIn) {
    return <Redirect to="/entries"/>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={onLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;