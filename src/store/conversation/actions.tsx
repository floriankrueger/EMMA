import { TConversation } from '../../models';
import { ADD_CONVERSATION, UPDATE_CONVERSATION, DELETE_CONVERSATION, RESET_CONVERSATIONS, ConversationActionTypes } from './types';
import { toConversationState } from './reducers';

export function addConversation(conversation: TConversation): ConversationActionTypes {
  return {
    type: ADD_CONVERSATION,
    payload: toConversationState(conversation)
  };
}

export function updateConversation(conversation: TConversation): ConversationActionTypes {
  return {
    type: UPDATE_CONVERSATION,
    payload: toConversationState(conversation)
  };
}

export function deleteConversation(cid: string): ConversationActionTypes {
  return {
    type: DELETE_CONVERSATION,
    payload: cid
  };
}

export function resetConversations(): ConversationActionTypes {
  return {
    type: RESET_CONVERSATIONS
  };
}
