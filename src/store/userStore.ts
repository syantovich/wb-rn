import {TFunction} from 'i18next';
import {makeAutoObservable} from 'mobx';
import Toast from 'react-native-toast-message';

import {AsyncStorageKeys} from '../constants/config';
import storage from '../constants/storage';
import {logoutFunc} from '../modules/Authorization';
import {IAuthResponse} from '../types/auth';

class UserStore {
  private user: IAuthResponse['user'] | null = null;
  private token: string | null = null;
  private refreshToken: string | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUser();
  }

  loadUser = async () => {
    try {
      const data = await storage.load({key: AsyncStorageKeys.USER});
      this.user = data.person;
      this.token = data.token;
      this.refreshToken = data.refreshToken;
    } catch {
      this.user = null;
      this.token = null;
      this.refreshToken = null;
    }
  };

  setUser = (data: IAuthResponse | null): void => {
    if (data) {
      this.user = data.user;
      this.token = data.token;
      this.refreshToken = data.refreshToken;
      storage.save({
        key: AsyncStorageKeys.USER,
        data: data,
      });
    } else {
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      storage.remove({
        key: AsyncStorageKeys.USER,
      });
    }
  };

  getToken = (): string | null => {
    return this.token;
  };

  getRefreshToken = () => {
    return this.refreshToken;
  };
  getUser = () => {
    return this.user;
  };

  verifyUser = () => {
    if (this.user) {
      this.user.isVerified = true;
    }
  };

  logout = async (t: TFunction) => {
    const {error} = await logoutFunc(t);
    if (!error) {
      await storage.remove({key: AsyncStorageKeys.USER});
      this.user = null;
      this.token = null;
      this.refreshToken = null;
    } else {
      Toast.show({
        type: 'error',
        text1: t('errors.logout'),
      });
    }
  };
}

const store = new UserStore();
export default store;
