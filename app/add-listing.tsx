import { categories } from '@/constant/categories';
import { useAuth } from '@/context/AuhContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
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


const AccommodationOptions = [
    { id: '1', label: '4 Bedroom', value: '4 Bedroom' },
    { id: '2', label: '3 Bedroom', value: '3 Bedroom' },
    { id: '3', label: '2 Bedroom', value: '2 Bedroom' },
    { id: '4', label: '1 Bedroom', value: '1 Bedroom' },
    { id: '5', label: '6 Man Room', value: '6 Man Room' },
    { id: '6', label: '5 Man Room', value: '5 Man Room' },
    { id: '7', label: '4 Man Room', value: '4 Man Room' },
    { id: '8', label: '3 Man Room', value: '3 Man Room' },
    { id: '9', label: '2 Man Room', value: '2 Man Room' },
    { id: '10', label: 'Single Room', value: 'Single Room' },
    { id: '11', label: 'Selfcon', value: 'Selfcon' },
  ];

const genderOptions = [
  { id: '1', label: 'Male', value: 'male' },
  { id: '2', label: '4 Female', value: 'female' }
]

const levelOptions = [
  { id: '1', label: 'Level 1', value: 'level 1' },
  { id: '2', label: 'Level 2', value: 'level 2' },
  { id: '3', label: 'Level 3', value: 'level 3' },
  { id: '4', label: 'Level 4', value: 'level 4' },
  { id: '5', label: 'Level 5', value: 'level 5' },
  { id: '6', label: 'Level 6', value: 'level 6' }
]

const serviceOptions = [
  { id: '1', label: 'Laundry Service', value: 'Laundry Service' },
  { id: '2', label: 'Academic Assistance', value: 'Academic Assistance' },
  { id: '3', label: 'Barber', value: 'Barber' },
  { id: '4', label: 'Painter', value: 'Painter' },
  { id: '5', label: 'Electrician', value: 'Baker' },
  { id: '6', label: 'Baker', value: 'Baker' }
]

export default function AddListingScreen() {
  const [category, setCategory] = useState('');

 // Accommodations
  const [isAccommodationModalVisible, setIsAccommodationModalVisible] = useState(false);
  const [title, setTitle] = useState('');
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
  
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [campus, setCampus] = useState('');
  const [contactPhone, setContactPhone] = useState('');
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

  const handleImagePicker = () => {
    // This would integrate with expo-image-picker
    Alert.alert('Image Picker', 'Image picker would open here');
  };

  const handleSubmit = () => {
    if (!category || !title || !description || !price || !campus) {
      Alert.alert('Missing Fields', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert('Success', 'Your listing has been posted!');
    // Here you would send the data to your backend
  };


  const selectedLabel = AccommodationOptions.find(opt => opt.value === accommodationType)?.label || 'Select an option';

  const selectedGender = genderOptions.find(opt => opt.value === gender)?.label || 'Select an option';

  const selectedLevel = levelOptions.find(opt => opt.value === level)?.label || 'Select an option';

  const selectedService = serviceOptions.find(opt => opt.value === service)?.label || 'Select an option';

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

          {/* fORM */}
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
                value={title}
                onChangeText={setTitle}
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
            category === 'roommate' && (
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
                      <Text className={level ? 'text-gray-900' : 'text-gray-400'}>
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
                  value={contactPhone}
                  onChangeText={setContactPhone}
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