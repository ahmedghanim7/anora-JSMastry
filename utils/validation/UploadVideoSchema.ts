import * as Yup from "yup";

export const UploadVideoSchema = Yup.object().shape({
  videoTitle: Yup.string().required("Video title is required"),
  videoUri: Yup.string().required("Please choose a video"),
  thumbnailUri: Yup.string().required("Please choose a thumbnail image"),
  aiPrompt: Yup.string().required("AI prompt is required"),
});
