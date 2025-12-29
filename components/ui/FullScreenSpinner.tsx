import { ActivityIndicator, Text, View } from "react-native";

export const FullScreenSpinner = () => (
  <View className="absolute inset-0 bg-black/60 flex justify-center items-center z-50">
    <ActivityIndicator size="large" color="#00ffe1" />
    <Text className="mt-3 text-[#00ffe1] text-xl font-semibold">
      Processing…
    </Text>
    <Text className="text-white/70 text-sm mt-1">
      Please wait while we prepare your listing
    </Text>
  </View>
);