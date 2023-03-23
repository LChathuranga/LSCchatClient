import { toast } from "react-toastify";
import { toastErrorOptions } from "./ToastOptions";

export const handleRegistrationFormValidation = ({ values }) => {
  const { password, conformPassword, userName, email } = values;
  if (password !== conformPassword) {
    toast.error(
      "Password and Conform Password should be same.",
      toastErrorOptions
    );
    return false;
  } else if (userName.length < 3) {
    toast.error(
      "User name should be grater than 3 characters.",
      toastErrorOptions
    );
    return false;
  } else if (password.length < 8) {
    toast.error(
      "Password should be equal or grater than 8 characters.",
      toastErrorOptions
    );
    return false;
  } else if (email === "") {
    toast.error("email is required.", toastErrorOptions);
    return false;
  }
  return true;
};

export const handleLoginFormValidation = ({ values }) => {
  const { password, userName } = values;
  if (password === "") {
    toast.error("Email and password is required.", toastErrorOptions);
    return false;
  } else if (userName.length === "") {
    toast.error("Email and password is required.", toastErrorOptions);
    return false;
  }
  return true;
};

export const handleResponseData = ({ data }) => {
  if (data.status === false) {
    toast.error(data.msg, toastErrorOptions);
    return false;
  }
  if (data.status === true) {
    return true;
  }
};

