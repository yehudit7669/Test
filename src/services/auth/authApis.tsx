import axios from "axios";
import.meta.env;

console.log("ENV var:", import.meta.env);

// export const LOGIN_URL = `auth/login`;
export const LOGIN_URL = `auth/login`;

export const login = (email: string, password: string, rememberMe: boolean) => {
  return axios.post(LOGIN_URL, {
    email,
    password,
    rememberMe,
  });
};
