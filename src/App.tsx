import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {  Redirect, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import { useState } from 'react';
import AppTabs from './AppTabs';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`rending App with loggedIn=${loggedIn}`);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Redirect exact path='/' to="/login"/>
          <Route exact path="/login" >
            <LoginPage loggedIn={loggedIn} onLogin={() => setLoggedIn(true)}/>
          </Route>
          <Route path="/my">
            <AppTabs loggedIn={loggedIn}/>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
