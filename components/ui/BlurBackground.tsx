import { BlurView } from "expo-blur";
import { View } from "react-native";


export default function BlurBackground () {
    return (
         <View className="absolute  inset-0">
            {/* Teal Blob */}
            <View className="absolute top-10 -left-10 w-72 h-72 rounded-full bg-teal-400/15"/>

            {/* Amber Blob */}
            <View className="absolute top-20 -right-20 w-72 h-72 rounded-full bg-amber-400/10"/>

            {/* Smaller Teal Blob */}
            <View className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-teal-300/10"/>

            {/* Your content goes here - wrap it in BlurView if needed */}
            <BlurView intensity={100} tint="light" className="flex-1" />
        </View>
    )
}