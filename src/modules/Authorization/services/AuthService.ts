import {TFunction} from 'i18next';

import httpClient from '../../../helpers/httpClient';
import NetworkResponse from '../../../services/NetworkResponse';
import {IAuthResponse, IRegisterData} from '../../../types/auth';
import {ILoginData} from '../types';

class AuthService {
  login = async (
    loginDto: ILoginData,
    t: (key: string) => string,
  ): Promise<NetworkResponse<IAuthResponse>> => {
    try {
      const response = await httpClient.post<IAuthResponse>(
        '/auth/login',
        loginDto,
      );
      return new NetworkResponse(response.data);
    } catch (error: any) {
      return new NetworkResponse(
        error.response?.data?.message || t('errors.failedLogin'),
      );
    }
  };

  register = async (
    registerDto: IRegisterData,
    t: (key: string) => string,
  ): Promise<NetworkResponse<IAuthResponse>> => {
    try {
      const response = await httpClient.post<IAuthResponse>(
        '/auth/register',
        registerDto,
      );
      return new NetworkResponse(response.data);
    } catch (error: any) {
      return new NetworkResponse(
        error.response?.data?.message || t('errors.failedRegister'),
      );
    }
  };

  logout = async (
    t: (key: string) => string,
  ): Promise<NetworkResponse<string | null>> => {
    try {
      await httpClient.get('/auth/logout');
      return new NetworkResponse(null);
    } catch (error: any) {
      return new NetworkResponse(t('errors.logoutFailed'));
    }
  };

  sendVerificationCode = async (
    personId: number | string | undefined,
    onError: (error: string) => void,
    t: TFunction,
  ) => {
    try {
      await httpClient.post('/verification/send', {
        personId: personId,
      });
    } catch (error: any) {
      onError(t('errors.failedSendVerification'));
    }
  };

  validateVerificationCode = async (
    code: string,
    t: (key: string) => string,
  ): Promise<NetworkResponse<string | null>> => {
    try {
      await httpClient.post('/verification/validate', {code});
      return new NetworkResponse(null);
    } catch (error: any) {
      console.log(error, 'error');
      return new NetworkResponse(t('errors.failedValidateVerification'));
    }
  };
}

const service = new AuthService();
export default service;
