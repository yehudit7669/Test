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
    role: string | undefined,
    setToken: (newToken: string) => void,
    navigate: NavigateFunction,
    setError: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    classCode?: string,
  ) =>
  async (dispatch: any): Promise<AxiosResponse<any> | null> => {
    try {
      setLoading(true);

      const response: AxiosResponse<any> = await requestFromServer.signup(
        email,
        password,
        role,
        classCode,
      );

      if (response.status === 200) {
        setLoading(false);
        const { token, role } = response.data;
        setToken(token);
        dispatch(Actions.createAction(Actions.USER_SIGN_UP, response.data));
        if(role === "student"){
          navigate(routes.ROOT,{replace:true})
        }
        else if(role === "teacher"){
          navigate(`/${routes.SIGN_UP}/${role}/teacher-details`,{replace:true})
        }
        else if(role === "parent"){
          navigate(`/${routes.SIGN_UP}/${role}/parent-details`,{replace:true})
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