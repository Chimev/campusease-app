import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    Linking,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ListingDetailScreen() {
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Sample listing data - would come from navigation params
  const listing = {
    id: '1',
    title: 'Modern 2BR Apartment with Amazing View',
    price: '₦150,000',
    priceType: 'per month',
    location: 'Near Main Gate, UNICAL',
    category: 'Accommodation',
    categoryColor: '#4F46E5',
    verified: true,
    postedAt: '2 hours ago',
    description: `Beautiful 2-bedroom apartment located just 5 minutes walk from the main campus gate. Perfect for students looking for comfort and convenience.

Features:
• Spacious living room
• Modern kitchen with appliances
• 24/7 water supply
• Secure gated community
• Parking space available
• Close to shops and restaurants

The apartment is newly renovated with quality finishes. Ideal for 2-3 students sharing. Available for immediate move-in.`,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800'
    ],
    seller: {
      name: 'Chisom Okorie',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      memberSince: 'September 2024',
      activeListings: 3,
      responseRate: '95%',
      responseTime: 'Within 1 hour'
    },
    details: [
      { icon: 'bed-outline', label: 'Bedrooms', value: '2' },
      { icon: 'water-outline', label: 'Bathrooms', value: '2' },
      { icon: 'home-outline', label: 'Type', value: 'Apartment' },
      { icon: 'resize-outline', label: 'Size', value: '850 sq ft' }
    ]
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentImageIndex(roundIndex);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share this listing with friends');
  };

  const handleCall = () => {
    Linking.openURL('tel:+2348012345678');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/2348012345678');
  };

  const handleMessage = () => {
    Alert.alert('Message', 'Open chat with seller');
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <View style={{ width }}>
      <Image
        source={{ uri: item }}
        style={{ width, height: 300 }}
        resizeMode="cover"
      />
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View className="relative">
          <FlatList
            ref={flatListRef}
            data={listing.images}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />

          {/* Back Button */}
          <TouchableOpacity 
            className="absolute top-12 left-4 bg-black/50 w-10 h-10 rounded-full items-center justify-center"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          {/* Share & Save Buttons */}
          <View className="absolute top-12 right-4 flex-row gap-2">
            <TouchableOpacity 
              onPress={handleShare}
              className="bg-black/50 w-10 h-10 rounded-full items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="share-outline" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleSave}
              className="bg-black/50 w-10 h-10 rounded-full items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons 
                name={isSaved ? "heart" : "heart-outline"} 
                size={20} 
                color={isSaved ? "#EF4444" : "white"} 
              />
            </TouchableOpacity>
          </View>

          {/* Image Counter */}
          <View className="absolute bottom-4 right-4 bg-black/70 rounded-full px-3 py-1">
            <Text className="text-white text-sm font-semibold">
              {currentImageIndex + 1} / {listing.images.length}
            </Text>
          </View>

          {/* Image Dots Indicator */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
            {listing.images.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full mx-1 ${
                  index === currentImageIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 w-2'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Content */}
        <View className="p-4">
          {/* Category & Verified Badge */}
          <View className="flex-row items-center mb-3">
            <View 
              className="rounded-full px-3 py-1"
              style={{ backgroundColor: `${listing.categoryColor}15` }}
            >
              <Text 
                className="text-xs font-semibold"
                style={{ color: listing.categoryColor }}
              >
                {listing.category}
              </Text>
            </View>
            {listing.verified && (
              <View className="bg-green-100 rounded-full px-3 py-1 flex-row items-center ml-2">
                <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                <Text className="text-green-700 text-xs font-semibold ml-1">Verified</Text>
              </View>
            )}
            <Text className="text-gray-400 text-xs ml-auto">{listing.postedAt}</Text>
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold mb-3">{listing.title}</Text>

          {/* Price */}
          <View className="flex-row items-baseline mb-3">
            <Text className="text-secondary text-3xl font-bold">{listing.price}</Text>
            <Text className="text-gray-500 ml-2">/{listing.priceType}</Text>
          </View>

          {/* Location */}
          <View className="flex-row items-center mb-6">
            <Ionicons name="location" size={20} color="#EF4444" />
            <Text className="text-gray-700 ml-2 flex-1">{listing.location}</Text>
          </View>

          {/* Details Grid */}
          <View className="bg-gray-50 rounded-2xl p-4 mb-6">
            <View className="flex-row flex-wrap">
              {listing.details.map((detail, index) => (
                <View 
                  key={index}
                  className="w-1/2 mb-4"
                >
                  <View className="flex-row items-center">
                    <View className="bg-secondary/10 w-10 h-10 rounded-full items-center justify-center mr-3">
                      <Ionicons name={detail.icon as any} size={20} color="#4F46E5" />
                    </View>
                    <View>
                      <Text className="text-gray-500 text-xs">{detail.label}</Text>
                      <Text className="text-gray-900 font-bold">{detail.value}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-3">Description</Text>
            <Text className="text-gray-700 leading-6">{listing.description}</Text>
          </View>

          {/* Seller Info */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-3">Seller Information</Text>
            <View className="bg-gray-50 rounded-2xl p-4">
              <View className="flex-row items-center mb-4">
                <Image 
                  source={{ uri: listing.seller.avatar }}
                  className="w-16 h-16 rounded-full"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-lg font-bold">{listing.seller.name}</Text>
                  <Text className="text-gray-500 text-sm">Member since {listing.seller.memberSince}</Text>
                </View>
              </View>

              <View className="flex-row justify-between">
                <View>
                  <Text className="text-gray-500 text-xs">Active Listings</Text>
                  <Text className="font-bold">{listing.seller.activeListings}</Text>
                </View>
                <View>
                  <Text className="text-gray-500 text-xs">Response Rate</Text>
                  <Text className="font-bold">{listing.seller.responseRate}</Text>
                </View>
                <View>
                  <Text className="text-gray-500 text-xs">Response Time</Text>
                  <Text className="font-bold text-xs">{listing.seller.responseTime}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Safety Tips */}
          <View className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="shield-checkmark" size={20} color="#F59E0B" />
              <View className="flex-1 ml-3">
                <Text className="text-yellow-900 font-bold mb-1">Safety Tips</Text>
                <Text className="text-yellow-800 text-sm">
                  • Meet in a public place{'\n'}
                  • Check the item before payment{'\n'}
                  • Don't send money in advance{'\n'}
                  • Report suspicious listings
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="bg-white border-t border-gray-200 p-4 flex-row gap-3">
        <TouchableOpacity
          onPress={handleCall}
          className="bg-green-500 flex-1 py-3 rounded-xl flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleWhatsApp}
          className="bg-[#25D366] flex-1 py-3 rounded-xl flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <Ionicons name="logo-whatsapp" size={20} color="white" />
          <Text className="text-white font-bold ml-2">WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleMessage}
          className="bg-secondary flex-1 py-3 rounded-xl flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <Ionicons name="chatbubble" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}