import { makeAutoObservable } from 'mobx';

class AppStore {
  isLogin = false;
  userId = NaN;
  isOpen = false;
  isStart = false;
  lastScore = 0;
  login = localStorage.getItem('login') || 'Player';

  constructor() {
    makeAutoObservable(this);
  }

  toogleLogin(status) {
    this.isLogin = status;
  }

  setUserId(id) {
    this.userId = id;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  setLastScore(score) {
    this.lastScore = score;
  }

  setNickName(name) {
    this.login = name;
  }

  toggleStart(state) {
    this.isStart = state;
  }
}

export default new AppStore();
