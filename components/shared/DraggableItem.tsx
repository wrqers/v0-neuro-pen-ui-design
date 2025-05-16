"use client"

import type React from "react"
import { useEffect } from "react"
import { StyleSheet, type ViewStyle } from "react-native"
import { GestureDetector } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { useDragGesture } from "../../utils/gestureHandlers"
import { springConfigs } from "../../utils/animationPresets"
import { useTheme } from "../../context/ThemeContext"
import { animations } from "../../utils/animations"

interface DraggableItemProps {
  children: React.ReactNode
  initialPosition?: { x: number; y: number }
  onPositionChange?: (x: number, y: number) => void
  style?: ViewStyle
  disabled?: boolean
  snapToGrid?: boolean
  gridSize?: number
}

export function DraggableItem({
  children,
  initialPosition = { x: 0, y: 0 },
  onPositionChange,
  style,
  disabled = false,
  snapToGrid = false,
  gridSize = 20,
}: DraggableItemProps) {
  const { colors } = useTheme()

  // Set initial position
  const translateX = useSharedValue(initialPosition.x)
  const translateY = useSharedValue(initialPosition.y)

  // Update position when initialPosition changes
  useEffect(() => {
    translateX.value = withSpring(initialPosition.x, springConfigs.gentle)
    translateY.value = withSpring(initialPosition.y, springConfigs.gentle)
  }, [initialPosition.x, initialPosition.y])

  const handleDragStart = () => {
    animations.haptics.light()
  }

  const handleDragEnd = (x: number, y: number) => {
    // Snap to grid if enabled
    if (snapToGrid) {
      const snappedX = Math.round(x / gridSize) * gridSize
      const snappedY = Math.round(y / gridSize) * gridSize

      translateX.value = withSpring(snappedX, springConfigs.gentle)
      translateY.value = withSpring(snappedY, springConfigs.gentle)

      if (onPositionChange) {
        onPositionChange(snappedX, snappedY)
      }
    } else if (onPositionChange) {
      onPositionChange(x, y)
    }
  }

  const { gesture } = useDragGesture(handleDragStart, handleDragEnd, !disabled)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
          animatedStyle,
          style,
        ]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
})
