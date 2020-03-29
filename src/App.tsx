import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStores, useAuthState, useBuddyUpdate, useChatUpdate } from './hooks';

import Menu from './components/Menu';
import Aktuelles from './pages/Aktuelles';
import Buddys from './pages/Buddys';
import Buddy from './pages/Buddy';
import Chats from './pages/Chats';
import Chat from './pages/Chat';
import Karte from './pages/Karte';
import FAQ from './pages/FAQ';
import Anmeldung from './pages/Anmeldung';
import Impressum from './pages/Impressum';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = observer(() => {
  const { firebaseStore } = useStores();
  useAuthState(firebaseStore);
  useBuddyUpdate(firebaseStore);
  useChatUpdate(firebaseStore);
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId='main'>
          <Menu />
          <IonRouterOutlet id='main'>
            <Route
              path='/aktuelles'
              render={props => {
                return <Aktuelles />;
              }}
              exact={true}
            />
            <Route
              path='/buddys'
              render={props => {
                return <Buddys />;
              }}
              exact={true}
            />
            <Route
              path='/buddys/:bid'
              render={props => {
                return <Buddy />;
              }}
              exact={true}
            />
            <Route
              path='/chats'
              render={props => {
                return <Chats />;
              }}
              exact={true}
            />
            <Route
              path='/chats/:cid'
              render={props => {
                return <Chat />;
              }}
              exact={true}
            />
            <Route
              path='/karte'
              render={props => {
                return <Karte />;
              }}
              exact={true}
            />
            <Route
              path='/faq'
              render={props => {
                return <FAQ />;
              }}
              exact={true}
            />
            <Route
              path='/anmeldung'
              render={props => {
                return <Anmeldung />;
              }}
              exact={true}
            />
            <Route
              path='/impressum'
              render={props => {
                return <Impressum />;
              }}
              exact={true}
            />
            <Route path='/' render={() => <Redirect to='/aktuelles' />} exact={true} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
});

export default App;
