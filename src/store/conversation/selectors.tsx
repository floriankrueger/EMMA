import { ConversationState, Conversation } from './types';
import { TConversation } from '../../models';

export const sortedConversations = (state: ConversationState): TConversation[] => {
  const conversations = state.conversations.slice();
  conversations.sort((lhs, rhs) => {
    const lhsDate = lhs.ended || lhs.lastMessage?.date || lhs.started;
    const rhsDate = rhs.ended || rhs.lastMessage?.date || rhs.started;
    return rhsDate - lhsDate;
  });
  return fromConversationStates(conversations);
};

export const findConversation = (state: ConversationState, cid: string): TConversation | null => {
  const conversation = state.conversations.find((c) => c.cid === cid);
  return conversation ? fromConversationState(conversation) : null;
};

// Helpers

export const toConversationState = (conversation: TConversation): Conversation => {
  return {
    ...conversation,
    started: conversation.started.getTime(),
    ended: conversation.ended?.getTime() || null,
    lastMessage:
      conversation.lastMessage && conversation.lastMessage.date
        ? {
            ...conversation.lastMessage,
            date: conversation.lastMessage.date.getTime(),
          }
        : null,
  };
};

export const toConversationStates = (conversations: TConversation[]): Conversation[] => {
  return conversations.map(toConversationState);
};

export const fromConversationState = (conversation: Conversation): TConversation => {
  return {
    ...conversation,
    started: new Date(conversation.started),
    ended: conversation.ended ? new Date(conversation.ended) : null,
    lastMessage:
      conversation.lastMessage && conversation.lastMessage.date
        ? {
            ...conversation.lastMessage,
            date: new Date(conversation.lastMessage.date),
          }
        : null,
  };
};

export const fromConversationStates = (conversations: Conversation[]): TConversation[] => {
  return conversations.map(fromConversationState);
};
