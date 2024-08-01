import { router } from "expo-router";
import { View, Image, StyleSheet } from "react-native";

import { images } from "../../constants";
import { spacing } from "@/theme";
import { useCallback } from "react";
import { Button, Typography, Loader } from ".";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  isLoading?: boolean;
}

const EmptyState = ({ title, subtitle, isLoading }: EmptyStateProps) => {
  const handleNavigate = useCallback(() => {
    router.push("/home");
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader isLoading={isLoading} containerStyles={styles.loader} />
      ) : (
        <>
          <Image
            source={images.empty}
            resizeMode="contain"
            style={{ width: "70%", height: 200 }}
          />
          <Typography content={title} variant="smallRegular" />
          {subtitle && (
            <Typography
              content={subtitle}
              variant="largeBold"
              containerStyles={{ marginTop: spacing.small }}
            />
          )}
          <Button
            title="Back to Explore"
            onPress={handleNavigate}
            containerStyles={{ width: "100%", marginVertical: spacing.xLarge }}
          />
        </>
      )}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.tiny,
  },
  loader: {
    height: 100,
    width: 100,
    marginTop: 60,
    backgroundColor: "none",
  },
});
