import axios from "axios";
import.meta.env;

console.log("ENV var:", import.meta.env);

const BASE_URL = import.meta.env.REACT_APP_URL;

export const LOGIN_URL = `${BASE_URL}/auth/login`;

export const login = (email: string, password: string, rememberMe: boolean) => {
  return axios.post(LOGIN_URL, {
    email,
    password,
    rememberMe,
  });
};
