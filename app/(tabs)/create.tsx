import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { spacing } from "@/theme";
import UploadVideo from "@/components/create/UploadVideo";
import AddThumbnailImage from "@/components/create/AddThumbnailImage";
import { Button, Typography, FormField, Screen } from "@/components/common";
import { View } from "react-native";
import { FileMedia } from "@/@types/Posts.type";
import { useAppSelector } from "@/store";
import { router } from "expo-router";
import { createVideoPost } from "@/service/app-write/posts";
import { extractDataFile, validateFormNotEmpty } from "@/utils/functions";
import { showToastError, showToastInfo, showToastSuccess } from "@/utils";

interface Form {
  title?: string;
  video?: FileMedia;
  thumbnail?: FileMedia;
  prompt?: string;
}

const CreatePostScreen = () => {
  const [uploading, setUploading] = useState(false);
  const initialFormState: Form = {
    title: "",
    video: {},
    thumbnail: {},
    prompt: "",
  };
  const [form, setForm] = useState<Form>(initialFormState);

  const { $id } = useAppSelector((state) => state.user);

  const openPicker = async (mediaType: string) => {
    const targetedMediaKey = mediaType === "image" ? "thumbnail" : "video";
    if (form[targetedMediaKey]?.uri) return;
    const pickedMedia = await DocumentPicker.getDocumentAsync({
      type:
        mediaType === "image"
          ? ["image/png", "image/jpg", "image/jpeg", "image/jfif", "image/pjp"]
          : ["video/mp4", "video/gif"],
    });
    if (!pickedMedia.canceled) {
      const extractedMedia = extractDataFile(pickedMedia.assets[0]);
      setForm({
        ...form,
        [targetedMediaKey]: extractedMedia,
      });
    } else {
      setTimeout(() => {
        showToastInfo("Document NOT picked");
      }, 100);
    }
  };

  const submit = async () => {
    if (!validateFormNotEmpty(form)) {
      return showToastError("Please provide all fields");
    }
    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: $id,
      });
      showToastSuccess("Success, Post uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      showToastError(error?.message);
    } finally {
      setForm(initialFormState);
      setUploading(false);
    }
  };

  const clearMedia = (type: string) => {
    setForm({
      ...form,
      [type]: {},
    });
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
        <UploadVideo
          uploading={uploading}
          clearMedia={clearMedia}
          openPicker={openPicker}
          video={form.video || {}}
        />
        <AddThumbnailImage
          uploading={uploading}
          clearMedia={clearMedia}
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

export default CreatePostScreen;
