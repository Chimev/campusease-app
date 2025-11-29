import { useAuth } from '@/context/AuhContext';
import { updateProfile } from '@/helpers/updateProfile';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type School = {
  school?: string
}

export default function EditProfileScreen() {
  // User data - would come from auth context
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolInput, setSchoolInput] = useState('');
  const [dropDown, setDropDown] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const {user, schools} = useAuth()

  const filteredSchools = schools.filter(((school: School) => school.school && school.school.toLowerCase().includes(schoolInput.toLowerCase())))

  

  //   const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400');

  

  useEffect(() => {
    if(user){
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setSchoolInput(user.school || '');
    }
  }, [user])

  // const handleImagePicker = () => {
  //   Alert.alert('Change Photo', 'Photo picker would open here');
  // };

  const handleSelectedSchhol = (schoolName: string) => {
    setSchoolInput(schoolName);
    setDropDown(false); 
  }

  const handleSave = async () => {
    if (!name || !phone || !schoolInput) {
      Alert.alert('Missing Fields', 'Please fill in all required fields');
      return;
    }

    // Validate phone number
    if (phone.length < 11) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number');
      return;
    }

    setIsSaving(true);

    const formData = {
      name, phone, email, school: schoolInput
    }

    try {
      const response = await updateProfile(user?.email, formData)

      console.log( response.res)
      if(response.res?.status === 400){
        Alert.alert("Name already exist")
      }
      if(response.res?.status === 200){
        router.replace('/(auth)/login')
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }finally{
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 bg-gray-50">
        {/* Header */}
        <View className="bg-secondary pt-12 pb-2 px-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity className="p-2 -ml-2" activeOpacity={0.7} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">Edit Profile</Text>
            <View className="w-8" />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Avatar Section */}
          {/* <View className="items-center py-8 bg-white border-b border-gray-100">
            <View className="relative">
              <Image 
                source={{ uri: avatar }}
                className="w-28 h-28 rounded-full"
              />
              <TouchableOpacity 
                onPress={handleImagePicker}
                className="absolute bottom-0 right-0 bg-secondary rounded-full p-3 shadow-lg"
                activeOpacity={0.7}
              >
                <Feather name="camera" size={18} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-gray-500 text-sm mt-3">Tap to change photo</Text>
          </View> */}

          <View className="px-4 py-6">
            {/* Name Field */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">Full Name *</Text>
              <View className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                <Ionicons name="person-outline" size={20} color="#9CA3AF" />
                <TextInput
                  className="text-base ml-3 flex-1"
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Email Field (Read-only) */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">Email Address</Text>
              <View className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                <TextInput
                  className="text-base ml-3 flex-1 text-gray-500"
                  value={email}
                  editable={false}
                />
                <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
              </View>
              <Text className="text-gray-400 text-xs mt-2">
                Email cannot be changed for security reasons
              </Text>
            </View>

            {/* Phone Field */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">Phone Number *</Text>
              <View className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                <Feather name="phone" size={20} color="#9CA3AF" />
                <TextInput
                  className="text-base ml-3 flex-1"
                  placeholder="08012345678"
                  placeholderTextColor="#9CA3AF"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  maxLength={11}
                />
              </View>
            </View>

            {/* School Field */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">School *</Text>
                <View className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                  <Ionicons name="school-outline" size={20} color="#9CA3AF" />
                  <TextInput
                  className="text-base ml-3 flex-1"
                  placeholder="Type School"
                  placeholderTextColor="#9CA3AF"
                  value={schoolInput}
                  onChangeText={(text) => {
                    setSchoolInput(text)
                    if(!text.trim()){
                      setDropDown(false);
                    }else (
                      setDropDown(true)
                    )
                  }}
                  maxLength={11}
                />
                </View>
            </View>

            {dropDown && (
              <View>
                 {filteredSchools.length > 0 && filteredSchools.map((school: School) => (
                    <Pressable key={school.school} 
                    onPress={() => handleSelectedSchhol(school.school!)}
                    >
                      <Text className="text-[16px] border-b border-b-gray-100 p-2">{school.school}</Text>
                    </Pressable>
                  ))}
              </View>
            )}




            {/* Account Info */}
            <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#3B82F6" />
                <View className="flex-1 ml-3">
                  <Text className="text-blue-900 font-semibold mb-1">Account Information</Text>
                  <Text className="text-blue-800 text-sm">
                    Your profile information helps other students connect with you. Keep it accurate and up to date.
                  </Text>
                </View>
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              onPress={handleSave}
              disabled={isSaving}
              className={`rounded-2xl p-4 shadow-md mb-4 ${
                isSaving ? 'bg-secondary/50' : 'bg-secondary'
              }`}
              activeOpacity={0.8}
            >
              <Text className="text-white text-center text-lg font-bold">
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              className="bg-gray-100 rounded-2xl p-4"
              activeOpacity={0.7}
            >
              <Text className="text-gray-700 text-center text-base font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}