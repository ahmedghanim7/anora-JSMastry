import { useState } from "react";
import { Link, router } from "expo-router";
import { View, Dimensions, Image, StyleSheet } from "react-native";
import { colors, spacing } from "@/theme";
import { SignInSchema } from "@/utils/validation";
import { getCurrentUser, signIn } from "@/service/app-write/auth";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/features/user";
import { IFormField, SignInParams } from "@/@types";
import { Typography, FormikForm, Screen } from "@/components/common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { images } from "@/assets";
import { showToastError } from "@/utils";
import { trimString } from "@/utils/functions";

const SignInScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const signInHandler = async ({ email, password }: SignInParams) => {
    setIsSubmitting(true);

    try {
      await signIn({
        email: trimString(email),
        password: trimString(password),
      });
      const user = await getCurrentUser();
      if (user?.accountId)
        await AsyncStorage.setItem("accountId", user?.accountId);
      dispatch(
        setUser({
          $id: user?.$id || "",
          accountId: user?.accountId,
          avatar: user?.avatar,
          email: user?.email,
          username: user?.username,
        })
      );
      router.replace("/home");
    } catch (error: any) {
      console.log({ error });
      showToastError(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Screen>
      <View style={[styles.container]}>
        <View style={styles.topContainer}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ width: 115, height: 34 }}
          />
          <Typography content={`Sign In`} variant="xLargeBold" />
        </View>
        <FormikForm
          fields={formFields}
          initialValues={{ email: "", password: "" }}
          onSubmit={signInHandler}
          submitButtonLabel="Log In"
          validationSchema={SignInSchema}
          submitButtonState={isSubmitting}
        />
        <Typography content="Don't have an account?" variant="smallRegular">
          <Link href="/sign-up">
            <Typography
              color={colors.secondary.DEFAULT}
              content="Signup"
              variant="smallSemiBold"
            />
          </Link>
        </Typography>
      </View>
    </Screen>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginVertical: spacing.xLarge,
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
    label: "Email",
    name: "email",
  },
  {
    label: "Password",
    name: "password",
    type: "PASSWORD",
  },
];
