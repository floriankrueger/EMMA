import React from 'react';
import { IonList } from '@ionic/react';
import { observer } from 'mobx-react';
import { useStores } from '../hooks';
import PageContent from '../components/PageContent';
import ChatListItem from './ChatListItem';
import './ChatList.css';

const ChatList = observer(() => {
  let { firebaseStore } = useStores();
  let uid = firebaseStore.user?.uid;
  return (
    <PageContent>
      <IonList>
        {firebaseStore.chats.map(chat => {
          const buddy = firebaseStore.buddy(chat.bid);
          if (uid && buddy) {
            return <ChatListItem key={chat.cid} chat={chat} buddy={buddy} userIsBuddy={buddy.bid === uid} />;
          } else {
            return null;
          }
        })}
      </IonList>
    </PageContent>
  );
});

export default ChatList;
