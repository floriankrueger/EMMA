import React from 'react';
import { IonItem, IonLabel, IonAvatar } from '@ionic/react';
import { TChatWithBuddy } from '../models';
import { useStorageDownloadUrl } from '../hooks';
import './ChatListItem.css';

interface ChatListItemProps {
  chatWithBuddy: TChatWithBuddy;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chatWithBuddy }) => {
  const buddy = chatWithBuddy.buddy;
  const src = useStorageDownloadUrl(`buddys/${buddy.bid}/${buddy.avatarReference}`);

  return (
    <IonItem routerLink={`/chats/${chatWithBuddy.cid}`}>
      <IonAvatar slot='start'>
        <img src={src} alt={`Benutzeravatar von ${buddy.givenName} ${buddy.familyName}`} />
      </IonAvatar>
      <IonLabel>
        <h2>{buddy.givenName}</h2>
        <p>Lorem ipsum, dolor sit amet</p>
      </IonLabel>
    </IonItem>
  );
};

export default ChatListItem;
