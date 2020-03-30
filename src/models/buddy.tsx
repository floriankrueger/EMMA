import * as firebase from 'firebase/app';
import { TBusinessHours } from './business-hours';

export interface TBuddy {
  bid: string;
  givenName: string;
  familyName: string;
  avatarReference: string;
  occupation: string;
  institution: string;
  businessHours: TBusinessHours[];
  languages: string[];
  focus: string[];
  qualifications: string[];
  bio: string;
}

export const BuddyConverter = {
  toFirestore(buddy: TBuddy): firebase.firestore.DocumentData {
    return {
      givenName: buddy.givenName,
      familyName: buddy.familyName,
      avatar: buddy.avatarReference,
      occupation: buddy.occupation,
      institution: buddy.institution,
      businessHours: [],
      languages: buddy.languages,
      focus: buddy.focus,
      qualifications: buddy.qualifications,
      bio: buddy.bio
    };
  },
  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): TBuddy {
    const data = snapshot.data(options)!;
    return {
      bid: snapshot.id,
      givenName: data.givenName,
      familyName: data.familyName,
      avatarReference: data.avatar,
      occupation: data.occupation,
      institution: data.institution,
      businessHours: [],
      languages: data.languages,
      focus: data.focus,
      qualifications: data.qualifications,
      bio: data.bio
    } as TBuddy;
  }
};
