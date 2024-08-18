import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import { spacing } from "@/theme";

interface IconButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  icon: any;
  iconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
const IconButton = ({
  icon,
  onPress,
  iconStyle,
  containerStyle,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      hitSlop={5}
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={[{ width: 10, height: 10 }, iconStyle]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.smaller,
  },
});
