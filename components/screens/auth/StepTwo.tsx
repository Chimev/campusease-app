import Feather from "@expo/vector-icons/Feather";
import { Text, TouchableOpacity, View } from "react-native";

const providers = [
  {
    provider: "agent",
    label: "Agent",
    description: "List and manage properties",
  },
  {
    provider: "service",
    label: "Service Provider",
    description: "Offer campus services",
  },
  {
    provider: "student",
    label: "Student",
    description: "Find accommodation, roommates, services and a marketplace",
  },
];

export default function StepTwo({ role, setRole, onBack, onRegister }: any) {
  const handleCheckboxChange = (value: string) => {
    setRole((prev: string[]) => {
      if (prev.includes(value)) {
        // uncheck (remove value)
        return prev.filter((r) => r !== value);
      } else {
        // add new value
        return [...prev, value];
      }
    });
  };

  const handleRegisterPress = () => {
    // call onRegister with the most recent role state
    onRegister(role);
  };

  return (
    <View className="gap-5">
        <View className="gap-4">
          {providers.map((provider) => {
            const isSelected = role.includes(provider.provider);
            return (
              <TouchableOpacity
                key={provider.provider}
                activeOpacity={0.9}
                onPress={() => handleCheckboxChange(provider.provider)}
                className={`flex-row items-start p-3 rounded-xl border-2 ${
                  isSelected
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200"
                }`}
              >
                {/* Checkbox */}
                <View
                  className={`w-5 h-5 rounded border-2 mr-3 mt-0.5 flex items-center justify-center ${
                    isSelected
                      ? "border-teal-500 bg-teal-500"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && <Feather name="check" size={12} color="white" />}
                </View>

                {/* Label + Description */}
                <View className="flex-1">
                  <Text className="font-medium text-gray-800">
                    {provider.label}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {provider.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      {/* Buttons */}
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="border bg-gray-100 px-6 py-3 rounded-2xl"
          onPress={onBack}
          activeOpacity={0.8}
        >
          <Text className="text-gray-700 font-semibold">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="border bg-secondary px-6 py-3 rounded-2xl"
          onPress={handleRegisterPress}
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
