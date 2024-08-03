import { FlatList, RefreshControl } from "react-native";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { EmptyState, Screen } from "@/components/common";
import VideoCard from "@/components/home/VideoCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserPosts } from "@/service/app-write/posts";
import { setUserPosts } from "@/store/features/posts";
import { useFetchData } from "@/hooks";

const UserProfileScreen = () => {
  const {
    posts: { userPosts },
    user: { $id },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const fetchPosts = async () => {
    const remoteUserPosts = await getUserPosts($id);
    dispatch(setUserPosts(remoteUserPosts));
  };

  const { isFetching, isRefreshing, refresh } = useFetchData({
    func: fetchPosts,
  });

  return (
    <Screen scrollable={false} top="xxxLarge" bg="#161622">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={userPosts}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => <VideoCard post={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
            isLoading={isFetching}
            marginHorizontal={"none"}
          />
        )}
        ListHeaderComponent={<ProfileHeader />}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
      />
    </Screen>
  );
};

export default UserProfileScreen;
