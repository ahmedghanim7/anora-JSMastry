import { router, useNavigation, usePathname } from "expo-router";
import { View, TextInput, StyleSheet } from "react-native";
import { colors, spacing } from "@/theme";
import { icons } from "@/assets";
import { showToastError } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import { searchPosts, setSearchedText } from "@/store/features/posts";
import IconButton from "./IconButton";
import { useEffect } from "react";

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const { searchedText } = useAppSelector((state) => state.posts.searchedPosts);
  const pathName = usePathname();

  const onSearchTextChanged = (text: string) => {
    dispatch(setSearchedText(text));
  };

  const searchPressHandler = () => {
    if (searchedText === "")
      return showToastError(
        "Please input something to search results across database"
      );
    dispatch(searchPosts());
    if (pathName !== "/search") router.push("/search");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchedText}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={onSearchTextChanged}
      />
      <IconButton
        icon={icons.search}
        iconStyle={styles.searchIcon}
        onPress={searchPressHandler}
      />
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
  searchIcon: {
    width: spacing.large,
    height: spacing.large,
    resizeMode: "contain",
  },
  searchInput: {
    flex: 1,
    color: colors.white,
    height: "80%",
    paddingLeft: spacing.smaller,
  },
});
