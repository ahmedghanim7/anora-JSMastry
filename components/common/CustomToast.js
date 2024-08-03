import { colors } from "@/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RNToast, { BaseToast } from "react-native-toast-message";

const styles = StyleSheet.create({
  toast: {
    borderLeftWidth: 0,
    borderRadius: 4,
    height: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginHorizontal:20
  },
  padding16: {
    padding: 16,
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  borderIconContainer: {
    backgroundColor: "white",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const CustomToast = ({
  color,
  textColor = colors.white,
  text1,
  text2,
  ...props
}) => {
  const { top } = useSafeAreaInsets();

  const toastStyle = {
    ...styles.toast,
    backgroundColor: color,
    marginTop: top,
  };
  return (
    <BaseToast
      {...props}
      {...(props?.props ?? {})}
      style={toastStyle}
      contentContainerStyle={[
        styles.contentContainer,
        props?.renderLeadingIcon || styles.padding16,
      ]}
      text1NumberOfLines={0}
      text2NumberOfLines={0}
      text1Style={{
        color: textColor,
        fontSize: 12,
        marginTop: 2,
      }}
      text2Style={{
        color: textColor,
        fontSize: 12,
      }}
      text1={text1}
      text2={text2}
    />
  );
};

const toastConfig = {
  success: (props) => <CustomToast {...props} color={colors.gray.DEFAULT} />,
  error: (props) => <CustomToast {...props} color={colors.red.red} />,
  info: (props) => (
    <CustomToast
      renderLeadingIcon={Icons.info}
      {...props}
      color={colors.secondary.DEFAULT}
    />
  ),
};

const Toast = () => {
  return <RNToast config={toastConfig} />;
};

export default Toast;
