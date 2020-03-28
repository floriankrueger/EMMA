import { action, observable, computed } from 'mobx';
import { TUser } from '../models';

export class FirebaseStore {
  @observable
  user: TUser | null = null;

  @action
  userSignedIn(user: TUser) {
    this.user = user;
  }

  @action
  userSignedOut() {
    this.user = null;
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
}
