"use client"

import { useEffect, useRef } from "react"
import { TouchableOpacity, Animated, View } from "react-native"
import { Moon, Sun } from "lucide-react-native"
import { useTheme } from "../../context/ThemeContext"
import { animations } from "../../utils/animations"

interface ThemeToggleProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function ThemeToggle({ size = "md", className = "" }: ThemeToggleProps) {
  const { isDark, toggleTheme, colors } = useTheme()

  // Animation values
  const rotateAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current

  // Icon sizes based on the size prop
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  // Container sizes based on the size prop
  const containerSizes = {
    sm: 32,
    md: 40,
    lg: 48,
  }

  useEffect(() => {
    // Rotate animation
    Animated.timing(rotateAnim, {
      toValue: isDark ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
      easing: Animated.Easing.elastic(1),
    }).start()
  }, [isDark, rotateAnim])

  const handlePress = () => {
    // Scale animation on press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Animated.Easing.elastic(1.5),
      }),
    ]).start()

    // Trigger haptic feedback
    animations.haptics.light()

    // Toggle theme
    toggleTheme()
  }

  // Interpolate rotation
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  })

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className={`items-center justify-center rounded-full ${className}`}
      style={{
        backgroundColor: isDark ? colors.backgroundTertiary : colors.backgroundTertiary,
        width: containerSizes[size],
        height: containerSizes[size],
      }}
    >
      <Animated.View
        style={{
          transform: [{ rotate: spin }, { scale: scaleAnim }],
        }}
      >
        <View style={{ position: "absolute", opacity: isDark ? 0 : 1 }}>
          <Sun size={iconSizes[size]} color={colors.foregroundSecondary} />
        </View>
        <View style={{ opacity: isDark ? 1 : 0 }}>
          <Moon size={iconSizes[size]} color={colors.foregroundSecondary} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  )
}
