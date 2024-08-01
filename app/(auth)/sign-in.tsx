import { useState } from "react";
import { Link, router } from "expo-router";
import { View, Dimensions, Image, StyleSheet } from "react-native";
import { images } from "../../constants";
import { colors, spacing } from "@/theme";
import { SignInSchema } from "@/utils/validation";
import { getCurrentUser, signIn, signOut } from "@/service/app-write/auth";
import { useAppDispatch, useAppSelector } from "@/store";
import { setUser } from "@/store/features/user";
import { IFormField, SignInParams } from "@/@types";
import { Typography, FormikForm, Screen } from "@/components/common";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const signInHandler = async ({ email, password }: SignInParams) => {
    setIsSubmitting(true);
    try {
      await signIn({ email, password });
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
      Toast.show({
        type: "error",
        text1: error?.message,
      });
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
          initialValues={{
            email: "test@test.com",
            password: "Ahmed123@",
          }}
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

export default SignIn;

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
