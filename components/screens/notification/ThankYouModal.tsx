import { Ionicons } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ThankYouModalProps {
  thankYouVisible: boolean;
  setThankYouVisible: any;
}

export default function ThankYouModal({ thankYouVisible, setThankYouVisible }: ThankYouModalProps) {
  return (
    <Modal
      visible={thankYouVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setThankYouVisible(false)}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">

        <View className="bg-white rounded-3xl p-6 w-full max-w-sm">

          {/* Icon */}
          <View className="items-center mb-4">
            <View className="bg-green-100 w-20 h-20 rounded-full items-center justify-center mb-4">
              <Ionicons name="checkmark" size={40} color="#10B981" />
            </View>

            {/* Title */}
            <Text className="text-2xl font-bold text-center mb-2">
              Thank You!
            </Text>

            {/* Subtitle */}
            <Text className="text-gray-500 text-center">
              Your notification is now set. Check back in the app to see updates, 
              and keep an eye out for push notifications for new listings that match your preferences.
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={() => setThankYouVisible(false)}
            className="bg-secondary rounded-2xl py-4 mt-4"
            activeOpacity={0.8}
          >
            <Text className="text-white text-center font-bold text-lg">
              Close
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </Modal>
  );
}
