import { ID, ImageGravity } from "react-native-appwrite";
import { appWriteConfig, appWriteStorage } from "./appwrite.config";

export async function uploadFile(file: any, type: string) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };
  try {
    const uploadedFile = await appWriteStorage.createFile(
      appWriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getFilePreview(fileId: string, type: string) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = appWriteStorage.getFileView(appWriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = appWriteStorage.getFilePreview(
        appWriteConfig.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
}
