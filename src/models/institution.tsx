import { TBusinessHours } from './business-hours';

export interface TInstitution {
  id: string;
  name: string;
  zustaendigkeitsbereich: string;
  telefon: string;
  webseite: string;
  email: string;
  adresse: string;
  lat: number;
  lng: number;
  businessHours: TBusinessHours[];
}
