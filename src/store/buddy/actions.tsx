import { TBuddy } from '../../models';
import { ADD_BUDDY, UPDATE_BUDDY, DELETE_BUDDY, RESET_BUDDYS, ADD_BUDDY_AVATAR_URL, BuddyActionTypes } from './types';
import { AddBuddyAvatarUrlPayload } from './types';

export function addBuddy(buddy: TBuddy): BuddyActionTypes {
  return {
    type: ADD_BUDDY,
    payload: buddy
  };
}

export function updateBuddy(buddy: TBuddy): BuddyActionTypes {
  return {
    type: UPDATE_BUDDY,
    payload: buddy
  };
}

export function deleteBuddy(bid: string): BuddyActionTypes {
  return {
    type: DELETE_BUDDY,
    payload: bid
  };
}

export function resetBuddys(): BuddyActionTypes {
  return {
    type: RESET_BUDDYS
  };
}

export function addBuddyAvatarUrl(payload: AddBuddyAvatarUrlPayload): BuddyActionTypes {
  return {
    type: ADD_BUDDY_AVATAR_URL,
    payload
  };
}
