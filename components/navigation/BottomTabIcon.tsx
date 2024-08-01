import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Typography } from "../common";

interface BottomTabIconProps {
  icon?: any;
  color: string;
  name: string;
  focused: boolean;
}

const BottomTabIcon = ({ color, focused, name, icon }: BottomTabIconProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: 24, height: 24 }}
      />
      <Typography
        content={name}
        variant={focused ? "xSmallSemiBold" : "xSmallRegular"}
        color={color}
        textStyles={{ marginLeft: 3 }}
      />
    </View>
  );
};

export default BottomTabIcon;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
});
