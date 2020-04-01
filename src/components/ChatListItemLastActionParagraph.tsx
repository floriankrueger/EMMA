import React from 'react';
import { TChat } from '../models';
import Moment from 'react-moment';

interface ChatListItemLastActionParagraphProps {
  chat: TChat;
}

const ChatListItemLastActionParagraph: React.FC<ChatListItemLastActionParagraphProps> = ({ chat }) => {
  if (chat.isArchived && chat.ended) {
    return (
      <p>
        <span>Chat beendet</span>&nbsp;
        <Moment locale='de' fromNow date={chat.ended} />
      </p>
    );
  }
  if (chat.lastMessage) {
    return (
      <p>
        <Moment locale='de' fromNow date={chat.lastMessage.date} />
      </p>
    );
  }
  return (
    <p>
      Geöffnet&nbsp;
      <Moment locale='de' fromNow date={chat.started} />
    </p>
  );
};

export default ChatListItemLastActionParagraph;
