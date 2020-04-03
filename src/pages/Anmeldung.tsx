import { IonButtons, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import React from 'react';

import { useTypedSelector } from '../store';

import LoginForm from '../components/LoginForm';
import LoggedInBox from '../components/LoggedInBox';

import './Anmeldung.css';

const Anmeldung: React.FC = () => {
  const isWellKnown = useTypedSelector((state) => state.authentication.user?.isWellKnown || false);

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {isWellKnown ? <LoggedInBox /> : <LoginForm />}
    </IonPage>
  );
};

export default Anmeldung;
