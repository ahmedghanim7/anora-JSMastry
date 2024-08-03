import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import LatestVideoItem from "./LatestVideoItem";
import { useAppSelector } from "@/store";
import { Typography } from "../common";
import { colors, spacing } from "@/theme";

const LatestVideos: React.FC = () => {
  const { latestPosts } = useAppSelector((state) => state.posts);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveItem(viewableItems[0].item.$id);
      }
    }
  );

  return (
    <View style={styles.container}>
      {!!latestPosts.length && (
        <Typography
          content="Latest Videos"
          variant="smallRegular"
          color={colors.gray.DEFAULT}
          textStyles={{ textAlign: "left", marginHorizontal: spacing.xLarge }}
        />
      )}
      <FlatList
        contentContainerStyle={{ marginHorizontal: 10 }}
        data={latestPosts}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <LatestVideoItem item={item} activeItem={activeItem} />
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
      />
    </View>
  );
};

export default LatestVideos;

const styles = StyleSheet.create({
  container: {
    rowGap: spacing.medium,
    marginTop: spacing.xLarge,
    marginBottom: spacing.normal,
  },
});
