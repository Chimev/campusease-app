import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";


const roommateTab = [
    {id: 1, label: 'Service Type', value: 'serviceType', types: ['Self-Contained', 'Shared Apartment', 'Studio', 'Mini Flat']},
];

export const ServiceFilter = ({selectedTab}: any) => {
    const [serviceType, setServiceType] = useState('')



    return (
        <View className="px-4 py-4">
            <FlatList
               data={roommateTab}
               horizontal
               showsHorizontalScrollIndicator={false}
               renderItem={({item}) => {
                return (
                    <TouchableOpacity
                     className={`mr-3 px-4 py-2 rounded-xl flex-row items-center gap-3 bg-white border border-gray-200`}
                    activeOpacity={0.7}
                    >
                        <Text className={`font-semibold text-gray-700`}>
                            {item.label}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color={'#9CA3AF'} />
                    </TouchableOpacity>
                )
               } }
            />
        </View>
    )
}