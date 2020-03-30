import React, { useState, useEffect } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar, IonFooter, IonInput, IonButton } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Chat.css';
import { useStores, useMessageGroups } from '../hooks';
import { sendMessage } from '../firebase';
import MessageGroup from '../components/MessageGroup';

interface ChatProps extends RouteComponentProps<{ cid: string }> {}

const Chat: React.FC<ChatProps> = ({ match }) => {
  const { firebaseStore } = useStores();
  const messageGroups = useMessageGroups(firebaseStore.isLoggedIn, match.params.cid);
  const uid = firebaseStore.user?.uid;

  useEffect(() => {
    const objDiv = document.getElementById('message-list');
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  });

  const keyPressed = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  const [message, setMessage] = useState('');
  const send = () => {
    let uid = firebaseStore.user?.uid;
    if (uid) {
      sendMessage(uid, match.params.cid, message);
      setMessage('');
    }
  };

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div id='message-list'>
          {messageGroups.map((group, index) => {
            return <MessageGroup key={index} messageGroup={group} currentUserId={uid} />;
          })}
        </div>
      </IonContent>
      <IonFooter id='message-input'>
        <IonInput placeholder='Deine Nachricht' value={message} onKeyPress={e => keyPressed(e)} onIonChange={e => setMessage(e.detail.value || '')} />
        <IonButton onClick={send}>Absenden</IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default withRouter(Chat);
