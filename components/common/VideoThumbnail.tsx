import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { spacing } from "@/theme";
import { icons } from "@/constants";

interface VideoThumbnailProps {
  onPlayHandler: () => void;
  thumbnailUrl: string;
  thumbnailStyles?: StyleProp<ViewStyle>;
}

const VideoThumbnail = ({
  onPlayHandler,
  thumbnailUrl,
  thumbnailStyles,
}: VideoThumbnailProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPlayHandler}
      style={[styles.container, thumbnailStyles]}
    >
      <Image
        // source={{ uri: thumbnailUrl }}
        // @ts-ignore
        source={thumbnailUrl}
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
