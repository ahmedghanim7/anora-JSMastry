import { colors } from "@/theme";
import {
  View,
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";

interface LoaderProps {
  isLoading: boolean;
}
const Loader = ({ isLoading }: LoaderProps) => {
  const isIos = Platform.OS === "ios";
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View style={[styles.loaderContainer, { height: screenHeight }]}>
      <ActivityIndicator
        animating={isLoading}
        color="#fff"
        size={isIos ? "large" : 50}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: colors.black["100"],
  },
});