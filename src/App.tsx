import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { home as homeIcon, settings as settingsIcon} from 'ionicons/icons'
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SettingsPage from './Pages/SettingsPage';
import EntryPage from './Pages/EntryPage';
import LoginPage from './Pages/LoginPage';
import { useState } from 'react';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`rending App with loggedIn=${loggedIn}`);
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/login" >
              <LoginPage loggedIn={loggedIn} onLogin={() => setLoggedIn(true)}/>
            </Route>
            <Route exact path="/entries" >
              { loggedIn ? <HomePage /> : <Redirect to="/login"/> }
            </Route>
            <Route exact path="/entries/:id" >
              <EntryPage />
            </Route>
            <Route exact path="/settings" >
              <SettingsPage />
            </Route>
            <Redirect exact path='/' to="/entries"/>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/entries">
              <IonIcon icon={homeIcon}/>
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settingsIcon}/>
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
