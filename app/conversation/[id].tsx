import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function ConversationScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const flatListRef = useRef<FlatList>(null);

  // Conversation info - would come from navigation params
  const conversation = {
    userName: 'Chisom Okorie',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    online: true,
    listing: {
      title: 'Modern 2BR Apartment',
      price: '₦150,000',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'
    }
  };

  // Sample messages
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Hello! Is this apartment still available?',
        sender: 'other',
        timestamp: '10:30 AM',
        read: true
      },
      {
        id: '2',
        text: 'Yes, it is! Would you like to schedule a viewing?',
        sender: 'me',
        timestamp: '10:32 AM',
        read: true
      },
      {
        id: '3',
        text: 'That would be great! What time works for you?',
        sender: 'other',
        timestamp: '10:35 AM',
        read: true
      },
      {
        id: '4',
        text: 'How about tomorrow at 2 PM? The apartment is near the main gate.',
        sender: 'me',
        timestamp: '10:36 AM',
        read: true
      },
      {
        id: '5',
        text: 'Perfect! I\'ll be there. Can you share the exact address?',
        sender: 'other',
        timestamp: '10:38 AM',
        read: false
      }
    ]);
  }, []);

  const handleSend = () => {
    if (message.trim().length === 0) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      read: false
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleCall = () => {
    Alert.alert('Call', `Call ${conversation.userName}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => Alert.alert('Calling...') }
    ]);
  };

  const handleVideoCall = () => {
    Alert.alert('Video Call', `Video call ${conversation.userName}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => Alert.alert('Calling...') }
    ]);
  };

  const handleMoreOptions = () => {
    Alert.alert(
      'More Options',
      'Choose an option',
      [
        { text: 'View Profile', onPress: () => {} },
        { text: 'View Listing', onPress: () => {} },
        { text: 'Block User', style: 'destructive' },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const renderMessage = ({ item }: any) => {
    const isMe = item.sender === 'me';
    
    return (
      <View className={`mb-4 px-4 ${isMe ? 'items-end' : 'items-start'}`}>
        <View className="flex-row items-end max-w-[75%]">
          {/* {!isMe && (
            <Image
              source={{ uri: conversation.userAvatar }}
              className="w-8 h-8 rounded-full mr-2"
            />
          )} */}
          
          <View>
            <View 
              className={`rounded-2xl px-4 py-3 ${
                isMe 
                  ? 'bg-secondary rounded-br-sm' 
                  : 'bg-white rounded-bl-sm'
              }`}
              style={!isMe ? { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 } : {}}
            >
              <Text 
                className={`text-base ${isMe ? 'text-white' : 'text-gray-900'}`}
              >
                {item.text}
              </Text>
            </View>
            
            <View className={`flex-row items-center mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
              <Text className="text-xs text-gray-400">{item.timestamp}</Text>
              {isMe && (
                <Ionicons 
                  name={item.read ? "checkmark-done" : "checkmark"} 
                  size={14} 
                  color={item.read ? "#4F46E5" : "#9CA3AF"}
                  style={{ marginLeft: 4 }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* Header */}
      <View className="bg-white border-b border-gray-200 pt-12 pb-4 px-4">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity className="p-2 -ml-2 mr-2" activeOpacity={0.7} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            
            {/* <View className="relative mr-3">
              <Image
                source={{ uri: conversation.userAvatar }}
                className="w-10 h-10 rounded-full"
              />
              {conversation.online && (
                <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </View> */}

            <View className="flex-1">
              <Text className="text-base font-bold text-gray-900">
                {conversation.userName}
              </Text>
              <Text className="text-xs text-gray-500">
                {conversation.online ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row items-center gap-3">
            <TouchableOpacity 
              onPress={handleCall}
              className="p-2" 
              activeOpacity={0.7}
            >
              <Ionicons name="call-outline" size={22} color="#4F46E5" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleVideoCall}
              className="p-2" 
              activeOpacity={0.7}
            >
              <Ionicons name="videocam-outline" size={24} color="#4F46E5" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleMoreOptions}
              className="p-2" 
              activeOpacity={0.7}
            >
              <Ionicons name="ellipsis-vertical" size={20} color="#4F46E5" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Listing Info Banner */}
        <TouchableOpacity 
          className="bg-gray-50 rounded-xl p-3 flex-row items-center"
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: conversation.listing.image }}
            className="w-12 h-12 rounded-lg"
          />
          <View className="flex-1 ml-3">
            <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>
              {conversation.listing.title}
            </Text>
            <Text className="text-secondary font-bold text-sm">
              {conversation.listing.price}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      {/* Input Area */}
      <View className="bg-white border-t border-gray-200 px-4 pt-3 pb-5">
        <View className="flex-row items-center">
          {/* Attachment Button */}
          <TouchableOpacity 
            className="p-2 mr-2" 
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle-outline" size={28} color="#4F46E5" />
          </TouchableOpacity>

          {/* Input Field */}
          <View className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex-row items-center">
            <TextInput
              className="flex-1 text-base"
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />
            
            {message.length === 0 && (
              <TouchableOpacity className="p-1" activeOpacity={0.7}>
                <Ionicons name="happy-outline" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          {/* Send Button */}
          <TouchableOpacity 
            onPress={handleSend}
            className={`ml-2 w-10 h-10 rounded-full items-center justify-center ${
              message.trim().length > 0 ? 'bg-secondary' : 'bg-gray-200'
            }`}
            activeOpacity={0.8}
            disabled={message.trim().length === 0}
          >
            <Ionicons 
              name="send" 
              size={18} 
              color={message.trim().length > 0 ? 'white' : '#9CA3AF'} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}