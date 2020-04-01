import React, { useState, useEffect } from 'react';
import { ellipsisHorizontal, ellipsisVertical, handLeft } from 'ionicons/icons';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonMenuButton,
  IonPage,
  IonIcon,
  IonToolbar,
  IonFooter,
  IonInput,
  IonButton,
  IonPopover,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Chat.css';
import { useStores, useMessageGroups } from '../hooks';
import { sendMessage } from '../firebase';
import MessageGroup from '../components/MessageGroup';
import { observer } from 'mobx-react';

interface ChatProps extends RouteComponentProps<{ cid: string }> {}

const Chat: React.FC<ChatProps> = ({ match }) => {
  const { firebaseStore } = useStores();

  const messageGroups = useMessageGroups(firebaseStore.isLoggedIn, match.params.cid);
  const uid = firebaseStore.user?.uid;
  const chat = firebaseStore.chat(match.params.cid);
  const buddy = firebaseStore.buddy(chat?.bid || '');
  const userIsBuddy = chat && chat.bid === uid;

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

  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setShowPopoverEvent] = useState<any | undefined>(undefined);

  const openPopover = (event: any) => {
    console.log(event);
    event.persist();
    setShowPopover(true);
    setShowPopoverEvent(event);
  };

  const closeChat = () => {
    console.log('close chat');
  };

  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot='primary'>
            <IonButton color='primary' onClick={event => openPopover(event)}>
              <IonIcon slot='icon-only' ios={ellipsisHorizontal} md={ellipsisVertical} />
            </IonButton>
          </IonButtons>
          <IonTitle>{uid && buddy ? `Chat mit ${userIsBuddy ? `Anonymer Nutzer ${chat?.uid}` : buddy?.givenName}` : 'Chat'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonPopover isOpen={showPopover} event={popoverEvent} onDidDismiss={() => setShowPopover(false)}>
        <IonList lines='none'>
          <IonItem button onClick={closeChat}>
            <IonLabel color='danger'>Chat Beenden</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>

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

export default observer(withRouter(Chat));
