import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const tabs = [
    { id: 'all', name: 'All', icon: 'apps' },
    { id: 'accommodation', name: 'Accommodation', icon: 'home' },
    { id: 'roommate', name: 'Roommates', icon: 'people' },
    { id: 'services', name: 'Services', icon: 'construct' },
    { id: 'marketplace', name: 'Marketplace', icon: 'storefront' },
  ];


  export const ListingFilter = ({selectedTab, setSelectedTab, setSelectedCategory}:any) => {


    return(
        <View className="px-4 py-4">
          <FlatList
            data={tabs}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = selectedTab === item.id;
              return (
                <TouchableOpacity
                  onPress={() => {setSelectedTab(item.id); setSelectedCategory(item.id)}}
                  className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
                    isSelected ? 'bg-secondary' : 'bg-white border border-gray-200'
                  }`}
                  activeOpacity={0.7}
                >
                  <Ionicons 
                    name={item.icon as any} 
                    size={16} 
                    color={isSelected ? 'white' : '#6B7280'} 
                  />
                  <Text className={`font-semibold ml-2 ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
    )
  }