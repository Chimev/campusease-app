import { useAuth } from "@/context/AuhContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function Account() {

  const {logout} = useAuth()
 const handleClearStorage = async () => {
    Alert.alert(
      'Clear Storage',
      'Are you sure you want to clear all data? This will log you out.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              router.replace('/onboarding');
            } catch (error) {
              console.error('Error clearing storage:', error);
              Alert.alert('Error', 'Failed to clear storage');
            }
          },
        },
      ]
    );
  };

  return (
    <View className="pt-36">
    <TouchableOpacity
      onPress={handleClearStorage}
      className="bg-red-500 p-4 rounded-xl"
      activeOpacity={0.8}
    >
      <Text className="text-white text-center font-semibold">
        Clear Storage
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={async () => await logout()}
      className="bg-red-500 p-4 rounded-xl"
      activeOpacity={0.8}
    >
      <Text className="text-white text-center font-semibold">
        Logout
      </Text>
    </TouchableOpacity>
    </View>
  );
}