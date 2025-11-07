import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export function ListingCardSkeleton({ width }: { width?: any }) {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View
      className="bg-white rounded-2xl overflow-hidden shadow-sm"
      style={[{ width, elevation: 5, marginRight: 16 }]}
    >
      {/* Image skeleton */}
      <Animated.View 
        className="w-full h-40 bg-gray-200" 
        style={{ opacity }}
      />

      <View className="p-4">
        {/* Title */}
        <Animated.View 
          className="h-5 bg-gray-200 rounded w-3/4 mb-3" 
          style={{ opacity }}
        />

        {/* Price */}
        <Animated.View 
          className="h-6 bg-gray-200 rounded w-1/2 mb-3" 
          style={{ opacity }}
        />

        {/* Location */}
        <Animated.View 
          className="h-4 bg-gray-200 rounded w-2/3" 
          style={{ opacity }}
        />
      </View>
    </View>
  );
}