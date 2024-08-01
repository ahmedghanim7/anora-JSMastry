import { FlatList, StyleSheet } from "react-native";
import React from "react";
import TrendingVideoItem from "./TrendingVideoItem";
import { useAppSelector } from "@/store";

const LatestVideos = () => {
  const { latestPosts } = useAppSelector((state) => state.posts);
  return (
    <FlatList
      contentContainerStyle={{marginHorizontal:10}}
      data={latestPosts}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => {
        return <TrendingVideoItem item={item} />;
      }}
    />
  );
};

export default LatestVideos;

const styles = StyleSheet.create({});
