import { router } from "expo-router";
import { View, Image, StyleSheet } from "react-native";
import { colors, spacing } from "@/theme";
import { Button, Typography, Screen } from "@/components/common";
import { images } from "@/assets";

const WelcomeScreen = () => {
  return (
    <Screen withStatusBar px="none" scrollable={false}>
      <View style={styles.viewContainer}>
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{ width: "38%", height: 34 }}
        />
        <Image
          source={images.cards}
          resizeMode="contain"
          style={styles.image}
        />
        <View
          style={{
            marginHorizontal: spacing.xLarge,
            rowGap: spacing.medium,
          }}
        >
          <View style={{ position: "relative", marginTop: spacing.tiny }}>
            <Typography
              content={`Discover Endless\nPossibilities with`}
              variant="xxxLargeBold"
            >
              <Typography variant="xLargeMedium" content={`Aora`} />
            </Typography>
            <Image
              source={images.path}
              style={styles.aroaPath}
              resizeMode="contain"
            />
          </View>
          <Typography
            variant="smallRegular"
            color={colors.gray[400]}
            content="Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora"
          />
          <Button
            title="Continue with Email"
            onPress={() => router.push("/sign-in")}
            containerStyles={{ marginTop: 7 }}
            variant="mediumSemiBold"
          />
        </View>
      </View>
    </Screen>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
  image: { width: "100%", height: 298 },
  aroaPath: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 70,
    height: 7,
  },
});
