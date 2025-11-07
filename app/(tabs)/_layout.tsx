import CustomTabBar from "@/components/ui/CustomTabBar";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";

export default function TabLayout() {
  return (
    <>
      <StatusBar
        barStyle="light-content" 
      />

      <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            tabBarIcon: ({ color, size }) => (
              <Feather name="heart" size={size} color={color} />
            ),
          }}
        />


        <Tabs.Screen
        name="placeholder"
        options={{
          title: '',
          tabBarIcon: () => null,
        }}
      />

        <Tabs.Screen
          name="message"
          options={{
            title: "Message",
            tabBarIcon: ({ color, size }) => (
              <Feather name="message-square" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
