import { AccommodationOptions, genderOptions, levelOptions, propertyTypes, serviceOptions } from '@/constant/categoryOptions';
import { useAuth } from '@/context/AuhContext';
import { Listing } from '@/context/ListingContext';
import { getListingById } from '@/helpers/getListings';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';





export default function EditListingScreen() {
  const {id, category} = useLocalSearchParams<{id: string, category:string}>()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
      if (id) {
        fetchListingDetails(id);
      }
    }, [id]);

  useEffect(() => {
    if(id){
        setAccommodationTitle(listing?.accommodationTitle || '')
        SetAccommodationType(listing?.accommodationType || '')
        setVideoLink(listing?.videoLink || '')
        setPrice(listing?.price?.toString() || '')
        setPhone(listing?.phone?.toString() || '')
        setCampus(listing?.campus || '')
        setDescription(listing?.description || '')
        setName(listing?.roommateName || '')
        setGender(listing?.gender || '')
        setService(listing?.service || '')
    }
  },[listing])
  
   async function fetchListingDetails(id: string) {
    try {
    setLoading(true);
    setError(null);
    const data = await getListingById(id);
    console.log(data)
    setListing(data);
    } catch (error) {
    console.error('Error finding Details', error);
    setError('Failed to load listing details');
    } finally {
    setLoading(false);
    }
  }


 // Accommodations
  const [isAccommodationModalVisible, setIsAccommodationModalVisible] = useState(false);
  const [AccommodationTitle, setAccommodationTitle] = useState('');
  const [accommodationType, SetAccommodationType] = useState('')

  //Roommates
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isLevelModalVisible, setIsLevelModalVisible] = useState(false);
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [level, setLevel] = useState('')

  //Services
  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false)
  const [service, setService] = useState('')

  // Marketplace - Added states for property type and specific item
  const [isPropertyTypeModalVisible, setIsPropertyTypeModalVisible] = useState(false);
  const [isPropertyItemModalVisible, setIsPropertyItemModalVisible] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [selectedPropertyItem, setSelectedPropertyItem] = useState('');
  
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [campus, setCampus] = useState('');
  const [phone, setPhone] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [videoLink, setVideoLink] = useState('')
 

 const { user, schools } = useAuth();

 const handleSelect = (value: string) => {
    SetAccommodationType(value);
    setIsAccommodationModalVisible(false);
  };

 const campusLocations = user?.school 
  ? schools.find((s: any) => s.school === user.school)?.campuses || []
  : [];

  // const handleImagePicker = () => {
  //   // This would integrate with expo-image-picker
  //   Alert.alert('Image Picker', 'Image picker would open here');
  // };

  const handleSubmit = () => {
    if (!category || !AccommodationTitle || !description || !price || !campus) {
      Alert.alert('Missing Fields', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert('Success', 'Your listing has been posted!');
    // Here you would send the data to your backend
  };

  
    // Get unique property types from propertyTypes array
    const uniquePropertyTypes = [...new Set(propertyTypes.map(p => p.propertyType))];

      // Filter property items based on selected property type
  const filteredPropertyItems = propertyTypes
    .filter(p => p.propertyType === selectedPropertyType)
    .map(p => p.item);

    // Handler for selecting property type in marketplace
  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(type);
    setSelectedPropertyItem(''); // Reset item when type changes
    setIsPropertyTypeModalVisible(false);
  };

  // Handler for selecting property item in marketplace
  const handlePropertyItemSelect = (item: string) => {
    setSelectedPropertyItem(item);
    setIsPropertyItemModalVisible(false);
  };


  const selectedLabel = AccommodationOptions.find(opt => opt.value === accommodationType)?.label ||accommodationType;

  const selectedGender = genderOptions.find(opt => opt.value === gender)?.label || 'Select an option';

  const selectedLevel = levelOptions.find(opt => opt.value === level)?.label || 'Select an option';

  const selectedService = serviceOptions.find(opt => opt.value === service)?.label || service;

  return (
    <KeyboardAvoidingView className='flex-1'
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-secondary py-2 px-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity className="p-2" activeOpacity={0.7} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Edit Listing</Text>
            <View className="w-8" />
          </View>
        </View>

          {/* fORM */}
        <View className="px-4 py-6">
          { category 
            ? (
            <>
          {/* Title */}
          {
            category === 'accommodation' 
            && (<View className="mb-6">
            <Text className="text-lg font-bold mb-3">Title *</Text>
            <View className="bg-white border border-gray-200 rounded-xl mb-6 px-4 py-3">
              <TextInput
                className="text-base"
                placeholder="e.g., Newly built Selfcon apartment"
                placeholderTextColor="#9CA3AF"
                value={AccommodationTitle}
                onChangeText={setAccommodationTitle}
              />
            </View>

            <Text className="text-lg font-bold mb-3">Type *</Text>
            <View>
              {/* Selection Button */}
              <TouchableOpacity
                onPress={() => setIsAccommodationModalVisible(true)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-4 flex-row items-center justify-between"
                activeOpacity={0.7}
              >
                <Text className={accommodationType ? 'text-gray-900' : 'text-gray-400'}>
                  {selectedLabel}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
              </TouchableOpacity>
        
              {/* Modal with Options */}
              <Modal
                visible={isAccommodationModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsAccommodationModalVisible(false)}
              >
                <View className="flex-1 justify-end bg-black/50 pb-1">
                  <View className="bg-white rounded-t-3xl max-h-[70%]">
                    {/* Header */}
                    <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                      <Text className="text-lg font-bold">Select School</Text>
                      <TouchableOpacity onPress={() => setIsAccommodationModalVisible(false)}>
                        <Ionicons name="close" size={24} color="#000" />
                      </TouchableOpacity>
                    </View>
        
                    {/* Options List */}
                    <ScrollView className="px-4">
                      {AccommodationOptions.map((option) => (
                        <TouchableOpacity
                          key={option.id}
                          onPress={() => handleSelect(option.value)}
                          className={`py-4 border-b border-gray-100 flex-row items-center justify-between ${
                            accommodationType === option.value ? 'bg-secondary/5' : ''
                          }`}
                          activeOpacity={0.7}
                        >
                          <Text
                            className={`text-base ${
                              accommodationType === option.value
                                ? 'text-secondary font-semibold'
                                : 'text-gray-700'
                            }`}
                          >
                            {option.label}
                          </Text>
                          {accommodationType === option.value && (
                            <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                          )}
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>

            {/* Video Link */}
            <View className="mt-6">
              <Text className="text-lg font-bold mb-3">Video Link *</Text>
              <View className="bg-white border border-gray-200 rounded-xl px-4 py-3">
                <TextInput
                  className="text-base"
                  placeholder="Paste a link to the apartment video..."
                  placeholderTextColor="#9CA3AF"
                  value={videoLink}
                  onChangeText={setVideoLink}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>)
          }

          {
            category === 'roommates' && (
              <View>
                {/* Name */}
                <View>
                  <Text className="text-lg font-bold mb-3">Name *</Text>
                  <View className="bg-white border border-gray-200 rounded-xl mb-6 px-4 py-3">
                  <TextInput
                    className="text-base"
                    placeholder="Enter you name"
                    placeholderTextColor="#9CA3AF"
                    value={name}
                    onChangeText={setName}
                  />
                  </View>
                </View>

                {/* Gender */}
                <View className='mb-6'>
                  <Text className="text-lg font-bold mb-3">Gender *</Text>
                  <View>
                    {/* Selection Button */}
                    <TouchableOpacity
                      onPress={() => setIsGenderModalVisible(true)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-4 flex-row items-center justify-between"
                      activeOpacity={0.7}
                    >
                      <Text className={gender ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedGender}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
              
                    {/* Modal with Options */}
                    <Modal
                      visible={isGenderModalVisible}
                      transparent
                      animationType="slide"
                      onRequestClose={() => setIsGenderModalVisible(false)}
                    >
                      <View className="flex-1 justify-end bg-black/50 pb-1">
                        <View className="bg-white rounded-t-3xl max-h-[70%]">
                          {/* Header */}
                          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                            <Text className="text-lg font-bold">Select Gender</Text>
                            <TouchableOpacity onPress={() => setIsGenderModalVisible(false)}>
                              <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                          </View>
              
                          {/* Options List */}
                          <ScrollView className="px-4">
                            {genderOptions.map((option) => (
                              <TouchableOpacity
                                key={option.id}
                                onPress={() =>{
                                   setGender(option.value);
                                   setIsGenderModalVisible(false)
                                }}
                                className={`py-4 border-b border-gray-100 flex-row items-center justify-between ${
                                  gender === option.value ? 'bg-secondary/5' : ''
                                }`}
                                activeOpacity={0.7}
                              >
                                <Text
                                  className={`text-base ${
                                    gender === option.value
                                      ? 'text-secondary font-semibold'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  {option.label}
                                </Text>
                                {gender === option.value && (
                                  <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                                )}
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </View>

                {/* Level */}
                <View className='mb-6'>
                  <Text className="text-lg font-bold mb-3">Level *</Text>
                  <View>
                    {/* Selection Button */}
                    <TouchableOpacity
                      onPress={() => setIsLevelModalVisible(true)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-4 flex-row items-center justify-between"
                      activeOpacity={0.7}
                    >
                      <Text className={level ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedLevel}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
              
                    {/* Modal with Options */}
                    <Modal
                      visible={isLevelModalVisible}
                      transparent
                      animationType="slide"
                      onRequestClose={() => setIsLevelModalVisible(false)}
                    >
                      <View className="flex-1 justify-end bg-black/50 pb-1">
                        <View className="bg-white rounded-t-3xl max-h-[70%]">
                          {/* Header */}
                          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                            <Text className="text-lg font-bold">Select Level</Text>
                            <TouchableOpacity onPress={() => setIsLevelModalVisible(false)}>
                              <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                          </View>
              
                          {/* Options List */}
                          <ScrollView className="px-4">
                            {levelOptions.map((option) => (
                              <TouchableOpacity
                                key={option.id}
                                onPress={() => {
                                  setLevel(option.value);
                                  setIsLevelModalVisible(false)
                                }}
                                className={`py-4 border-b border-gray-100 flex-row items-center justify-between ${
                                  level === option.value ? 'bg-secondary/5' : ''
                                }`}
                                activeOpacity={0.7}
                              >
                                <Text
                                  className={`text-base ${
                                    level === option.value
                                      ? 'text-secondary font-semibold'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  {option.label}
                                </Text>
                                {level === option.value && (
                                  <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                                )}
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </View>
              </View>
            )
          }

           {
            category === 'services' && (
              <View className='mb-6'>
                {/* Service */}
                  <Text className="text-lg font-bold mb-3">Service Type *</Text>
                  <View>
                    {/* Selection Button */}
                    <TouchableOpacity
                      onPress={() => setIsServiceModalVisible(true)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-4 flex-row items-center justify-between"
                      activeOpacity={0.7}
                    >
                      <Text className={service ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedService}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
              
                    {/* Modal with Options */}
                    <Modal
                      visible={isServiceModalVisible}
                      transparent
                      animationType="slide"
                      onRequestClose={() => setIsServiceModalVisible(false)}
                    >
                      <View className="flex-1 justify-end bg-black/50 pb-1">
                        <View className="bg-white rounded-t-3xl max-h-[70%]">
                          {/* Header */}
                          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                            <Text className="text-lg font-bold">Select Level</Text>
                            <TouchableOpacity onPress={() => setIsServiceModalVisible(false)}>
                              <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                          </View>
              
                          {/* Options List */}
                          <ScrollView className="px-4">
                            {serviceOptions.map((option) => (
                              <TouchableOpacity
                                key={option.id}
                                onPress={() => {
                                  setService(option.value);
                                  setIsServiceModalVisible(false)
                                }}
                                className={`py-4 border-b border-gray-100 flex-row items-center justify-between ${
                                  level === option.value ? 'bg-secondary/5' : ''
                                }`}
                                activeOpacity={0.7}
                              >
                                <Text
                                  className={`text-base ${
                                    service === option.value
                                      ? 'text-secondary font-semibold'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  {option.label}
                                </Text>
                                {service === option.value && (
                                  <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                                )}
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                      </View>
                    </Modal>
                  </View>
              </View>
            )
          }

          {
            category === 'marketplace' && (
              <View>
                {/* Property Type Selection */}
                <Text className="text-lg font-bold mb-3">Property Type *</Text>
                <View className="mb-6">
                  {/* Selection Button for Property Type */}
                  <TouchableOpacity
                    onPress={() => setIsPropertyTypeModalVisible(true)}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-4 flex-row items-center justify-between"
                    activeOpacity={0.7}
                  >
                    <Text className={selectedPropertyType ? 'text-gray-900' : 'text-gray-400'}>
                      {selectedPropertyType || 'Select property type'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
            
                  {/* Modal for Property Type */}
                  <Modal
                    visible={isPropertyTypeModalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setIsPropertyTypeModalVisible(false)}
                  >
                    <View className="flex-1 justify-end bg-black/50 pb-1">
                      <View className="bg-white rounded-t-3xl max-h-[70%]">
                        {/* Header */}
                        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                          <Text className="text-lg font-bold">Select Property Type</Text>
                          <TouchableOpacity onPress={() => setIsPropertyTypeModalVisible(false)}>
                            <Ionicons name="close" size={24} color="#000" />
                          </TouchableOpacity>
                        </View>
            
                        {/* Options List */}
                        <ScrollView className="px-4">
                          {uniquePropertyTypes.map((type) => (
                            <TouchableOpacity
                              key={type}
                              onPress={() => handlePropertyTypeSelect(type)}
                              className={`py-4 border-b border-gray-100 flex-row items-center justify-between ${
                                selectedPropertyType === type ? 'bg-secondary/5' : ''
                              }`}
                              activeOpacity={0.7}
                            >
                              <Text
                                className={`text-base ${
                                  selectedPropertyType === type
                                    ? 'text-secondary font-semibold'
                                    : 'text-gray-700'
                                }`}
                              >
                                {type}
                              </Text>
                              {selectedPropertyType === type && (
                                <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                              )}
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>
                </View>

                {/* Property Item Selection - Only show if property type is selected */}
                {selectedPropertyType && (
                  <View className="mb-6">
                    <Text className="text-lg font-bold mb-3">Item *</Text>
                    <TouchableOpacity
                      onPress={() => setIsPropertyItemModalVisible(true)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-4 flex-row items-center justify-between"
                      activeOpacity={0.7}
                    >
                      <Text className={selectedPropertyItem ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedPropertyItem || 'Select item'}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    {/* Modal for Property Item */}
                    <Modal
                      visible={isPropertyItemModalVisible}
                      transparent
                      animationType="slide"
                      onRequestClose={() => setIsPropertyItemModalVisible(false)}
                    >
                      <View className="flex-1 justify-end bg-black/50 pb-1">
                        <View className="bg-white rounded-t-3xl max-h-[70%]">
                          {/* Header */}
                          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                            <Text className="text-lg font-bold">Select Item</Text>
                            <TouchableOpacity onPress={() => setIsPropertyItemModalVisible(false)}>
                              <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                          </View>

                          {/* Options List */}
                          <ScrollView className="px-4">
                            {filteredPropertyItems.map((item, index) => (
                              <TouchableOpacity
                                key={`${item}-${index}`}
                                onPress={() => handlePropertyItemSelect(item)}
                                className={`py-4 border-b border-gray-100 flex-row items-center justify-between ${
                                  selectedPropertyItem === item ? 'bg-secondary/5' : ''
                                }`}
                                activeOpacity={0.7}
                              >
                                <Text
                                  className={`text-base ${
                                    selectedPropertyItem === item
                                      ? 'text-secondary font-semibold'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  {item}
                                </Text>
                                {selectedPropertyItem === item && (
                                  <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                                )}
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                      </View>
                    </Modal>
                  </View>
                )}
              </View>
            )
          }
           

          {/* Price */}
          {
            (category === 'accommodation' || category === 'marketplace') && <View>
            <Text className="text-lg font-bold mb-3">Price *</Text>
            <View className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center mb-6">
              <Text className="text-gray-500 text-lg mr-2">₦</Text>
              <TextInput
                className="text-base flex-1"
                placeholder="e.g., 150000"
                placeholderTextColor="#9CA3AF"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>
          </View>
          }
          
          {/* Contact Information */}          
            <View className="mb-6">
              <Text className="text-lg font-bold mb-3">Phone Number *</Text>
              <View className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                <Feather name="phone" size={20} color="#9CA3AF" />
                <TextInput
                  className="text-base ml-3 flex-1"
                  placeholder="08012345678"
                  placeholderTextColor="#9CA3AF"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

          {/* Campus */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-3">Campus *</Text>
            <View className="gap-2">
              {campusLocations.map((loc: any) => (
                <TouchableOpacity
                  key={loc}
                  onPress={() => setCampus(loc)}
                  className={`bg-white border rounded-xl px-4 py-3 flex-row items-center justify-between ${
                    campus === loc ? 'border-secondary' : 'border-gray-200'
                  }`}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center">
                    <Ionicons 
                      name="location-outline" 
                      size={20} 
                      color={campus === loc ? '#4F46E5' : '#9CA3AF'} 
                    />
                    <Text 
                      className={`ml-3 ${
                        campus === loc ? 'text-secondary font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {loc}
                    </Text>
                  </View>
                  {campus === loc && (
                    <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          
          {/* Images */}
          {/* <View className="mb-6">
            <Text className="text-lg font-bold mb-3">Photos (Optional)</Text>
            <TouchableOpacity
              onPress={handleImagePicker}
              className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 items-center"
              activeOpacity={0.7}
            >
              <Ionicons name="images-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 mt-3 font-semibold">Add Photos</Text>
              <Text className="text-gray-400 text-sm mt-1">Up to 5 images</Text>
            </TouchableOpacity>
          </View> */}

          {/* Description */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-3">Description *</Text>
            <View className="bg-white border border-gray-200 rounded-xl px-4 py-3">
              <TextInput
                className="text-base"
                placeholder="Describe your listing in detail..."
                placeholderTextColor="#9CA3AF"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          

          {/* Terms */}
          <View className="bg-blue-50 rounded-xl p-4 mb-6 flex-row">
            <Ionicons name="information-circle" size={20} color="#3B82F6" />
            <Text className="text-blue-800 text-sm ml-2 flex-1">
              By posting, you agree to our terms of service. All listings are subject to review.
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-secondary rounded-2xl p-4 shadow-md mb-8"
            activeOpacity={0.8}
          >
            <Text className="text-white text-center text-lg font-bold">
              Post Listing
            </Text>
          </TouchableOpacity>
                </>
            ) :
            (
                <View className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6 mb-6 items-center">
              <View className="bg-secondary/10 w-16 h-16 rounded-full items-center justify-center mb-4">
                <Ionicons name="arrow-up" size={32} color="#4F46E5" />
              </View>
              <Text className="text-secondary font-bold text-lg mb-2">Choose a Category</Text>
              <Text className="text-gray-600 text-center text-sm">
                Select a category above to start creating your listing
              </Text>
            </View>
            )
          }
          
        </View>
      </ScrollView>
    </View>
    </KeyboardAvoidingView>
    
  );
}