import { ID, Query } from "react-native-appwrite";
import {
  appWriteAccount,
  appWriteAvatars,
  appWriteDatabases,
  appWriteConfig,
} from "./appwrite.config";
import { SignInParams, SignUpParams } from "@/@types";

export async function createUser({ email, password, username }: SignUpParams) {
  try {
    const newAccount = await appWriteAccount.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = appWriteAvatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await appWriteDatabases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    console.log({ error });
    throw new Error(error);
  }
}

export async function signIn({ email, password }: SignInParams) {
  try {
    // @ts-ignore
    const session = await appWriteAccount.createEmailPasswordSession(
      email,
      password
    );

    return session;
  } catch (error: any) {
    console.log({ error });

    throw new Error(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await appWriteAccount.get();

    return currentAccount;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await appWriteDatabases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOut() {
  try {
    const session = await appWriteAccount.deleteSession("current");
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}
