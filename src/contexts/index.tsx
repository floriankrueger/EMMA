import React from 'react';
import { MarkerStore } from '../stores';

export const storesContext = React.createContext({
  markerStore: new MarkerStore(),
});
