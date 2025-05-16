"use client"

import type React from "react"
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
  type TouchableOpacityProps,
} from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { useTheme } from "../../context/ThemeContext"
import { animations } from "../../utils/animations"
import { springConfigs } from "../../utils/animationPresets"

interface AnimatedButtonProps extends TouchableOpacityProps {
  title: string
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  fullWidth?: boolean
}

export function AnimatedButton({
  title,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
  onPress,
  disabled,
  ...rest
}: AnimatedButtonProps) {
  const { colors } = useTheme()

  // Animation values
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  // Get styles based on variant
  const getBackgroundColor = () => {
    if (disabled) return colors.backgroundTertiary

    switch (variant) {
      case "primary":
        return colors.primary
      case "secondary":
        return colors.backgroundTertiary
      case "outline":
      case "ghost":
        return "transparent"
      default:
        return colors.primary
    }
  }

  const getTextColor = () => {
    if (disabled) return colors.foregroundTertiary

    switch (variant) {
      case "primary":
        return colors.primaryForeground
      case "secondary":
        return colors.foreground
      case "outline":
      case "ghost":
        return colors.primary
      default:
        return colors.primaryForeground
    }
  }

  const getBorderColor = () => {
    if (disabled) return colors.border

    switch (variant) {
      case "outline":
        return colors.primary
      default:
        return "transparent"
    }
  }

  // Get styles based on size
  const getPadding = () => {
    switch (size) {
      case "sm":
        return { paddingVertical: 6, paddingHorizontal: 12 }
      case "md":
        return { paddingVertical: 10, paddingHorizontal: 16 }
      case "lg":
        return { paddingVertical: 14, paddingHorizontal: 20 }
      default:
        return { paddingVertical: 10, paddingHorizontal: 16 }
    }
  }

  const getFontSize = () => {
    switch (size) {
      case "sm":
        return 14
      case "md":
        return 16
      case "lg":
        return 18
      default:
        return 16
    }
  }

  // Handle press animations
  const handlePressIn = () => {
    scale.value = withSpring(0.95, springConfigs.responsive)
    opacity.value = withTiming(0.9, { duration: 100 })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfigs.responsive)
    opacity.value = withTiming(1, { duration: 100 })
  }

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      animations.haptics.light()
      onPress()
    }
  }

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }
  })

  return (
    <Animated.View style={[animatedStyle, fullWidth && styles.fullWidth]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
            borderWidth: variant === "outline" ? 1 : 0,
            ...getPadding(),
          },
          fullWidth && styles.fullWidth,
          style,
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.9}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator size="small" color={getTextColor()} style={styles.loader} />
        ) : (
          <>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            <Text
              style={[
                styles.text,
                {
                  color: getTextColor(),
                  fontSize: getFontSize(),
                },
                textStyle,
              ]}
            >
              {title}
            </Text>
            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  fullWidth: {
    width: "100%",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  loader: {
    marginHorizontal: 8,
  },
})

// For TypeScript
const View = Animated.View
