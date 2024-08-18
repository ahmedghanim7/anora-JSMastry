import { ID, Query } from "react-native-appwrite";
import { appWriteConfig, appWriteDatabases } from "./appwrite.config";
import { uploadFile } from "./files";
import { Post } from "@/@types";
import { trimString } from "@/utils/functions";

export async function createVideoPost(form: any) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await appWriteDatabases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: trimString(form.title),
        thumbnailUrl: thumbnailUrl,
        videoUrl: videoUrl,
        propmpt: trimString(form.prompt),
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const posts = await appWriteDatabases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId
    );
    const returnedPosts: Post[] = posts.documents.map((post) => {
      const { $id, creator, thumbnailUrl, videoUrl, title } = post;
      return {
        title,
        $id,
        creator: { avatar: creator?.avatar, username: creator?.username },
        thumbnailUrl,
        videoUrl,
      };
    });
    return returnedPosts;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    const posts = await appWriteDatabases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    const returnedPosts: Post[] = posts.documents.map((post) => {
      const { $id, creator, thumbnailUrl, videoUrl, title } = post;
      return {
        title,
        $id,
        creator: { avatar: creator?.avatar, username: creator?.username },
        thumbnailUrl,
        videoUrl,
      };
    });

    return returnedPosts;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getLatestPosts = async (): Promise<Post[]> => {
  try {
    const posts = await appWriteDatabases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    const returnedPosts: Post[] = posts.documents.map((post) => {
      const { $id, creator, thumbnailUrl, videoUrl, title } = post;
      return {
        title,
        $id,
        creator: { avatar: creator?.avatar, username: creator?.username },
        thumbnailUrl,
        videoUrl,
      };
    });
    return returnedPosts;
  } catch (error: any) {
    throw new Error(error);
  }
};
