import React, { useState } from 'react';
import { IonFooter, IonInput, IonButton } from '@ionic/react';

import { TConversation, TUser } from '../models';
import { sendMessage } from '../firebase';

import './ChatInput.css';

interface ChatInputProps {
  conversation: TConversation;
  user: TUser;
}

const ChatInput: React.FC<ChatInputProps> = ({ conversation, user }) => {
  const keyPressed = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  const [message, setMessage] = useState('');
  const send = () => {
    if (conversation.isArchived) {
      console.error('Cannot send message to archived chat');
      return;
    }

    sendMessage(user.uid, conversation.cid, message)
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
        disabled={conversation.isArchived}
        placeholder='Deine Nachricht'
        value={message}
        onKeyPress={e => keyPressed(e)}
        onIonChange={e => setMessage(e.detail.value || '')}
      />
      <IonButton disabled={conversation.isArchived} onClick={send}>
        Absenden
      </IonButton>
    </IonFooter>
  );
};

export default ChatInput;
