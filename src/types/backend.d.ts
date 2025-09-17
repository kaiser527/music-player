export interface IBackendRes<T> {
  code: number;
  message: string;
  result: T;
}

export interface IModelPaginate<T> extends IMeta {
  data: T[];
}

export interface IMeta {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface IAccount {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface IGetAccount extends Omit<IAccount, "token"> {}

export interface IUser {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  username: string;
  image: string;
  isActive?: boolean;
  accountType?: string;
  role: IRole;
  track: ITrack[];
}

export interface IRole {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  description: string;
  isActive?: boolean;
  permission: IPermission[];
}

export interface IPermission {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  apiPath: string;
  method: string;
  module: string;
  isChecked?: boolean;
}

export interface ITrack {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  url: string;
  artwork: string;
  user: {
    id: string;
    email: string;
    username: string;
    image: string;
  };
}

export interface IPlaylist {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  track: ITrack[];
  isChecked?: boolean;
  user?: {
    id: string;
    email: string;
    username: string;
    image: string;
  };
}

export interface IRegister {
  username: string;
  password: string;
  email: string;
}

export interface ICode {
  email: string;
  codeId: string;
  isForgot: boolean;
}

export interface IForgotPassword {
  email: string;
  codeId: string;
  password: string;
  confirmPassword: string;
}
