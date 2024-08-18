import {
  DimensionValue,
  Image,
  ImageResizeMode,
  ImageStyle,
  StyleProp,
} from "react-native";
import React from "react";
import { colors, spacing } from "@/theme";

interface AvatarProps {
  source: any;
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  resizeMode?: ImageResizeMode | undefined;
}

const Avatar = ({
  source,
  height,
  width,
  borderColor,
  borderRadius,
  borderWidth,
  resizeMode,
}: AvatarProps) => {
  const imageStyles: StyleProp<ImageStyle> = {
    width: width || 46,
    height: height || 46,
    borderRadius: borderRadius || spacing.small,
    borderColor: borderColor || colors.secondary.DEFAULT,
    borderWidth: borderWidth || 3,
  };

  return (
    <Image
      source={typeof source === "string" ? { uri: source } : source}
      style={imageStyles}
      resizeMode={resizeMode || "cover"}
    />
  );
};

export default Avatar;
