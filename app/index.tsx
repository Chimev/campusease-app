import { useAuth } from "@/context/AuhContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);
  const {isLoading, token} = useAuth()

 

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("hasOnboarded");
      setHasOnboarded(value === "true");
    };
    checkOnboarding();
  }, []);

  if (isLoading ||hasOnboarded === null) return null;

  if(!token){
    if (!hasOnboarded) {
    AsyncStorage.setItem("hasOnboarded", "true");
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href={'/(tabs)/home'} />
  
}
