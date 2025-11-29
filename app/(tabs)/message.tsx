import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const userSchool = 'UNICAL';

  // Sample conversations - would come from API
  const conversations: any = [
    // Uncomment to show conversations
    {
      id: '1',
      userName: 'Chisom Okorie',
    //   userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      lastMessage: 'Is the apartment still available?',
      timestamp: '2m ago',
      unreadCount: 2,
      listingTitle: 'Modern 2BR Apartment',
      listingImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      online: true
    },
  ];

  const filteredConversations = conversations.filter((conv: any) =>
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderConversationItem = ({ item }: any) => (
    <Link asChild href={{
      pathname: '/conversation/[id]',
      params: {id: 1}
    }}>
      <TouchableOpacity
      className="bg-white rounded-2xl mb-3 p-4 flex-row items-center shadow-sm"
      activeOpacity={0.8}
      
    >
      {/* Avatar with Online Status */}
      {/* <View className="relative mr-4">
        <Image
          source={{ uri: item.userAvatar }}
          className="w-14 h-14 rounded-full"
        />
        {item.online && (
          <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
      </View> */}

      {/* Message Content */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
            {item.userName}
          </Text>
          <Text className="text-xs text-gray-400">{item.timestamp}</Text>
        </View>

        <Text className="text-sm text-gray-500 mb-1" numberOfLines={1}>
          {item.lastMessage}
        </Text>

        <View className="flex-row items-center">
          <Image
            source={{ uri: item.listingImage }}
            className="w-6 h-6 rounded"
          />
          <Text className="text-xs text-gray-400 ml-2 flex-1" numberOfLines={1}>
            {item.listingTitle}
          </Text>
          {item.unreadCount > 0 && (
            <View className="bg-secondary w-5 h-5 rounded-full items-center justify-center ml-2">
              <Text className="text-white text-xs font-bold">{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
      </TouchableOpacity>
    </Link>
    
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center px-6 py-20">
      <View className="bg-gray-100 w-32 h-32 rounded-full items-center justify-center mb-6">
        <Ionicons name="chatbubbles-outline" size={64} color="#9CA3AF" />
      </View>
      
      <Text className="text-2xl font-bold text-gray-800 mb-3 text-center">
        No Messages Yet
      </Text>
      <Text className="text-gray-500 text-center mb-8 leading-6">
        Start a conversation with sellers or buyers. Your messages will appear here.
      </Text>

      <TouchableOpacity
        className="bg-secondary rounded-2xl px-8 py-4"
        activeOpacity={0.8}
        onPress={() => router.push('/(tabs)/home')}
      >
        <Text className="text-white font-bold text-base">Find Listings</Text>
      </TouchableOpacity>

      {/* Tips */}
      <View className="mt-12 w-full">
        <Text className="text-gray-700 font-semibold mb-4 text-center">Quick Tips:</Text>
        <View className="bg-gray-50 rounded-2xl p-4">
          <View className="flex-row items-start mb-3">
            <View className="bg-green-100 w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5">
              <Ionicons name="shield-checkmark" size={16} color="#10B981" />
            </View>
            <Text className="text-gray-600 flex-1">
              Always be respectful and professional
            </Text>
          </View>
          <View className="flex-row items-start mb-3">
            <View className="bg-yellow-100 w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5">
              <Ionicons name="warning" size={16} color="#F59E0B" />
            </View>
            <Text className="text-gray-600 flex-1">
              Never share sensitive personal information
            </Text>
          </View>
          <View className="flex-row items-start">
            <View className="bg-blue-100 w-8 h-8 rounded-full items-center justify-center mr-3 mt-0.5">
              <Ionicons name="location" size={16} color="#3B82F6" />
            </View>
            <Text className="text-gray-600 flex-1">
              Meet in public places for safety
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
            <Text className="text-white text-2xl font-bold">Messages</Text>
            <Text className="text-white/70 text-sm">Chat with sellers & buyers</Text>
          </View>
          
          <View className="bg-white/20 w-12 h-12 rounded-full items-center justify-center">
            <Ionicons name="chatbubbles" size={24} color="white" />
          </View>
        </View>

        {/* School Badge */}
        <View className="bg-white/20 rounded-full px-4 py-2 self-start mb-4">
          <View className="flex-row items-center">
            <Ionicons name="school" size={14} color="white" />
            <Text className="text-white font-semibold ml-2 text-sm">{userSchool}</Text>
          </View>
        </View>

        {/* Search Bar */}
        {conversations.length > 0 && (
          <View className="bg-white rounded-2xl flex-row items-center px-4 py-3 shadow-sm">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-3 text-base"
              placeholder="Search conversations..."
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
        )}
      </View>

      {/* Conversations or Empty State */}
      {conversations.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          {/* Message Count */}
          <View className="px-4 py-4">
            <Text className="text-gray-600 text-sm">
              {filteredConversations.length} conversation{filteredConversations.length !== 1 ? 's' : ''}
            </Text>
          </View>

          <FlatList
            data={filteredConversations}
            renderItem={renderConversationItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            ListEmptyComponent={() => (
              <View className="items-center py-20">
                <Ionicons name="search-outline" size={48} color="#9CA3AF" />
                <Text className="text-gray-500 mt-4 text-center">
                  No conversations found for "{searchQuery}"
                </Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}