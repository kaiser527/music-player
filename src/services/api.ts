import {
  IAccount,
  IBackendRes,
  ICode,
  IForgotPassword,
  IGetAccount,
  IModelPaginate,
  IRegister,
  ITrack,
  IUser,
} from "@/types/backend";
import axios from "./axios-customize";

//----------------------auth----------------------//
export const callLogin = (data: { email: string; password: string }) => {
  return axios.post<IBackendRes<IAccount>>("/api/v1/auth/login", data);
};

export const callLogout = () => {
  return axios.post<IBackendRes<void>>("/api/v1/auth/logout");
};

export const callRegister = (data: IRegister) => {
  return axios.post<IBackendRes<IUser>>("/api/v1/auth/register", data);
};

export const callFetchAccount = () => {
  return axios.get<IBackendRes<IGetAccount>>("/api/v1/auth/account");
};

export const callVerifyCode = (data: ICode) => {
  return axios.post<IBackendRes<IUser>>("/api/v1/auth/verify", data);
};

export const callResendCode = (data: ICode) => {
  return axios.post<IBackendRes<void>>("/api/v1/auth/resend", data);
};

export const callResetPassword = (data: IForgotPassword) => {
  return axios.post<IBackendRes<IUser>>("/api/v1/auth/forgot", data);
};
//----------------------auth----------------------//

//----------------------track----------------------//
export const callFetchTrackPaginate = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<ITrack>>>(
    `/api/v1/track?${query}`
  );
};

export const callFetchTrackById = (id: string) => {
  return axios.get<IBackendRes<ITrack>>(`/api/v1/track/${id}`);
};
//----------------------track----------------------//

//----------------------user----------------------//
export const callFetchArtist = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IUser>>>(
    `/api/v1/user/artist?${query}`
  );
};
//----------------------user----------------------//

//----------------------playlist----------------------//

//----------------------playlist----------------------//
