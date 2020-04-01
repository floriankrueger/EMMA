import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { IonFooter, IonInput, IonButton } from '@ionic/react';
import { TChat, TUser } from '../models';
import { sendMessage } from '../firebase';
import './ChatInput.css';

interface ChatInputProps {
  chat: TChat;
  user: TUser;
}

const ChatInput: React.FC<ChatInputProps> = ({ chat, user }) => {
  const keyPressed = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  const [message, setMessage] = useState('');
  const send = () => {
    if (chat.isArchived) {
      console.error('Cannot send message to archived chat');
      return;
    }

    sendMessage(user.uid, chat.cid, message)
      .then(() => {
        setMessage('');
      })
      .catch(error => {
        console.error('Failed to send message', error);
      });
  };

  return (
    <IonFooter id='message-input'>
      <IonInput
        disabled={chat.isArchived}
        placeholder='Deine Nachricht'
        value={message}
        onKeyPress={e => keyPressed(e)}
        onIonChange={e => setMessage(e.detail.value || '')}
      />
      <IonButton disabled={chat.isArchived} onClick={send}>
        Absenden
      </IonButton>
    </IonFooter>
  );
};

export default observer(ChatInput);
