import React from 'react';
import Moment from 'react-moment';

import { TConversation } from '../models';

interface ChatListItemLastActionParagraphProps {
  conversation: TConversation;
}

const ChatListItemLastActionParagraph: React.FC<ChatListItemLastActionParagraphProps> = ({ conversation }) => {
  if (conversation.isArchived && conversation.ended) {
    return (
      <p>
        <span>Chat beendet</span>&nbsp;
        <Moment locale='de' fromNow date={conversation.ended} />
      </p>
    );
  }
  if (conversation.lastMessage) {
    return (
      <p>
        <Moment locale='de' fromNow date={conversation.lastMessage.date} />
      </p>
    );
  }
  return (
    <p>
      Geöffnet&nbsp;
      <Moment locale='de' fromNow date={conversation.started} />
    </p>
  );
};

export default ChatListItemLastActionParagraph;
