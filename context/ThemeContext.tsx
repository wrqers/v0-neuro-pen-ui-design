"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import { useColorScheme, Appearance } from "react-native"
import { lightColors, darkColors } from "../styles/designSystem"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Haptics from "expo-haptics"

type ThemeType = "light" | "dark" | "system"

interface ThemeContextType {
  theme: ThemeType
  colors: typeof lightColors
  isDark: boolean
  setTheme: (theme: ThemeType) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  colors: lightColors,
  isDark: false,
  setTheme: () => {},
  toggleTheme: () => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme()
  const [theme, setThemeState] = useState<ThemeType>("system")
  const [isLoading, setIsLoading] = useState(true)

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme")
        if (savedTheme) {
          setThemeState(savedTheme as ThemeType)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load theme preference:", error)
        setIsLoading(false)
      }
    }

    loadTheme()
  }, [])

  // Save theme preference when it changes
  const setTheme = async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem("theme", newTheme)
      setThemeState(newTheme)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    } catch (error) {
      console.error("Failed to save theme preference:", error)
    }
  }

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  // Determine if we should use dark mode
  const isDark = theme === "system" ? systemColorScheme === "dark" : theme === "dark"

  // Get the appropriate colors based on the theme
  const colors = isDark ? darkColors : lightColors

  // Listen for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === "system") {
        // Force a re-render when system theme changes and we're using system theme
        setThemeState("system")
      }
    })

    return () => {
      subscription.remove()
    }
  }, [theme])

  if (isLoading) {
    // You could return a loading indicator here if needed
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, isDark, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeContext
