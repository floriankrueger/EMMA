import React from 'react';
import { BlogStore, FAQStore, MarkerStore, FirebaseStore } from '../stores';

export const storesContext = React.createContext({
  blogStore: new BlogStore(),
  faqStore: new FAQStore(),
  markerStore: new MarkerStore(),
  firebaseStore: new FirebaseStore()
});
