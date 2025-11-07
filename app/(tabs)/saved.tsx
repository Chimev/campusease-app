import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function SelectionInput() {
  const [selectedValue, setSelectedValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

 const options = [
    { id: '1', label: 'UNICAL', value: 'unical' },
    { id: '2', label: 'UNILAG', value: 'unilag' },
    { id: '3', label: 'LASU', value: 'lasu' },
    { id: '4', label: 'EBSU', value: 'ebsu' },
  ]; 

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsModalVisible(false);
  };

  const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || 'Select an option';

  return (
    <View>
      {/* Selection Button */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="bg-white border border-gray-200 rounded-xl px-4 py-4 flex-row items-center justify-between"
        activeOpacity={0.7}
      >
        <Text className={selectedValue ? 'text-gray-900' : 'text-gray-400'}>
          {selectedLabel}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {/* Modal with Options */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl max-h-[70%]">
            {/* Header */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
              <Text className="text-lg font-bold">Select School</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Options List */}
            <ScrollView className="px-4">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleSelect(option.value)}
                  className={`py-4 border-b border-gray-100 flex-row items-center justify-between ${
                    selectedValue === option.value ? 'bg-secondary/5' : ''
                  }`}
                  activeOpacity={0.7}
                >
                  <Text
                    className={`text-base ${
                      selectedValue === option.value
                        ? 'text-secondary font-semibold'
                        : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </Text>
                  {selectedValue === option.value && (
                    <Ionicons name="checkmark-circle" size={20} color="#4F46E5" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}