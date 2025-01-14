import { View, StyleProp, ViewStyle, TextStyle } from "react-native";
import { colors } from "@/theme";
import { Typography } from "../common";

interface InfoBoxProps {
  title: string;
  subtitle?: string;
  containerStyles?: StyleProp<ViewStyle>;
  titleStyles?: StyleProp<TextStyle>;
}

const InfoBox = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}: InfoBoxProps) => {
  return (
    <View style={containerStyles}>
      <Typography
        content={title}
        textStyles={titleStyles}
        color={colors.white}
        variant="largeBold"
      />
      {subtitle && (
        <Typography
          content={subtitle}
          textStyles={titleStyles}
          color={colors.white}
          variant="smallRegular"
        />
      )}
    </View>
  );
};

export default InfoBox;
