import AxiosInstance, {
  AxiosStatic,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosPromise,
} from "axios";

interface IRequestData {
  url: string;
  method: string;
  data: Object;
}

type RequestMethod = (params: IRequestData) => AxiosPromise;

class Http {
  private axios: AxiosStatic = AxiosInstance;

  constructor() {
    this.axios.defaults.timeout = 4000;
    this.axios.defaults.baseURL = process.env.REACT_APP_VIDEO_URL;
    this.axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";

    this.useRequestInceptor();
    this.useResponseInceptor();
  }

  useRequestInceptor = () => {
    this.axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // const newConfig = Object.assign({}, config, {
        //   headers: {
        //     authization: config
        //   }
        // })
        return config;
      },
      (error: AxiosError) => {}
    );
  };

  useResponseInceptor = () => {
    this.axios.interceptors.response.use(
      (data: AxiosResponse) => {
        return data;
      },
      (error: AxiosError) => {}
    );
  };

  public request: RequestMethod = ({ method, url, data }) => {
    return (this.axios as _.IAxios)[method](url, data);
  };
}

export default new Http();
