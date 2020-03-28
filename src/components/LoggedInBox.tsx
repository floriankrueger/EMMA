import { IonContent, IonRow, IonCol, IonTitle, IonNote, IonButton } from '@ionic/react';
import React from 'react';
import { signOut } from '../firebase';
import { useHistory } from 'react-router-dom';
import './LoggedInBox.css';

const LoggedInBox: React.FC = () => {
  const history = useHistory();

  const logout = () => {
    signOut(success => {
      history.push('/aktuelles');
    });
  };

  return (
    <IonContent>
      <IonRow>
        <IonCol>
          <IonTitle>Anmeldung</IonTitle>
          <IonNote>Du bist angemeldet.</IonNote>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <div className='ion-padding'>
            <IonButton expand='block' color='danger' class='ion-no-marging' onClick={logout}>
              Abmelden
            </IonButton>
          </div>
        </IonCol>
      </IonRow>
    </IonContent>
  );
};

export default LoggedInBox;
