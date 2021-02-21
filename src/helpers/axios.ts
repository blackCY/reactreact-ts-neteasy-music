import axios, { ResponseType, AxiosInstance, AxiosRequestConfig } from "axios";
import { message as AntMsg } from "antd";

const TIMEOUT = 4000;
const MIME_TYPE: IDictionary<ResponseType> = {
  JSON: "json",
};

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_MUSIC_URL
    : process.env.REACT_APP_MUSIC_URL;

const createInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: TIMEOUT,
    responseType: MIME_TYPE.JSON,
  });

  instance.interceptors.response.use(handleResponse, handleError);

  return instance;
};

const handleResponse = (response: any) => response.data;

const handleError = (error: any) => {
  const { response, message } = error;
  return Promise.reject(
    response ? new Error(response.data.message || message) : error
  );
};

const toastError = (error: any) => {
  const { message, response } = error;
  AntMsg.error(response.data.message || message);

  return Promise.reject(error);
};

interface Instance extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<any>;
}

export const requestWithoutErrorToast: Instance = createInstance();

const request: Instance = createInstance();
request.interceptors.response.use(undefined, toastError);

export default request;
