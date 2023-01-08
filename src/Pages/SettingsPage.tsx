import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { Link } from 'react-router-dom';
// import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      Go To Go To <IonRouterLink routerLink="/home">Settings</IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
