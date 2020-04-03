import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store';
import { useTypedSelector } from '../store/rootReducer';
import { addBuddyAvatarUrl } from '../store/buddy/actions';
import { getBuddyAvatarUrl } from '../store/buddy/reducers';
import { getDownloadUrl } from '../firebase';

export function useStorageDownloadUrl(reference: string): string {
  const dispatch: AppDispatch = useDispatch();
  const urlFromState = useTypedSelector(state => getBuddyAvatarUrl(state.buddy, reference));
  const [src, setSrc] = useState(urlFromState);

  useEffect(() => {
    getDownloadUrl(reference).then(url => {
      setSrc(url);
      dispatch(
        addBuddyAvatarUrl({
          reference,
          url
        })
      );
    });
  }, [dispatch, reference]);

  return src;
}
