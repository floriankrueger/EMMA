import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { authenticationReducer } from './authentication/reducers';
import { buddyReducer, sortedBuddys } from './buddy/reducers';
import { conversationReducer, sortedConversations } from './conversation/reducers';
import { TConversation, TBuddy } from '../models';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  buddy: buddyReducer,
  conversation: conversationReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const conversationsWithBuddys = (state: RootState): [TConversation, TBuddy][] => {
  const conversations = sortedConversations(state.conversation);

  const buddyMap = new Map<string, TBuddy>();
  sortedBuddys(state.buddy).forEach(b => buddyMap.set(b.bid, b));

  return conversations.reduce<[TConversation, TBuddy][]>((result, conversation) => {
    const buddy = buddyMap.get(conversation.bid);
    if (buddy) {
      return [...result, [conversation, buddy]];
    }
    return result;
  }, []);
};

export default rootReducer;
