import React from 'react';
import { IonList } from '@ionic/react';
import { observer } from 'mobx-react';
import { useStores } from '../hooks';
import PageContent from '../components/PageContent';
import ChatListItem from './ChatListItem';
import './ChatList.css';

const ChatList = observer(() => {
  let { firebaseStore } = useStores();
  return (
    <PageContent>
      <IonList>
        {firebaseStore.chatsWithBuddys.map((chatWithBuddy, index) => {
          return <ChatListItem key={index} chatWithBuddy={chatWithBuddy} />;
        })}
      </IonList>
    </PageContent>
  );
});

export default ChatList;
