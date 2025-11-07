import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View className="shadow-md bg-white border-t border-gray-200">
      <View className="flex-row items-center justify-between h-[75px]">
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (index === 2) {
            return (
              <View key={route.key} className="flex-1 items-center justify-center h-full">
                <TouchableOpacity
                  onPress={() => router.push('/add-listing' as any)}
                  activeOpacity={0.8}
                  className="absolute -top-5"
                >
                  <LinearGradient
                    colors={['#1b656a', '#0D757C']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.fab}
                  >
                    <Feather name="plus" size={28} color="#FFFFFF" strokeWidth={2.5} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            );
          }

          const Icon = options.tabBarIcon as any;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              className="flex-1 items-center justify-start pt-2 h-full"
            >
              {Icon && (
                <Icon
                  color={isFocused ? '#0D757C' : 'gray'}
                  size={26}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});