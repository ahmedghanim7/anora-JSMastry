import { router } from "expo-router";
import { Loader, Screen } from "@/components/common";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser } from "@/service/app-write/auth";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/features/user";

const Splash = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const checkIsUserAuthorized = async () => {
    setIsLoading(true);
    try {
      const isAuthorized = await AsyncStorage.getItem("accountId");
      if (isAuthorized) {
        const user = await getCurrentUser();
        dispatch(
          setUser({
            $id: user?.$id || "",
            accountId: user?.accountId,
            avatar: user?.avatar,
            email: user?.email,
            username: user?.username,
          })
        );
        router.replace("/home");
      } else router.replace("/welcome");
    } catch (err) {
      console.log({ err });
      router.replace("/welcome");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIsUserAuthorized();
  }, []);

  return (
    <Screen withStatusBar px="none" scrollable={false}>
      <Loader isLoading={isLoading} />
    </Screen>
  );
};

export default Splash;
