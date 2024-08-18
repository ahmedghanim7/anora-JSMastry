import Toast, { ToastShowParams } from "react-native-toast-message";

export const showToastError = (message: string, options?: ToastShowParams) => {
  return Toast.show({
    type: "error",
    text1: message,
    ...options,
  });
};

export const showToastInfo = (message: string, options?: ToastShowParams) => {
  return Toast.show({
    type: "info",
    text1: message,
    ...options,
  });
};

export const showToastSuccess = (
  message: string,
  options?: ToastShowParams
) => {
  return Toast.show({
    type: "success",
    text1: message,
    ...options,
  });
};
