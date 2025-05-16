"use client"

import type React from "react"
import { useRef } from "react"
import { View, StyleSheet, TouchableOpacity, type ViewStyle, Animated, Easing, Platform } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../../context/ThemeContext"
import useHaptics from "../../hooks/useHaptics"
import { borderRadius, spacing, gradients } from "../../styles/designSystem"

interface GradientCardProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
  gradientColors?: string[]
  gradientStart?: { x: number; y: number }
  gradientEnd?: { x: number; y: number }
  borderRadius?: number
  elevation?: number
  disabled?: boolean
  animated?: boolean
  hapticFeedback?: boolean
}

const GradientCard: React.FC<GradientCardProps> = ({
  children,
  onPress,
  style,
  gradientColors,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
  borderRadius: customBorderRadius = borderRadius.md,
  elevation = 3,
  disabled = false,
  animated = true,
  hapticFeedback = true,
}) => {
  const { colors, isDark } = useTheme()
  const haptics = useHaptics()
  const scaleAnim = useRef(new Animated.Value(1)).current

  // Default gradient colors based on theme
  const defaultGradientColors = isDark ? gradients.cardDark : gradients.card

  const cardGradientColors = gradientColors || defaultGradientColors

  // Shadow styles based on elevation and platform
  const getShadowStyle = (): ViewStyle => {
    if (Platform.OS === "ios") {
      return {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: elevation },
        shadowOpacity: 0.3,
        shadowRadius: elevation * 1.5,
      }
    } else {
      return {
        elevation: elevation,
      }
    }
  }

  // Animation functions
  const animateIn = () => {
    if (!animated) return

    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }

  const animateOut = () => {
    if (!animated) return

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }

  // Event handlers
  const handlePressIn = () => {
    animateIn()
  }

  const handlePressOut = () => {
    animateOut()
  }

  const handlePress = () => {
    if (disabled || !onPress) return

    if (hapticFeedback) {
      haptics.light()
    }

    onPress()
  }

  // Card content
  const renderCardContent = () => (
    <LinearGradient
      colors={cardGradientColors}
      start={gradientStart}
      end={gradientEnd}
      style={[styles.gradient, { borderRadius: customBorderRadius }]}
    >
      <View style={styles.content}>{children}</View>
    </LinearGradient>
  )

  // Render card with or without touch functionality
  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          styles.container,
          { borderRadius: customBorderRadius },
          getShadowStyle(),
          { opacity: disabled ? 0.6 : 1 },
          style,
        ]}
      >
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, { borderRadius: customBorderRadius }]}>
          {renderCardContent()}
        </Animated.View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container, { borderRadius: customBorderRadius }, getShadowStyle(), style]}>
      {renderCardContent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  gradient: {
    overflow: "hidden",
  },
  content: {
    padding: spacing.md,
  },
})

export default GradientCard
