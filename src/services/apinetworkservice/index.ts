import BaseConfig from "@/config";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from "react-native";
//@ts-ignore
import { ParamsNetwork } from "./type";

export const RESULT_CODE_PUSH_OUT = 401;
const TIME_OUT = 20000;

import Axios, { AxiosRequestConfig } from "axios";
import { ResponseBase } from "./type";

//@ts-ignore
import { controller, handleParameter } from "./helper";
import { getAuthToken } from "@/store/auth";

const AxiosInstance = Axios.create({});

AxiosInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    if (
      error &&
      error.response &&
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return AxiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

// base
function Request(config: ParamsNetwork) {
  const token = getAuthToken();

  let headers = {
    "Content-Type": "application/json",
    authorization: "Bearer " + token ?? "",
  };

  const defaultConfig: AxiosRequestConfig = {
    baseURL: BaseConfig.API_URL,
    timeout: TIME_OUT,
    headers: headers,
  };

  return new Promise((rs, reject) => {
    AxiosInstance.request(
      StyleSheet.flatten([
        defaultConfig,
        config,
        { signal: config?.controller?.signal || controller.current?.signal },
      ])
    )
      .then((res) => {
        rs(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// get
async function Get(params: ParamsNetwork) {
  return Request(handleParameter(params, "GET"));
}

// post
async function Post<T>(params: ParamsNetwork) {
  return Request(handleParameter(params, "POST"));
}

type ParameterPostFormData = AxiosRequestConfig & ParamsNetwork;

// post FormData
async function PostFormData<T>(params: ParamsNetwork) {
  //   const { token }: AppState = getState("app");
  const headers: AxiosRequestConfig["headers"] = {
    // [tokenKeyHeader]: token ?? "",
    "Content-Type": "multipart/form-data",
  };
  return Request(handleParameter<ParameterPostFormData>({ ...params, headers }, "POST"));
}

// put
async function Put<T>(params: ParamsNetwork) {
  return Request(handleParameter(params, "PUT"));
}

// patch
async function Patch<T>(params: ParamsNetwork) {
  return Request(handleParameter(params, "PATCH"));
}

// delete
async function Delete<T>(params: ParamsNetwork) {
  return Request(handleParameter(params, "DELETE"));
}

export type NetWorkResponseType<T> = (
  params: ParamsNetwork
) => Promise<ResponseBase<T> | null>;

export const NetWorkService = {
  Get,
  Post,
  Put,
  Delete,
  PostFormData,
  Request,
  Patch,
};
