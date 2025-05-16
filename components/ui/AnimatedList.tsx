"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import {
  FlatList,
  type FlatListProps,
  Animated,
  type ViewStyle,
  StyleSheet,
  RefreshControl,
  type ListRenderItem,
} from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { animationDurations } from "../../styles/designSystem"

interface AnimatedListProps<T> extends Omit<FlatListProps<T>, "renderItem"> {
  data: T[]
  renderItem: (info: { item: T; index: number; animatedValue: Animated.Value }) => React.ReactNode
  animationType?: "fade" | "slide" | "scale" | "none"
  animationDuration?: number
  animationDelay?: number
  itemContainerStyle?: ViewStyle
  refreshing?: boolean
  onRefresh?: () => void
  staggered?: boolean
  initialNumToRender?: number
}

function AnimatedList<T>({
  data,
  renderItem,
  animationType = "fade",
  animationDuration = animationDurations.normal,
  animationDelay = 50,
  itemContainerStyle,
  refreshing = false,
  onRefresh,
  staggered = true,
  initialNumToRender = 10,
  ...rest
}: AnimatedListProps<T>) {
  const { colors } = useTheme()
  const animatedValues = useRef<Animated.Value[]>([])

  // Initialize animated values for each item
  useEffect(() => {
    // Reset animated values when data changes
    animatedValues.current = data.map(() => new Animated.Value(0))

    // Animate items in
    const animations = animatedValues.current.map((value, index) => {
      return Animated.timing(value, {
        toValue: 1,
        duration: animationDuration,
        delay: staggered ? index * animationDelay : 0,
        useNativeDriver: true,
      })
    })

    // Start animations in sequence or parallel
    if (staggered) {
      Animated.stagger(animationDelay, animations).start()
    } else {
      Animated.parallel(animations).start()
    }
  }, [data, animationDuration, animationDelay, staggered])

  // Get animation style based on animation type
  const getAnimationStyle = (animatedValue: Animated.Value): ViewStyle => {
    switch (animationType) {
      case "fade":
        return {
          opacity: animatedValue,
        }
      case "slide":
        return {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }
      case "scale":
        return {
          opacity: animatedValue,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        }
      case "none":
      default:
        return {}
    }
  }

  // Render each item with animation
  const renderAnimatedItem: ListRenderItem<T> = ({ item, index }) => {
    // Make sure we have an animated value for this index
    if (!animatedValues.current[index]) {
      animatedValues.current[index] = new Animated.Value(1)
    }

    const animatedValue = animatedValues.current[index]

    return (
      <Animated.View style={[styles.itemContainer, itemContainerStyle, getAnimationStyle(animatedValue)]}>
        {renderItem({ item, index, animatedValue })}
      </Animated.View>
    )
  }

  return (
    <FlatList
      data={data}
      renderItem={renderAnimatedItem}
      initialNumToRender={initialNumToRender}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary, colors.secondary]}
          />
        ) : undefined
      }
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    overflow: "hidden",
  },
})

export default AnimatedList
