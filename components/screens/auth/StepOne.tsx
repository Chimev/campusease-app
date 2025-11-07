import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";


type School = {
  school?: string
}

export default function StepOne({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword,
  schoolInput,
  setSchoolInput,
  fetchedSchools,
  showPassword,
  setShowPassword,
  onNext,
}: any) {

  const [dropDown, setDropDown] = useState(false)

  const togglePassword = () => setShowPassword(!showPassword);

 const filteredSchools = fetchedSchools.filter(
    (school: School) =>
      school.school &&
      school.school.toLowerCase().includes(schoolInput.toLowerCase())
  );

  const handleSelectedSchhol = (schoolName: string) => {
    setSchoolInput(schoolName);
    setDropDown(false); 
  }

  return (
    
      <View className="gap-5">
      {/* Name */}
      <View className="border border-secondary flex-row items-center gap-3 rounded-xl px-4">
        <Feather name="user" size={20} color="black" />
        <TextInput
          className="text-[16px] py-5 flex-1"
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          placeholderTextColor={"grey"}
        />
      </View>

      {/* Phone */}
      <View className="border border-secondary flex-row items-center gap-3 rounded-xl px-4">
        <Feather name="phone" size={20} color="black" />
        <TextInput
          className="text-[16px] py-5 flex-1"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          placeholderTextColor={"grey"}
          keyboardType="phone-pad"
        />
      </View>

      {/* Email */}
      <View className="border border-secondary flex-row items-center gap-3 rounded-xl px-4">
        <Fontisto name="email" size={20} color="black" />
        <TextInput
          className="text-[16px] py-5 flex-1"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor={"grey"}
          keyboardType="email-address"
        />
      </View>

      {/* Password */}
      <View className="border border-secondary flex-row items-center gap-3 rounded-xl px-4">
        <Feather name="lock" size={20} color="black" />
        <TextInput
          className="text-[16px] py-5 flex-1"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor={"grey"}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePassword} activeOpacity={1}>
          {!showPassword ? (
            <Feather name="eye" size={22} color="black" />
          ) : (
            <Feather name="eye-off" size={22} color="black" />
          )}
        </TouchableOpacity>
      </View>

      {/* School */}
      <View className="border border-secondary flex-row items-center gap-3 rounded-xl px-4">
        <Ionicons name="school-outline" size={22} color="black" />
        <TextInput
          className="text-[16px] py-5 flex-1"
          value={schoolInput}
          onChangeText={(text) => {
            setSchoolInput(text);
            if (!text.trim()) {
              setDropDown(false);
            }else {
              setDropDown(true);
            }
            
          }}
          placeholder="Enter your school"
          placeholderTextColor={"grey"}
        />
        
      </View>

      {/* DropDown */}
      {
        dropDown &&(
        <View  className="border -mt-3">
        {filteredSchools.length > 0 && filteredSchools.map((school: School) => (
          <Pressable key={school.school} 
          onPress={() => handleSelectedSchhol(school.school!)}
          >
            <Text className="text-[16px] bg-red-400 p-2">{school.school}</Text>
          </Pressable>
        ))}
        </View>
        )
        
      }
     
     

      <TouchableOpacity
        className="border bg-secondary p-3 rounded-2xl"
        activeOpacity={0.8}
        onPress={onNext}
      >
        <Text className="text-white text-center text-[18px] font-semibold">
          Next
        </Text>
      </TouchableOpacity>
      </View>    
  );
}