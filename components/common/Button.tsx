import { VariantTypes, colors, spacing } from "@/theme";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Typography from "./Typography";

interface ButtonProps {
  title: string;
  onPress: (e?: GestureResponderEvent | any) => void;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  isLoading?: boolean;
  variant?: VariantTypes;
  rest?: any;
}

const Button = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
  variant = "smallBold",
  rest,
}: ButtonProps) => {
  const containerDefaultStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.secondary.DEFAULT,
    borderRadius: spacing.tiny,
    minHeight: 62,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    opacity: isLoading ? 0.5 : 1,
  };

  const containerCustomStyle: StyleProp<ViewStyle> = [
    containerDefaultStyle,
    containerStyles ? containerStyles : {},
  ];

  const textDefaultStyle: StyleProp<TextStyle> = {
    color: colors.black[100],
  };

  const textCustomStyle: StyleProp<TextStyle> = [
    textDefaultStyle,
    textStyles ? textStyles : {},
  ];

  return (
    <TouchableOpacity
    
      onPress={onPress}
      activeOpacity={0.7}
      style={containerCustomStyle}
      disabled={isLoading}
      {...rest}
    >
      <Typography
        content={title}
        variant={variant}
        textStyles={[textCustomStyle]}
      />
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={{ marginLeft: spacing.tiny }}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;
