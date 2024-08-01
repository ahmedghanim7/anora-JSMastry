import { useState } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { spacing } from "@/theme";
import { VideoPlayer } from "../common";
import VideoCardHeader from "./VideoCardHeader";
import { Post } from "@/@types";

const VideoCard = ({
  post,
  containerStyles,
}: {
  post: Post;
  containerStyles?: StyleProp<ViewStyle>;
}) => {
  const { creator, thumbnailUrl, title, videoUrl } = post;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <View style={[styles.container, containerStyles]}>
      <VideoCardHeader
        avatar={creator.avatar}
        creator={creator.username}
        title={title}
      />
      <VideoPlayer
        isVideoPlaying={isVideoPlaying}
        setIsVideoPlaying={setIsVideoPlaying}
        thumbnailUrl={thumbnailUrl}
        videoUrl={videoUrl}
      />
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: spacing.normal,
    marginBottom: spacing.xxLarge,
  },
});
