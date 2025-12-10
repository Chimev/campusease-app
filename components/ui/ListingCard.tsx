import { categories } from "@/constant/categories";
import { useAuth } from "@/context/AuhContext";
import { useListing } from "@/context/ListingContext";
import { addFavourite } from "@/helpers/addFavourite";
import { removeFavourite } from "@/helpers/removeFavourite";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ListingCardProps = {
    item: any;
    width?: any;
    profile: boolean;
    handleDelete?:any;
}

export function ListingCard ({item, width, profile, handleDelete}: ListingCardProps) {
    const [isLoading, setIsLoading] = useState(true); 
    const [hasError, setHasError] = useState(false);
    const {savedListings, setSavedListings} = useListing()
    const {user} = useAuth();
    
    // Check if this item is already favorited (boolean, not a function)
    const isFav = savedListings.some((fav: any) => fav.listingId === item._id);
    
    const handleFavourite = async () => {
        const email = user?.email as string;
        const listingId = item._id;
        
        console.log('Adding favorite:', { email, listingId });
        
        try {
            const result = await addFavourite(email, listingId);
            console.log('Result:', result);
            
            if(result.ok){
                console.log('Success! Updating UI');
                // Add the item to savedListings immediately
                setSavedListings((prev: any[]) => {
                    const newList = [...prev, { listingId: item._id, email }];
                    console.log('New savedListings:', newList);
                    return newList;
                });
            } else {
                console.log('API returned not ok');
            }
        } catch (error) {
            console.error('Error adding to saved listing:', error)
        }
    }

    const handleFavouriteDelete = async(listingId: string) => {
    console.log('Attempting to delete:', listingId);
    const email = user?.email as string
    
    try {
        const res = await removeFavourite(email, listingId);
        console.log('Delete response:', res); // Check what this shows
        console.log('res.ok:', res?.ok);
        
        if(res?.ok){
            console.log('Delete successful, updating UI');
            setSavedListings((prev: any[]) => {
                console.log('Current savedListings:', prev);
                const newList = prev.filter((fav: any) => {
                    console.log('Comparing:', fav.listingId, '!==', listingId);
                    return fav.listingId !== listingId;
                });
                console.log('New savedListings after delete:', newList);
                return newList;
            });
        } else {
            console.log('Delete failed - API returned not ok');
        }
    } catch (error) {
        console.error('Error Deleting SavedListing', error);
    }
}

    const categoryObj = categories.find(cat => cat.id === item.category)?.bgColor;


    return (
        <View style={{width, marginRight: 16, marginBottom: 10}} className="relative">
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
                        source={{ uri: item.image[0].url }}
                        style={[styles.image, isLoading ? styles.hidden : null]}
                        resizeMode="cover"
                        onLoadStart={() => setIsLoading(true)}
                        onLoadEnd={() => setIsLoading(false)}
                        onError={() => setHasError(true)}
                        />
                    )}
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
                        {/* Middle */}
                        <Text className="text-secondary text-xl font-bold mb-2">
                            {item.price &&  item.price.toLocaleString('en-NG', {
                                style: 'currency',
                                currency: 'NGN',
                                minimumFractionDigits: 0,
                            }) || item.gender}
                        </Text>
                        {/* Bottom */}
                        <View className="flex-row justify-between">
                            <View className="flex-row items-center">
                            <Ionicons name="location-outline" size={16} color="#9CA3AF" />
                            <Text className="text-gray-500 ml-1 text-sm">{item.campus}</Text>
                        </View>
                        
                        </View>
                    </View>
                </TouchableOpacity>
            </Link>
            {
                profile ? (
                     <View className="flex-row gap-4 absolute bottom-6 right-4 flexx-row justify-end items-end">
                        <Link href={{
                            pathname: '/(listings)/edit-listing',
                            params: {id: item._id, category: item.category}
                        }} asChild>
                            <Pressable>
                            <Feather name="edit-2" size={24} color="#1b656a" /> 
                            </Pressable>
                        </Link>
                        
                        <Pressable onPress={() => handleDelete(item._id)}>
                            <MaterialIcons name="delete-outline" size={24} color="red" />
                        </Pressable>
                    </View>
                )
                :  (
                    <View className="flex-row gap-4 absolute top-6 right-4 flexx-row justify-end items-end">
                        <Pressable onPress={isFav ? () => handleFavouriteDelete(item._id) : handleFavourite}>
                            <MaterialIcons
                            name={isFav ? "favorite" : "favorite-border"}
                            size={30}
                            color={isFav ? "#f8ae24" : "white"}
                            />
                        </Pressable>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 160,
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