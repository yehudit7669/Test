import axios from "axios";

export const FIRST_LOGIN_STUDENT_URL = `auth/student/details`;

export const firstLoginStudent = (DOB: string) => {
  return axios.post(
    FIRST_LOGIN_STUDENT_URL,
    {
      DOB,
    }
    // { headers: {} }
  );
};
