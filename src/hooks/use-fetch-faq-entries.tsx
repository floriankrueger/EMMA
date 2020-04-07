import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch, useTypedSelector, sortedFAQEntries } from '../store';
import { upsertFAQEntry } from '../store/faq/actions';
import { client, getFAQEntries } from '../contentful';

export function useFetchFAQEntries() {
  const dispatch: AppDispatch = useDispatch();
  const entries = useTypedSelector((state) => sortedFAQEntries(state.faq));

  useEffect(() => {
    getFAQEntries(client).then((entries) => {
      entries.forEach((entry) => dispatch(upsertFAQEntry(entry)));
    });
  }, [dispatch]);

  return entries;
}
