import React, { useEffect, useState } from "react";
import * as Animatable from "react-native-animatable";
import { StyleSheet, ViewStyle } from "react-native";
import { VideoThumbnail } from "../common";
import { Post } from "@/@types";
import { colors } from "@/theme";

interface LatestVideoItemProps {
  item: Post;
  activeItem: string | null;
}

const LatestVideoItem: React.FC<LatestVideoItemProps> = ({
  item,
  activeItem,
}) => {
  return (
    <Animatable.View
      style={styles.container}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <VideoThumbnail post={item} thumbnailStyles={styles.thumbnail} />
    </Animatable.View>
  );
};

export default LatestVideoItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  thumbnail: {
    borderRadius: 14,
    shadowOffset: { height: 5, width: 5 },
    shadowColor: colors.black[100],
    shadowOpacity: 0.4,
    width: 148,
    height: 236,
  },
});
const zoomIn: Animatable.CustomAnimation<ViewStyle> = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut: Animatable.CustomAnimation<ViewStyle> = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};
