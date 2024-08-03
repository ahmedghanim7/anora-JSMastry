import { router } from "expo-router";
import { View, Image, StyleSheet } from "react-native";
import { SpacingTypes, spacing } from "@/theme";
import { useCallback } from "react";
import { Button, Typography, Loader } from ".";
import { images } from "@/assets";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  isLoading?: boolean;
  marginHorizontal?: SpacingTypes;
}

const EmptyState = ({
  title,
  subtitle,
  isLoading,
  marginHorizontal,
}: EmptyStateProps) => {
  const handleNavigate = useCallback(() => {
    router.push("/home");
  }, []);

  return (
    <View
      style={[
        styles.container,
        { marginHorizontal: spacing[marginHorizontal || "xLarge"] },
      ]}
    >
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
              content={subtitle || ""}
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
    minHeight: 300,
  },
  loader: {
    height: 100,
    width: 100,
    marginTop: 60,
    backgroundColor: "none",
  },
});
