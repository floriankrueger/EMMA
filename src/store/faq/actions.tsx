import { UPSERT_FAQ_ENTRY, FAQActionTypes } from './types';
import { TFAQEntry } from '../../models';

export function upsertFAQEntry(entry: TFAQEntry): FAQActionTypes {
  return {
    type: UPSERT_FAQ_ENTRY,
    payload: entry,
  };
}
