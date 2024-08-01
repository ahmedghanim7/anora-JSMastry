import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors, spacing } from "@/theme";
import { icons } from "@/constants";
import { FileMedia } from "@/@types/Posts.type";
import { Typography } from "../common";

interface AddThumbnailImageProps {
  openPicker: (mediaType: string) => void;
  thumbnail: FileMedia;
}

const AddThumbnailImage = ({
  openPicker,
  thumbnail,
}: AddThumbnailImageProps) => {
  return (
    <View style={styles.container}>
      <Typography
        content="Thumbnail Image"
        variant="mediumRegular"
        color={colors.gray.DEFAULT}
      />

      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => openPicker("image")}
      >
        {thumbnail.uri ? (
          <Image
            source={{ uri: thumbnail.uri }}
            resizeMode="cover"
            style={styles.thumbnailImage}
          />
        ) : (
          <View style={styles.chooseThumbnailContainer}>
            <Image
              source={icons.upload}
              resizeMode="contain"
              alt="upload"
              style={styles.chooseThumbnailIcon}
            />
            <Typography content="Choose a file" variant="smallRegular" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddThumbnailImage;

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.small,
    rowGap: spacing.small,
    alignItems: "flex-start",
  },
  thumbnailImage: {
    width: "100%",
    height: 150,
    borderRadius: spacing.xxLarge,
  },
  chooseThumbnailContainer: {
    width: "100%",
    height: 58,
    backgroundColor: colors.black[100],
    borderRadius: spacing.normal,
    borderWidth: 2,
    borderColor: colors.black[200],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 2,
  },
  chooseThumbnailIcon: { width: spacing.large, height: spacing.large },
});
