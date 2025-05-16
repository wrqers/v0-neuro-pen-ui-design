"use client"

import type React from "react"
import { StyleSheet, View, Text, type ViewStyle } from "react-native"
import { GestureDetector } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from "react-native-reanimated"
import { useSwipeGesture } from "../../utils/gestureHandlers"
import { useTheme } from "../../context/ThemeContext"
import { animations } from "../../utils/animations"

interface SwipeableCardProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  leftAction?: {
    label: string
    color: string
    icon?: React.ReactNode
  }
  rightAction?: {
    label: string
    color: string
    icon?: React.ReactNode
  }
  style?: ViewStyle
  disabled?: boolean
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  style,
  disabled = false,
}: SwipeableCardProps) {
  const { colors } = useTheme()

  const handleSwipeLeft = () => {
    if (onSwipeLeft) {
      animations.haptics.medium()
      onSwipeLeft()
    }
  }

  const handleSwipeRight = () => {
    if (onSwipeRight) {
      animations.haptics.medium()
      onSwipeRight()
    }
  }

  const { gesture, translateX } = useSwipeGesture(handleSwipeLeft, handleSwipeRight, !disabled)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const leftActionStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, 100], [0, 1], Extrapolation.CLAMP)

    return {
      opacity,
      transform: [
        {
          scale: interpolate(translateX.value, [0, 100], [0.8, 1], Extrapolation.CLAMP),
        },
      ],
    }
  })

  const rightActionStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [-100, 0], [1, 0], Extrapolation.CLAMP)

    return {
      opacity,
      transform: [
        {
          scale: interpolate(translateX.value, [-100, 0], [1, 0.8], Extrapolation.CLAMP),
        },
      ],
    }
  })

  return (
    <View style={[styles.container, style]}>
      {leftAction && (
        <Animated.View
          style={[styles.actionContainer, styles.leftAction, { backgroundColor: leftAction.color }, leftActionStyle]}
        >
          {leftAction.icon}
          <Text style={styles.actionLabel}>{leftAction.label}</Text>
        </Animated.View>
      )}

      {rightAction && (
        <Animated.View
          style={[styles.actionContainer, styles.rightAction, { backgroundColor: rightAction.color }, rightActionStyle]}
        >
          {rightAction.icon}
          <Text style={styles.actionLabel}>{rightAction.label}</Text>
        </Animated.View>
      )}

      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
            animatedStyle,
          ]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 8,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "white",
  },
  actionContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    flexDirection: "row",
  },
  leftAction: {
    left: 0,
    right: 0,
  },
  rightAction: {
    left: 0,
    right: 0,
  },
  actionLabel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
})
