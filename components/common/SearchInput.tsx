import { useState } from "react";
import { router, usePathname } from "expo-router";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";

import { icons } from "../../constants";
import { colors, spacing } from "@/theme";
import Toast from "react-native-toast-message";

const SearchInput = ({ initialQuery }: { initialQuery?: string }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  const searchPressHandler = () => {
    if (query === "")
      return Toast.show({
        type: "error",
        text1: "Please input something to search results across database",
      });
    if (pathname.startsWith("/search")) router.setParams({ query });
    else router.push(`/search/${query}`);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={{ marginTop: -1, flex: 1, color: colors.white }}
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity onPress={searchPressHandler}>
        <Image
          source={icons.search}
          style={{ width: spacing.large, height: spacing.large }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: spacing.tiny,
    width: "100%",
    height: 58,
    paddingHorizontal: spacing.tiny,
    backgroundColor: "#1E1E2D",
    borderRadius: spacing.small,
    borderWidth: 2,
    borderColor: "#232533",
  },
});
