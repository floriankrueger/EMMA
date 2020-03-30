import React, { useEffect } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar, IonFooter } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Chat.css';
import { useStores } from '../hooks';
import { useMessageGroups } from '../hooks';

interface ChatProps extends RouteComponentProps<{ cid: string }> {}

const Chat: React.FC<ChatProps> = ({ match }) => {
  const { firebaseStore } = useStores();
  const messageGroups = useMessageGroups(firebaseStore.isLoggedIn, match.params.cid);

  useEffect(() => {
    const objDiv = document.getElementById('message-list');
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  });

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
            return (
              <div key={index} className='message-group'>
                <div className='message-group-list'>
                  {group.messages.map((groupedMessage, index) => {
                    return (
                      <div key={index} className={`message ${groupedMessage.style}`}>
                        <div className='message-body'>{groupedMessage.message.body}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </IonContent>
      <IonFooter id='message-input'>footer</IonFooter>
    </IonPage>
  );
};

export default withRouter(Chat);
