import {
  IAccount,
  IBackendRes,
  ICode,
  IForgotPassword,
  IGetAccount,
  IModelPaginate,
  IPlaylist,
  IRegister,
  IRole,
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

export const callFetchUser = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IUser>>>(`/api/v1/user?${query}`);
};

export const callCreateUser = (data: {
  email: string;
  username: string;
  password: string;
  image: string;
  isActive: boolean;
  accountType: string;
  roleId: string;
}) => {
  return axios.post<IBackendRes<IUser>>("/api/v1/user", data);
};

export const callUpdateUser = (
  id: string,
  data: {
    username: string;
    image: string;
    isActive: boolean;
    accountType: string;
    roleId: string;
  }
) => {
  return axios.patch<IBackendRes<IUser>>(`/api/v1/user/${id}`, data);
};

export const callDeleteUser = (id: string) => {
  return axios.delete<IBackendRes<IUser>>(`/api/v1/user/${id}`);
};
//----------------------user----------------------//

//----------------------playlist----------------------//
export const callFetchGlobalPlaylist = () => {
  return axios.get<IBackendRes<IPlaylist[]>>("/api/v1/playlist/global");
};

export const callFetchUserPlaylist = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IPlaylist>>>(
    `/api/v1/playlist/user?${query}`
  );
};

export const callCreatePlaylist = (data: {
  name: string;
  trackIds: string[];
}) => {
  return axios.post<IBackendRes<IPlaylist>>("/api/v1/playlist", data);
};

export const callUpdatePlaylist = (
  id: string,
  data: {
    name: string;
    trackIds: string[];
  }
) => {
  return axios.patch<IBackendRes<IPlaylist>>(`/api/v1/playlist/${id}`, data);
};

export const callBulkDeletePlaylist = (playlistIds: string[]) => {
  return axios.post<IBackendRes<IPlaylist>>(
    "/api/v1/playlist/bulk-delete",
    playlistIds
  );
};
//----------------------playlist----------------------//

//----------------------role----------------------//
export const callFetchRole = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IRole>>>(`/api/v1/role?${query}`);
};
//----------------------role----------------------//

//----------------------file----------------------//
export const callUploadingleFile = (
  file: any,
  folderType: string,
  type: "TRACK" | "IMAGE"
) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileUpload", file);
  return axios<IBackendRes<{ fileName: string }>>({
    method: "post",
    url: `/api/v1/file/upload?file_type=${type}`,
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      folder_type: folderType,
    },
  });
};
//----------------------file----------------------//
