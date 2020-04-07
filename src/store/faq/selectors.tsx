import { FAQState } from './types';
import { TFAQEntry, TFAQLinkData } from '../../models';

export const sortedFAQEntries = (state: FAQState): TFAQEntry[] => {
  return [...state.entries].sort((lhs, rhs) => rhs.sorting - lhs.sorting);
};

export const sortedFAQLinks = (state: FAQState): TFAQLinkData[] => {
  return sortedFAQEntries(state).map((entry) => {
    return {
      slug: entry.slug,
      title: entry.question,
    } as TFAQLinkData;
  });
};
