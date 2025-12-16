import { categories } from '@/constant/categories';
import { AccommodationOptions, genderOptions, levelOptions, propertyTypes, serviceOptions } from '@/constant/categoryOptions';
import { useAuth } from '@/context/AuhContext';
import { useListing } from '@/context/ListingContext';
import { addListing } from '@/helpers/addListing';
import { deleteUploadedImage } from '@/helpers/deleteUploadedImage ';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from "expo-image-picker";
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


export default function AddListingScreen() {
  const [category, setCategory] = useState('');
  const [Loading, setLoading] = useState(false)
  const {refetchMyListings, refetchListings, refetchRecentListings} = useListing()

 // Accommodations
  const [isAccommodationModalVisible, setIsAccommodationModalVisible] = useState(false);
  const [accommodationTitle, setAccommodationTitle] = useState('');
  const [accommodationType, SetAccommodationType] = useState('')

  //Roommates
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isLevelModalVisible, setIsLevelModalVisible] = useState(false);
  const [roommateName, setRoommateName] = useState('')
  const [gender, setGender] = useState('')
  const [level, setLevel] = useState('')

  //Services
  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false)
  const [service, setService] = useState('')
  
  // Marketplace - Added states for property type and specific item
  const [isPropertyTypeModalVisible, setIsPropertyTypeModalVisible] = useState(false);
  const [isPropertyItemModalVisible, setIsPropertyItemModalVisible] = useState(false);
  const [propertyType, setPropertyType] = useState('');
  const [property, setProperty] = useState('');
  
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [campus, setCampus] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImages] = useState<string[]>([]);
  const [videoLink, setVideoLink] = useState('')

 const { user, schools } = useAuth();

  const handleSubmit = async() => {
    setLoading(true)
    if (!category || !description || !campus) {
      Alert.alert('Missing Fields', 'Please fill in all required fields');
      return;
    }

    let uploadedImages: Array<{ url: string; publicId: string }> = [];

    try {
      //Uplaod Images
      const uploadImagesArray = async (imageUris:string[]) => {
          const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
          const uploadPreset = process.env.EXPO_PUBLIC_UPLOAD_PRESET;

          if (!cloudName || !uploadPreset) {
              throw new Error("Cloudinary environment variables are missing.");
          }

          const uploads = imageUris.map(async (uri) => {
              const formData = new FormData();
              // We append an object with uri, type, and name properties
              formData.append("file", {
                  uri: uri,
                  type: 'image/jpeg', // Use image/jpeg as a default or infer dynamically
                  name: uri.split('/').pop() || 'upload.jpg', // Extract file name
              } as any);
              formData.append("upload_preset", uploadPreset!);

              const res = await fetch(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              { method: "POST", body: formData }
              );

              const data = await res.json();
              if (!res.ok) {
                  throw new Error(data.error?.message || 'Cloudinary upload failed');
              }
              return {
              url: data.secure_url,
              publicId: data.public_id,
              };
          });

          return await Promise.all(uploads);
      };

      uploadedImages = await uploadImagesArray(image);

      
     const res =  await addListing({
        email: user?.email,
        institution: user?.school,
        type: schoolType,
        category,
        description,
        campus,
        phone,
        image: uploadedImages, // Will be empty for now as per your request
        name: user?.name,
        accommodationTitle,
        videoLink,
        accommodationType,
        service,
        propertyType,
        property,
        roommateName,
        level,
        gender,
        price,
      })

      if(res.res?.ok){
        await Promise.all([
        refetchMyListings(),
        refetchListings(),
        refetchRecentListings()
        ])
        router.replace('/(listings)/my-listings')
      }

    } catch (error) {
       console.error("Error during listing:", error);
       Alert.alert('This didnt go through')

        // Delete uploaded images if listing fails
        if (uploadedImages && uploadedImages.length > 0) {
            for (const img of uploadedImages) {
                try {
                    await deleteUploadedImage(img.publicId); // <-- call your helper
                } catch (err) {
                    console.error("Failed to delete image:", img.publicId, err);
                }
            }
        }

        if (error instanceof Error) {
            Alert.alert(error.message || "Error during listing.");
        } else {
            Alert.alert("Error during listing.");
        }
    }finally{
      setLoading(false)
    }
  };

 const handleSelect = (value: string) => {
    SetAccommodationType(value);
    setIsAccommodationModalVisible(false);
  };

  // Handler for selecting property type in marketplace
  const handlePropertyTypeSelect = (type: string) => {
    setPropertyType(type);
    setProperty(''); // Reset item when type changes
    setIsPropertyTypeModalVisible(false);
  };

  // Handler for selecting property item in marketplace
  const handlePropertyItemSelect = (item: string) => {
    setProperty(item);
    setIsPropertyItemModalVisible(false);
  };

  // image function
  const handleImagePicker = async() => {
    const MIN_IMAGES = 3;
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true,
      mediaTypes: 'images',
      selectionLimit: 0,
    })
    if(!result.canceled && result.assets){
      const selectedAssets = result.assets;

      if (selectedAssets.length < MIN_IMAGES) {
        Alert.alert("Selection Error", `Please select at least ${MIN_IMAGES} images.`);
        return; 
      }

      const uriImages = selectedAssets.map(asset => asset.uri);
      setImages(uriImages)
    }else{
      console.log('this was cancelled')
    }
  };

 const campusLocations = user?.school 
  ? schools.find((s: any) => s.school === user.school)?.campuses || []
  : [];

  const schoolType = schools.find((sch: any) => sch.school === user?.school).type

 

  // Get unique property types from propertyTypes array
  const uniquePropertyTypes = [...new Set(propertyTypes.map(p => p.propertyType))];

  // Filter property items based on selected property type
  const filteredPropertyItems = propertyTypes
    .filter(p => p.propertyType === propertyType)
    .map(p => p.item);


  const selectedLabel = AccommodationOptions.find(opt => opt.value === accommodationType)?.label || 'Select an option';

  const selectedGender = genderOptions.find(opt => opt.value === gender)?.label || 'Select an option';

  const selectedLevel = levelOptions.find(opt => opt.value === level)?.label || 'Select an option';

  const selectedService = serviceOptions.find(opt => opt.value === service)?.label || 'Select an option';


    // Function to handle image removal
  const removeImage = useCallback((uriToRemove: string) => {
    setImages(prev => prev.filter(uri => uri !== uriToRemove));
  }, []);

 
  // Custom component to render each individual image with a remove button
  const ImagePreview = React.memo(({ uri, onRemove }: any) => (
    // Use className for styling the container, image, and button
    <View className="relative">
      <Image source={{ uri }} style={{ width: 60, height: 60, marginHorizontal:5 }} />

      {/* TouchableOpacity wraps the removal button */}
      <TouchableOpacity 
        className="absolute top-0 right-0 bg-red-600 rounded-full w-6 h-6 justify-center items-center" 
        onPress={() => onRemove(uri)}
      >
        <Text className="text-white font-bold text-base">✕</Text>
      </TouchableOpacity>
    </View>
  ));

  // Memoized renderItem for FlatList
