import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const accommodationTab = [
    {id: 1, label: 'Type', value: 'accommodationType', types: ['Self-Contained', 'Shared Apartment', 'Studio', 'Mini Flat']},
    {id: 2, label: 'Price', value: 'price', icon: '₦'},
    {id: 3, label: 'Campus', value: 'campus', schools: ['Main Campus', 'Yaba Campus', 'Akoka Campus', 'Surulere Campus']},
];

interface AccommodationFilterProps {
    isAccommodationModal: boolean;
    selectedTab: string | null;
    setIsAccommodationModal: (value: boolean) => void;
    setSelectedTab: (value: string) => void;
}

export const AccommodationFilter = ({isAccommodationModal, selectedTab, setIsAccommodationModal, setSelectedTab}: AccommodationFilterProps) => {
    // Manage applied filters internally
    const [appliedFilters, setAppliedFilters] = useState({
        type: '',
        campus: '',
        priceRange: ''
    });
    const [tempSelectedType, setTempSelectedType] = useState<string>('');
    const [tempSelectedCampus, setTempSelectedCampus] = useState<string>('');
    const [tempMinPrice, setTempMinPrice] = useState<string>('');
    const [tempMaxPrice, setTempMaxPrice] = useState<string>('');

    // Get current tab data
    const currentTab = accommodationTab.find(item => item.label === selectedTab);

    // Apply filters
    const handleApplyFilter = () => {
        switch(selectedTab) {
            case 'Type':
                setAppliedFilters((prev: any) => ({...prev, type: tempSelectedType}));
                break;
            case 'Price':
                setAppliedFilters((prev: any) => ({
                    ...prev, 
                    priceRange: tempMinPrice && tempMaxPrice ? `₦${tempMinPrice} - ₦${tempMaxPrice}` : ''
                }));
                break;
            case 'Campus':
                setAppliedFilters((prev: any) => ({...prev, campus: tempSelectedCampus}));
                break;
        }
        setIsAccommodationModal(false);
    };

    // Reset temp values when modal opens
    const handleModalOpen = (label: string) => {
        setSelectedTab(label);
        setIsAccommodationModal(true);
        
        // Load current applied filters into temp state
        if (label === 'Type') {
            setTempSelectedType(appliedFilters?.type || '');
        } else if (label === 'Campus') {
            setTempSelectedCampus(appliedFilters?.campus || '');
        }
    };

    const renderModalContent = () => {
        switch(selectedTab) {
            case 'Type':
                return (
                    <ScrollView className="px-4 py-2">
                        {currentTab?.types?.map((type, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setTempSelectedType(type)}
                                className={`flex-row items-center justify-between py-4 border-b border-gray-100 ${
                                    tempSelectedType === type ? 'bg-blue-50' : ''
                                }`}
                            >
                                <Text className={`text-base ${tempSelectedType === type ? 'font-bold text-secondary' : 'text-gray-700'}`}>
                                    {type}
                                </Text>
                                {tempSelectedType === type && (
                                    <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
                                )}
                            </TouchableOpacity>
                        ))}
                        
                        <TouchableOpacity
                            onPress={handleApplyFilter}
                            className="bg-secondary py-3 rounded-lg mt-4 mb-2"
                        >
                            <Text className="text-white text-center font-semibold text-base">Apply Filter</Text>
                        </TouchableOpacity>
                    </ScrollView>
                );

            case 'Price':
                return (
                    <>
                      <Text className="text-base font-semibold mb-3 text-gray-700">Price Range</Text>

                      <View className="mb-3">
                        <Text className="text-xs text-gray-600 mb-1.5">Minimum Price</Text>
                        <View className="flex-row items-center border border-gray-300 rounded-lg p-2">
                          <Text className="mr-2">₦</Text>
                          <TextInput
                            value={tempMinPrice}
                            onChangeText={setTempMinPrice}
                            placeholder="0"
                            keyboardType="numeric"
                            returnKeyType="done"
                            onSubmitEditing={() => Keyboard.dismiss()}
                            className="flex-1 text-base"
                          />
                        </View>
                      </View>

                      <View className="mb-4">
                        <Text className="text-xs text-gray-600 mb-1.5">Maximum Price</Text>
                        <View className="flex-row items-center border border-gray-300 rounded-lg p-2">
                          <Text className="mr-2">₦</Text>
                          <TextInput
                            value={tempMaxPrice}
                            onChangeText={setTempMaxPrice}
                            placeholder="1,000,000"
                            keyboardType="numeric"
                            returnKeyType="done"
                            onSubmitEditing={() => Keyboard.dismiss()}
                            className="flex-1 text-base"
                          />
                        </View>
                      </View>

                      <TouchableOpacity
                        onPress={() => { Keyboard.dismiss(); handleApplyFilter(); }}
                        className="bg-secondary py-3 rounded-xl"
                      >
                        <Text className="text-white font-bold text-center">Apply Price Filter</Text>
                      </TouchableOpacity>
                    </>
                );

            case 'Campus':
                return (
                    <ScrollView className="px-4 py-2">
                        {currentTab?.schools?.map((campus, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setTempSelectedCampus(campus)}
                                className={`flex-row items-center justify-between py-4 border-b border-gray-100 ${
                                    tempSelectedCampus === campus ? 'bg-blue-50' : ''
                                }`}
                            >
                                <Text className={`text-base ${tempSelectedCampus === campus ? 'font-bold text-secondary' : 'text-gray-700'}`}>
                                    {campus}
                                </Text>
                                {tempSelectedCampus === campus && (
                                    <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
                                )}
                            </TouchableOpacity>
                        ))}
                        
                        <TouchableOpacity
                            onPress={handleApplyFilter}
                            className="bg-secondary py-3 rounded-lg mt-4 mb-2"
                        >
                            <Text className="text-white text-center font-semibold text-base">Apply Filter</Text>
                        </TouchableOpacity>
                    </ScrollView>
                );

            default:
                return null;
        }
    };

    return(
        <View className="px-4 py-4">
          <FlatList
            data={accommodationTab}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = selectedTab === item.label;
              return (
                <TouchableOpacity
                  onPress={() => handleModalOpen(item.label)}
                  className={`mr-3 px-4 py-2 rounded-xl flex-row items-center gap-3 ${
                    isSelected ? 'bg-secondary' : 'bg-white border border-gray-200'
                  }`}
                  activeOpacity={0.7}
                >
                  <Text className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                    {item.label}
                    {item.icon && ` ${item.icon}`}
                    {item.label === 'Type' && appliedFilters?.type && ` • ${appliedFilters.type}`}
                    {item.label === 'Campus' && appliedFilters?.campus && ` • ${appliedFilters.campus}`}
                    {item.label === 'Price' && appliedFilters?.priceRange && ` • ${appliedFilters.priceRange}`}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={isSelected ? '#FFF' : '#9CA3AF'} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item: any) => item.id.toString()}
          />


          <Modal
            visible={isAccommodationModal}
            transparent
            animationType="slide"
            onRequestClose={() => setIsAccommodationModal(false)}
          >
            {/* overlay */}
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
              <View className="flex-1 bg-black/50">
                {/* keep content aligned to bottom */}
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 200}
                  className="flex-1 justify-end"
                >
                  {/* modal panel */}
                  <View className="bg-white rounded-t-3xl max-h-[70%] w-full">
                    {/* Header */}
                    <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                      <Text className="text-lg font-bold">Select {selectedTab}</Text>
                      <TouchableOpacity onPress={() => setIsAccommodationModal(false)}>
                        <Ionicons name="close" size={24} color="#000" />
                      </TouchableOpacity>
                    </View>

                    {/* Dynamic content area (scrollable) */}
                    <ScrollView
                      keyboardShouldPersistTaps="handled"
                      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40, flexGrow: 1, paddingTop: 16 }}
                    >
                      {renderModalContent()}
                    </ScrollView>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

        </View>
    );
}