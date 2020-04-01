import React from 'react';
import { IonItem, IonLabel, IonAvatar } from '@ionic/react';
import Moment from 'react-moment';
import { TChat, TBuddy } from '../models';
import { useStorageDownloadUrl } from '../hooks';
import './ChatListItem.css';

interface ChatListItemProps {
  chat: TChat;
  buddy: TBuddy;
  userIsBuddy: boolean;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, buddy, userIsBuddy }) => {
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

  const lastMessage = chat.lastMessage;
  console.log('lm.body', typeof lastMessage?.body);
  return (
    <IonItem routerLink={`/chats/${chat.cid}`}>
      <IonAvatar slot='start'>
        <img src={src} alt={alt} />
      </IonAvatar>
      <IonLabel>
        <h2>{userIsBuddy ? `Anonymer Nutzer ${chat.uid}` : buddy.givenName}</h2>
        {lastMessage ? <h3>{lastMessage.body}</h3> : null}
        {lastMessage ? (
          <p>
            <Moment locale='de' fromNow date={lastMessage.date} />
          </p>
        ) : (
          <p>
            Geöffnet <Moment locale='de' fromNow date={chat.started} />
          </p>
        )}
      </IonLabel>
    </IonItem>
  );
};

export default ChatListItem;
