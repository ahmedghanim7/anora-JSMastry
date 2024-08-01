import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
  StyleSheet,
} from "react-native";

import { colors, spacing } from "@/theme";
import { InputTypes } from "@/@types";
import CustomText from "./CustomText";
import { icons } from "@/constants";
import FormikErrorMessage from "./FormikErrorMessage";

interface FormFieldProps {
  name?: string;
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onBlur?: any;
  containerStyles?: StyleProp<ViewStyle>;
  type?: InputTypes;
  errors?: any;
  touched?: any;
  keyboardType?: KeyboardTypeOptions;
  setInputsTouched?: (arg: any) => any;
}

const FormField = ({
  label,
  name,
  value,
  placeholder,
  onChangeText,
  onBlur,
  containerStyles,
  type = "TEXT",
  errors,
  touched,
  keyboardType = "default",
  setInputsTouched,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "PASSWORD";
  return (
    <View style={[styles.container, containerStyles]}>
      <CustomText
        content={label}
        variant="mediumRegular"
        color={colors.gray[300]}
      />

      <View style={styles.inputContainer}>
        <TextInput
          onBlur={onBlur}
          style={[styles.input, { width: isPasswordField ? "90%" : "100%" }]}
          keyboardType={keyboardType}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={onChangeText}
          secureTextEntry={label === "Password" && !showPassword}
          {...props}
        />

        {type === "PASSWORD" && (
          <TouchableOpacity
            style={styles.togglePassword}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {errors && touched && (
        <FormikErrorMessage
          errors={errors}
          touched={touched}
          inputName={name || ""}
        />
      )}
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  container: { alignItems: "flex-start" },

  inputContainer: {
    marginTop: spacing.small,
    width: "100%",
    height: spacing.xLarge * 2,
    backgroundColor: colors.black[100],
    borderRadius: spacing.medium,
    borderWidth: 2,
    borderColor: colors.gray[100],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    color: "white",
    height: "100%",
    width: "100%",
    borderRadius: spacing.medium,
    paddingLeft: spacing.tiny,
    fontSize: spacing.normal,
  },
  togglePassword: {
    padding: spacing.tiny,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
