import { combineReducers } from 'redux';

import { authenticationReducer } from './authentication/reducers';
import { buddyReducer } from './buddy/reducers';
import { conversationReducer } from './conversation/reducers';
import { faqReducer } from './faq/reducers';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  buddy: buddyReducer,
  conversation: conversationReducer,
  faq: faqReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
