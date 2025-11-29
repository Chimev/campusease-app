import { ListingFilter } from '@/components/ui/filter/ListingFilter';
import { ListingCard } from '@/components/ui/ListingCard';
import { useAuth } from '@/context/AuhContext';
import { useListing } from '@/context/ListingContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function RecentListingsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user } = useAuth();
  const { recentListing } = useListing()
  const [selectedTab, setSelectedTab] = useState('active');

  


  const filteredListings = selectedCategory === 'all' 
  ? recentListing 
  : recentListing.filter(item => item.category.toLowerCase() === selectedCategory);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-secondary pt-12 pb-6 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity className="p-2 -ml-2" activeOpacity={0.7} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View className="ml-2">
              <Text className="text-white text-xl font-bold">Recent Listings</Text>
              <Text className="text-white/70 text-sm">Just posted in {user?.school}</Text>
            </View>
          </View>

          <View className="bg-white/20 w-10 h-10 rounded-full items-center justify-center">
            <Ionicons name="time-outline" size={20} color="white" />
          </View>
        </View>

        {/* School Badge */}
        <View className="bg-white/20 rounded-full px-4 py-2 self-start">
          <View className="flex-row items-center">
            <Ionicons name="school" size={14} color="white" />
            <Text className="text-white font-semibold ml-2 text-sm">{user?.school}</Text>
          </View>
        </View>
      </View>

      {/* Info Banner */}
      <View className="px-4">
        <View className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex-row items-center">
          <View className="bg-blue-500 w-8 h-8 rounded-full items-center justify-center mr-3">
            <Ionicons name="information" size={16} color="white" />
          </View>
          <Text className="text-blue-800 text-sm flex-1">
            New listings appear here first. Check back often!
          </Text>
        </View>
      </View>

      <ListingFilter setSelectedCategory={setSelectedCategory}  selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      

      {/* Listings Count */}
      {/* <View className="px-4 mb-3">
        <Text className="text-gray-600 text-sm">
          Showing {filteredListings.length} recent listing{filteredListings.length !== 1 ? 's' : ''}
        </Text>
      </View> */}

      {/* Recent Listings */}
      <FlatList
        data={filteredListings}
        renderItem={({ item }) => <ListingCard item={item} width={'100%'} />} 
        keyExtractor={item => item._id}
        contentContainerStyle={{paddingHorizontal: 16}}
        showsHorizontalScrollIndicator={false}
        />
    </View>
  );
}