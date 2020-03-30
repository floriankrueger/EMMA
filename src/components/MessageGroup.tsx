import React from 'react';
import { TMessageGroup } from '../models';
import './MessageGroup.css';

interface MessageGroupProps {
  messageGroup: TMessageGroup;
  currentUserId: string | undefined;
}

function styleForIndexAndLength(index: number, length: number): string {
  if (index === 0) {
    if (length === 1) {
      return 'only';
    } else {
      return 'first';
    }
  }
  if (index === length - 1) {
    return 'last';
  }
  return 'middle';
}

const MessageGroup: React.FC<MessageGroupProps> = ({ messageGroup, currentUserId }) => {
  const messageGroupClassName = currentUserId === messageGroup.sender ? 'from-me' : 'from-buddy';
  return (
    <div className={`message-group ${messageGroupClassName}`}>
      <div className='message-group-list'>
        {messageGroup.messages.map((message, index) => {
          const style = styleForIndexAndLength(index, messageGroup.messages.length);
          const messageClassName = currentUserId === messageGroup.sender ? 'message-from-me' : 'message';
          return (
            <div key={index} className={`${messageClassName} ${style}`}>
              <div className='message-body'>{message.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageGroup;
