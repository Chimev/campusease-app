import { ListingFilter } from '@/components/ui/filter/ListingFilter';
import { ListingCard } from '@/components/ui/ListingCard';
import { ListingCardSkeleton } from '@/components/ui/ListingCardSkeleton';
import { useAuth } from '@/context/AuhContext';
import { useListing } from '@/context/ListingContext';
import { deleteListing } from '@/helpers/deleteListing';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function MyListingsScreen() {
  const [selectedTab, setSelectedTab] = useState('all');

  const {user} =  useAuth();
  const {myListings, refetchMyListings, refetchListings, refetchRecentListings, isLoading, setIsLoading} = useListing()


  const handleDelete = async(id:string) => {
    setIsLoading(true)
    try {
      await deleteListing(id)
      // Refresh everywhere
      await Promise.all([
      refetchMyListings(),
      refetchListings(),
      refetchRecentListings()
    ]);
    } catch (error) {
        console.error('Failed to delete listing');
    }finally{
      setIsLoading(false)
    }
  }


  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center px-6 py-20">
      <View className="bg-gray-100 w-32 h-32 rounded-full items-center justify-center mb-6">
        <Ionicons name="list-outline" size={64} color="#9CA3AF" />
      </View>
      
      <Text className="text-2xl font-bold text-gray-800 mb-3 text-center">
        No Listings Yet
      </Text>
      <Text className="text-gray-500 text-center mb-8 leading-6">
        {selectedTab === 'active' 
          ? "You don't have any active listings. Create your first listing to get started!"
          : selectedTab === 'sold'
          ? "No sold or closed listings yet."
          : "Start posting your accommodation, items, or services to reach students in your campus."}
      </Text>

      {selectedTab !== 'sold' && (
        <TouchableOpacity
          className="bg-secondary rounded-2xl px-8 py-4 flex-row items-center"
          activeOpacity={0.8}
          onPress={() => router.push('/add-listing')}
        >
          <Ionicons name="add-circle" size={24} color="white" />
          <Text className="text-white font-bold text-base ml-2">Create Listing</Text>
        </TouchableOpacity>
      )}

      {/* Tips */}
      <View className="mt-12 w-full">
        <Text className="text-gray-700 font-semibold mb-4 text-center">Tips for great listings:</Text>
        <View className="bg-gray-50 rounded-2xl p-4">
          <View className="flex-row items-start mb-3">
            <View className="bg-secondary/10 w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5">
              <Ionicons name="camera" size={16} color="#4F46E5" />
            </View>
            <Text className="text-gray-600 flex-1">
              Add clear, high-quality photos
            </Text>
          </View>
          <View className="flex-row items-start mb-3">
            <View className="bg-secondary/10 w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5">
              <Ionicons name="document-text" size={16} color="#4F46E5" />
            </View>
            <Text className="text-gray-600 flex-1">
              Write detailed descriptions
            </Text>
          </View>
          <View className="flex-row items-start">
            <View className="bg-secondary/10 w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5">
              <Ionicons name="pricetag" size={16} color="#4F46E5" />
            </View>
            <Text className="text-gray-600 flex-1">
              Set competitive prices
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const filteredListings = selectedTab === 'all' 
    ? myListings 
    : myListings.filter((item: any) => item.category.toLowerCase() === selectedTab);

 

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-secondary pt-12 pb-6 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <View className='flex-row items-center flex-1'>
            <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2" activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-2xl font-bold">My Listings</Text>
              <Text className="text-white/70 text-sm">Manage your posts</Text>
            </View>
          </View>
          
          
          <TouchableOpacity
            className="bg-white/20 w-12 h-12 rounded-full items-center justify-center"
            activeOpacity={0.7}
            onPress={()=>router.push('/add-listing')}
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* School Badge */}
        <View className="bg-white/20 rounded-full px-4 py-2 self-start">
          <View className="flex-row items-center">
            <Ionicons name="school" size={14} color="white" />
            <Text className="text-white font-semibold ml-2 text-sm">{user?.school}</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      {myListings.length > 0 && (
        <ListingFilter  selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      )}

      {/* Listings or Empty State */}
      {
        isLoading
         ? <FlatList
            data={Array.from({ length: 4 })}
            renderItem={({ index }) => <ListingCardSkeleton width={'100%'} />}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            showsHorizontalScrollIndicator={false}
          />
            : myListings.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredListings}
          renderItem={({ item }) => <ListingCard  profile={true} item={item} width={'100%'} handleDelete={handleDelete} />}          
          keyExtractor={(item: any) => item._id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )
      }
    </View>
  );
}