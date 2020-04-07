import { combineReducers } from 'redux';

import { authenticationReducer } from './authentication/reducers';
import { buddyReducer } from './buddy/reducers';
import { conversationReducer } from './conversation/reducers';
import { faqReducer } from './faq/reducers';
import { blogReducer } from './blog/reducers';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  buddy: buddyReducer,
  conversation: conversationReducer,
  faq: faqReducer,
  blog: blogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
