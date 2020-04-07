import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;

// selectors from sub states
export { useTypedSelector, conversationsWithBuddys } from './selectors';
export { sortedBuddys, getBuddyAvatarUrl } from './buddy/selectors';
export { sortedConversations, findConversation } from './conversation/selectors';
export { sortedFAQEntries, sortedFAQLinks } from './faq/selectors';
export { sortedBlogPosts } from './blog/selectors';
