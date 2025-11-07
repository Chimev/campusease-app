import { ListingCard } from '@/components/ui/ListingCard';
import { ListingCardSkeleton } from '@/components/ui/ListingCardSkeleton';
import { categories } from '@/constant/categories';
import { useAuth } from '@/context/AuhContext';
import { Listing, useListing } from '@/context/ListingContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function CategoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifyModalVisible, setIsNotifyModalVisible] = useState(false);
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { id } = useLocalSearchParams();

  const { user } = useAuth()
  const { setCategory, listings, isLoading } = useListing()

 useEffect(() => {
  if (id) setCategory(id.toString().toLowerCase());
}, [id]);





  const filters = ['All', '1 Bedroom', '2 Bedroom', '3+ Bedroom', 'Self-Contained', 'Shared'];

  const handleNotificationSetup = () => {
    setIsNotifyModalVisible(true);
  };

  const handleEnableNotification = () => {
    setIsNotificationActive(true);
    setIsNotifyModalVisible(false);
    Alert.alert(
      'Notifications Enabled! 🔔',
      `You'll be notified when new ${id} listings are posted in ${user?.school}.`
    );
  };

  const handleDisableNotification = () => {
    Alert.alert(
      'Disable Notifications',
      `Stop receiving notifications for ${id} listings?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disable',
          style: 'destructive',
          onPress: () => setIsNotificationActive(false)
        }
      ]
    );
  };

  const icon = categories.find(icon => id === icon.name)?.icon || ''
 

  const renderEmptyState = () => (
    <View className="items-center justify-center py-12 px-6">
      <View className="bg-gray-100 w-32 h-32 rounded-full items-center justify-center mb-6">
        <Ionicons name="search-outline" size={64} color="#9CA3AF" />
      </View>
      
      <Text className="text-xl font-bold text-gray-800 mb-2 text-center">
        No Listings Found
      </Text>
      <Text className="text-gray-500 text-center mb-8">
        We couldn't find any {id} listings in {user?.school} right now.
      </Text>

      {/* Notify Me Button */}
      <TouchableOpacity
        onPress={handleNotificationSetup}
        className="bg-secondary rounded-2xl px-8 py-4 flex-row items-center shadow-md"
        activeOpacity={0.8}
      >
        <Ionicons name="notifications" size={24} color="white" />
        <Text className="text-white font-bold text-lg ml-3">Notify Me</Text>
      </TouchableOpacity>

      <Text className="text-gray-400 text-sm mt-3 text-center">
        Get notified when new listings are posted
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-secondary pt-12 pb-6 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity className="p-2 -ml-2" activeOpacity={0.7} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View className="flex-row items-center ml-2">
              <Ionicons name={icon as any} size={24} color="white" />
              <Text className="text-white text-xl font-bold ml-2">{id}</Text>
            </View>
          </View>

          {/* Notification Bell */}
          <TouchableOpacity
            onPress={isNotificationActive ? handleDisableNotification : handleNotificationSetup}
            className="p-2"
            activeOpacity={0.7}
          >
            {isNotificationActive ? (
              <View className="relative">
                <Ionicons name="notifications" size={24} color="white" />
                <View className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-secondary" />
              </View>
            ) : (
              <Ionicons name="notifications-outline" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>

        {/* School Badge */}
        <View className="bg-white/20 rounded-full px-4 py-2 self-start mb-4">
          <View className="flex-row items-center">
            <Ionicons name="school" size={14} color="white" />
            <Text className="text-white font-semibold ml-2 text-sm">{user?.school}</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="bg-white rounded-2xl flex-row items-center px-4 py-3 shadow-sm">
          <Feather name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-3 text-base"
            placeholder={`Search ${id}...`}
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <View className="px-4 py-4">
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const isSelected = selectedFilters.includes(item);
            return (
              <TouchableOpacity
                onPress={() => {
                  if (isSelected) {
                    setSelectedFilters(selectedFilters.filter(f => f !== item));
                  } else {
                    setSelectedFilters([...selectedFilters, item]);
                  }
                }}
                className={`mr-3 px-4 py-2 rounded-full ${
                  isSelected ? 'bg-secondary' : 'bg-white border border-gray-200'
                }`}
                activeOpacity={0.7}
              >
                <Text className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>

      {/* Listings */}
      {
        isLoading 
        ? <FlatList
            data={Array.from({ length: 4 })}
            renderItem={({ index }) => <ListingCardSkeleton width={'100%'} />}
            keyExtractor={(_, index) => index.toString()}
            
            contentContainerStyle={{ paddingHorizontal: 16 }}
            showsHorizontalScrollIndicator={false}
          />
        :  <FlatList
        data={listings}
        renderItem={({ item }) => <ListingCard item={item} width={'100%'} />} 
        keyExtractor={(item: Listing) => item._id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        // Uncomment below to show empty state
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
      }

      

      {/* Notification Setup Modal */}
      <Modal
        visible={isNotifyModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsNotifyModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white rounded-3xl p-6 w-full max-w-sm">
            {/* Icon */}
            <View className="items-center mb-4">
              <View className="bg-secondary/10 w-20 h-20 rounded-full items-center justify-center mb-4">
                <Ionicons name="notifications" size={40} color="#4F46E5" />
              </View>
              <Text className="text-2xl font-bold text-center mb-2">
                Get Notified
              </Text>
              <Text className="text-gray-500 text-center">
                Receive instant notifications when new {id} listings are posted in {user?.school}
              </Text>
            </View>

            {/* Features */}
            <View className="bg-gray-50 rounded-2xl p-4 mb-6">
              <View className="flex-row items-center mb-3">
                <View className="bg-green-100 w-8 h-8 rounded-full items-center justify-center mr-3">
                  <Ionicons name="checkmark" size={16} color="#10B981" />
                </View>
                <Text className="text-gray-700 flex-1">Instant push notifications</Text>
              </View>
              <View className="flex-row items-center mb-3">
                <View className="bg-green-100 w-8 h-8 rounded-full items-center justify-center mr-3">
                  <Ionicons name="checkmark" size={16} color="#10B981" />
                </View>
                <Text className="text-gray-700 flex-1">Be the first to know</Text>
              </View>
              <View className="flex-row items-center">
                <View className="bg-green-100 w-8 h-8 rounded-full items-center justify-center mr-3">
                  <Ionicons name="checkmark" size={16} color="#10B981" />
                </View>
                <Text className="text-gray-700 flex-1">Turn off anytime</Text>
              </View>
            </View>

            {/* Buttons */}
            <TouchableOpacity
              onPress={handleEnableNotification}
              className="bg-secondary rounded-2xl py-4 mb-3"
              activeOpacity={0.8}
            >
              <Text className="text-white text-center font-bold text-lg">
                Enable Notifications
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsNotifyModalVisible(false)}
              className="py-3"
              activeOpacity={0.7}
            >
              <Text className="text-gray-500 text-center font-semibold">
                Maybe Later
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Active Notification Banner */}
      {isNotificationActive && (
        <View className="absolute bottom-0 left-0 right-0 bg-green-500 px-4 py-3 flex-row items-center shadow-lg">
          <Ionicons name="notifications" size={20} color="white" />
          <Text className="text-white font-semibold ml-2 flex-1">
            Notifications active for {id}
          </Text>
          <TouchableOpacity onPress={handleDisableNotification}>
            <Text className="text-white font-bold">Turn Off</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}