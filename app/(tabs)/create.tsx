import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { spacing } from "@/theme";
import UploadVideo from "@/components/create/UploadVideo";
import AddThumbnailImage from "@/components/create/AddThumbnailImage";
import {
  Button,
  Typography,
  FormField,
  Screen,
} from "@/components/common";
import { Alert, View } from "react-native";
import { FileMedia } from "@/@types/Posts.type";
import { useAppSelector } from "@/store";
import { router } from "expo-router";
import { createVideoPost } from "@/service/app-write/posts";
import { extractDataFile, validateFormNotEmpty } from "@/utils/functions";
import Toast from "react-native-toast-message";

interface Form {
  title?: string;
  video?: FileMedia;
  thumbnail?: FileMedia;
  prompt?: string;
}

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const initialFormState: Form = {
    title: "",
    video: {},
    thumbnail: {},
    prompt: "",
  };
  const [form, setForm] = useState<Form>(initialFormState);

  const { username, $id } = useAppSelector((state) => state.user);

  const openPicker = async (mediaType: string) => {
    const pickedMedia = await DocumentPicker.getDocumentAsync({
      // type:
      //   mediaType === "image"
      //     ? ["image/png", "image/jpg"]
      //     : ["video/mp4", "video/gif"],
    });
    if (!pickedMedia.canceled) {
      const extractedMedia = extractDataFile(pickedMedia.assets[0]);
      const updatedMediaKey = mediaType === "image" ? "thumbnail" : "video";
      setForm({
        ...form,
        [updatedMediaKey]: extractedMedia,
      });
    } else {
      setTimeout(() => {
        Toast.show({
          type: "info",
          text1: "Document picked",
        });
      }, 100);
    }
  };

  const submit = async () => {
    if (!validateFormNotEmpty(form)) {
      return;
    }
    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: $id,
      });
      Toast.show({
        type: "success",
        text1: "Success, Post uploaded successfully",
      });
      router.push("/home");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    } finally {
      setForm(initialFormState);
      setUploading(false);
    }
  };

  return (
    <Screen scrollable px="xLarge" top={50} bottom="xxxLarge">
      <Typography
        content="Upload Video"
        variant="xLargeBold"
        textStyles={{ textAlign: "left", margin: 0 }}
      />
      <View style={{ marginTop: 32, rowGap: spacing.medium }}>
        <FormField
          label="Video Title"
          value={form.title || ""}
          placeholder="Give your video a catchy title..."
          onChangeText={(e) => setForm({ ...form, title: e })}
          containerStyles={{ marginTop: spacing.medium - 2 }}
        />
        <UploadVideo openPicker={openPicker} video={form.video || {}} />
        <AddThumbnailImage
          openPicker={openPicker}
          thumbnail={form.thumbnail || {}}
        />

        <FormField
          label="AI Prompt"
          value={form.prompt || ""}
          placeholder="The AI prompt of your video...."
          onChangeText={(e) => setForm({ ...form, prompt: e })}
          containerStyles={{ marginTop: spacing.small }}
        />

        <Button
          title="Submit & Publish"
          onPress={submit}
          containerStyles={{ marginTop: spacing.small, marginBottom: 70 }}
          isLoading={uploading}
        />
      </View>
    </Screen>
  );
};

export default Create;
