"use client";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import nookies from "nookies";
import api from "./api";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const authorizedApi = axios.create({
  baseURL: apiUrl,
});

type AxiosOriginalConfig = AxiosRequestConfig & {
  sent?: boolean;
};

authorizedApi.interceptors.request.use(
  (config) => {
    const token = nookies.get(null)?.token;

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let authTokenRequest: Promise<any> | null;

function getAuthToken() {
  if (!authTokenRequest) {
    authTokenRequest = api.post("/account/refresh-token", {
      refreshToken: nookies.get(null)?.refreshToken,
    });
    authTokenRequest.then(resetAuthTokenRequest, resetAuthTokenRequest);
  }

  return authTokenRequest;
}

function resetAuthTokenRequest() {
  authTokenRequest = null;
}

axios.defaults.withCredentials = true;
authorizedApi.interceptors.request.use(
  // @ts-expect-error axios types are wrong
  (config: AxiosRequestConfig) => {
    if (!config?.headers) return;
    if (!config.headers?.Authorization) {
      config.headers!.Authorization = `Bearer ${nookies.get(null)?.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authorizedApi.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError) {
    if (!error.config) return;

    const originalConfig: AxiosOriginalConfig = error.config;
    originalConfig!.headers = { ...originalConfig!.headers };
    if (error?.response?.status === 401 && originalConfig && !originalConfig?.sent) {
      return getAuthToken()
        .then((response) => {
          originalConfig!.sent = true;
          nookies.set(null, "token", response?.data?.data?.accessToken);
          nookies.set(null, "refreshToken", response?.data?.data?.refreshToken);
          originalConfig.headers!.Authorization = `Bearer ${response?.data?.data?.accessToken}`;
          return authorizedApi(originalConfig);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            window.location.href = "/login";
            nookies.destroy(null, "token");
            nookies.destroy(null, "refreshToken");
          }
        });
    }
    return Promise.reject(error);
  }
);

export default authorizedApi;
