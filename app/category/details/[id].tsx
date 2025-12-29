import { ImageViewerModal } from '@/components/ui/ImageViewerModal';
import { ListingDetailSkeleton } from '@/components/ui/ListingDetailsSkeleton';
import { timeAgo } from '@/constant/time';
import { Listing } from '@/context/ListingContext';
import { getListingById } from '@/helpers/getListings';
import { Ionicons } from '@expo/vector-icons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
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
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageViewerVisible, setImageViewerVisible] = useState(false); // Image viewer state
  const flatListRef = useRef<FlatList>(null);
  const { id } = useLocalSearchParams<{id: string}>();
  const router = useRouter();
//Images
  const [isLoading, setIsLoading] = useState(true); 
    const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (id) {
      fetchListingDetails(id);
    }
  }, [id]);

  async function fetchListingDetails(id: string) {
    try {
      setLoading(true);
      setError(null);
      const data = await getListingById(id);
      setListing(data);
    } catch (error) {
      console.error('Error finding Details', error);
      setError('Failed to load listing details');
    } finally {
      setLoading(false);
    }
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentImageIndex(roundIndex);
  };


  const handleShare = () => {
    Alert.alert('Share', 'Share this listing with friends');
  };

  const handleCall = () => {
    if (listing?.phone) {
      Linking.openURL(`tel:+234${listing.phone}`);
    }
  };

  const handleWhatsApp = () => {
    if (listing?.phone) {
      Linking.openURL(`https://wa.me/234${listing.phone}`);
    }
  };

  const handleMessage = () => {
    Alert.alert('Message', 'Open chat with seller');
  };

  const handleBack = () => {
    router.back();
  };

  const handleImagePress = () => {
    setImageViewerVisible(true);
  };

  const renderImageItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={{ width }} 
      activeOpacity={0.9}
      onPress={handleImagePress}
    >
      {(isLoading || hasError) && (
          <Image
          source={require("@/assets/images/imgload.png")}
          style={{ width, height: 300, position: 'absolute' }}
          resizeMode="cover"
          />
      )}

      {!hasError && (
        <Image
          source={{ uri: item }}
          style={{ width, height: 300 }}
          resizeMode="cover"
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return <ListingDetailSkeleton />;
  }

  if (error || !listing) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Ionicons name="alert-circle" size={64} color="#EF4444" />
        <Text className="mt-4 text-lg font-bold text-gray-900">
          {error || 'Listing not found'}
        </Text>
        <TouchableOpacity
          onPress={handleBack}
          className="mt-6 bg-secondary px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Ensure images is an array
  const images = Array.isArray(listing.image) ? listing.image.map(img => img.url) : [];
  console.log(images)

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View className="relative">
          {images.length > 0 ? (
            <FlatList
              ref={flatListRef}
              data={images}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            />
          ) : (
            <TouchableOpacity 
              className="bg-gray-200 items-center justify-center" 
              style={{ width, height: 300 }}
              disabled
            >
              <Ionicons name="image-outline" size={64} color="#9CA3AF" />
              <Text className="text-gray-500 mt-2">No images available</Text>
            </TouchableOpacity>
          )}

          {/* Back Button */}
          <TouchableOpacity 
            onPress={handleBack}
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
  
          </View>

          {/* Image Counter */}
          {images.length > 0 && (
            <View className="absolute bottom-4 right-4 bg-black/70 rounded-full px-3 py-1">
              <Text className="text-white text-sm font-semibold">
                {currentImageIndex + 1} / {images.length}
              </Text>
            </View>
          )}

          {/* Image Dots Indicator */}
          {images.length > 1 && (
            <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
              {images.map((_, index) => (
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
          )}
        </View>

        {/* Content */}
        <View className="p-4">
          {/* Category & Time */}
          <View className="flex-row items-center mb-3">
            <View className="rounded-full px-3 py-1 bg-secondary/10">
              <Text className="text-xs font-semibold text-secondary">
                {listing.category || 'General'}
              </Text>
            </View>
            {listing.createdAt && (() => {
              try {
                const timeText = timeAgo(listing.createdAt);
                return timeText ? (
                  <Text className="text-gray-400 text-xs ml-auto">
                    {timeText}
                  </Text>
                ) : null;
              } catch (error) {
                console.error('Error displaying time:', error);
                return null;
              }
            })()}
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold mb-3">
            {listing.service || 
             listing.property || 
             listing.accommodationTitle || 
             listing.roommateName ||
             'Untitled Listing'}
          </Text>

          {/* Price */}
          {listing.price && (
            <View className="flex-row items-baseline mb-3">
              <Text className="text-secondary text-3xl font-bold">
                ₦{listing.price.toLocaleString()}
              </Text>
            </View>
          )}

          {/* Location */}
          {listing.campus && (
            <View className="flex-row items-center mb-6">
              <Ionicons name="location" size={20} color="#EF4444" />
              <Text className="text-gray-700 ml-2 flex-1">{listing.campus}</Text>
            </View>
          )}

          {listing.gender && listing.level && (
            <View className="mb-6 flex-row gap-10" >
              <View >
              <Text className="text-lg font-bold mb-3">Gender</Text>
              <Text className="text-gray-700 leading-6">{listing.gender}</Text>
            </View>
            <View className="">
              <Text className="text-lg font-bold mb-3">Level</Text>
              <Text className="text-gray-700 leading-6">{listing.level}</Text>
            </View>
            </View>
            
          )}

          {/* Description */}
          {listing.description && (
            <View className="mb-6">
              <Text className="text-lg font-bold mb-3">Description</Text>
              <Text className="text-gray-700 leading-6">{listing.description}</Text>
            </View>
          )}

          {/* User Info */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-3">
              {(listing.category === 'roommates' && 'Student') || (listing.category === 'accommodation' && 'Agent') || (listing.category === 'marketplace' && 'Seller') || (listing.category === 'services' && 'Vendor')} Information
              </Text>
            <Link href={{
              pathname: '/userProfileScreen/[username]',
              params: {username: listing.name as string}
            }} className="bg-gray-50 rounded-2xl p-4">
              <View className="flex-row items-center mb-4">
                <View className="bg-secondary/10 w-16 h-16 rounded-full items-center justify-center">
                  <Ionicons name="person" size={32} color="#4F46E5" />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-lg font-bold">{listing.name || 'Anonymous'}</Text>
                  {listing.email && (
                    <Text className="text-gray-500 text-sm">{listing.email}</Text>
                  )}
                </View>
              </View>
            </Link>
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
      {listing.phone && (
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
      )}

      {/* Image Viewer Modal */}
      <ImageViewerModal
        visible={imageViewerVisible}
        images={images}
        initialIndex={currentImageIndex}
        onClose={() => setImageViewerVisible(false)}
      />


    </View>

    
  );
}