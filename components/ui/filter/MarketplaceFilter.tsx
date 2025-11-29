import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";


interface MarketplaceFilterProps {
    isMarketplaceModal: boolean;
    selectedTab: string | null;
    setIsMarketplaceModal: (value: boolean) => void;
    setSelectedTab: (value: string) => void;
}

const marketplaceTab = [
    {id: 1, label: 'Property Type', value: 'propertyType', types: ['Self-Contained', 'Shared Apartment', 'Studio', 'Mini Flat']},
    {id: 2, label: 'Price', value: 'price', icon: '₦'},
    {id: 3, label: 'Property', value: 'property', schools: ['Main Campus', 'Yaba Campus', 'Akoka Campus', 'Surulere Campus']},
];

export const MarketplaceFitler = ({selectedTab, setSelectedTab, isMarketplaceModal, setIsMarketplaceModal}: MarketplaceFilterProps) => {

    const handleModalOpen = (label: string) => {
        setSelectedTab(label);
        setIsMarketplaceModal(true);
    }

    return(
        <View className="p-4">
            <FlatList
            data={marketplaceTab}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
                const isSelected = selectedTab === item.label;
                return (
                    <TouchableOpacity
                    onPress={() => handleModalOpen(item.label)}
                    className={`mr-3 px-4 py-2 rounded-xl items-center gap-2 flex-row ${isSelected ? 'bg-secondary' : 'bg-white border border-fray-200'}`}
                    >
                        <Text className={`${isSelected && 'text-white'}`}> {item.label} </Text>
                        <Ionicons name="chevron-down" size={20} color={isSelected ? '#FFF' : '#9CA3AF'} />
                    </TouchableOpacity>
                )
            }}
            />
        </View>
    )
}