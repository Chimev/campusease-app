import { categories } from "@/constant/categories";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ListingCardProps = {
    item: any;
    width?: any
}


export  function ListingCard ({item, width}: ListingCardProps) {
    const [isLoading, setIsLoading] = useState(true); 
    const [hasError, setHasError] = useState(false);

const categoryObj = categories.find(cat => cat.id === item.category)?.bgColor


    return (
        <View style={{width, marginRight: 16, marginBottom: 10}}>
            <Link asChild href={{
                pathname: '/category/details/[id]',
                params: {id : item._id}
            }}>
                <TouchableOpacity 
                className={` rounded-2xl overflow-hidden bg-white shadow-sm `}
                style={[{ width, elevation: 5 }]} 
                activeOpacity={0.8}
                >
                    {(isLoading || hasError) && (
                        <Image
                        source={require("@/assets/images/imgload.png")}
                        style={styles.image}
                        resizeMode="cover"
                        />
                    )}

                    {!hasError && (
                        <Image
                        source={{ uri: item.image[0] }}
                        style={[styles.image, isLoading ? styles.hidden : null]}
                        resizeMode="cover"
                        onLoadStart={() => setIsLoading(true)}
                        onLoadEnd={() => setIsLoading(false)}
                        onError={() => setHasError(true)}
                        />
                    )}
                    {/* <Image
                    source={{ uri: item.image[0] }}
                    defaultSource={require('@/assets/images/imgload.png')}
                    className="w-full h-40"
                    resizeMode="cover"
                    /> */}
                    <View className="p-4">
                        <View className="flex-row justify-between items-start mb-2">
                            <Text className="text-lg font-bold flex-1" numberOfLines={1}>
                                {item.accommodationTitle ||item.roommateName || item.service || item.property}
                            </Text>
                            <View className={`px-2 py-1 rounded-full ml-2`}
                            style={{ backgroundColor: categoryObj}}
                            >
                                <Text className="text-secondary text-xs font-semibold">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</Text>
                            </View>
                        </View>
                        <Text className="text-secondary text-xl font-bold mb-2">
                            {item.price &&  item.price.toLocaleString('en-NG', {
                                style: 'currency',
                                currency: 'NGN',
                                minimumFractionDigits: 0,
                            })}
                        </Text>
                        <View className="flex-row items-center">
                            <Ionicons name="location-outline" size={16} color="#9CA3AF" />
                            <Text className="text-gray-500 ml-1 text-sm">{item.campus}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Link>
        </View>
       
        
    )
  }

  const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 160, // same as h-40
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f3f4f6",
  },
  image: {
    width: "100%",
    height: 160,
  },
  hidden: {
    position: "absolute",
    opacity: 0,
  },
});