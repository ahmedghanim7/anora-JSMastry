import { FileMedia } from "@/@types/Posts.type";

export const extractDataFile = (file: any): FileMedia => {
  const { mimeType, name, size, uri } = file;
  return { mimeType, name, size, uri };
};

export const validateFormNotEmpty = (form: Object) => {
  const formKeys = Object.keys(form);
  return formKeys.every((key) => {
    if (key === "video" || key === "thumbnail") return Boolean(form[key].uri);

    return Boolean(form[key]);
  });
};

export const trimString = (str: string) => str.trim();
