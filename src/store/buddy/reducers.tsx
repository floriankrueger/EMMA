import produce, { Draft, castDraft, Immutable } from 'immer';

import { BuddyState, BuddyActionTypes, ADD_BUDDY, UPDATE_BUDDY, DELETE_BUDDY, RESET_BUDDYS, ADD_BUDDY_AVATAR_URL } from './types';
import { TBuddy } from '../../models';

const initialState: BuddyState = {
  didFetchBuddys: false,
  buddys: [],
  buddyAvatarUrls: {}
};

const buddyReducer = produce((draft: Draft<BuddyState>, action: BuddyActionTypes) => {
  switch (action.type) {
    case ADD_BUDDY:
      draft.didFetchBuddys = true;
      draft.buddys.push(action.payload);
      return;
    case UPDATE_BUDDY:
      draft.didFetchBuddys = true;
      draft.buddys = draft.buddys.map(b => (b.bid === action.payload.bid ? action.payload : b));
      return;
    case DELETE_BUDDY:
      draft.didFetchBuddys = true;
      draft.buddys = draft.buddys.filter(b => b.bid !== action.payload);
      return;
    case RESET_BUDDYS:
      draft.didFetchBuddys = false;
      draft.buddys = [];
      return;
    case ADD_BUDDY_AVATAR_URL:
      draft.buddyAvatarUrls[action.payload.reference] = action.payload.url;
      return;
  }
}, initialState);

const sortedBuddys = (state: Immutable<BuddyState>): TBuddy[] => {
  const buddys = Array.from(state.buddys.values());
  buddys.sort((lhs, rhs) => (lhs.isAvailable && rhs.isAvailable ? 0 : lhs.isAvailable ? -1 : 1));
  return castDraft(buddys);
};

const getBuddyAvatarUrl = (state: Immutable<BuddyState>, reference: string): string => {
  return state.buddyAvatarUrls[reference] || 'assets/icon_buddys.svg';
};

export { buddyReducer, sortedBuddys, getBuddyAvatarUrl };
