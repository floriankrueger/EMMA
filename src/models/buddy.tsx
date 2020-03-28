import { TBusinessHours } from './business-hours';

export interface TBuddy {
  bid: string;
  givenName: string;
  familyName: string;
  avatarReference: string;
  email: string;
  occupation: string;
  institution: string;
  businessHours: TBusinessHours[];
  languages: string[];
  focus: string[];
  qualifications: string[];
  bio: string;
}
