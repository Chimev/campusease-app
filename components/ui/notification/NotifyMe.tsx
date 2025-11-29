import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";



export default function NotifyMe ({isNotificationActive, handleDisableNotification, handleNotificationSetup, id}){
    return(
        <TouchableOpacity
                    onPress={isNotificationActive ? handleDisableNotification : handleNotificationSetup}
                    className="p-2 flex-row items-center gap-2"
                    activeOpacity={0.7}
                  >
                    {isNotificationActive ? (
                      <View className="relative">
                        <Ionicons name="notifications" size={24} color="white" />
                        <View className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-secondary" />
                      </View>
                    ) : (
                      <Ionicons name="notifications-outline" size={24} color="white" />
                    )}

                    <Text 
                    className={`${isNotificationActive && 'font-semibold'} text-white text-xl`}>
                        {isNotificationActive 
                        ? 'Notification On' 
                        : id === 'Accommodation' 
                            ? 'Notify Agent' 
                            : 'Notify Me'}
                    </Text>
                  </TouchableOpacity>
    )
}