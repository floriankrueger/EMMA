import { ConversationState, ConversationActionTypes, ADD_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, RESET_CONVERSATIONS } from './types';

const initialState: ConversationState = {
  didFetchConversations: false,
  conversations: [],
};

export function conversationReducer(state = initialState, action: ConversationActionTypes): ConversationState {
  switch (action.type) {
    case ADD_CONVERSATION:
      return {
        didFetchConversations: true,
        conversations: [...state.conversations, action.payload],
      };
    case UPDATE_CONVERSATION:
      return {
        didFetchConversations: true,
        conversations: state.conversations.map((c) => {
          if (c.cid === action.payload.cid) {
            return action.payload;
          } else {
            return c;
          }
        }),
      };
    case DELETE_CONVERSATION:
      return {
        didFetchConversations: true,
        conversations: state.conversations.filter((c) => c.cid !== action.payload),
      };
    case RESET_CONVERSATIONS:
      return {
        didFetchConversations: false,
        conversations: [],
      };
    default:
      return state;
  }
}
