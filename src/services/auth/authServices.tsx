import Actions from "../../actions";
import * as requestFromServer from "./authApis";

export const getUser =
  (email: string, password: string, rememberMe: boolean) =>
  async (dispatch: any) => {
    return await requestFromServer
      .login(email, password, rememberMe)
      .then((response) => {
        if (response.status === 200) {
          dispatch(Actions.createAction(Actions.USER_LOGIN, "Karan"));
          return response;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };
