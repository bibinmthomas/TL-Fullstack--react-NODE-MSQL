import axios from "axios";
import { BASE_URL } from "./services/helpers";
const instance = axios.create({
  // .. where we make our configurations
  // baseURL: process.env.REACT_APP_BE_URL
  baseURL: BASE_URL,
});

export default instance;
