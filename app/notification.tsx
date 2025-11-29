import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function NotificationsScreen() {
  const [selectedTab, setSelectedTab] = useState('all');
  
  const userSchool = 'UNICAL';

  // Sample notifications - would come from API
  const notifications = [
    {
      id: '1',
      type: 'message',
      title: 'New Message',
      description: 'Chisom Okorie sent you a message about "Modern 2BR Apartment"',
      timestamp: '5 minutes ago',
      read: false,
      icon: 'chatbubble',
      iconColor: '#3B82F6',
      iconBg: '#DBEAFE',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
    },
    {
      id: '2',
      type: 'listing',
      title: 'New Listing in Accommodation',
      description: 'A new listing matching your interests was just posted in UNICAL',
      timestamp: '1 hour ago',
      read: false,
      icon: 'home',
      iconColor: '#4F46E5',
      iconBg: '#EEF2FF',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200'
    },
    {
      id: '3',
      type: 'save',
      title: 'Someone Saved Your Listing',
      description: 'Your listing "iPhone 13 Pro" was saved by a user',
      timestamp: '3 hours ago',
      read: false,
      icon: 'heart',
      iconColor: '#EC4899',
      iconBg: '#FCE7F3',
      image: null
    },
    {
      id: '4',
      type: 'view',
      title: 'Listing Views Update',
      description: 'Your listing "Modern 2BR Apartment" has reached 100 views!',
      timestamp: '5 hours ago',
      read: true,
      icon: 'eye',
      iconColor: '#10B981',
      iconBg: '#D1FAE5',
      image: null
    },
    {
      id: '5',
      type: 'message',
      title: 'New Message',
      description: 'Femi Adebayo: "Is this still available?"',
      timestamp: '1 day ago',
      read: true,
      icon: 'chatbubble',
      iconColor: '#3B82F6',
      iconBg: '#DBEAFE',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
    },
    {
      id: '6',
      type: 'listing',
      title: 'New Marketplace Listing',
      description: 'MacBook Pro M1 posted in UNICAL - Check it out!',
      timestamp: '2 days ago',
      read: true,
      icon: 'storefront',
      iconColor: '#F59E0B',
      iconBg: '#FEF3C7',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200'
    },
    {
      id: '7',
      type: 'system',
      title: 'Welcome to CampusEase!',
      description: 'Start exploring listings and connect with students in your campus',
      timestamp: '1 week ago',
      read: true,
      icon: 'checkmark-circle',
      iconColor: '#10B981',
      iconBg: '#D1FAE5',
      image: null
    }
  ];

  const tabs = [
    { id: 'all', name: 'All', count: notifications.length },
    { id: 'unread', name: 'Unread', count: notifications.filter(n => !n.read).length }
  ];

  const filteredNotifications = selectedTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  const handleMarkAllAsRead = () => {
    Alert.alert('Mark All as Read', 'Mark all notifications as read?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Mark as Read',
        onPress: () => Alert.alert('Success', 'All notifications marked as read')
      }
    ]);
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'All notifications cleared')
        }
      ]
    );
  };

  const renderNotificationItem = ({ item }: any) => (
    <TouchableOpacity
      className={`bg-white border-b border-gray-100 p-4 flex-row ${
        !item.read ? 'bg-blue-50/30' : ''
      }`}
      activeOpacity={0.7}
    >
      {/* Icon or Image */}
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          className="w-12 h-12 rounded-full mr-3"
        />
      ) : (
        <View 
          className="w-12 h-12 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: item.iconBg }}
        >
          <Ionicons name={item.icon as any} size={24} color={item.iconColor} />
        </View>
      )}

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row items-start justify-between mb-1">
          <Text className={`text-base flex-1 ${!item.read ? 'font-bold' : 'font-semibold'}`}>
            {item.title}
          </Text>
          {!item.read && (
            <View className="w-2 h-2 bg-secondary rounded-full ml-2 mt-2" />
          )}
        </View>
        
        <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>
          {item.description}
        </Text>
        
        <Text className="text-xs text-gray-400">{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center px-6 py-20">
      <View className="bg-gray-100 w-32 h-32 rounded-full items-center justify-center mb-6">
        <Ionicons 
          name={selectedTab === 'unread' ? "checkmark-done-circle-outline" : "notifications-outline"} 
          size={64} 
          color="#9CA3AF" 
        />
      </View>
      
      <Text className="text-2xl font-bold text-gray-800 mb-3 text-center">
        {selectedTab === 'unread' ? 'All Caught Up!' : 'No Notifications'}
      </Text>
      <Text className="text-gray-500 text-center leading-6">
        {selectedTab === 'unread' 
          ? "You're all up to date. New notifications will appear here."
          : "You don't have any notifications yet. When you get messages, saves, or new listings, they'll show up here."}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-secondary pt-12 pb-6 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2" activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-2xl font-bold">Notifications</Text>
              <Text className="text-white/70 text-sm">Stay updated</Text>
            </View>
          </View>
          
          {notifications.length > 0 && (
            <TouchableOpacity
              onPress={handleMarkAllAsRead}
              className="bg-white/20 rounded-full px-3 py-2"
              activeOpacity={0.7}
            >
              <Text className="text-white text-sm font-semibold">Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* School Badge */}
        <View className="bg-white/20 rounded-full px-4 py-2 self-start">
          <View className="flex-row items-center">
            <Ionicons name="school" size={14} color="white" />
            <Text className="text-white font-semibold ml-2 text-sm">{userSchool}</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      {notifications.length > 0 && (
        <View className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center justify-between">
          <View className="flex-row gap-2">
            {tabs.map((tab) => {
              const isSelected = selectedTab === tab.id;
              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setSelectedTab(tab.id)}
                  className={`px-4 py-2 rounded-full ${
                    isSelected ? 'bg-secondary' : 'bg-gray-100'
                  }`}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center">
                    <Text
                      className={`font-semibold ${
                        isSelected ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {tab.name}
                    </Text>
                    {tab.count > 0 && (
                      <View className={`ml-2 px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20' : 'bg-gray-200'
                      }`}>
                        <Text className={`text-xs font-bold ${
                          isSelected ? 'text-white' : 'text-gray-600'
                        }`}>
                          {tab.count}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {notifications.length > 0 && (
            <TouchableOpacity
              onPress={handleClearAll}
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}