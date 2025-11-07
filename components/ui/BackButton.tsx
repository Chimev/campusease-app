import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";



export default function BackButton () {
    return (
        <Feather name='arrow-left' size={28} color="black"  className='absolute  top-14 left-4 bg-white font-bold rounded-full' onPress={() => router.back()} />
    )
}