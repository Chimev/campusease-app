import { ListingFilter } from '@/components/ui/filter/ListingFilter';
import { ListingCard } from '@/components/ui/ListingCard';
import { userListings } from '@/helpers/userListings';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  DimensionValue,
  FlatList,
  Linking,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

type SkeletonProps = {
  width?: DimensionValue;
  height?: number;
  rounded?: number;
};

export default function UserProfileScreen() {
  const [selectedTab, setSelectedTab] = useState('all');
  const { username } = useLocalSearchParams();

  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const [listings, setListings] = useState<any[]>([]);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);

  /* -------------------- FETCH USER -------------------- */
  useEffect(() => {
    const fetchUserProfile = async () => {
      const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
      try {
        const res = await fetch(`${BASE_URL}/api/user/${username}`);
        const data = await res.json();

        if (data && data.email) {
          setName(data.name);
          setSchool(data.school);
          setDate(new Date(data.createdAt));
          setEmail(data.email);
          setPhone(data.phone);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  /* -------------------- FETCH LISTINGS -------------------- */
  useEffect(() => {
    const fetchUserListings = async () => {
      setLoading(true)
      try {
        if (!email) return;
        const data = await userListings(email);
        if (data) setListings(data);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    };

    fetchUserListings();
  }, [email]);

  /* -------------------- HELPERS -------------------- */
  const formatMonthYear = (date: Date | null) => {
    return date?.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const Skeleton = ({
  width = '100%',
  height = 16,
  rounded = 8,
}: SkeletonProps) => (
  <View
    style={{
      width,
      height,
      borderRadius: rounded,
      backgroundColor: '#E5E7EB',
      marginVertical: 6,
    }}
  />
);

  const filteredListings =
    selectedTab === 'all'
      ? listings
      : listings.filter(
          (item: any) => item.category.toLowerCase() === selectedTab
        );

  /* -------------------- ACTIONS -------------------- */
  const handleCall = () => Linking.openURL(`tel:${phone}`);
  const handleWhatsApp = () =>
    Linking.openURL(`https://wa.me/${phone.replace(/\s+/g, '')}`);
  const handleMessage = () =>
    Alert.alert('Message', `Start a conversation with ${name}`);

  const handleReport = () => {
    Alert.alert('Report User', 'Why are you reporting this user?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Spam' },
      { text: 'Inappropriate' },
      { text: 'Fraud', style: 'destructive' },
    ]);
  };

  /* -------------------- RENDER -------------------- */
  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-secondary pt-12 pb-4 px-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">User Profile</Text>
          <TouchableOpacity onPress={handleReport} className="p-2">
            <Ionicons name="flag-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={loading ? Array.from({ length: 3 }) : filteredListings}
        keyExtractor={(item, index) => item?._id ?? index.toString()}
        renderItem={({ item }) =>
          loading ? (
            <View className="bg-white rounded-2xl p-4 mb-4">
              <Skeleton height={180} rounded={16} />
              <Skeleton width="70%" />
              <Skeleton width="40%" />
            </View>
          ) : (
            <ListingCard
              profile={false}
              item={item}
              width="100%"
              saved={false}
            />
          )
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            {/* Profile Card */}
            <View className="bg-white rounded-2xl p-6 mb-4 -mt-6 shadow-md">
              <View className="items-center mb-4">
                {loading ? (
                  <>
                    <Skeleton width={180} height={24} />
                    <Skeleton width={140} height={16} />
                    <Skeleton width={120} height={14} />
                  </>
                ) : (
                  <>
                    <Text className="text-2xl mt-4 font-bold text-gray-900">
                      {name}
                    </Text>

                    <View className="flex-row items-center mt-2 mb-1">
                      <Ionicons
                        name="school"
                        size={16}
                        color="#6B7280"
                      />
                      <Text className="text-gray-600 ml-2">
                        {school}
                      </Text>
                    </View>

                    <Text className="text-gray-400 text-sm">
                      Member since {formatMonthYear(date)}
                    </Text>
                  </>
                )}
              </View>

              {/* Contact Buttons */}
              {!loading && (
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={handleCall}
                    className="flex-1 bg-green-500 py-3 rounded-xl flex-row items-center justify-center"
                  >
                    <Ionicons name="call" size={18} color="white" />
                    <Text className="text-white font-semibold ml-2">
                      Call
                    </Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                    onPress={handleWhatsApp}
                    className="flex-1 bg-[#25D366] py-3 rounded-xl flex-row items-center justify-center"
                  >
                    <Ionicons
                      name="logo-whatsapp"
                      size={18}
                      color="white"
                    />
                    <Text className="text-white font-semibold ml-2">
                      WhatsApp
                    </Text>
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    onPress={handleMessage}
                    className="flex-1 bg-secondary py-3 rounded-xl flex-row items-center justify-center"
                  >
                    <Ionicons
                      name="chatbubble"
                      size={18}
                      color="white"
                    />
                    <Text className="text-white font-semibold ml-2">
                      Message
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Listings Header */}
            {!loading && (
              <>
                <View className="mt-4">
                  <Text className="text-xl font-bold mb-3">
                    {name.split(' ')[0]}'s Listings
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {filteredListings.length} {selectedTab} listing
                    {filteredListings.length !== 1 ? 's' : ''}
                  </Text>
                </View>

                <ListingFilter
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              </>
            )}
          </>
        )}
      />
    </View>
  );
}
