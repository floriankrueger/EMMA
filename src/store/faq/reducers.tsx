import { FAQState, FAQActionTypes, UPSERT_FAQ_ENTRY } from './types';

const initialState: FAQState = {
  entries: [],
};

export function faqReducer(state = initialState, action: FAQActionTypes): FAQState {
  switch (action.type) {
    case UPSERT_FAQ_ENTRY:
      return state;
    default:
      return state;
  }
}
