import { combineReducers } from 'redux';

import { authenticationReducer } from './authentication/reducers';
import { buddyReducer } from './buddy/reducers';
import { conversationReducer } from './conversation/reducers';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  buddy: buddyReducer,
  conversation: conversationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
