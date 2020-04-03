import { castDraft, Immutable } from 'immer';

import { BuddyState } from './types';
import { TBuddy } from '../../models';

export const sortedBuddys = (state: Immutable<BuddyState>): TBuddy[] => {
  const buddys = Array.from(state.buddys.values());
  buddys.sort((lhs, rhs) => (lhs.isAvailable && rhs.isAvailable ? 0 : lhs.isAvailable ? -1 : 1));
  return castDraft(buddys);
};

export const getBuddyAvatarUrl = (state: Immutable<BuddyState>, reference: string): string => {
  return state.buddyAvatarUrls[reference] || 'assets/icon_buddys.svg';
};
