// State Types

export interface Conversation {
  cid: string;
  bid: string;
  uid: string;
  started: number;
  ended: number | null;
  isArchived: boolean;
  lastMessage: Message | null;
}

export interface Message {
  mid: string;
  sender: string;
  body: string;
  date: number;
}

export interface ConversationState {
  didFetchConversations: boolean;
  conversations: Conversation[];
}

// Action Types

export const ADD_CONVERSATION = 'ADD_CONVERSATION';
export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';
export const DELETE_CONVERSATION = 'DELETE_CONVERSATION';
export const RESET_CONVERSATIONS = 'RESET_CONVERSATIONS';

interface AddConversationAction {
  type: typeof ADD_CONVERSATION;
  payload: Conversation;
}

interface UpdateConversationAction {
  type: typeof UPDATE_CONVERSATION;
  payload: Conversation;
}

interface DeleteConversationAction {
  type: typeof DELETE_CONVERSATION;
  payload: string;
}

interface ResetConversationsAction {
  type: typeof RESET_CONVERSATIONS;
}

export type ConversationActionTypes = AddConversationAction | UpdateConversationAction | DeleteConversationAction | ResetConversationsAction;
