import { FAQState, FAQActionTypes, UPSERT_FAQ_ENTRY } from './types';
import { TFAQEntry } from '../../models';

const initialState: FAQState = {
  entries: [],
};

export function faqReducer(state = initialState, action: FAQActionTypes): FAQState {
  switch (action.type) {
    case UPSERT_FAQ_ENTRY:
      return {
        ...state,
        entries: upsertFAQEntry(state.entries, action.payload),
      };
    default:
      return state;
  }
}

// Helpers

function upsertFAQEntry(list: TFAQEntry[], entry: TFAQEntry): TFAQEntry[] {
  var updated: Boolean = false;
  var updatedList = list.map((existingEntry) => {
    if (existingEntry.slug === entry.slug) {
      updated = true;
      return entry;
    } else {
      return existingEntry;
    }
  });
  if (!updated) {
    updatedList.push(entry);
  }
  return updatedList;
}
