import { AccommodationFilter } from '@/components/ui/filter/AccommodationFilter';
import { MarketplaceFitler } from '@/components/ui/filter/MarketplaceFilter';
import { RoommateFilter } from '@/components/ui/filter/RoommatesFilter';
import { ServiceFilter } from '@/components/ui/filter/ServiceFilter';
import { ListingCard } from '@/components/ui/ListingCard';
import { ListingCardSkeleton } from '@/components/ui/ListingCardSkeleton';
import AccommodationPreferenceForm from '@/components/ui/notification/AccommodationPreferenceForm';
import ModalNotification from '@/components/ui/notification/ModalNotification';
import NotifyMe from '@/components/ui/notification/NotifyMe';
import { categories } from '@/constant/categories';
import { useAuth } from '@/context/AuhContext';
import { Listing, useListing } from '@/context/ListingContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function CategoryScreen() {
  const [isAccommodationModal, setIsAccommodationModal] = useState(false)
  const [isMarketplaceModal, setIsMarketplaceModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifyModalVisible, setIsNotifyModalVisible] = useState(false);
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { id } = useLocalSearchParams();

  const { user } = useAuth()
  const { setCategory, listings, isLoading } = useListing()

  const [selectedTab, setSelectedTab] = useState<string | null>(null)
  const icon = categories.find(icon => id === icon.name)?.icon || ''

  const [preferenceForm, setPreferenceForm] = useState(false)

 useEffect(() => {
  if (id) setCategory(id.toString().toLowerCase());
}, [id]);


  const handleNotificationSetup = () => {
    setIsNotifyModalVisible(true);
  };

  const handleEnableNotification = () => {
    if(id === 'Accommodation'){
      
      setPreferenceForm(true)
      setIsNotifyModalVisible(false);
    }else{
    setIsNotificationActive(true);
    setIsNotifyModalVisible(false);
    Alert.alert(
      'Notifications Enabled! 🔔',
      `You'll be notified when new ${id} listings are posted in ${user?.school}.`
    );
    }

    
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
          <NotifyMe handleDisableNotification={handleDisableNotification} handleNotificationSetup={handleNotificationSetup} isNotificationActive={isNotificationActive} id={id}/>
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
      <View>
         {id === 'Accommodation' && <AccommodationFilter setSelectedTab={setSelectedTab} selectedTab={selectedTab} isAccommodationModal={isAccommodationModal} setIsAccommodationModal={setIsAccommodationModal} />}

      { id === 'Roommates' && <RoommateFilter selectedTab={selectedTab} />}
      { id === 'Services' && <ServiceFilter selectedTab={selectedTab} />}
      { id === 'Marketplace' && <MarketplaceFitler setSelectedTab={setSelectedTab}  selectedTab={selectedTab} setIsMarketplaceModal={setIsMarketplaceModal} isMarketplaceModal={isMarketplaceModal} />}
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
      <ModalNotification 
      handleEnableNotification={handleEnableNotification} 
      id={id} 
      isNotifyModalVisible={isNotifyModalVisible} 
      setIsNotifyModalVisible={setIsNotifyModalVisible} 
      user={user} 
      />

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

      {/* Preference */}
      {
        preferenceForm && <AccommodationPreferenceForm setPreferenceForm={setPreferenceForm}  />
      }
    </View>
  );
}