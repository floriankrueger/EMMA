import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Chat.css';
import { useStores } from '../hooks';

interface ChatProps extends RouteComponentProps<{ cid: string }> {}

const Chat: React.FC<ChatProps> = ({ match }) => {
  const { firebaseStore } = useStores();
  const chat = firebaseStore.chat(match.params.cid);
  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>{chat?.cid}</IonContent>
    </IonPage>
  );
};

export default withRouter(Chat);
