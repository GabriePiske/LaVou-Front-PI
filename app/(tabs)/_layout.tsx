import { Feather, Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import React from "react"

export default function TabsLayout() {
  return (
  
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" }, 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Feather name="repeat" size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart" 
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add" 
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Ionicons name="add" size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile" 
        options={{
          title: "",
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={18} color={color} />,
        }}
      />
    </Tabs>
  )
}
