import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { home as homeIcon, settings as settingsIcon} from 'ionicons/icons'
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SettingsPage from './Pages/SettingsPage';
import EntryPage from './Pages/EntryPage';
import { useAuth } from './Auth';


const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth();
  if(!loggedIn) {
    return <Redirect to="/login"/>
  }
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/my/entries" >
            <HomePage />
          </Route>
          <Route exact path="/my/entries/:id" >
            <EntryPage />
          </Route>
          <Route exact path="/my/settings" >
            <SettingsPage />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/my/entries">
            <IonIcon icon={homeIcon}/>
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/my/settings">
            <IonIcon icon={settingsIcon}/>
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default AppTabs;
