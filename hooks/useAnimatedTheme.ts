"use client"

import { useEffect, useRef } from "react"
import { Animated, Easing } from "react-native"
import { useTheme } from "../context/ThemeContext"

export const useAnimatedTheme = () => {
  const { isDark, colors } = useTheme()
  const animatedValue = useRef(new Animated.Value(isDark ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isDark ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start()
  }, [isDark, animatedValue])

  const getAnimatedColor = (lightColor: string, darkColor: string) => {
    return animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [lightColor, darkColor],
    })
  }

  const animatedColors = {
    background: getAnimatedColor(colors.background, colors.background),
    text: getAnimatedColor(colors.foreground, colors.foreground),
    primary: getAnimatedColor(colors.primary, colors.primary),
    // Add more colors as needed
  }

  return { animatedValue, animatedColors }
}
