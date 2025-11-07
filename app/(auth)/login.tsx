import BlurBackground from '@/components/ui/BlurBackground';
import { useAuth } from '@/context/AuhContext';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import { CommonActions } from '@react-navigation/native';
import { Link, useNavigation } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const navigation = useNavigation();
    const {login, isLoading} = useAuth();


    const handleLogin = async () => {
        if(!email || !password){
            Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
        }
       try {
        const res = await login(email, password)
        if(res?.ok){
            navigation.dispatch(
            CommonActions.reset({
            index: 0,
            routes: [{ name: '(tabs)' }],
            })
            );
        }
       
        } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Could not connect to the server');
       }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return(
        <View className="flex-1 p-4 bg-white">

            {/* Background gradient */}
           <BlurBackground />
            {/* Blur Ends */}

            {/* <BackButton /> */}
            <View className="mt-28">
                <Text className="text-4xl text-center font-bold mb-3">Welcome Back</Text>
                <Text className="text-center">Login to continue with your campus journey</Text>
            </View>

            <View  className='mt-14 gap-5'>
                <View className='border border-secondary flex-row items-center gap-3 rounded-xl px-4'>
                    <Fontisto name="email" size={20} color="black" />
                    <TextInput className=" text-[16px]  py-5 flex-1"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        placeholderTextColor={'grey'}
                        keyboardType='email-address'
                    />
                </View>

                <View className='border border-secondary flex-row items-center gap-3 rounded-xl  px-4'>
                    <Feather name="lock" size={20} color="black" />
                    <TextInput className=" text-[16px] py-5 flex-1"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your Password"
                        placeholderTextColor={'grey'}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={handleShowPassword} activeOpacity={1} >
                        {!showPassword ? (
                        <Feather name="eye" size={24} color="black" />
                        ) : (
                        <Feather name="eye-off" size={18} color="black" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity className='border mt-6 bg-secondary p-3 rounded-2xl'
            activeOpacity={0.8}
            onPress={handleLogin}
            >
                <Text className='text-white text-center text-[18px] font-semibold'>{isLoading ? 'Logging in...' :'Login'}</Text>
            </TouchableOpacity>

            <Text className='mt-6 text-center text-lg text-lightGray2'>Don't have an account? <Link href={'/(auth)/register' as any}>
            <Text className='text-secondary font-semibold'>Sign up</Text>
            </Link></Text>
            <Text className='text-secondaryLight text-center mt-2 font-semibold'>Forgot Password</Text>
        </View>
    )
}