const renderImageItem = useCallback(
  ({ item }: { item: string }) => <ImagePreview uri={item} onRemove={removeImage} />,
  [removeImage]
);

const FullScreenSpinner = () => (
  <View className="absolute inset-0 bg-black/60 flex justify-center items-center z-50">
    <ActivityIndicator size="large" color="#00ffe1" />
    <Text className="mt-3 text-[#00ffe1] text-xl font-semibold">
      Processing…
    </Text>
    <Text className="text-white/70 text-sm mt-1">
      Please wait while we prepare your listing
    </Text>
  </View>

);


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
              <Text className="text-white text-xl font-bold">Add Listing</Text>
              <View className="w-8" />
            </View>
          </View>

            {/* FORM */}
          <View className="px-4 py-6">
            {/* Category Selection */}
            <View className="mb-6">
              <Text className="text-lg font-bold mb-3">Category *</Text>
              <View className="flex-row flex-wrap gap-3">
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setCategory(cat.id)}
                    className={`flex-1 min-w-[45%] rounded-xl p-4 border-2 ${
                      category === cat.id ? 'border-secondary bg-secondary/5' : 'border-gray-200 bg-white'
                    }`}
                    activeOpacity={0.7}
                  >
                    <View className="flex-row items-center">
                      <Ionicons 
                        name={cat.icon as any} 
                        size={20} 
                        color={category === cat.id ? cat.color : '#9CA3AF'} 
                      />
                      <Text 
                        className={`ml-2 font-semibold ${
                          category === cat.id ? 'text-secondary' : 'text-gray-600'
                        }`}
                      >
                        {cat.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {
              category 
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
                  value={accommodationTitle}
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
                        <Text className="text-lg font-bold">Select Accommodation Type</Text>
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
                <Text className="text-lg font-bold mb-3">Video Link (Optional)</Text>
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
                      placeholder="Enter your name"
                      placeholderTextColor="#9CA3AF"
                      value={roommateName}
                      onChangeText={setRoommateName}
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
                              <Text className="text-lg font-bold">Select Service</Text>
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
                                    service === option.value ? 'bg-secondary/5' : ''
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
                      <Text className={propertyType ? 'text-gray-900' : 'text-gray-400'}>
                        {propertyType || 'Select property type'}
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
                                  propertyType === type ? 'bg-secondary/5' : ''
                                }`}
                                activeOpacity={0.7}
                              >
                                <Text
                                  className={`text-base ${
                                    propertyType === type
                                      ? 'text-secondary font-semibold'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  {type}
                                </Text>
                                {propertyType === type && (
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
                  {propertyType && (
                    <View className="mb-6">
                      <Text className="text-lg font-bold mb-3">Item *</Text>
                      <TouchableOpacity
                        onPress={() => setIsPropertyItemModalVisible(true)}
                        className="bg-white border border-gray-200 rounded-xl px-4 py-4 flex-row items-center justify-between"
                        activeOpacity={0.7}
                      >
                        <Text className={property ? 'text-gray-900' : 'text-gray-400'}>
                          {property || 'Select item'}
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
                                    property === item ? 'bg-secondary/5' : ''
                                  }`}
                                  activeOpacity={0.7}
                                >
                                  <Text
                                    className={`text-base ${
                                      property === item
                                        ? 'text-secondary font-semibold'
                                        : 'text-gray-700'
                                    }`}
                                  >
                                    {item}
                                  </Text>
                                  {property === item && (
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


            {/* Price - Show for accommodation and marketplace */}
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
        <View className="mb-6">
          
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
          <FlatList
            data={image}
            keyExtractor={(item) => item}
            renderItem={renderImageItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 20 }}
            extraData={image} 
          />
        </View>
      

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
            {Loading ? 'Loading...' : 'Post Listing' }
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

        {Loading && <FullScreenSpinner />}
      </View>
</KeyboardAvoidingView>
  ) }

          