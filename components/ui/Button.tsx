"use client"

import type React from "react"
import { useRef, useState } from "react"
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  ActivityIndicator,
  Animated,
  Easing,
  View,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../../context/ThemeContext"
import useHaptics from "../../hooks/useHaptics"
import { spacing, borderRadius, typography, gradients, shadows } from "../../styles/designSystem"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "gradient"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps {
  onPress: () => void
  title: string
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  fullWidth?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  gradientColors?: string[]
  hapticFeedback?: boolean
  animationScale?: number
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  style,
  textStyle,
  gradientColors,
  hapticFeedback = true,
  animationScale = 0.96,
}) => {
  const { colors, isDark } = useTheme()
  const haptics = useHaptics()
  const [isPressed, setIsPressed] = useState(false)
  const scaleAnim = useRef(new Animated.Value(1)).current

  // Animation configurations
  const animateIn = () => {
    Animated.timing(scaleAnim, {
      toValue: animationScale,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }

  const animateOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }

  const handlePressIn = () => {
    setIsPressed(true)
    animateIn()
  }

  const handlePressOut = () => {
    setIsPressed(false)
    animateOut()
  }

  const handlePress = () => {
    if (disabled || loading) return

    if (hapticFeedback) {
      haptics.light()
    }

    onPress()
  }

  // Get button styles based on variant and state
  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...getButtonSizeStyle(size),
      opacity: disabled ? 0.6 : 1,
    }

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          ...(!disabled && !isPressed ? shadows.md : {}),
        }
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: colors.secondary,
          ...(!disabled && !isPressed ? shadows.md : {}),
        }
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1.5,
          borderColor: colors.primary,
        }
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: isPressed ? colors.surfaceHover : "transparent",
        }
      case "gradient":
        return {
          ...baseStyle,
          ...(!disabled && !isPressed ? shadows.md : {}),
        }
      default:
        return baseStyle
    }
  }

  // Get text styles based on variant
  const getTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: "600",
      textAlign: "center",
      ...getTextSizeStyle(size),
    }

    switch (variant) {
      case "primary":
      case "secondary":
      case "gradient":
        return {
          ...baseStyle,
          color: "#FFFFFF",
        }
      case "outline":
        return {
          ...baseStyle,
          color: colors.primary,
        }
      case "ghost":
        return {
          ...baseStyle,
          color: colors.primary,
        }
      default:
        return baseStyle
    }
  }

  // Get button size styles
  const getButtonSizeStyle = (size: ButtonSize): ViewStyle => {
    switch (size) {
      case "sm":
        return {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.md,
          borderRadius: borderRadius.sm,
        }
      case "lg":
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
          borderRadius: borderRadius.lg,
        }
      case "md":
      default:
        return {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.lg,
          borderRadius: borderRadius.md,
        }
    }
  }

  // Get text size styles
  const getTextSizeStyle = (size: ButtonSize): TextStyle => {
    switch (size) {
      case "sm":
        return {
          fontSize: typography.fontSize.sm,
        }
      case "lg":
        return {
          fontSize: typography.fontSize.lg,
        }
      case "md":
      default:
        return {
          fontSize: typography.fontSize.md,
        }
    }
  }

  // Determine gradient colors
  const getGradientColors = () => {
    if (gradientColors && gradientColors.length >= 2) {
      return gradientColors
    }

    if (variant === "primary") {
      return gradients.primary
    } else if (variant === "secondary") {
      return gradients.secondary
    } else {
      return gradients.primary
    }
  }

  // Render button content
  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === "outline" || variant === "ghost" ? colors.primary : "#FFFFFF"}
          />
        ) : (
          <>
            {icon && iconPosition === "left" && <View style={styles.iconLeft}>{icon}</View>}
            <Text style={[getTextStyles(), textStyle]}>{title}</Text>
            {icon && iconPosition === "right" && <View style={styles.iconRight}>{icon}</View>}
          </>
        )}
      </View>
    )
  }

  // Render the button with appropriate wrapper
  const renderButton = () => {
    const buttonStyles = [styles.button, getButtonStyles(), fullWidth && styles.fullWidth, style]

    if (variant === "gradient") {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
        >
          <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
            <LinearGradient
              colors={getGradientColors()}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={buttonStyles}
            >
              {renderContent()}
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
      >
        <Animated.View style={[buttonStyles, { transform: [{ scale: scaleAnim }] }]}>{renderContent()}</Animated.View>
      </TouchableOpacity>
    )
  }

  return renderButton()
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: borderRadius.md,
  },
  fullWidth: {
    width: "100%",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconLeft: {
    marginRight: spacing.xs,
  },
  iconRight: {
    marginLeft: spacing.xs,
  },
})

export default Button
