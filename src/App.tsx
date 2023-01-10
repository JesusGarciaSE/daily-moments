import { IonApp, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {  Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from './Auth';
import LoginPage from './Pages/LoginPage';
import { useEffect, useState } from 'react';
import AppTabs from './AppTabs';
import NotFoundPage from './Pages/NotFoundPage';
import { auth } from './firebase'


const App: React.FC = () => {
  const [authState, setAuthState] = useState({loading: true, loggedIn: false});
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthState(({loading: false, loggedIn: Boolean(user)}))
    })    
  }, [])

  console.log(`rending App with loggedIn=`, authState);
  if(authState.loading) {
    return <IonLoading isOpen />
  }
  return (
    <IonApp>
      <AuthContext.Provider value={{loggedIn: authState.loggedIn}}>
        <IonReactRouter>
          <Switch>
            <Redirect exact path='/' to="/login"/>
            <Route exact path="/login" >
              <LoginPage />
            </Route>
            <Route path="/my">
              <AppTabs />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
