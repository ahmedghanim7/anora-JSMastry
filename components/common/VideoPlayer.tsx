import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { spacing } from "@/theme";
import VideoThumbnail from "./VideoThumbnail";
import { useAppDispatch } from "@/store";
import { Post } from "@/@types";
import { setMedia } from "@/store/features/media-viewer";

interface VideoPlayerProps {
  post?: Post;
  isVideoPlaying: boolean;
  setIsVideoPlaying: (val: boolean) => void;
  videoUrl: string;
  thumbnailUrl: string;
  videoStyles?: StyleProp<ViewStyle>;
  thumbnailStyles?: StyleProp<ViewStyle>;
  containerStyles?: StyleProp<ViewStyle>;
}

const VideoPlayer = ({
  isVideoPlaying,
  thumbnailUrl,
  videoUrl,
  setIsVideoPlaying,
  thumbnailStyles,
  containerStyles,
  videoStyles,
  post,
}: VideoPlayerProps) => {
  const onPlayHandler = () => setIsVideoPlaying(true);

  return (
    <View style={[{ width: "100%", height: 200 }, containerStyles]}>
      <VideoThumbnail
        post={post}
        thumbnailStyles={thumbnailStyles}
        thumbnailUrl={thumbnailUrl}
        onPlayHandler={onPlayHandler}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
    borderRadius: spacing.normal,
  },
});
