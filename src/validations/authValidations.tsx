const emailRegex: any =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const loginValidations = (email: string, password: string) => {
  let status;
  let message;
  if (!email || !password) {
    status = true;
    message = "Please fill all details.";
    return { message, status };
  } else if (!emailRegex.test(email)) {
    status = true;
    message = "Please enter valid email address.";
    return { message, status };
  } else {
    status = false;
    message = "";
    return { message, status };
  }
};

export const forgotPasswordValidations = (email: string) => {
  let status;
  let message;
  if (!email) {
    status = true;
    message = "Please enter email address.";
    return { message, status };
  } else if (!emailRegex.test(email)) {
    status = true;
    message = "Please enter valid email address.";
    return { message, status };
  } else {
    status = false;
    message = "";
    return { message, status };
  }
};

export const signUpValidations = (email: string, password: string, classCode:string) => {
  let status;
  let message;
  if (!email || !password || !classCode) {
    status = true;
    message = "Please fill all the details.";
    return {message, status};
  } else if (!emailRegex.test(email)) {
    status = true;
    message = "Please enter valid email address.";
    return { message, status };
  } else {
    status = false;
    message = "";
    return { message, status };
  }
};