import { FlatList } from "react-native";
import { EmptyState, Screen } from "@/components/common";
import VideoCard from "@/components/home/VideoCard";
import { useAppDispatch, useAppSelector } from "@/store";
import SearchHeader from "@/components/search/SearchHeader";
import { useEffect } from "react";
import { clearSearchValues } from "@/store/features/posts";

const SearchPostsScreen = () => {
  const { posts, searchedText } = useAppSelector(
    (state) => state.posts.searchedPosts
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSearchValues());
    };
  });

  return (
    <Screen scrollable={false} top={60} px="xLarge">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard post={item} />}
        ListHeaderComponent={<SearchHeader searchedText={searchedText} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
      />
    </Screen>
  );
};

export default SearchPostsScreen;
