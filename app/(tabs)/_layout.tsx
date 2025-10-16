import { Tabs } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'

type TabBarIconProps = {
  focused: boolean
  activeIcon: string
  inactiveIcon: string
  label: string
}

function TabBarIcon({ focused, activeIcon, inactiveIcon }: TabBarIconProps) {
  return (
    <View
      style={{
        backgroundColor: focused ? 'transparent' : 'transparent',
        borderRadius: 50,
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:"auto",
      }}
    >
      {focused ? (
        <LinearGradient
          colors={['#5C27FE', '#E62E89']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 50,
            height: 50,
            width: 100,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
            shadowColor: '#E62E89',
            shadowOpacity: 0.3,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <Ionicons name={activeIcon} size={20} color="#fff" />
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>
            {activeIcon.charAt(0).toUpperCase() + activeIcon.slice(1)}
          </Text>
        </LinearGradient>
      ) : (
        <Ionicons name={inactiveIcon} size={22} color="#A8B5DB" />
      )}
    </View>
  )
}


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 14,
          width: '100%',
          height: 50,
          borderRadius: 30,
          backgroundColor: 'rgba(11,12,16,0.9)', // #0B0C10 transparent dark
          borderTopWidth: 0,
          elevation: 10
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} activeIcon="home" inactiveIcon="home-outline" label="Home" />
          )
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} activeIcon="search" inactiveIcon="search-outline" label="Search" />
          )
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} activeIcon="sparkles" inactiveIcon="sparkles-outline" label="Chat" />
          )
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} activeIcon="bookmark" inactiveIcon="bookmark-outline" label="Saved" />
          )
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} activeIcon="person" inactiveIcon="person-outline" label="Profile" />
          )
        }}
      />
    </Tabs>
  )
}
