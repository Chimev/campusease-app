import StepOne from "@/components/screens/auth/StepOne";
import StepTwo from "@/components/screens/auth/StepTwo";
import BlurBackground from "@/components/ui/BlurBackground";
import { getSchools } from "@/helpers/getSchools";
import { registerApi } from "@/helpers/register";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from "react-native";



export default function Register() {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolInput, setSchoolInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<string[]>([]);

  const [fetchedSchools, setFetchedSchools] = useState([])

  useEffect(() => {
    const searchSchools = async () => {
        try {
            const data =await getSchools();
            setFetchedSchools(data);
        } catch (error) {
            console.error('Error fetching schools', error)
        }
    }
    
    searchSchools();
  }, [])
  

  const handleNext = () => {

     // Basic validation for empty fields
    if (!name.trim() || !phone.trim() || !email.trim() || !password.trim() || !schoolInput.trim()) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields before continuing.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

      // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.", [{ text: "OK" }]);
      return;
    }


    const isValidSchool = fetchedSchools.some(
      (school: any) =>
        school.school?.toLowerCase() === schoolInput.trim().toLowerCase()
    );

    if (!isValidSchool) {
      Alert.alert(
        "Invalid School", // Title
        "Please select a valid school from the list.", // Message
        [
          {
            text: "OK",
            style: "default",
          },
        ],
        { cancelable: true } 
      );
      return;
    }
    setStep(2);
  };


  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  const handleRegister = async () => {
    // console.log({ name, phone, email, password, schoolInput, role });

    if(role.length === 0){
      Alert.alert(
        'Invalid Role',
        'PLease select atleast one role',
        [
          {
            text: 'Ok',
            style: 'default'
          }
        ],
        {cancelable: true}
      )
    }

    try {
      const response = await registerApi(name, phone, email, password, schoolInput, role);


      if(response.res?.status === 400){
        console.log("This email is already registered")
      }
      if(response.res?.status === 200){
        router.replace('/(auth)/login')
      }
    } catch (error) {
      
    }
    
  };

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    className="flex-1">
    <ScrollView className="flex-1 px-4 pt-4 py-20 bg-white">
      <BlurBackground />
      {/* <BackButton /> */}

      <View className="mt-28 mb-10">
        <Text className="text-4xl text-center font-bold mb-3">
          Join CampusEase
        </Text>
        <Text className="text-center text-gray-600">
          {step === 1
            ? "Create your account and start your campus journey"
            : "Almost there! Choose your role to finish registration"}
        </Text>
      </View>

      

      {step === 1 ? (
        <StepOne
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          schoolInput={schoolInput}
          setSchoolInput={setSchoolInput}
          fetchedSchools={fetchedSchools}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onNext={handleNext}
        />
      ) : (
        <StepTwo
          role={role}
          setRole={setRole}
          onBack={handleBack}
          onRegister={handleRegister}
        />
      )}
    </ScrollView>
        </KeyboardAvoidingView>

  );
}
