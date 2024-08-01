import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Typography, IconButton } from "../common";
import { icons } from "@/constants";

interface VideoCardHeaderProps {
  avatar: string;
  creator: string;
  title: string;
}

const VideoCardHeader = ({ avatar, creator, title }: VideoCardHeaderProps) => {
  return (
    <View style={styles.container}>
      <Avatar source={avatar} />
      <View style={styles.videoInfoContainer}>
        <Typography
          variant="smallBold"
          content={title}
          numberOfLines={1}
          textStyles={{ textAlign: "left" }}
        />
        <Typography
          variant="xSmallRegular"
          content={creator}
          numberOfLines={1}
          textStyles={{ textAlign: "left" }}
        />
      </View>
      <IconButton icon={icons.menu} iconStyle={{ width: 5, height: 15 }} />
    </View>
  );
};

export default VideoCardHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 3,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  videoInfoContainer: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    marginLeft: 3,
    rowGap: 1,
  },
});
