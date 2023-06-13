import axios from "axios";

export const SIGN_UP_URL = `auth/register`;

export const signup = (email: string, password: string, classCode: string, role:string | undefined) => {
  return axios.post(
    SIGN_UP_URL,
    {
      email,
      password,
      classCode,
      role
    }
    // { headers: {} }
  );
};
