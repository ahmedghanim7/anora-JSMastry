import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";

import { icons } from "../../constants";
import BottomTabIcon from "@/components/navigation/BottomTabIcon";

const TabLayout = () => {
  // const { loading, isLogged } = useGlobalContext();

  // if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        {tabs.map((item) => (
          <Tabs.Screen
            key={item.name}
            name={item.name}
            options={{
              title: item.title,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <BottomTabIcon
                  icon={item.icon}
                  color={color}
                  name={item.name}
                  focused={focused}
                />
              ),
            }}
          />
        ))}
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;

const tabs = [
  {
    title: "Home",
    name: "home",
    icon: icons.home,
  },
  {
    title: "Create",
    name: "create",
    icon: icons.plus,
  },
  {
    title: "Bookmark",
    name: "bookmark",
    icon: icons.bookmark,
  },
  {
    title: "Profile",
    name: "profile",
    icon: icons.profile,
  },
];
