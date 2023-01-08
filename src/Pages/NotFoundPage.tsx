import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const NotFoundPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Page not found.
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
