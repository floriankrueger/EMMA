import React from 'react';
import { BlogStore, MarkerStore } from '../stores';

export const storesContext = React.createContext({
  blogStore: new BlogStore(),
  markerStore: new MarkerStore(),
});
