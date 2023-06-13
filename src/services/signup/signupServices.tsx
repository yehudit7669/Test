import { NavigateFunction } from "react-router";
import Actions from "../../actions";
import * as requestFromServer from "./signupApis";
import { Dispatch, SetStateAction } from "react";
import { AxiosResponse } from "axios";
import { routes } from "../../constants";

export const getSignUpAction =
  (
    email: string,
    password: string,
    classCode: string,
    role: string,
    setToken: (newToken: string) => void,
    navigate: NavigateFunction,
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      setLoading(true);

      const response: AxiosResponse<any> = await requestFromServer.signup(
        email,
        password,
        classCode,
        role
      );

      if (response.status === 200) {
        setLoading(false);
        const { token, role } = response.data;
        setToken(token);
        dispatch(Actions.createAction(Actions.USER_SIGN_UP, response.data));
        // navigate(`/${role}`, { replace: true });
        if(role === "student"){
          navigate('/get-started/birth-date')
        }
        return response;
      } else {
        setLoading(false);
        setError(response?.data?.message);
        return null;
      }
    } catch (err: any) {
      setLoading(false);
      setError(err?.response?.data?.message);
      throw err;
    }
  };