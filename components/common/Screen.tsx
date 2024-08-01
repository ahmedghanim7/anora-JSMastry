import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import React from "react";
import { SpacingTypes, colors, spacing } from "@/theme";
import { StatusBar } from "expo-status-bar";

interface ScreenProps {
  children: React.ReactNode;
  withStatusBar?: boolean;
  top?: SpacingTypes | number;
  px?: SpacingTypes;
  bottom?: SpacingTypes;
  bg?: string;
  scrollable?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  hideIndicator?: boolean;
}

const Screen = ({
  children,
  withStatusBar = true,
  bottom = "none",
  px = "xLarge",
  top = "none",
  bg = colors.black.DEFAULT,
  scrollable = true,
  containerStyles,
  hideIndicator = false,
}: ScreenProps) => {
  const customStyles: StyleProp<ViewStyle> = {
    flex: 1,
    height: "100%",
    width: "100%",
    paddingBottom: spacing[bottom],
    paddingHorizontal: spacing[px],
    // @ts-ignore
    paddingTop: spacing[top] ? spacing[top] : top,
    backgroundColor: bg,
  };
  if (scrollable) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={hideIndicator}
          style={[customStyles, containerStyles, styles.container]}
        >
          {children}
        </ScrollView>
        {withStatusBar && <StatusBar backgroundColor="#161622" style="light" />}
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.container, customStyles, containerStyles]}>
      {children}
      {withStatusBar && <StatusBar backgroundColor="#161622" style="light" />}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
