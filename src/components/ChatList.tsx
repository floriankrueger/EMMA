import React from 'react';
import { IonList } from '@ionic/react';
import { observer } from 'mobx-react';
import { useStores } from '../hooks';
import PageContent from '../components/PageContent';
import ChatListItem from './ChatListItem';
import './ChatList.css';

const ChatList = observer(() => {
  let { firebaseStore } = useStores();
  console.log('Render ChatList', firebaseStore.chats.length);
  return (
    <PageContent>
      <IonList>
        {firebaseStore.chats.map((chat, index) => {
          const buddy = firebaseStore.buddy(chat.bid);
          if (buddy) {
            return <ChatListItem key={index} chat={chat} buddy={buddy} />;
          } else {
            return null;
          }
        })}
      </IonList>
    </PageContent>
  );
});

export default ChatList;
