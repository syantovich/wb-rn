// src/services/AuthService.ts
import {makeAutoObservable} from 'mobx';
import httpClient from '../helpers/httpClient';
import {ILoginData, IRegisterData, IAuthResponse} from '../types/auth';

class AuthService {
  user: IAuthResponse['user'] | null = null;
  token: string | null = null;
  refreshToken: string | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async register(
    registerDto: IRegisterData,
    t: (key: string) => string,
  ): Promise<string | null> {
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
  }

  async login(
    loginDto: ILoginData,
    t: (key: string) => string,
  ): Promise<string | null> {
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
      console.log(JSON.stringify(error, null, 2));
      return error.response?.data?.message || t('errors.failedLogin');
    } finally {
      this.isLoading = false;
    }
  }

  async logout(t: (key: string) => string): Promise<string | null> {
    try {
      await httpClient.get('/auth/logout');
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      return null;
    } catch (error: any) {
      return t('errors.logoutFailed');
    }
  }

  setUser(data: IAuthResponse): void {
    this.user = data.user;
    this.token = data.token;
    this.refreshToken = data.refreshToken;
  }
}

export default new AuthService();
