import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { RootState } from './rootReducer';
import { sortedBuddys } from './buddy/selectors';
import { sortedConversations } from './conversation/selectors';
import { TConversation, TBuddy } from '../models';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const conversationsWithBuddys = (state: RootState): [TConversation, TBuddy][] => {
  const conversations = sortedConversations(state.conversation);

  const buddyMap = new Map<string, TBuddy>();
  sortedBuddys(state.buddy).forEach((b) => buddyMap.set(b.bid, b));

  return conversations.reduce<[TConversation, TBuddy][]>((result, conversation) => {
    const buddy = buddyMap.get(conversation.bid);
    if (buddy) {
      return [...result, [conversation, buddy]];
    }
    return result;
  }, []);
};
