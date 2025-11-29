import { useAuth } from '@/context/AuhContext';
import { useListing } from '@/context/ListingContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function AccountScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const {user, logout} = useAuth();
  const {myListings, isLoading} = useListing()

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


  const stats = [
    { label: 'Active Listings', value: myListings.length, icon: 'list', color: '#4F46E5' },
    { label: 'Saved Items', value: '12', icon: 'heart', color: '#EC4899' },
    { label: 'Messages', value: '8', icon: 'chatbubbles', color: '#10B981' }
  ];

  const menuItems = [
    {
      id: '1',
      title: 'My Listings',
      subtitle: 'View and manage your posts',
      icon: 'list',
      color: '#4F46E5',
      onPress: () => router.push('/(tabs)/account/my-listings')
    },
    {
      id: '2',
      title: 'Saved',
      subtitle: 'Your bookmarked items',
      icon: 'heart',
      color: '#EC4899',
      onPress: () => router.push('/(tabs)/saved')
    },
    {
      id: '3',
      title: 'Messages',
      subtitle: 'Chat with sellers and buyers',
      icon: 'chatbubbles',
      color: '#10B981',
      onPress: () => router.push('/(tabs)/message')
    },
    {
      id: '4',
      title: 'Edit Profile',
      subtitle: 'Update your information',
      icon: 'person',
      color: '#F59E0B',
      onPress: () => router.push('/(tabs)/account/edit-profile')
    }
  ];

  const settingsItems = [
    {
      id: '1',
      title: 'Push Notifications',
      subtitle: 'Get notified about new messages',
      icon: 'notifications',
      hasSwitch: true,
      value: notificationsEnabled,
      onxToggle: setNotificationsEnabled
    },
    {
      id: '2',
      title: 'Email Notifications',
      subtitle: 'Receive updates via email',
      icon: 'mail',
      hasSwitch: true,
      value: emailNotifications,
      onToggle: setEmailNotifications
    },
    {
      id: '3',
      title: 'Privacy & Security',
      subtitle: 'Manage your privacy settings',
      icon: 'shield-checkmark',
      hasSwitch: false,
      onPress: () => Alert.alert('Privacy', 'Privacy settings')
    },
    {
      id: '4',
      title: 'Help & Support',
      subtitle: 'Get help or report an issue',
      icon: 'help-circle',
      hasSwitch: false,
      onPress: () => Alert.alert('Help', 'Contact support')
    },
    {
      id: '5',
      title: 'About CampusEase',
      subtitle: 'Version 1.0.0',
      icon: 'information-circle',
      hasSwitch: false,
      onPress: () => Alert.alert('About', 'CampusEase v1.0.0')
    }
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Profile */}
        <View className="bg-secondary pt-12 pb-8 px-4">
          <View className="items-center">
            {/* <View className="relative">
              <Image 
                source={{ uri: user.avatar }}
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              <TouchableOpacity 
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md"
                activeOpacity={0.7}
              >
                <Feather name="camera" size={16} color="#4F46E5" />
              </TouchableOpacity>
            </View> */}
            
            <Text className="text-white text-2xl font-bold mt-4">{user?.name}</Text>
            <Text className="text-white/80 text-sm mt-1">{user?.email}</Text>
            
            <View className="bg-white/20 rounded-full px-4 py-2 mt-3">
              <View className="flex-row items-center">
                <Ionicons name="school" size={16} color="white" />
                <Text className="text-white font-semibold ml-2">{user?.school}</Text>
              </View>
            </View>

            {/* <Text className="text-white/70 text-sm mt-2">Member since {user.}</Text> */}
          </View>
        </View>

        {/* Stats Cards */}
        <View className="px-4 -mt-6 mb-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm flex-row justify-around" style={{elevation: 5}}>
            {stats.map((stat, index) => (
              <View 
                key={index}
                className="items-center"
              >
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                </View>
                <Text className="text-2xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold mb-3">Quick Actions</Text>
          <View className="gap-3">
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={item.onPress}
                className="bg-white rounded-xl p-4 flex-row items-center "
                activeOpacity={0.7}
              >
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <Ionicons name={item.icon as any} size={24} color={item.color} />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-base">{item.title}</Text>
                  <Text className="text-gray-500 text-sm">{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-bold mb-3">Settings</Text>
          <View className="gap-3">
            {settingsItems.map((item) => (
              <View
                key={item.id}
                className="bg-white rounded-xl p-4 flex-row items-center"
              >
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: '#4F46E515' }}
                >
                  <Ionicons name={item.icon as any} size={24} color="#4F46E5" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-base">{item.title}</Text>
                  <Text className="text-gray-500 text-sm">{item.subtitle}</Text>
                </View>
                {item.hasSwitch ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#D1D5DB', true: '#4F46E5' }}
                    thumbColor="white"
                  />
                ) : (
                  <TouchableOpacity onPress={item.onPress}>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View className="px-4 mb-8">
          <TouchableOpacity
            onPress={async () => await logout()}
            className="bg-red-50 border border-red-200 rounded-xl p-4 flex-row items-center justify-center"
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
            <Text className="text-red-600 font-bold text-base ml-2">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* clear Button */}
        <View className="px-4 mb-8">
          <TouchableOpacity
            onPress={handleClearStorage}
            className="bg-red-50 border border-red-200 rounded-xl p-4 flex-row items-center justify-center"
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={24} color="#EF4444" />
            <Text className="text-red-600 font-bold text-base ml-2">clear</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="items-center pb-8">
          <Text className="text-gray-400 text-sm">CampusEase v1.0.0</Text>
          <Text className="text-gray-400 text-xs mt-1">
            Your Campus Comfort, Simplified
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}