import {authModuleName} from './constants';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ValidationScreen from './screens/ValidationScreen';
import authService from './services/AuthService';
import en from './translates/en.json';
import {ELanguages, LanguagesModule} from '../../lang/types';

export const screens = {
  LoginScreen,
  RegisterScreen,
  ValidationScreen,
};

export const translations: LanguagesModule<typeof en> = {
  [ELanguages.EN]: en,
};

export const logoutFunc = authService.logout;

export const moduleName = authModuleName;
