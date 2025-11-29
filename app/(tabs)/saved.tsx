
import { ListingFilter } from '@/components/ui/filter/ListingFilter';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function SavedScreen() {
  const [selectedTab, setSelectedTab] = useState('all');
  
  const userSchool = 'UNICAL';

  // Sample saved listings - would come from API
  const savedListings: any = [
    // Uncomment to show listings
    {
      id: '1',
      title: 'Modern 2BR Apartment',
      price: '₦150,000',
      location: 'Near Main Gate',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      category: 'Accommodation',
      categoryColor: '#4F46E5',
      savedAt: '2 days ago'
    },
  ];


  const filteredListings = selectedTab === 'all' 
    ? savedListings 
    : savedListings.filter((item: any) => item.category.toLowerCase() === selectedTab);

  const renderListingItem = ({ item }: any) => (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-4 overflow-hidden shadow-sm"
      activeOpacity={0.8}
    >
      <View className="flex-row">
        <Image
          source={{ uri: item.image }}
          className="w-28 h-28"
          resizeMode="cover"
        />
        
        <View className="flex-1 p-4">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-base font-bold flex-1" numberOfLines={2}>
              {item.title}
            </Text>
            <TouchableOpacity className="ml-2" activeOpacity={0.7}>
              <Ionicons name="heart" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
          
          <Text className="text-secondary text-lg font-bold mb-2">{item.price}</Text>
          
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Ionicons name="location-outline" size={14} color="#9CA3AF" />
              <Text className="text-gray-500 ml-1 text-sm">{item.location}</Text>
            </View>
            <Text className="text-gray-400 text-xs">{item.savedAt}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center px-6 py-20">
      <View className="bg-gray-100 w-32 h-32 rounded-full items-center justify-center mb-6">
        <Ionicons name="heart-outline" size={64} color="#9CA3AF" />
      </View>
      
      <Text className="text-2xl font-bold text-gray-800 mb-3 text-center">
        No Saved Items
      </Text>
      <Text className="text-gray-500 text-center mb-8 leading-6">
        Start saving listings you're interested in. They'll appear here for easy access later.
      </Text>

      <TouchableOpacity
        className="bg-secondary rounded-2xl px-8 py-4"
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold text-base">Browse Listings</Text>
      </TouchableOpacity>

      {/* Tips */}
      <View className="mt-12 w-full">
        <Text className="text-gray-700 font-semibold mb-4 text-center">How to save items:</Text>
        <View className="bg-gray-50 rounded-2xl p-4">
          <View className="flex-row items-start mb-3">
            <View className="bg-secondary/10 w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5">
              <Text className="text-secondary font-bold">1</Text>
            </View>
            <Text className="text-gray-600 flex-1">
              Tap the heart icon on any listing
            </Text>
          </View>
          <View className="flex-row items-start mb-3">
            <View className="bg-secondary/10 w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5">
              <Text className="text-secondary font-bold">2</Text>
            </View>
            <Text className="text-gray-600 flex-1">
              Access your saved items anytime here
            </Text>
          </View>
          <View className="flex-row items-start">
            <View className="bg-secondary/10 w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5">
              <Text className="text-secondary font-bold">3</Text>
            </View>
            <Text className="text-gray-600 flex-1">
              Compare and contact sellers easily
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-secondary pt-12 pb-6 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-white text-2xl font-bold">Saved</Text>
            <Text className="text-white/70 text-sm">Your bookmarked listings</Text>
          </View>
          
          <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center">
            <Ionicons name="heart" size={24} color="white" />
          </View>
        </View>

        {/* School Badge */}
        <View className="bg-white/20 rounded-full px-4 py-2 self-start">
          <View className="flex-row items-center">
            <Ionicons name="school" size={14} color="white" />
            <Text className="text-white font-semibold ml-2 text-sm">{userSchool}</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      {savedListings.length > 0 && (
          <ListingFilter  selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      )}

      {/* Listings or Empty State */}
      {savedListings.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredListings}
          renderItem={renderListingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          ListEmptyComponent={() => (
            <View className="items-center py-20">
              <Ionicons name="funnel-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 mt-4 text-center">
                No saved {selectedTab} listings
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}