import React from 'react';
import { IonItem, IonLabel, IonAvatar } from '@ionic/react';
import { TChat, TBuddy } from '../models';
import { useStorageDownloadUrl } from '../hooks';
import './ChatListItem.css';

interface ChatListItemProps {
  chat: TChat;
  buddy: TBuddy;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, buddy }) => {
  const src = useStorageDownloadUrl(`buddys/${buddy.bid}/${buddy.avatarReference}`);

  return (
    <IonItem routerLink={`/chats/${chat.cid}`}>
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
