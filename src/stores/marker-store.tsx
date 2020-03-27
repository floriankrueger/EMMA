import { action, observable, computed } from 'mobx';
import { TInstitution, TInstitutionLocation } from '../models';

export class MarkerStore {
  @observable
  institutions: TInstitution[] = dummyInstitutions;

  @action
  set(institutions: TInstitution[]) {
    this.institutions = institutions;
  }

  @computed
  get institutionLocations(): TInstitutionLocation[] {
    return this.institutions.map(makeLocation);
  }
}

// Helper

const makeLocation = (institution: TInstitution): TInstitutionLocation => {
  let color: string;
  switch (institution.zustaendigkeitsbereich) {
    case 'Erziehungsberatungsstelle':
      color = '#E74C3C';
      break;
    case 'Jugendamt':
      color = '#16A085';
      break;
    default:
      color = '#95A5A6';
      break;
  }
  return {
    id: institution.id,
    lat: institution.lat,
    lng: institution.lng,
    color
  };
};

// Dummy Data

const dummyInstitutions = [
  {
    id: '48153-beratungsstelle-suedviertel',
    name: 'Beratungsstelle Südviertel e.V.',
    zustaendigkeitsbereich: 'Erziehungsberatungsstelle',
    telefon: '0251-77466',
    webseite: 'https://www.beratungsstelle-suedviertel.de',
    email: 'mail@beratungsstelle-suedviertel.de',
    businessHours: [
      {
        days: ['MON'],
        from: '09:00h',
        to: '18:00h'
      },
      {
        days: ['TUE', 'WED', 'THU'],
        from: '09:00h',
        to: '17:00h'
      },
      {
        days: ['FRI'],
        from: '09:00h',
        to: '13:00h'
      }
    ],
    adresse: 'Friedrich-Ebert-Straße 125, 48153 Münster',
    lat: 51.94562530517578,
    lng: 7.630627632141113
  },
  {
    id: '48151-pro-familia',
    name: 'pro-familia',
    zustaendigkeitsbereich: 'Erziehungsberatungsstelle',
    telefon: '0251-45858',
    webseite: 'https://www.profamilia.de/',
    email: 'muenster@profamilia.de',
    businessHours: [
      {
        days: ['MON'],
        from: '08:00h',
        to: '18:00h'
      },
      {
        days: ['TUE'],
        from: '08:00h',
        to: '17:00h'
      },
      {
        days: ['WED'],
        from: '11:30h',
        to: '17:00h'
      },
      {
        days: ['THU'],
        from: '08:00h',
        to: '17:00h'
      },
      {
        days: ['FRI'],
        from: '08:00h',
        to: '16:00h'
      }
    ],
    adresse: 'Ludgeriplatz 12, 48151 Münster',
    lat: 51.95608139038086,
    lng: 7.6254777908325195
  },
  {
    id: '48143-trialog',
    name: 'Trialog Beratungsstelle',
    zustaendigkeitsbereich: 'Erziehungsberatungsstelle',
    telefon: '0251-511414',
    webseite: 'https://www.trialog-ms.de',
    email: 'info@trialog-muenster.de',
    businessHours: [
      {
        days: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
        from: '10:30h',
        to: '11:30h'
      }
    ],
    adresse: 'Von-Vincke-Straße 6, 48143 Münster',
    lat: 51.9587581,
    lng: 7.6326213
  },
  {
    id: '48153-amt-fuer-kinder-jugendliche-und-familien',
    name: 'Trialog Beratungsstelle',
    zustaendigkeitsbereich: 'Jugendamt',
    telefon: '0251-4925101',
    webseite: 'https://www.stadt-muenster.de/jugendamt/startseite.html',
    email: 'jugendamt@stadt-muenster.de',
    businessHours: [
      {
        days: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
        from: '08:00h',
        to: '12:00h'
      },
      {
        days: ['THU'],
        from: '14:30h',
        to: '18:00h'
      }
    ],
    adresse: 'Hafenstraße 30, 48153 Münster',
    lat: 51.9540179,
    lng: 7.6303397
  }
] as TInstitution[];
