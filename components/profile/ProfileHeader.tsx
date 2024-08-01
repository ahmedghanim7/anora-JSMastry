import { StyleSheet, View } from "react-native";
import React from "react";
import { spacing } from "@/theme";
import { DummyPosts, icons } from "@/constants";
import InfoBox from "../common/InfoBox";
import { router } from "expo-router";
import { Avatar, CustomText, IconButton } from "../common";
import { useAppDispatch, useAppSelector } from "@/store";
import { clearUser } from "@/store/features/user";
import { signOut } from "@/service/app-write/auth";

const ProfileHeader = () => {
  const { username, avatar } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  console.log({ username, avatar });

  const logout = async () => {
    await signOut();
    dispatch(clearUser());
    router.replace("/sign-in");
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon={icons.logout}
        onPress={logout}
        containerStyle={styles.logoutContainer}
        iconStyle={{ width: spacing.xLarge, height: spacing.xLarge }}
      />
      <Avatar source={{ url: avatar }} width={56} height={56} />
      {true && (
        <CustomText
          content={username}
          variant="largeBold"
          textStyles={styles.username}
        />
      )}
      <View style={{ flexDirection: "row" }}>
        <InfoBox
          title={"17"}
          subtitle="Posts"
          containerStyles={{ marginRight: spacing.medium }}
        />
        <InfoBox title="1.2k" subtitle="Followers" />
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.smaller,
    marginBottom: spacing.normal,
  },
  logoutContainer: {
    marginBottom: spacing.medium,
    alignSelf: "flex-end",
    padding: spacing.tiny,
  },

  username: { marginTop: spacing.medium, marginBottom: spacing.large },
});
