import axios from "axios";

const instance = axios.create({
  // .. where we make our configurations
  // baseURL: process.env.REACT_APP_BE_URL
  baseURL: "http://127.0.0.1:5000",
});

export default instance;
