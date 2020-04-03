import React, { useEffect, useRef } from 'react';
import Moment from 'react-moment';
import { IonContent } from '@ionic/react';
import './ChatOutput.css';
import { TConversation, TMessageGroup, TUser } from '../models';
import MessageGroup from './MessageGroup';

interface ChatOutputProps {
  conversation: TConversation;
  user: TUser;
  messageGroups: TMessageGroup[];
}

const ChatOutput: React.FC<ChatOutputProps> = ({ conversation, user, messageGroups }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    const currentRef = messagesEndRef.current;
    if (currentRef) {
      currentRef.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(scrollToBottom, [messageGroups]);

  return (
    <IonContent>
      <div id='message-list'>
        {messageGroups.map((group, index) => {
          return <MessageGroup key={index} messageGroup={group} currentUserId={user.uid} />;
        })}

        {conversation.isArchived && conversation.ended ? (
          <div className='message-from-system'>
            <span>Chat beendet am</span>&nbsp;
            <Moment locale='de' format='DD.MMMM HH:mm' date={conversation.ended} />
            &nbsp; (<Moment locale='de' fromNow date={conversation.ended} />)
          </div>
        ) : null}

        <div ref={messagesEndRef} />
      </div>
    </IonContent>
  );
};

export default ChatOutput;
