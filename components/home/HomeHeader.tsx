import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { colors, spacing } from "@/theme";
import Typography from "../common/Typography";
import { images } from "@/constants";
import { useAppSelector } from "@/store";
import { SearchInput } from "../common";
import LatestVideos from "./LatestVideos";

const HomeHeader = () => {
  const { username } = useAppSelector((state) => state.user);
  return (
    <View style={{ paddingVertical: 10, marginBottom: 20 }}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={{ alignItems: "flex-start" }}>
            <Typography content={"Welcome Back"} variant="smallRegular" />
            <Typography content={username || "Username"} variant="xLargeBold" />
          </View>
          <Image
            source={images.logoSmall}
            style={{ width: 35, height: 35 }}
            resizeMode="contain"
          />
        </View>
        <SearchInput />
        <Typography
          content={"Trending Videos"}
          variant="smallRegular"
          color={colors.gray["300"]}
          textStyles={{
            marginTop: spacing.xLarge,
            marginBottom: spacing.normal,
          }}
        />
      </View>
      <LatestVideos />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.large,
    alignItems: "flex-start",
  },

  topContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: spacing.large,
    width: "100%",
  },
  trendingContainer: {
    width: "100%",
    flex: 1,
    alignItems: "flex-start",
  },
});
