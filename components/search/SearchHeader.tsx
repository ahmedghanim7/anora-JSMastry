import { StyleSheet, View } from "react-native";
import React from "react";
import { SearchInput, Typography } from "../common";
import { spacing } from "@/theme";

const SearchHeader = ({ searchedText }: { searchedText: string }) => {
  return (
    <View style={{ paddingVertical: 10, marginBottom: 20 }}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={{ alignItems: "flex-start" }}>
            <Typography content={"Search results"} variant="smallRegular" />
            <Typography
              content={searchedText || "No title to search about"}
              variant="xLargeBold"
            />
          </View>
        </View>
        <SearchInput />
      </View>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },

  topContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: spacing.large,
    width: "100%",
  },
  trendingContainer: {
    width: "100%",
    flex: 1,
    alignItems: "flex-start",
  },
});
