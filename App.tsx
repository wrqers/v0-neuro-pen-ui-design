"use client"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import AppNavigation from "./navigation"
import { GestureHandlerRootView } from "react-native-gesture-handler"

// Import necessary polyfills for Reanimated
import "react-native-reanimated"

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const AppContent = () => {
  const { isDark } = useTheme()

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? "light" : "dark"} />
      <AppNavigation />
    </NavigationContainer>
  )
}
