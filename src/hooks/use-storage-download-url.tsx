import { useState, useEffect } from 'react';
import { useStores } from '../hooks';
import { getDownloadUrl } from '../firebase';

export function useStorageDownloadUrl(reference: string): string {
  const { firebaseStore } = useStores();
  const [src, setSrc] = useState<string>(firebaseStore.buddyAvatarUrl(reference));

  useEffect(() => {
    getDownloadUrl(reference).then(url => {
      setSrc(url);
      firebaseStore.buddyAvatarUrlLoaded(reference, url);
    });
  }, [reference, firebaseStore]);

  return src;
}
