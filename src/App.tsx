import { IonApp } from '@ionic/react';
// import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SettingsPage from './Pages/SettingsPage';

const App: React.FC = () => {
  return (
    <IonApp>
      <BrowserRouter>
        <Route path="/home" >
          <HomePage />
        </Route>
        <Route path="/settings" >
          <SettingsPage />
        </Route>
        <Redirect exact path='/' to="/home"/>
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
