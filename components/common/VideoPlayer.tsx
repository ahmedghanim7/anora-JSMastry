import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { spacing } from "@/theme";
import VideoThumbnail from "./VideoThumbnail";

interface VideoPlayerProps {
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
}: VideoPlayerProps) => {
  const onPlayHandler = () => setIsVideoPlaying(true);
  return (
    <View style={[{ width: "100%", height: 200 }, containerStyles]}>
      {isVideoPlaying ? (
        <Video
          // @ts-ignore
          source={videoUrl}
          style={[styles.video, videoStyles]}
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            // @ts-ignore
            if (status.didJustFinish) setIsVideoPlaying(false); // error here
          }}
        />
      ) : (
        <VideoThumbnail
          thumbnailStyles={thumbnailStyles}
          thumbnailUrl={thumbnailUrl}
          onPlayHandler={onPlayHandler}
        />
      )}
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
