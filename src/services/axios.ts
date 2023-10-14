import axios from "axios";
import { parseCookies } from "nookies";

export function getAPI(ctx?: any) {
  const { 'chathub.access-token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3000'
  })

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  api.interceptors.request.use(config => {
    if (!config.headers.Authorization && token) {
      config.headers.Authorization = token
    }
    return config;
  })

  return api;
}
