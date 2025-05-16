"use client"

import type React from "react"
import { useEffect } from "react"
import { StyleSheet, TouchableOpacity, View, type ViewStyle } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  withDelay,
  interpolate,
  Extrapolate,
} from "react-native-reanimated"
import { useTheme } from "../../context/ThemeContext"
import { animations, shadows, borderRadius } from "../../styles/designSystem"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { useTapHaptics } from "../../hooks/useHaptics"

interface AnimatedCardProps {
  children: React.ReactNode
  onPress?: () => void
  style?: ViewStyle
  contentStyle?: ViewStyle
  delay?: number
  disabled?: boolean
  elevation?: "none" | "sm" | "md" | "lg" | "xl"
  interactive?: boolean
  pressable?: boolean
  animateOnMount?: boolean
  animationType?: "fade" | "slide" | "scale" | "flip"
  testID?: string
}

export function AnimatedCard({
  children,
  onPress,
  style,
  contentStyle,
  delay = 0,
  disabled = false,
  elevation = "md",
  interactive = true,
  pressable = true,
  animateOnMount = true,
  animationType = "fade",
  testID,
}: AnimatedCardProps) {
  const { colors } = useTheme()
  const triggerHaptics = useTapHaptics()

  // Animation values
  const opacity = useSharedValue(animateOnMount ? 0 : 1)
  const translateY = useSharedValue(animateOnMount && animationType === "slide" ? 30 : 0)
  const scale = useSharedValue(animateOnMount && animationType === "scale" ? 0.95 : 1)
  const rotateX = useSharedValue(animateOnMount && animationType === "flip" ? 45 : 0)

  // Pressed state animation
  const pressedScale = useSharedValue(1)
  const pressedElevation = useSharedValue(1)

  // Mount animation
  useEffect(() => {
    if (animateOnMount) {
      opacity.value = withDelay(
        delay,
        withTiming(1, { duration: animations.durations.normal, easing: animations.easings.easeOut }),
      )

      if (animationType === "slide") {
        translateY.value = withDelay(delay, withSpring(0, animations.springs.gentle))
      } else if (animationType === "scale") {
        scale.value = withDelay(delay, withSpring(1, animations.springs.gentle))
      } else if (animationType === "flip") {
        rotateX.value = withDelay(
          delay,
          withTiming(0, { duration: animations.durations.normal, easing: animations.easings.spring }),
        )
      }
    }
  }, [opacity, translateY, scale, rotateX, delay, animateOnMount, animationType])

  // Gesture handling for interactive cards
  const gesture = Gesture.Pan()
    .enabled(interactive && !disabled)
    .onBegin(() => {
      if (interactive && !disabled) {
        pressedScale.value = withTiming(0.98, { duration: animations.durations.fast })
        pressedElevation.value = withTiming(0.8, { duration: animations.durations.fast })
      }
    })
    .onFinalize(() => {
      if (interactive && !disabled) {
        pressedScale.value = withTiming(1, { duration: animations.durations.normal })
        pressedElevation.value = withTiming(1, { duration: animations.durations.normal })
      }
    })

  // Handle press in/out animations
  const handlePressIn = () => {
    if (interactive && !disabled) {
      pressedScale.value = withTiming(0.98, { duration: animations.durations.fast })
      pressedElevation.value = withTiming(0.8, { duration: animations.durations.fast })
    }
  }

  const handlePressOut = () => {
    if (interactive && !disabled) {
      pressedScale.value = withTiming(1, { duration: animations.durations.normal })
      pressedElevation.value = withTiming(1, { duration: animations.durations.normal })
    }
  }

  const handlePress = () => {
    if (onPress && !disabled) {
      triggerHaptics("light")
      onPress()
    }
  }

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    // Shadow elevation animation
    const shadowOpacity = interpolate(
      pressedElevation.value,
      [0.8, 1],
      [
        0.1,
        elevation === "none"
          ? 0
          : elevation === "sm"
            ? 0.05
            : elevation === "md"
              ? 0.1
              : elevation === "lg"
                ? 0.15
                : 0.2,
      ],
      Extrapolate.CLAMP,
    )

    const shadowRadius = interpolate(
      pressedElevation.value,
      [0.8, 1],
      [2, elevation === "none" ? 0 : elevation === "sm" ? 2 : elevation === "md" ? 4 : elevation === "lg" ? 8 : 16],
      Extrapolate.CLAMP,
    )

    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value * pressedScale.value },
        { rotateX: `${rotateX.value}deg` },
      ],
      shadowOpacity,
      shadowRadius,
    }
  })

  // Get shadow style based on elevation
  const getShadowStyle = () => {
    switch (elevation) {
      case "none":
        return {}
      case "sm":
        return shadows.sm
      case "md":
        return shadows.md
      case "lg":
        return shadows.lg
      case "xl":
        return shadows.xl
      default:
        return shadows.md
    }
  }

  const cardContent = (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        getShadowStyle(),
        animatedStyle,
        style,
      ]}
      testID={testID}
    >
      <View style={[styles.content, contentStyle]}>{children}</View>
    </Animated.View>
  )

  if (pressable && onPress && !disabled) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        {cardContent}
      </TouchableOpacity>
    )
  }

  if (interactive && !disabled) {
    return <GestureDetector gesture={gesture}>{cardContent}</GestureDetector>
  }

  return cardContent
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 12,
  },
  content: {
    flex: 1,
  },
})
