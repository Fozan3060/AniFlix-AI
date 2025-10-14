import { Tabs } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

type TabBarIconProps = {
  focused: boolean
  activeIcon: string
  inactiveIcon: string
}

// ✨ CHANGES IN THIS COMPONENT
function TabBarIcon ({ focused, activeIcon, inactiveIcon }: TabBarIconProps) {
  return (
    <View
      style={{
        backgroundColor: focused ? '#A8B5DB' : 'transparent',
        borderRadius: 50,
        height: 40,
        width: 82,
        marginTop: 11,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Ionicons
        name={focused ? activeIcon : inactiveIcon}
        size={26}
        color={focused ? 'black' : '#A8B5DB'}
      />
    </View>
  )
}

export default function RootLayout () {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarLabel: () => null,
        tabBarStyle: {
          backgroundColor: '#06061a',
          height: 50,
          width: '95%',
          margin: 'auto',
          bottom: 10,
          borderRadius: 100,
         
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon='home'
              inactiveIcon='home-outline'
            />
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon='person'
              inactiveIcon='person-outline'
            />
          )
        }}
      />
      <Tabs.Screen
        name='saved'
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon='bookmark'
              inactiveIcon='bookmark-outline'
            />
          )
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              activeIcon='search'
              inactiveIcon='search-outline'
            />
          )
        }}
      />
    </Tabs>
  )
}
