import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";


const roommateTab = [
    {id: 1, label: 'Gender', value: 'gender', types: ['Self-Contained', 'Shared Apartment', 'Studio', 'Mini Flat']},
    {id: 2, label: 'Level', value: 'level', schools: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'level 6', 'level 7']},
    {id: 3, label: 'Campus', value: 'campus', schools: ['Main Campus', 'Yaba Campus', 'Akoka Campus', 'Surulere Campus']},
];

export const RoommateFilter = ({selectedTab}: any) => {
    const [appliedFilters, setAppliedFilters] = useState({
        gender: '',
        level: '',
        campus: ''
    })



    return (
        <View className="px-4 py-4">
            <FlatList
               data={roommateTab}
               horizontal
               showsHorizontalScrollIndicator={false}
               renderItem={({item}) => {
                const isSelected = selectedTab === item.label;
                return (
                    <TouchableOpacity
                     className={`mr-3 px-4 py-2 rounded-xl flex-row items-center gap-3 ${
                        isSelected ? 'bg-secondary' : 'bg-white border border-gray-200'
                    }`}
                    activeOpacity={0.7}
                    >
                        <Text className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                            {item.label}
                            {item.label === 'Gender' && appliedFilters?.gender && ` • ${appliedFilters.gender}`}
                            {item.label === 'Campus' && appliedFilters?.campus && ` • ${appliedFilters.campus}`}
                            {item.label === 'Level' && appliedFilters?.level && ` • ${appliedFilters.level}`}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color={isSelected ? '#FFF' : '#9CA3AF'} />
                    </TouchableOpacity>
                )
               } }
            />
        </View>
    )
}