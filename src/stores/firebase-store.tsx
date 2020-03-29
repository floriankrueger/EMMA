import { action, observable, computed } from 'mobx';
import { TUser, TBuddy, TChat } from '../models';

export class FirebaseStore {
  @observable
  user: TUser | null = null;

  @observable
  buddys: TBuddy[] = [];

  @observable
  buddyAvatarUrls: Map<string, string> = new Map();

  @observable
  chats: TChat[] = [];

  @action
  userSignedIn(user: TUser) {
    this.buddys = [];
    this.chats = [];
    this.user = user;
  }

  @action
  userSignedOut() {
    this.buddys = [];
    this.chats = [];
    this.user = null;
  }

  @action
  buddyAvatarUrlLoaded(reference: string, url: string) {
    this.buddyAvatarUrls.set(reference, url);
  }

  @action
  addBuddy(buddy: TBuddy) {
    console.log(`buddy added ${buddy.bid}`);
    this.buddys.push(buddy);
  }

  @action
  updateBuddy(buddy: TBuddy) {
    console.log(`buddy updated ${buddy.bid}`);
    const index = this.buddys.findIndex(existingBuddy => existingBuddy.bid === buddy.bid);
    if (index) {
      this.buddys.splice(index, 1, buddy);
    } else {
      this.buddys.push(buddy);
    }
  }

  @action
  deleteBuddy(buddy: TBuddy) {
    console.log(`buddy deleted ${buddy.bid}`);
    const index = this.buddys.findIndex(existingBuddy => existingBuddy.bid === buddy.bid);
    if (index) {
      this.buddys.splice(index, 1);
    }
  }

  @action
  addChat(chat: TChat) {
    console.log(`chat added ${chat.cid}`);
    this.chats.push(chat);
  }

  @action
  updateChat(chat: TChat) {
    console.log(`chat updated ${chat.cid}`);
    const index = this.chats.findIndex(existingChat => existingChat.cid === chat.cid);
    if (index) {
      this.chats.splice(index, 1, chat);
    } else {
      this.chats.push(chat);
    }
  }

  @action
  deleteChat(chat: TChat) {
    console.log(`chat deleted ${chat.cid}`);
    const index = this.chats.findIndex(existingChat => existingChat.cid === chat.cid);
    if (index) {
      this.chats.splice(index, 1);
    }
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
