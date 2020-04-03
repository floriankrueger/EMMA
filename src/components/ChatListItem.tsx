import React from 'react';
import { IonItem, IonLabel, IonAvatar } from '@ionic/react';

import { TConversation, TBuddy } from '../models';
import { useStorageDownloadUrl } from '../hooks';
import ChatListItemLastActionParagraph from './ChatListItemLastActionParagraph';
import './ChatListItem.css';

interface ChatListItemProps {
  conversation: TConversation;
  buddy: TBuddy;
  userIsBuddy: boolean;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ conversation, buddy, userIsBuddy }) => {
  const buddyAvatarSrc = useStorageDownloadUrl(`buddys/${buddy.bid}/${buddy.avatarReference}`);

  var src: string;
  var alt: string;

  if (userIsBuddy) {
    src = 'assets/icon_dude.svg';
    alt = 'Anonymes Nutzeravatar';
  } else {
    src = buddyAvatarSrc;
    alt = `Benutzeravatar von ${buddy.givenName} ${buddy.familyName}`;
  }

  const lastMessage = conversation.lastMessage;

  return (
    <IonItem routerLink={`/chats/${conversation.cid}`}>
      <IonAvatar slot='start'>
        <img src={src} alt={alt} />
      </IonAvatar>
      <IonLabel>
        <h2>{userIsBuddy ? `Anonymer Nutzer ${conversation.uid}` : buddy.givenName}</h2>
        {lastMessage ? <h3>{lastMessage.body}</h3> : null}
        <ChatListItemLastActionParagraph conversation={conversation} />
      </IonLabel>
    </IonItem>
  );
};

export default ChatListItem;
