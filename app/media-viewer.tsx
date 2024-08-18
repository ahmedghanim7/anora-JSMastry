import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { IconButton, Screen, Typography } from "@/components/common";
import { icons } from "@/assets";
import { useAppSelector } from "@/store";
import { ResizeMode, Video } from "expo-av";
import { spacing } from "@/theme";
import { router } from "expo-router";

const MediaViewerScreen = () => {
  const { mediaType, post } = useAppSelector((state) => state.mediaViewer);
  // const isVideo = mediaType?.toLowerCase() === "video";
  return (
    <Screen top={50}>
      <View style={{ height: Dimensions.get("screen").height - 120 }}>
        <View style={styles.topContainer}>
          <IconButton
            icon={icons.leftArrow}
            iconStyle={{ width: 18, height: 18 }}
            onPress={() => router.back()}
          />
          <Typography content={`Media Viewer`} />
          <View style={{ width: 1, height: 1 }} />
        </View>
        <View style={{ flex: 1 }}>
          <Video
            // @ts-ignore
            source={{
              uri: post.videoUrl,
            }}
            style={[styles.video, { width: "100%", height: "100%" }]}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
          />
        </View>
      </View>
    </Screen>
  );
};

export default MediaViewerScreen;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: spacing.normal,
  },
});
