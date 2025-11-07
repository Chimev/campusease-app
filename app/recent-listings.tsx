import { useAuth } from '@/context/AuhContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function RecentListingsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user } = useAuth();

  // Sample recent listings - would come from API sorted by date
  const recentListings = [
    {
      id: '1',
      title: 'Modern 2BR Apartment',
      price: '₦150,000',
      location: 'Near Main Gate',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      category: 'Accommodation',
      categoryColor: '#4F46E5',
      verified: true,
      postedAt: '2 mins ago'
    },
    {
      id: '2',
      title: 'iPhone 13 Pro',
      price: '₦320,000',
      location: 'Hostel Area',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
      category: 'Marketplace',
      categoryColor: '#F59E0B',
      verified: true,
      postedAt: '15 mins ago'
    },
    {
      id: '3',
      title: 'Looking for Roommate',
      price: '₦75,000/month',
      location: 'Off-Campus West',
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400',
      category: 'Roommate',
      categoryColor: '#EC4899',
      verified: false,
      postedAt: '1 hour ago'
    },
    {
      id: '4',
      title: 'Laundry Service',
      price: '₦5,000',
      location: 'Campus Area',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
      category: 'Services',
      categoryColor: '#10B981',
      verified: true,
      postedAt: '2 hours ago'
    },
    {
      id: '5',
      title: 'Luxury 3BR Duplex',
      price: '₦250,000',
      location: 'Off-Campus East',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
      category: 'Accommodation',
      categoryColor: '#4F46E5',
      verified: true,
      postedAt: '3 hours ago'
    },
    {
      id: '6',
      title: 'MacBook Pro M1',
      price: '₦580,000',
      location: 'Engineering Block',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      category: 'Marketplace',
      categoryColor: '#F59E0B',
      verified: true,
      postedAt: '5 hours ago'
    },
    {
      id: '7',
      title: 'Studio Apartment',
      price: '₦80,000',
      location: 'Near Library',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      category: 'Accommodation',
      categoryColor: '#4F46E5',
      verified: false,
      postedAt: '1 day ago'
    },
    {
      id: '8',
      title: 'Tutoring Services',
      price: '₦3,000/hr',
      location: 'Faculty of Science',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400',
      category: 'Services',
      categoryColor: '#10B981',
      verified: true,
      postedAt: '1 day ago'
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: 'apps' },
    { id: 'accommodation', name: 'Accommodation', icon: 'home' },
    { id: 'marketplace', name: 'Marketplace', icon: 'storefront' },
    { id: 'roommate', name: 'Roommates', icon: 'people' },
    { id: 'services', name: 'Services', icon: 'construct' }
  ];

  const filteredListings = selectedCategory === 'all' 
    ? recentListings 
    : recentListings.filter(item => item.category.toLowerCase() === selectedCategory);

  const renderListingItem = ({ item }: any) => (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-4 overflow-hidden shadow-sm"
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-56"
          resizeMode="cover"
        />

        {/* Time Badge */}
        <View className="absolute top-3 left-3 bg-black/70 rounded-full px-3 py-1 flex-row items-center">
          <Ionicons name="time-outline" size={12} color="white" />
          <Text className="text-white text-xs font-semibold ml-1">{item.postedAt}</Text>
        </View>

        {/* Verified Badge */}
        {item.verified && (
          <View className="absolute top-3 right-3 bg-green-500 rounded-full px-3 py-1 flex-row items-center">
            <Ionicons name="checkmark-circle" size={14} color="white" />
            <Text className="text-white text-xs font-semibold ml-1">Verified</Text>
          </View>
        )}

        {/* Category Badge */}
        <View 
          className="absolute bottom-3 left-3 rounded-full px-3 py-1"
          style={{ backgroundColor: item.categoryColor }}
        >
          <Text className="text-white text-xs font-semibold">{item.category}</Text>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-lg font-bold mb-2" numberOfLines={2}>
          {item.title}
        </Text>
        <Text className="text-secondary text-2xl font-bold mb-3">{item.price}</Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <Ionicons name="location-outline" size={16} color="#9CA3AF" />
            <Text className="text-gray-500 ml-1 text-sm" numberOfLines={1}>
              {item.location}
            </Text>
          </View>
          
          <TouchableOpacity 
            className="bg-secondary/10 p-2 rounded-full"
            activeOpacity={0.7}
          >
            <Ionicons name="heart-outline" size={20} color="#4F46E5" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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

      {/* Category Filters */}
      <View className="px-4 py-4">
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item.id;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item.id)}
                className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
                  isSelected ? 'bg-secondary' : 'bg-white border border-gray-200'
                }`}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={item.icon as any} 
                  size={16} 
                  color={isSelected ? 'white' : '#6B7280'} 
                />
                <Text className={`font-semibold ml-2 ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Info Banner */}
      <View className="px-4 mb-4">
        <View className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex-row items-center">
          <View className="bg-blue-500 w-8 h-8 rounded-full items-center justify-center mr-3">
            <Ionicons name="information" size={16} color="white" />
          </View>
          <Text className="text-blue-800 text-sm flex-1">
            New listings appear here first. Check back often!
          </Text>
        </View>
      </View>

      {/* Listings Count */}
      <View className="px-4 mb-3">
        <Text className="text-gray-600 text-sm">
          Showing {filteredListings.length} recent listing{filteredListings.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Recent Listings */}
      <FlatList
        data={filteredListings}
        renderItem={renderListingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}