import React from 'react';
import { IonList, IonSpinner } from '@ionic/react';

import { useTypedSelector, conversationsWithBuddys } from '../store/rootReducer';

import PageContent from './PageContent';
import EmptyStateContainer from './EmptyStateContainer';
import ChatListItem from './ChatListItem';

import './ChatList.css';

const ChatList: React.FC = () => {
  let [uid, didFetchConversations, conversations] = useTypedSelector(state => [
    state.authentication.user?.uid,
    state.conversation.didFetchConversations,
    conversationsWithBuddys(state)
  ]);
  if (conversations.length === 0) {
    if (didFetchConversations) {
      return <EmptyStateContainer message='Zur Zeit sind keine Buddys verfügbar.'>Bitte komm später noch einmal wieder.</EmptyStateContainer>;
    }
  }
  if (uid) {
    return (
      <PageContent>
        <IonList>
          {conversations.map(tuple => {
            const [conversation, buddy] = tuple;
            return <ChatListItem key={conversation.cid} conversation={conversation} buddy={buddy} userIsBuddy={buddy.bid === uid} />;
          })}
        </IonList>
      </PageContent>
    );
  }
  return (
    <EmptyStateContainer message='Bitte warten.'>
      <IonSpinner />
    </EmptyStateContainer>
  );
};

export default ChatList;
