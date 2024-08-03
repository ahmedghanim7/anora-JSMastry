import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors, spacing } from "@/theme";
import { ResizeMode, Video } from "expo-av";
import { Button, Typography } from "../common";
import { FileMedia } from "@/@types/Posts.type";
import { icons } from "@/assets";

interface UploadVideoProps {
  openPicker: (mediaType: string) => void;
  video: FileMedia;
  clearMedia: (type: string) => void;
  uploading: boolean;
}

const UploadVideo = ({
  openPicker,
  uploading,
  video,
  clearMedia,
}: UploadVideoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Typography
          content="Upload Video"
          variant="mediumRegular"
          color={colors.gray.DEFAULT}
        />
        {video.uri && (
          <Button
            isLoading={uploading}
            variant="smallRegular"
            title="Clear"
            containerStyles={styles.clearButton}
            textStyles={{ color: "white" }}
            onPress={() => clearMedia("video")}
          />
        )}
      </View>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => openPicker("video")}
      >
        {video.uri ? (
          <Video
            source={{ uri: video.uri }}
            style={styles.videoStyles}
            useNativeControls
            resizeMode={ResizeMode.STRETCH}
            isLooping
            shouldPlay
          />
        ) : (
          <View style={styles.uploadVideoContainer}>
            <View style={styles.uploadVideoIcon}>
              <Image
                source={icons.upload}
                resizeMode="contain"
                alt="upload"
                style={{ width: 20, height: 20 }}
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UploadVideo;

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.small,
    rowGap: spacing.small,
    alignItems: "flex-start",
  },
  videoStyles: { width: "100%", height: 150, borderRadius: spacing.small },
  uploadVideoContainer: {
    width: "100%",
    height: 150,
    backgroundColor: colors.black[100],
    borderRadius: spacing.normal,
    borderWidth: 1,
    borderColor: colors.black[200],
    alignItems: "center",
    justifyContent: "center",
  },
  uploadVideoIcon: {
    width: 50,
    height: 50,
    borderRadius: spacing.small + 2,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.secondary.DEFAULT,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    minHeight: 20,
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.red.redDark,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
