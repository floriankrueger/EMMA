import { TFAQEntry } from '../../models';

// State Types

export interface FAQState {
  entries: TFAQEntry[];
}

// Action Types

export const UPSERT_FAQ_ENTRY = 'UPSERT_FAQ_ENTRY';

interface UpsertFAQEntryAction {
  type: typeof UPSERT_FAQ_ENTRY;
  payload: TFAQEntry;
}

export type FAQActionTypes = UpsertFAQEntryAction;
