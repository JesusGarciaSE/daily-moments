import { IonApp, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {  Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext, useAuthInit } from './Auth';
import LoginPage from './Pages/LoginPage';
import AppTabs from './AppTabs';
import NotFoundPage from './Pages/NotFoundPage';
import RegisterPage from './Pages/RegisterPage';


const App: React.FC = () => {
  const {loading, auth} = useAuthInit();

  console.log(`rending App with auth=`, auth );
  if(loading) {
    return <IonLoading isOpen />
  }
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          <Switch>
            <Redirect exact path='/' to="/login"/>
            <Route exact path="/login" >
              <LoginPage />
            </Route>
            <Route exact path="/register" >
              <RegisterPage />
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
