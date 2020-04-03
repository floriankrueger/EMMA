import {
  Conversation,
  ConversationState,
  ConversationActionTypes,
  ADD_CONVERSATION,
  UPDATE_CONVERSATION,
  DELETE_CONVERSATION,
  RESET_CONVERSATIONS
} from './types';
import { TConversation } from '../../models';

const initialState: ConversationState = {
  didFetchConversations: false,
  conversations: []
};

export function conversationReducer(state = initialState, action: ConversationActionTypes): ConversationState {
  switch (action.type) {
    case ADD_CONVERSATION:
      return {
        didFetchConversations: true,
        conversations: [...state.conversations, action.payload]
      };
    case UPDATE_CONVERSATION:
      return {
        didFetchConversations: true,
        conversations: state.conversations.map(c => {
          if (c.cid === action.payload.cid) {
            return action.payload;
          } else {
            return c;
          }
        })
      };
    case DELETE_CONVERSATION:
      return {
        didFetchConversations: true,
        conversations: state.conversations.filter(c => c.cid !== action.payload)
      };
    case RESET_CONVERSATIONS:
      return {
        didFetchConversations: false,
        conversations: []
      };
    default:
      return state;
  }
}

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
  const conversation = state.conversations.find(c => c.cid === cid);
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
            date: conversation.lastMessage.date.getTime()
          }
        : null
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
            date: new Date(conversation.lastMessage.date)
          }
        : null
  };
};

export const fromConversationStates = (conversations: Conversation[]): TConversation[] => {
  return conversations.map(fromConversationState);
};
