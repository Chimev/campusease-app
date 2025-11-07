import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Onboarding() {
    useEffect(() => {
        const check = async() => {
            const value = await AsyncStorage.getItem('hasOnboarded');
        }
        check()
    }, [])
    
  return (
    <View className='flex-1 p-4 gap-3'>
        {/* LOGO */}
        <View className='flex-row justify-center mt-10'> 
            <Image
            source={require('../assets/images/logo.png')}
            style={{ width: 200, height: 50 }}
            />
        </View>

        <View className='flex-1 bg-secondary '>

        </View>

        <View className='mb-8 gap-3'>
            <TouchableOpacity className='border border-secondary p-3 rounded-2xl'
            onPress={() => router.push('/(auth)/register')}
            activeOpacity={0.8}
            >
                <Text className='text-secondary text-center text-[18px] font-semibold'>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity className='border bg-secondary p-3 rounded-2xl'
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.8}
            >
                <Text className='text-white text-center text-[18px] font-semibold'>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}