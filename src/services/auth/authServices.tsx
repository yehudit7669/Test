import Actions from "../../actions";
import * as requestFromServer from "./authApis";

export const getUserAction =
  (email: string, password: string, rememberMe: boolean) =>
  async (dispatch: any) => {
    return await requestFromServer
      .login(email, password, rememberMe)
      .then((response) => {
        if (response.status === 200) {
          dispatch(Actions.createAction(Actions.USER_LOGIN, response?.data));
          return response;
        } else {
          return null;
        }
      })
      .catch((err) => {
        return err;
      });
  };

export const forgotPasswordAction =
  (email: string) => async (dispatch: any) => {
    return await requestFromServer
      .forgotPassowrd(email)
      .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          return null;
        }
      })
      .catch((err) => {
        return err;
      });
  };
