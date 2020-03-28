import { IonButtons, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import React from 'react';
import { observer } from 'mobx-react';
import './Anmeldung.css';
import { useStores } from '../hooks/use-stores';
import LoginForm from '../components/LoginForm';
import LoggedInBox from '../components/LoggedInBox';

const Anmeldung = observer(() => {
  const { firebaseStore } = useStores();

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {firebaseStore.isWellKnown ? <LoggedInBox /> : <LoginForm />}
    </IonPage>
  );
});

export default Anmeldung;
