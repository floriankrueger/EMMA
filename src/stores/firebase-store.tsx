import { action, observable, computed } from 'mobx';
import { TUser, TBuddy } from '../models';

export class FirebaseStore {
  @observable
  user: TUser | null = null;

  @observable
  buddys: TBuddy[] = [];

  @observable
  buddyAvatarUrls: Map<string, string> = new Map();

  @action
  userSignedIn(user: TUser) {
    this.user = user;
  }

  @action
  userSignedOut() {
    this.user = null;
  }

  @action
  buddyAvatarUrlLoaded(reference: string, url: string) {
    this.buddyAvatarUrls.set(reference, url);
  }

  @action
  setBuddys(buddys: TBuddy[]) {
    this.buddys = buddys;
  }

  buddyAvatarUrl(reference: string): string {
    return this.buddyAvatarUrls.get(reference) || 'assets/icon_buddys.svg';
  }

  buddy(bid: string): TBuddy | undefined {
    return this.buddys.find(buddy => buddy.bid === bid);
  }

  @computed
  get isLoggedIn(): boolean {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  @computed
  get isLoggedOut(): boolean {
    return !this.isLoggedIn;
  }

  @computed
  get isAnonymous(): boolean {
    return (this.user && this.user.isAnonymous) || false;
  }

  @computed
  get isWellKnown(): boolean {
    return (this.user && !this.user.isAnonymous) || false;
  }
}

// // Dummy Data

// const dummyBuddys = [
//   {
//     bid: 'Ng6ZWyIqJu8l9CSXrLZW',
//     givenName: 'Marion',
//     familyName: 'Mustermann',
//     avatarReference: '/buddys/Ng6ZWyIqJu8l9CSXrLZW/lutz_paula.png',
//     email: 'mustermann@gesamtschule-musterstadt.de',
//     occupation: 'Schulsozialarbeiterin',
//     institution: 'Gesamtschule Musterstadt',
//     businessHours: [
//       {
//         days: ['MON', 'TUE', 'WED'],
//         from: '09:00h',
//         to: '16:00h'
//       },
//       {
//         days: ['THU'],
//         from: '12:00h',
//         to: '18:00h'
//       },
//       {
//         days: ['FRI'],
//         from: '09:00h',
//         to: '14:00h'
//       }
//     ],
//     languages: ['Deutsch', 'Englisch'],
//     focus: ['Schulsozialarbeit'],
//     qualifications: ['Sozialarbeiterin', 'systemische Beraterin', '20+ Jahre Berufserfahrung'],
//     bio: 'In meiner Freizeit bin ich gern draußen in der Natur. Mein Hund Bello ist immer mit dabei!'
//   },
//   {
//     bid: 'fatma-yildiz',
//     givenName: 'Fatma',
//     familyName: 'Yildiz',
//     avatarReference: '/buddys/fatma-yildiz/buddy-2.png',
//     email: 'yildiz@stadttreff.de',
//     occupation: 'Sozialarbeiterin',
//     institution: 'Jugendzentrum Kirchdorf',
//     businessHours: [
//       {
//         days: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
//         from: '14:00h',
//         to: '20:00h'
//       }
//     ],
//     languages: ['Deutsch', 'Türkisch', 'Arabisch'],
//     focus: ['Jugendbildung', 'Erziehung'],
//     qualifications: ['Systemische Beraterausbildung'],
//     bio: 'Ich liebe die Berge! Besonders die Motorradstrecken haben es mir angetan, auf denen ich mit meiner Honda fahren kann.'
//   },
//   {
//     bid: 'christian-mueller',
//     givenName: 'Christian',
//     familyName: 'Müller',
//     avatarReference: '/buddys/christian-mueller/chris.png',
//     email: 'christian.müller@supermail.de',
//     occupation: 'Lehrer',
//     institution: 'Gymnasium Neustadt',
//     businessHours: [
//       {
//         days: ['SAT', 'SUN'],
//         from: '09:00h',
//         to: '16:00h'
//       }
//     ],
//     languages: ['Deutsch', 'Deutsche Gebärdensprache'],
//     focus: ['Bildung'],
//     qualifications: ['Lehrer für Sport und Physik', 'ausgebildeter Erlebnispädagoge'],
//     bio: 'Ich bin alleinerziehender Vater von zwei Kindern und interessiere mich für Jazz-Musik.'
//   },
//   {
//     bid: 'lara-schmidt',
//     givenName: 'Lara',
//     familyName: 'Schmidt',
//     avatarReference: '/buddys/lara-schmidt/ls.png',
//     email: 'Lara.Schmidt@efb-baerstadt.fr',
//     occupation: 'Diplom-Pädagogin, Hebamme',
//     institution: 'Erziehungsberatungsstelle',
//     businessHours: [
//       {
//         days: ['MON', 'TUE', 'WED', 'THU'],
//         from: '08:00h',
//         to: '14:00h'
//       }
//     ],
//     languages: ['Deutsch', 'Französisch'],
//     focus: ['Erziehung', 'Frühe Hilfen', 'Alltagstipps in der Krise'],
//     qualifications: ['Anleiterin für Babymassagen'],
//     bio: 'Ich spiele in meiner Freizeit Schlagzeug und gehe gerne auf Konzerte.'
//   }
// ] as TBuddy[];
