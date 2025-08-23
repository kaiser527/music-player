import { IBackendRes } from "@/types/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Mutex } from "async-mutex";
import axiosClient from "axios";
import { REACT_BACKEND_URL } from "constants/utils";

interface AccessTokenResponse {
  access_token: string;
  refresh_token: string;
}

const instance = axiosClient.create({
  baseURL: REACT_BACKEND_URL,
});

const mutex = new Mutex();
const NO_RETRY_HEADER = "x-no-retry";

const handleRefreshToken = async (): Promise<string | null> => {
  const refresh_token = await AsyncStorage.getItem("refresh_token");
  return await mutex.runExclusive(async () => {
    const res = await instance.post<IBackendRes<AccessTokenResponse>>(
      "/api/v1/auth/refresh",
      null,
      {
        headers: { Authorization: `Bearer ${refresh_token}` },
      }
    );
    if (res && res.result) {
      await AsyncStorage.setItem("access_token", res.result.access_token);
      return res.result.access_token;
    } else return null;
  });
};

instance.interceptors.request.use(async function (config) {
  const access_token = await AsyncStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = "Bearer " + access_token;
  }

  if (!config.headers.Accept && config.headers["Content-Type"]) {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json; charset=utf-8";
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res.data,
  async (error) => {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      error.config.url !== "/api/v1/auth/login" &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      await AsyncStorage.removeItem("access_token");
      const access_token = await handleRefreshToken();
      if (access_token) {
        error.config.headers[NO_RETRY_HEADER] = "true";
        error.config.headers["Authorization"] = `Bearer ${access_token}`;
        return instance.request(error.config);
      } else {
        return Promise.reject({ type: "REFRESH_FAILED" });
      }
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
