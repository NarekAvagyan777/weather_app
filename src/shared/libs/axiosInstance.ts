import axios from "axios";
import config from "../../../config";

export const $api = axios.create({
  baseURL: config.VITE_BASE_URL,
  timeout: 1000,
  params: {
    appid: config.VITE_API_KEY,
  },
});
