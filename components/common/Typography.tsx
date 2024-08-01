import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import { VariantTypes, colors, typography } from "@/theme";

interface TypographyProps extends TextProps {
  content: string;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  touchable?: boolean;
  rest?: TextProps;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: VariantTypes;
  color?: string;
}

const Typography = ({
  content,
  containerStyles,
  textStyles,
  touchable,
  onPress,
  rest,
  variant = "mediumRegular",
  children,
  color,
}: TypographyProps) => {
  const textCustomStyles: StyleProp<TextStyle> = [
    typography[variant],
    { color: color || colors.white, textAlign: "center" },
    textStyles,
  ];

  if (touchable) {
    return (
      <TouchableOpacity onPress={onPress} style={containerStyles}>
        {/* @ts-ignore */}
        <Text {...rest} onPress={undefined} style={textCustomStyles}>
          {content} {children}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    //@ts-ignore
    <Text {...rest} style={textCustomStyles}>
      {content} {children}
    </Text>
  );
};

export default Typography;
