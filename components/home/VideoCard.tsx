import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { spacing } from "@/theme";
import { VideoThumbnail } from "../common";
import VideoCardHeader from "./VideoCardHeader";
import { Post } from "@/@types";

const VideoCard = ({
  post,
  containerStyles,
}: {
  post: Post;
  containerStyles?: StyleProp<ViewStyle>;
}) => {
  const { creator, title } = post;

  return (
    <View style={[styles.container, containerStyles]}>
      <VideoCardHeader
        avatar={creator.avatar}
        creator={creator.username}
        title={title}
      />
      <VideoThumbnail post={post} thumbnailStyles={styles.thumbnailStyles} />
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
  thumbnailStyles: {
    borderRadius: 14,
    width: "100%",
    height: 200,
  },
});
