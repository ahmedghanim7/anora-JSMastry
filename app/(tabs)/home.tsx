import { FlatList, RefreshControl } from "react-native";
import HomeHeader from "@/components/home/HomeHeader";
import { EmptyState, Screen } from "@/components/common";
import { spacing } from "@/theme";
import VideoCard from "@/components/home/VideoCard";
import { getAllPosts, getLatestPosts } from "@/service/app-write/posts";
import { useAppDispatch, useAppSelector } from "@/store";
import { setAllPosts, setLatestPosts } from "@/store/features/posts";
import { useFetchData } from "@/hooks";

const Home = () => {
  const dispatch = useAppDispatch();
  const { allPosts } = useAppSelector((state) => state.posts);

  const fetchPosts = async () => {
    const [remoteAllPosts, remoteLatestPosts] = await Promise.all([
      getAllPosts(),
      getLatestPosts(),
    ]);
    dispatch(setAllPosts(remoteAllPosts));
    dispatch(setLatestPosts(remoteLatestPosts));
  };

  const { isFetching, isRefreshing, refresh } = useFetchData({
    func: fetchPosts,
  });

  return (
    <Screen scrollable={false} top="huge" px="none">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={allPosts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            post={item}
            containerStyles={{ marginHorizontal: spacing.xLarge }}
          />
        )}
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
            isLoading={isFetching}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
      />
    </Screen>
  );
};

export default Home;
