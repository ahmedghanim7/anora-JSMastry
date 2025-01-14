import { useState } from "react";
import { Link, router } from "expo-router";
import { View, Dimensions, Image, StyleSheet } from "react-native";
import { colors, spacing } from "@/theme";
import { createUser } from "@/service/app-write/auth";
import { IFormField, SignUpParams } from "@/@types";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/features/user";
import { SignupSchema } from "@/utils/validation";
import { Typography, FormikForm, Screen } from "@/components/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images } from "@/assets";
import { showToastError, showToastSuccess } from "@/utils";
import { trimString } from "@/utils/functions";

const SignUpScreen = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const SignUpHandler = async (params: SignUpParams) => {
    setSubmitting(true);
    try {
      const user = await createUser({
        email: trimString(params.email),
        password: trimString(params.password),
        username: trimString(params.username),
      });
      const { accountId, $id, email, username, avatar } = user;
      await AsyncStorage.setItem("accountId", accountId);
      dispatch(
        setUser({
          $id,
          accountId,
          avatar,
          email,
          username,
        })
      );
      showToastSuccess("Account created successfully");
      router.replace("/home");
    } catch (error: any) {
      console.log({ error });
      showToastError(error?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ width: 115, height: 34 }}
          />
          <Typography content={`Sign Up`} variant="xLargeBold" />
        </View>

        <FormikForm
          fields={formFields}
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          onSubmit={SignUpHandler}
          submitButtonLabel="Sign Up"
          validationSchema={SignupSchema}
          submitButtonState={isSubmitting}
        />
        <Typography content="Already have an account?" variant="smallRegular">
          <Link href="/sign-in">
            <Typography
              color={colors.secondary.DEFAULT}
              content="Login"
              variant="smallSemiBold"
            />
          </Link>
        </Typography>
      </View>
    </Screen>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    minHeight: Dimensions.get("window").height - 100,
  },
  topContainer: {
    gap: spacing.xxLarge,
    alignItems: "flex-start",
    marginBottom: spacing.xxLarge,
  },
});

const formFields: IFormField[] = [
  {
    label: "Username",
    name: "username",
  },
  {
    label: "Email",
    name: "email",
  },
  {
    label: "Password",
    name: "password",
    type: "PASSWORD",
  },
];
