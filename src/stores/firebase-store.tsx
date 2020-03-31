import { action, observable, computed } from 'mobx';
import { TUser, TBuddy, TChat } from '../models';

export class FirebaseStore {
  @observable
  user: TUser | null = null;

  @observable
  buddys: TBuddy[] = [];

  @observable
  didFetchBuddys: boolean = false;

  @observable
  buddyAvatarUrls: Map<string, string> = new Map();

  @observable
  chats: TChat[] = [];

  @observable
  didFetchChats: boolean = false;

  @action
  userSignedIn(user: TUser) {
    this.buddys = [];
    this.didFetchBuddys = false;
    this.chats = [];
    this.didFetchChats = false;
    this.user = user;
  }

  @action
  userSignedOut() {
    this.buddys = [];
    this.didFetchBuddys = false;
    this.chats = [];
    this.didFetchChats = false;
    this.user = null;
  }

  @action
  buddyAvatarUrlLoaded(reference: string, url: string) {
    this.buddyAvatarUrls.set(reference, url);
  }

  @action
  addBuddy(buddy: TBuddy) {
    this.buddys = this.buddys.concat(buddy);
  }

  @action
  updateBuddy(buddy: TBuddy) {
    this.buddys = this.buddys.map(existingBuddy => {
      if (existingBuddy.bid === buddy.bid) {
        return buddy;
      } else {
        return existingBuddy;
      }
    });
  }

  @action
  deleteBuddy(buddy: TBuddy) {
    this.buddys = this.buddys.filter(existingBuddy => existingBuddy.bid !== buddy.bid);
  }

  @action
  addChat(chat: TChat) {
    this.chats = this.chats.concat(chat);
  }

  @action
  updateChat(chat: TChat) {
    this.chats = this.chats.map(existingChat => {
      if (existingChat.cid === chat.cid) {
        return chat;
      } else {
        return existingChat;
      }
    });
  }

  @action
  deleteChat(chat: TChat) {
    this.chats = this.chats.filter(existingChat => existingChat.cid !== chat.cid);
  }

  buddyAvatarUrl(reference: string): string {
    return this.buddyAvatarUrls.get(reference) || 'assets/icon_buddys.svg';
  }

  buddy(bid: string): TBuddy | undefined {
    return this.buddys.find(buddy => buddy.bid === bid);
  }

  chat(cid: string): TChat | undefined {
    return this.chats.find(chat => chat.cid === cid);
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
