import { ListingCard } from "@/components/ui/ListingCard";
import { ListingCardSkeleton } from "@/components/ui/ListingCardSkeleton";
import { categories } from "@/constant/categories";
import { useAuth } from "@/context/AuhContext";
import { useListing } from "@/context/ListingContext";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";


export default function Home() {
    const {user, token} = useAuth();
    const { recentListing, isLoading } = useListing();

    return (
        <View className="flex-1 bg-gray-50">
            <ScrollView  showsVerticalScrollIndicator={false}>
                {/* Hero section */}
                <View className="bg-secondary pt-12 pb-5 px-4 rounded-b-3xl">
                    {/* First layer */}
                    <View className="flex-row justify-between mb-2">
                        <View>
                            <Text className="text-white/80 text-sm">Welcome back,</Text>
                            <Text className="text-white text-2xl font-bold">{user?.name}</Text>
                        </View> 
                        
                        <TouchableOpacity onPress={() => router.push('/notification')} className="bg-white/20 p-3 rounded-full">
                            <Ionicons name="notifications-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    {/* School */}
                    <View className="bg-white/20 rounded-full px-4 py-2 self-start">
                        <View className="flex-row items-center">
                            <Ionicons name="school" size={16} color="white" />
                            <Text className="text-white font-semibold ml-2">{user?.school}</Text>
                        </View>
                    </View>
                    {/* search bar */}
                    {/* <View className="bg-white rounded-2xl flex-row items-center px-4 py-3 shadow-sm">
                <Feather name="search" size={20} color="#9CA3AF" />
                <TextInput
                className="flex-1 ml-3 text-base"
                placeholder="What are you looking for?"
                placeholderTextColor="#9CA3AF"
                //   value={searchQuery}
                //   onChangeText={setSearchQuery}
                />
                <TouchableOpacity>
                <Ionicons name="options-outline" size={24} color="#4F46E5" />
                </TouchableOpacity>
                    </View> */}
                </View>

                {/* Category */}
                <View className="mt-6 px-4">
                    <Text className="font-semibold text-xl mb-4">Categories</Text>
                    <View className="flex-row flex-wrap gap-3">
                        {categories.map(category => (
                            <Link asChild key={category.id}
                                href={{
                                pathname:'/category/[id]',
                                params: {id: category.name }
                                }}
                            >
                                <TouchableOpacity key={category.id}
                                className="flex-1 min-w-[45%] p-4 rounded-2xl"
                                style={{backgroundColor: category.bgColor}}
                                activeOpacity={0.7}
                                >
                                    <View 
                                    className="w-12 h-12 flex-row items-center justify-center rounded-full"
                                    style={{backgroundColor: category.color}}>
                                        <Ionicons name={category.icon as any} size={24} color={'white'} />
                                    </View>
                                    <Text className="text-base">{category.name}</Text>
                                </TouchableOpacity>  
                            </Link>
                                                 
                        ))}
                    </View>
                </View>

                {/* Recent Listings */}
                <View className="mt-8">
                    <View className="flex-row justify-between items-center px-4 mb-4">
                        <View>
                            <Text className="font-semibold text-xl mb-4">Recent Listings</Text>
                            <Text className="-mt-4 text-sm">Just posted in {user?.school}</Text>
                        </View>
                        <Link asChild href={'/recent-listings'}>
                            <TouchableOpacity>
                                <Text className="text-secondary font-semibold">See All</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                    
                    {isLoading ? (
                        <FlatList
                            data={Array.from({ length: 4 })}
                            renderItem={({ index }) => <ListingCardSkeleton width={Dimensions.get('window').width * 0.6} />}
                            horizontal
                            keyExtractor={(_, index) => index.toString()}
                            contentContainerStyle={{ paddingHorizontal: 16 }}
                            showsHorizontalScrollIndicator={false}
                        />
                    ) : recentListing.length === 0 ? (
                        // Empty State
                        <View className="items-center justify-center px-6 py-8">
                            <View className="bg-gray-100 w-20 h-20 rounded-full items-center justify-center mb-4">
                                <Ionicons name="time-outline" size={40} color="#9CA3AF" />
                            </View>
                            <Text className="text-gray-700 font-semibold text-base mb-2">No Recent Listings</Text>
                            <Text className="text-gray-500 text-sm text-center">
                                Latest listings in {user?.school} will appear here
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={recentListing.slice(0, 3)}
                            renderItem={({ item }) => <ListingCard profile={false} item={item} width={Dimensions.get('window').width * 0.6} />} 
                            keyExtractor={item => item._id}
                            horizontal
                            contentContainerStyle={{paddingHorizontal: 16}}
                            showsHorizontalScrollIndicator={false}
                        />
                    )}
                </View>

                {/* Community Stats */}
                <View className="px-4 mt-8 mb-6">
                {/* For gradient: Use LinearGradient from expo-linear-gradient 
                    <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{borderRadius: 16, padding: 24}}> 
                */}
                <View className="bg-secondary rounded-2xl p-6 shadow-lg">
                    <Text className="text-white text-lg font-bold mb-2">
                    {user?.school} Community
                    </Text>
                    <Text className="text-white/90 mb-4">
                    Join hundreds of {user?.school} students finding their campus comfort
                    </Text>
                    <View className="flex-row justify-between">
                    <View>
                        <Text className="text-white text-2xl font-bold">450+</Text>
                        <Text className="text-white/80 text-sm">Listings</Text>
                    </View>
                    <View>
                        <Text className="text-white text-2xl font-bold">320+</Text>
                        <Text className="text-white/80 text-sm">Students</Text>
                    </View>
                    <View>
                        <Text className="text-white text-2xl font-bold">98%</Text>
                        <Text className="text-white/80 text-sm">Satisfied</Text>
                    </View>
                    </View>
                </View>
                </View>

                {/* How It Works */}
                <View className="px-4 mt-4 mb-8">
                <Text className="text-xl font-bold mb-4">How It Works</Text>
                <View className="gap-3">
                    {[
                    { icon: 'person-add', title: 'Create Account', desc: 'Sign up with your school email' },
                    { icon: 'search', title: 'Browse Listings', desc: 'Find what you need in your campus' },
                    { icon: 'chatbubbles', title: 'Connect & Enjoy', desc: 'Contact vendors directly' }
                    ].map((step, index) => (
                    <View key={index} className="bg-white rounded-2xl p-4 flex-row items-center">
                        <View className="bg-secondary/10 w-12 h-12 rounded-full items-center justify-center mr-4">
                        <Ionicons name={step.icon as any} size={24} color="#4F46E5" />
                        </View>
                        <View className="flex-1">
                        <Text className="font-bold text-base">{step.title}</Text>
                        <Text className="text-gray-500 text-sm">{step.desc}</Text>
                        </View>
                    </View>
                    ))}
                </View>
                </View>
            </ScrollView>
        </View>
    )
}