import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ResponseDataT } from "../types/types";

interface HttpClientI {
  fetch: (url: string, options:AxiosRequestConfig) => Promise<ResponseDataT>
}


class HttpClient implements HttpClientI {
  client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    })
  }

  async fetch (url: string, options:AxiosRequestConfig): Promise<ResponseDataT> {
    const {data, method, headers} = options
    const requestConfig = {
      url,
      method,
      data,
      headers: {
        ...headers
      }
    }
    const response = await this.client(requestConfig)
    return response.data 
  }
}

export default HttpClient