import { TBuddy } from '../../models';

// State Types

export interface BuddyAvatarUrls {
  [key: string]: string;
}

export interface BuddyState {
  didFetchBuddys: boolean;
  buddys: TBuddy[];
  buddyAvatarUrls: BuddyAvatarUrls;
}

// Action Types

export const ADD_BUDDY = 'ADD_BUDDY';
export const UPDATE_BUDDY = 'UPDATE_BUDDY';
export const DELETE_BUDDY = 'DELETE_BUDDY';
export const RESET_BUDDYS = 'RESET_BUDDYS';
export const ADD_BUDDY_AVATAR_URL = 'ADD_BUDDY_AVATAR_URL';

interface AddBuddyAction {
  type: typeof ADD_BUDDY;
  payload: TBuddy;
}

interface UpdateBuddyAction {
  type: typeof UPDATE_BUDDY;
  payload: TBuddy;
}

interface DeleteBuddyAction {
  type: typeof DELETE_BUDDY;
  payload: string;
}

interface ResetBuddysAction {
  type: typeof RESET_BUDDYS;
}

export interface AddBuddyAvatarUrlPayload {
  reference: string;
  url: string;
}

interface AddBuddyAvatarUrlAction {
  type: typeof ADD_BUDDY_AVATAR_URL;
  payload: AddBuddyAvatarUrlPayload;
}

export type BuddyActionTypes = AddBuddyAction | UpdateBuddyAction | DeleteBuddyAction | ResetBuddysAction | AddBuddyAvatarUrlAction;
