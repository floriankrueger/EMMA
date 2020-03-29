import React from 'react';
import { IonList } from '@ionic/react';
import { observer } from 'mobx-react';
import { useStores } from '../hooks';
import ChatListItem from './ChatListItem';
import './ChatList.css';

const ChatList = observer(() => {
  let { firebaseStore } = useStores();
  return (
    <IonList>
      {firebaseStore.chatsWithBuddys.map((chatWithBuddy, index) => {
        return <ChatListItem key={index} chatWithBuddy={chatWithBuddy} />;
      })}
    </IonList>
  );
});

export default ChatList;
