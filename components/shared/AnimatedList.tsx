"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { FlatList, StyleSheet, type ViewStyle, type ListRenderItem, Animated, RefreshControl } from "react-native"
import { useTheme } from "../../context/ThemeContext"
import { animations } from "../../utils/animations"

interface AnimatedListProps<T> {
  data: T[]
  renderItem: ListRenderItem<T>
  keyExtractor: (item: T, index: number) => string
  contentContainerStyle?: ViewStyle
  style?: ViewStyle
  itemAnimation?: "fade" | "slide" | "scale" | "none"
  staggerDelay?: number
  refreshing?: boolean
  onRefresh?: () => void
  onEndReached?: () => void
  onEndReachedThreshold?: number
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null
  horizontal?: boolean
  numColumns?: number
}

export function AnimatedList<T>({
  data,
  renderItem,
  keyExtractor,
  contentContainerStyle,
  style,
  itemAnimation = "fade",
  staggerDelay = 50,
  refreshing = false,
  onRefresh,
  onEndReached,
  onEndReachedThreshold = 0.5,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  horizontal = false,
  numColumns = 1,
}: AnimatedListProps<T>) {
  const { colors } = useTheme()
  const animatedValues = useRef<Animated.Value[]>([])

  // Initialize animated values for each item
  useEffect(() => {
    animatedValues.current = data.map(() => new Animated.Value(0))

    // Create staggered animation
    const animations = animatedValues.current.map((value, index) => {
      return Animated.timing(value, {
        toValue: 1,
        duration: 400,
        delay: index * staggerDelay,
        useNativeDriver: true,
      })
    })

    // Start animations
    Animated.stagger(staggerDelay, animations).start()
  }, [data, staggerDelay])

  // Custom render item with animation
  const renderAnimatedItem: ListRenderItem<T> = ({ item, index, ...rest }) => {
    if (index >= animatedValues.current.length) {
      animatedValues.current.push(new Animated.Value(1))
    }

    const animatedValue = animatedValues.current[index]

    let animatedStyle = {}

    switch (itemAnimation) {
      case "fade":
        animatedStyle = {
          opacity: animatedValue,
        }
        break
      case "slide":
        animatedStyle = {
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
        break
      case "scale":
        animatedStyle = {
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
        break
      default:
        break
    }

    return <Animated.View style={animatedStyle}>{renderItem({ item, index, ...rest })}</Animated.View>
  }

  const handleRefresh = () => {
    if (onRefresh) {
      animations.haptics.light()
      onRefresh()
    }
  }

  return (
    <FlatList
      data={data}
      renderItem={itemAnimation === "none" ? renderItem : renderAnimatedItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      style={[styles.list, { backgroundColor: colors.background }, style]}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        ) : undefined
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      horizontal={horizontal}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
})
