import { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";

const { width } = Dimensions.get('window');

export function ListingDetailSkeleton() {
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
    <View className="flex-1 bg-white">
      {/* Image Gallery Skeleton */}
      <Animated.View 
        className="bg-gray-200" 
        style={{ width, height: 300, opacity }}
      />

      {/* Content */}
      <View className="p-4">
        {/* Category Badge Skeleton */}
        <View className="flex-row items-center mb-3">
          <Animated.View 
            className="h-6 bg-gray-200 rounded-full w-24" 
            style={{ opacity }}
          />
          <Animated.View 
            className="h-4 bg-gray-200 rounded w-16 ml-auto" 
            style={{ opacity }}
          />
        </View>

        {/* Title Skeleton */}
        <Animated.View 
          className="h-7 bg-gray-200 rounded w-full mb-2" 
          style={{ opacity }}
        />
        <Animated.View 
          className="h-7 bg-gray-200 rounded w-3/4 mb-3" 
          style={{ opacity }}
        />

        {/* Price Skeleton */}
        <Animated.View 
          className="h-9 bg-gray-200 rounded w-2/5 mb-3" 
          style={{ opacity }}
        />

        {/* Location Skeleton */}
        <Animated.View 
          className="h-5 bg-gray-200 rounded w-3/5 mb-6" 
          style={{ opacity }}
        />

        {/* Details Grid Skeleton */}
        <View className="bg-gray-50 rounded-2xl p-4 mb-6">
          <View className="flex-row flex-wrap">
            {[1, 2, 3, 4].map((item) => (
              <View key={item} className="w-1/2 mb-4">
                <View className="flex-row items-center">
                  <Animated.View 
                    className="w-10 h-10 rounded-full bg-gray-200 mr-3" 
                    style={{ opacity }}
                  />
                  <View className="flex-1">
                    <Animated.View 
                      className="h-3 bg-gray-200 rounded w-16 mb-2" 
                      style={{ opacity }}
                    />
                    <Animated.View 
                      className="h-4 bg-gray-200 rounded w-12" 
                      style={{ opacity }}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Description Skeleton */}
        <View className="mb-6">
          <Animated.View 
            className="h-6 bg-gray-200 rounded w-32 mb-3" 
            style={{ opacity }}
          />
          <Animated.View 
            className="h-4 bg-gray-200 rounded w-full mb-2" 
            style={{ opacity }}
          />
          <Animated.View 
            className="h-4 bg-gray-200 rounded w-full mb-2" 
            style={{ opacity }}
          />
          <Animated.View 
            className="h-4 bg-gray-200 rounded w-4/5" 
            style={{ opacity }}
          />
        </View>

        {/* Seller Info Skeleton */}
        <View className="mb-6">
          <Animated.View 
            className="h-6 bg-gray-200 rounded w-40 mb-3" 
            style={{ opacity }}
          />
          <View className="bg-gray-50 rounded-2xl p-4">
            <View className="flex-row items-center mb-4">
              <Animated.View 
                className="w-16 h-16 rounded-full bg-gray-200" 
                style={{ opacity }}
              />
              <View className="flex-1 ml-4">
                <Animated.View 
                  className="h-5 bg-gray-200 rounded w-32 mb-2" 
                  style={{ opacity }}
                />
                <Animated.View 
                  className="h-4 bg-gray-200 rounded w-24" 
                  style={{ opacity }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Safety Tips Skeleton */}
        <View className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
          <View className="flex-row items-start">
            <Animated.View 
              className="w-5 h-5 rounded bg-gray-200 mr-3" 
              style={{ opacity }}
            />
            <View className="flex-1">
              <Animated.View 
                className="h-5 bg-gray-200 rounded w-24 mb-2" 
                style={{ opacity }}
              />
              <Animated.View 
                className="h-3 bg-gray-200 rounded w-full mb-2" 
                style={{ opacity }}
              />
              <Animated.View 
                className="h-3 bg-gray-200 rounded w-full mb-2" 
                style={{ opacity }}
              />
              <Animated.View 
                className="h-3 bg-gray-200 rounded w-4/5" 
                style={{ opacity }}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Action Bar Skeleton */}
      <View className="bg-white border-t border-gray-200 p-4 flex-row gap-3">
        <Animated.View 
          className="flex-1 h-12 bg-gray-200 rounded-xl" 
          style={{ opacity }}
        />
        <Animated.View 
          className="flex-1 h-12 bg-gray-200 rounded-xl" 
          style={{ opacity }}
        />
        <Animated.View 
          className="flex-1 h-12 bg-gray-200 rounded-xl" 
          style={{ opacity }}
        />
      </View>
    </View>
  );
}