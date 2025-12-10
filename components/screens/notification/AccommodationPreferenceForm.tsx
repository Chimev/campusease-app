

import { AccommodationOptions } from '@/app/add-listing';
import { useAuth } from '@/context/AuhContext';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';



export default function AccommodationPreferenceForm({
  preferenceForm,
  setPreferenceForm,
  setThankYouVisible
}: any) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  // const [bedrooms, setBedrooms] = useState('');
  const [accommodationType, setAccommodationType] = useState('');
  const [preferredCampus, setPreferredCampus] = useState('');
  // const [moveInDate, setMoveInDate] = useState('');

  const {user, schools} = useAuth()

  const campusLocations = user?.school 
  ? schools.find((s: any) => s.school === user.school)?.campuses || []
  : [];

  const bedroomOptions = ['1', '2', '3', '4+'];

  const handleSave = () => {
    if (!minPrice || !maxPrice) {
      Alert.alert('Missing Fields', 'Please enter price range');
      return;
    }

    if (parseInt(minPrice) > parseInt(maxPrice)) {
      Alert.alert('Invalid Range', 'Minimum price cannot be greater than maximum price');
      return;
    }

    const preferences = {
      minPrice,
      maxPrice,
      // bedrooms,
      accommodationType,
      preferredCampus,
      // moveInDate
    };

    console.log('Accommodation Preferences:', preferences);

   



    // Clear form
    setMinPrice('');
    setMaxPrice('');
    // setBedrooms('');
    setAccommodationType('');
    setPreferredCampus('');
    // setMoveInDate('');

    setThankYouVisible(true)
    setPreferenceForm(false);
  };

  return (
    <Modal
      visible={preferenceForm}
      transparent
      animationType="slide"
      onRequestClose={() => setPreferenceForm(false)}
    >
      <View className="flex-1 bg-black/50">
        <View className="flex-1 mt-20 bg-white rounded-t-3xl">
          {/* Header */}
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Text className="text-xl font-bold">Set Your Preferences</Text>
            <TouchableOpacity onPress={() => setPreferenceForm(false)}>
              <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="p-4">
              {/* Info Banner */}
              <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <View className="flex-row items-start">
                  <Ionicons name="information-circle" size={20} color="#3B82F6" />
                  <Text className="text-blue-800 text-sm ml-2 flex-1">
                    Tell us what you're looking for and we'll notify you when matching accommodations are posted
                  </Text>
                </View>
              </View>

              {/* Price Range */}
              <View className="mb-6">
                <Text className="text-lg font-bold mb-3">Price Range *</Text>
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <Text className="text-gray-700 mb-2 text-sm">Min Price</Text>
                    <View className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                      <Text className="text-gray-500 text-base mr-2">₦</Text>
                      <TextInput
                        className="text-base flex-1"
                        placeholder="50,000"
                        placeholderTextColor="#9CA3AF"
                        value={minPrice}
                        onChangeText={setMinPrice}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>

                  <View className="flex-1">
                    <Text className="text-gray-700 mb-2 text-sm">Max Price</Text>
                    <View className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                      <Text className="text-gray-500 text-base mr-2">₦</Text>
                      <TextInput
                        className="text-base flex-1"
                        placeholder="200,000"
                        placeholderTextColor="#9CA3AF"
                        value={maxPrice}
                        onChangeText={setMaxPrice}
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Number of Bedrooms */}
              {/* <View className="mb-6">
                <Text className="text-lg font-bold mb-3">Number of Bedrooms</Text>
                <View className="flex-row flex-wrap gap-3">
                  {bedroomOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => setBedrooms(option)}
                      className={`px-6 py-3 rounded-xl border-2 ${
                        bedrooms === option
                          ? 'border-secondary bg-secondary/5'
                          : 'border-gray-200 bg-white'
                      }`}
                      activeOpacity={0.7}
                    >
                      <Text
                        className={`font-semibold ${
                          bedrooms === option ? 'text-secondary' : 'text-gray-700'
                        }`}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View> */}

              {/* Accommodation Type */}
              <View className="mb-6">
                <Text className="text-lg font-bold mb-3">Accommodation Type</Text>
                <View className="gap-2">
                  {AccommodationOptions.map((type) => (
                    <TouchableOpacity
                      key={type.id}
                      onPress={() => setAccommodationType(type.value)}
                      className={`bg-white border rounded-xl px-4 py-3 flex-row items-center justify-between ${
                        accommodationType === type.label ? 'border-secondary' : 'border-gray-200'
                      }`}
                      activeOpacity={0.7}
                    >
                      <View className="flex-row items-center">
                        <Ionicons
                          name="home-outline"
                          size={20}
                          color={accommodationType === type.label ? '#4F46E5' : '#9CA3AF'}
                        />
                        <Text
                          className={`ml-3 ${
                            accommodationType === type.label
                              ? 'text-secondary font-semibold'
                              : 'text-gray-700'
                          }`}
                        >
                          {type.label}
                        </Text>
                      </View>
                      {accommodationType === type.label && (
                        <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Preferred Location */}
              <View className="mb-6">
                <Text className="text-lg font-bold mb-3">Preferred Location</Text>
                <View className="gap-2">
                  {campusLocations.map((campus: any) => (
                    <TouchableOpacity
                      key={campus}
                      onPress={() => setPreferredCampus(campus)}
                      className={`bg-white border rounded-xl px-4 py-3 flex-row items-center justify-between ${
                        preferredCampus === campus ? 'border-secondary' : 'border-gray-200'
                      }`}
                      activeOpacity={0.7}
                    >
                      <View className="flex-row items-center">
                        <Ionicons
                          name="location-outline"
                          size={20}
                          color={preferredCampus === campus ? '#4F46E5' : '#9CA3AF'}
                        />
                        <Text
                          className={`ml-3 ${
                            preferredCampus === campus
                              ? 'text-secondary font-semibold'
                              : 'text-gray-700'
                          }`}
                        >
                          {campus}
                        </Text>
                      </View>
                      {preferredCampus === campus && (
                        <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Move-in Date */}
              {/* <View className="mb-6">
                <Text className="text-lg font-bold mb-3">Desired Move-in Date (Optional)</Text>
                <View className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                  <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
                  <TextInput
                    className="text-base ml-3 flex-1"
                    placeholder="e.g., January 2025"
                    placeholderTextColor="#9CA3AF"
                    value={moveInDate}
                    onChangeText={setMoveInDate}
                  />
                </View>
              </View> */}

              {/* Save Button */}
              <TouchableOpacity
                onPress={handleSave}
                className="bg-secondary rounded-2xl p-4 shadow-md mb-4"
                activeOpacity={0.8}
              >
                <Text className="text-white text-center text-lg font-bold">
                  Save Preferences & Enable Notifications
                </Text>
              </TouchableOpacity>

              {/* Cancel Button */}
              <TouchableOpacity
                onPress={() => setPreferenceForm(false)}
                className="bg-gray-100 rounded-2xl p-4 mb-6"
                activeOpacity={0.7}
              >
                <Text className="text-gray-700 text-center text-base font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}