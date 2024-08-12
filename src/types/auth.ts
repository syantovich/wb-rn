import {IUser} from './users';

// Базовая информация о данных для входа
export interface ILoginData {
  email: string;
  password: string;
}

// Базовая информация о данных для регистрации
export interface IRegisterData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

// Информация о токенах аутентификации
export interface IAuthTokens {
  token: string;
  refreshToken: string;
}

// Основной интерфейс ответа аутентификации, включающий все вышеуказанные интерфейсы
export interface IAuthResponse extends IAuthTokens {
  user: IUser;
}
