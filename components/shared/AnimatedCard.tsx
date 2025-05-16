"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Animated, TouchableOpacity, StyleSheet, type ViewStyle, type StyleProp } from "react-native"
import { useTheme } from "../../context/ThemeContext"

interface AnimatedCardProps {
  children: React.ReactNode
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  delay?: number
  disabled?: boolean
}

export function AnimatedCard({ children, onPress, style, delay = 0, disabled = false }: AnimatedCardProps) {
  const { colors } = useTheme()

  // Animation values
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(20)).current
  const scale = useRef(new Animated.Value(0.95)).current

  // Pressed state animation
  const pressedScale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start()
  }, [opacity, translateY, scale, delay])

  const handlePressIn = () => {
    Animated.spring(pressedScale, {
      toValue: 0.97,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(pressedScale, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start()
  }

  const animatedStyle = {
    opacity,
    transform: [{ translateY }, { scale }, { scale: pressedScale }],
  }

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    style,
  ]

  if (onPress && !disabled) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        <Animated.View style={[cardStyle, animatedStyle]}>{children}</Animated.View>
      </TouchableOpacity>
    )
  }

  return <Animated.View style={[cardStyle, animatedStyle]}>{children}</Animated.View>
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
    marginBottom: 12,
  },
})
