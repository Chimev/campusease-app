import { ListingFilter } from '@/components/ui/filter/AccommodationFilter';
import { tabs } from '@/constant/categories';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function MyListingsScreen() {
  const [selectedTab, setSelectedTab] = useState('active');
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  
  const userSchool = 'UNICAL';

  // Sample listings - would come from API
  const myListings: any = [
    // Uncomment to show listings
    {
      id: '1',
      title: 'Modern 2BR Apartment',
      price: '₦150,000',
      location: 'Near Main Gate',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      category: 'Accommodation',
      categoryColor: '#4F46E5',
      status: 'active',
      views: 245,
      saves: 12,
      messages: 8,
      postedAt: '3 days ago'
    },
    {
      id: '2',
      title: 'iPhone 13 Pro',
      price: '₦320,000',
      location: 'Hostel Area',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
      category: 'Marketplace',
      categoryColor: '#F59E0B',
      status: 'sold',
      views: 189,
      saves: 23,
      messages: 15,
      postedAt: '1 week ago'
    },
  ];

  

  const filteredListings = selectedTab === 'all' 
    ? myListings 
    : myListings.filter((item: any) => item.status === selectedTab);

  const handleEdit = (listing: any) => {
    setIsMenuVisible(false);
    Alert.alert('Edit Listing', `Edit ${listing.title}`);
  };

  const handleDelete = (listing: any) => {
    setIsMenuVisible(false);
    Alert.alert(
      'Delete Listing',
      `Are you sure you want to delete "${listing.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => Alert.alert('Deleted', 'Listing deleted successfully')
        }
      ]
    );
  };

  const handleMarkAsSold = (listing: any) => {
    setIsMenuVisible(false);
    Alert.alert(
      'Mark as Sold',
      `Mark "${listing.title}" as sold/closed?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Mark as Sold',
          onPress: () => Alert.alert('Success', 'Listing marked as sold')
        }
      ]
    );
  };

  const handleShare = (listing: any) => {
    setIsMenuVisible(false);
    Alert.alert('Share Listing', `Share ${listing.title}`);
  };

  const renderListingItem = ({ item }: any) => (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-4 overflow-hidden shadow-sm"
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-48"
          resizeMode="cover"
        />

        {/* Status Badge */}
        <View className={`absolute top-3 left-3 rounded-full px-3 py-1 ${
          item.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
        }`}>
          <Text className="text-white text-xs font-semibold">
            {item.status === 'active' ? 'Active' : 'Sold/Closed'}
          </Text>
        </View>

        {/* Menu Button */}
        <TouchableOpacity
          onPress={() => {
            setSelectedListing(item);
            setIsMenuVisible(true);
          }}
          className="absolute top-3 right-3 bg-black/50 w-10 h-10 rounded-full items-center justify-center"
          activeOpacity={0.7}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="white" />
        </TouchableOpacity>

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
        <Text className="text-secondary text-xl font-bold mb-3">{item.price}</Text>

        <View className="flex-row items-center mb-4">
          <Ionicons name="location-outline" size={16} color="#9CA3AF" />
          <Text className="text-gray-500 ml-1 text-sm flex-1">{item.location}</Text>
          <Text className="text-gray-400 text-xs">{item.postedAt}</Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-between pt-4 border-t border-gray-100">
          <View className="items-center">
            <View className="flex-row items-center">
              <Ionicons name="eye-outline" size={16} color="#6B7280" />
              <Text className="text-gray-700 font-semibold ml-1">{item.views}</Text>
            </View>
            <Text className="text-gray-400 text-xs mt-1">Views</Text>
          </View>

          <View className="items-center">
            <View className="flex-row items-center">
              <Ionicons name="heart-outline" size={16} color="#6B7280" />
              <Text className="text-gray-700 font-semibold ml-1">{item.saves}</Text>
            </View>
            <Text className="text-gray-400 text-xs mt-1">Saves</Text>
          </View>

          <View className="items-center">
            <View className="flex-row items-center">
              <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
              <Text className="text-gray-700 font-semibold ml-1">{item.messages}</Text>
            </View>
            <Text className="text-gray-400 text-xs mt-1">Messages</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-secondary pt-12 pb-6 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-white text-2xl font-bold">My Listings</Text>
            <Text className="text-white/70 text-sm">Manage your posts</Text>
          </View>
          
          <TouchableOpacity
            className="bg-white/20 w-12 h-12 rounded-full items-center justify-center"
            activeOpacity={0.7}
            onPress={() => router.push('/add-listing')}
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
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
      {myListings.length > 0 && (
       <ListingFilter tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      )}

      {/* Listings or Empty State */}
      {myListings.length === 0 || filteredListings.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredListings}
          renderItem={renderListingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Action Menu Modal */}
      <Modal
        visible={isMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity 
          className="flex-1 bg-black/50 justify-end"
          activeOpacity={1}
          onPress={() => setIsMenuVisible(false)}
        >
          <View className="bg-white rounded-t-3xl p-4">
            {/* Menu Header */}
            <View className="items-center mb-4">
              <View className="w-12 h-1 bg-gray-300 rounded-full mb-4" />
              <Text className="text-lg font-bold">Manage Listing</Text>
            </View>

            {/* Menu Options */}
            <View className="gap-2 mb-4">
              {selectedListing?.status === 'active' && (
                <TouchableOpacity
                  onPress={() => handleMarkAsSold(selectedListing)}
                  className="flex-row items-center p-4 bg-gray-50 rounded-xl"
                  activeOpacity={0.7}
                >
                  <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                  <Text className="text-gray-900 font-semibold ml-3 flex-1">Mark as Sold/Closed</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => handleEdit(selectedListing)}
                className="flex-row items-center p-4 bg-gray-50 rounded-xl"
                activeOpacity={0.7}
              >
                <Ionicons name="create-outline" size={24} color="#3B82F6" />
                <Text className="text-gray-900 font-semibold ml-3 flex-1">Edit Listing</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleShare(selectedListing)}
                className="flex-row items-center p-4 bg-gray-50 rounded-xl"
                activeOpacity={0.7}
              >
                <Ionicons name="share-outline" size={24} color="#6B7280" />
                <Text className="text-gray-900 font-semibold ml-3 flex-1">Share Listing</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(selectedListing)}
                className="flex-row items-center p-4 bg-red-50 rounded-xl"
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={24} color="#EF4444" />
                <Text className="text-red-600 font-semibold ml-3 flex-1">Delete Listing</Text>
              </TouchableOpacity>
            </View>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => setIsMenuVisible(false)}
              className="bg-gray-100 p-4 rounded-xl"
              activeOpacity={0.7}
            >
              <Text className="text-gray-700 font-semibold text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}