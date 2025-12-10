import { Ionicons } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ModalNotificationProps {
  user: {
    school?: string;
    [key: string]: any;
  } | null;
  id: string | string[];
  isNotifyModalVisible: boolean;
  setIsNotifyModalVisible: (visible: boolean) => void;
  handleEnableNotification: () => void;
}

export default function ModalNotification({
  user,
  id,
  isNotifyModalVisible,
  setIsNotifyModalVisible,
  handleEnableNotification
}: ModalNotificationProps) {

  const isAccommodation = id === "Accommodation";

  // 🔹 Dynamic title
  const titleText = isAccommodation
    ? "Find the Right Apartment Faster"
    : "Get Notified";

  // 🔹 Dynamic subtitle
  const subtitleText = isAccommodation
    ? `Tell us your house preferences and we’ll notify agents in ${user?.school}. 
They’ll reach out or post listings that match your needs. 
You’ll also get alerted instantly whenever an agent posts a matching apartment.`
    : `Receive instant notifications when new ${id} listings are posted in ${user?.school}.`;

  // 🔹 Dynamic features list
  const features = isAccommodation
    ? [
        "Agents get notified of your house needs",
        "Get matched with apartments faster",
        "Instant alerts when matching listings appear"
      ]
    : [
        "Instant push notifications",
        "Be the first to know",
        "Turn off anytime"
      ];

  // Dynamic button text
  const buttonText = isAccommodation
    ? "Select House Preference"
    : "Enable Notifications";

  return (
    <Modal
      visible={isNotifyModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsNotifyModalVisible(false)}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">

        <View className="bg-white rounded-3xl p-6 w-full max-w-sm">

          {/* Icon + Title */}
          <View className="items-center mb-4">
            <View className="bg-secondary/10 w-20 h-20 rounded-full items-center justify-center mb-4">
              <Ionicons name="notifications" size={40} color="#4F46E5" />
            </View>

            <Text className="text-2xl font-bold text-center mb-2">
              {titleText}
            </Text>

            <Text className="text-gray-500 text-center">
              {subtitleText}
            </Text>
          </View>

          {/* Features */}
          <View className="bg-gray-50 rounded-2xl p-4 mb-6">
            {features.map((feature, index) => (
              <View key={index} className="flex-row items-center mb-3">
                <View className="bg-green-100 w-8 h-8 rounded-full items-center justify-center mr-3">
                  <Ionicons name="checkmark" size={16} color="#10B981" />
                </View>
                <Text className="text-gray-700 flex-1">{feature}</Text>
              </View>
            ))}
          </View>

          {/* Main Button */}
          <TouchableOpacity
            onPress={handleEnableNotification}
            className="bg-secondary rounded-2xl py-4 mb-3"
            activeOpacity={0.8}
          >
            <Text className="text-white text-center font-bold text-lg">
              {buttonText}
            </Text>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity
            onPress={() => setIsNotifyModalVisible(false)}
            className="py-3"
            activeOpacity={0.7}
          >
            <Text className="text-gray-500 text-center font-semibold">
              Maybe Later
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </Modal>
  );
}
