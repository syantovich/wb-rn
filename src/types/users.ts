// Базовая информация о пользователе
export interface IUserBase {
  id: string;
  name: string;
  email: string;
}

// Информация о правах доступа пользователя
export interface IUserAuthorities {
  authorities: string[];
}

// Информация о верификации пользователя
export interface IUserVerification {
  isVerified: boolean;
}

// Основной интерфейс пользователя, включающий все вышеуказанные интерфейсы
export interface IUser extends IUserBase, IUserAuthorities, IUserVerification {}
