import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import { spacing } from "@/theme";
import { icons } from "@/assets";
import { Post } from "@/@types";
import { useAppDispatch } from "@/store";
import { setMedia } from "@/store/features/media-viewer";
import { router } from "expo-router";

interface VideoThumbnailProps {
  onPlayHandler?: () => void;
  thumbnailUrl?: string;
  thumbnailStyles?: StyleProp<ViewStyle>;
  post: Post;
}

const VideoThumbnail = ({ thumbnailStyles, post }: VideoThumbnailProps) => {
  const dispatch = useAppDispatch();
  const onPressHandler = () => {
    dispatch(setMedia({ mediaType: "video", post: post || {} }));
    router.push("/media-viewer");
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPressHandler}
      style={[styles.container, thumbnailStyles]}
    >
      <Image
        source={{ uri: post?.thumbnailUrl }}
        style={styles.thumbnailImage}
        resizeMode="cover"
      />
      <Image
        source={icons.play}
        style={{ width: 30, height: 30, position: "absolute" }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default VideoThumbnail;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    borderRadius: spacing.normal,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    borderRadius: spacing.normal,
  },
});
