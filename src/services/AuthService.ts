import {makeAutoObservable} from 'mobx';
import httpClient from '../helpers/httpClient';
import {ILoginData, IRegisterData, IAuthResponse} from '../types/auth';
import {TFunction} from 'i18next';
import storage from '../constants/storage';
import {AsyncStorageKeys} from '../constants/config';

class AuthService {
  user: IAuthResponse['user'] | null = null;
  token: string | null = null;
  refreshToken: string | null = null;
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

  register = async (
    registerDto: IRegisterData,
    t: (key: string) => string,
  ): Promise<string | null> => {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await httpClient.post<IAuthResponse>(
        '/auth/register',
        registerDto,
      );
      this.setUser(response.data);
      return null;
    } catch (error: any) {
      return error.response?.data?.message || t('errors.failedRegister');
    } finally {
      this.isLoading = false;
    }
  };

  login = async (
    loginDto: ILoginData,
    t: (key: string) => string,
  ): Promise<string | null> => {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await httpClient.post<IAuthResponse>(
        '/auth/login',
        loginDto,
      );
      console.log(response.data);
      this.setUser(response.data);
      return null;
    } catch (error: any) {
      return error.response?.data?.message || t('errors.failedLogin');
    } finally {
      this.isLoading = false;
    }
  };

  logout = async (t: (key: string) => string): Promise<string | null> => {
    try {
      await httpClient.get('/auth/logout');
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      return null;
    } catch (error: any) {
      return t('errors.logoutFailed');
    }
  };

  sendVerificationCode = async (
    onError: (error: string) => void,
    t: TFunction,
  ) => {
    try {
      await httpClient.post('/verification/send', {personId: this.user?.id});
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));

      onError(t('errors.failedSendVerification'));
    }
  };

  validateVerificationCode = async (
    code: string,
    t: (key: string) => string,
  ): Promise<string | null> => {
    try {
      await httpClient.post('/verification/validate', {code});
      return null;
    } catch (error: any) {
      console.log(error, 'error');
      return t('errors.failedValidateVerification');
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
}

const service = new AuthService();
export default service;
