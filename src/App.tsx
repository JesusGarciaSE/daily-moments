import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SettingsPage from './Pages/SettingsPage';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" >
            <HomePage />
          </Route>
          <Route path="/settings" >
            <SettingsPage />
          </Route>
          <Redirect exact path='/' to="/home"/>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
