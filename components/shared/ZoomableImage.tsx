"use client"
import { StyleSheet, type ImageProps } from "react-native"
import { GestureDetector } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { Gesture } from "react-native-gesture-handler"
import { useTheme } from "../../context/ThemeContext"

interface ZoomableImageProps extends Omit<ImageProps, "style"> {
  width: number
  height: number
  maxScale?: number
  minScale?: number
  style?: any
}

export function ZoomableImage({
  source,
  width,
  height,
  maxScale = 5,
  minScale = 1,
  style,
  ...rest
}: ZoomableImageProps) {
  const { colors } = useTheme()

  // Shared values for gestures
  const scale = useSharedValue(1)
  const savedScale = useSharedValue(1)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const originX = useSharedValue(0)
  const originY = useSharedValue(0)

  // Double tap gesture to reset zoom
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scale.value !== 1) {
        // Reset to original size
        scale.value = withTiming(1)
        translateX.value = withTiming(0)
        translateY.value = withTiming(0)
      } else {
        // Zoom to 2x at the tap position
        scale.value = withTiming(2)
      }
    })

  // Pinch gesture for zooming
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value
    })
    .onUpdate((event) => {
      scale.value = Math.min(Math.max(savedScale.value * event.scale, minScale), maxScale)
    })

  // Pan gesture for moving the image when zoomed
  const panGesture = Gesture.Pan()
    .onStart(() => {
      originX.value = translateX.value
      originY.value = translateY.value
    })
    .onUpdate((event) => {
      // Only allow panning when zoomed in
      if (scale.value > 1) {
        // Calculate boundaries based on scale
        const maxTranslateX = (width * (scale.value - 1)) / 2
        const maxTranslateY = (height * (scale.value - 1)) / 2

        // Update translation with boundaries
        translateX.value = Math.min(Math.max(originX.value + event.translationX, -maxTranslateX), maxTranslateX)
        translateY.value = Math.min(Math.max(originY.value + event.translationY, -maxTranslateY), maxTranslateY)
      }
    })

  // Combine gestures
  const gesture = Gesture.Simultaneous(doubleTapGesture, Gesture.Simultaneous(pinchGesture, panGesture))

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, { width, height }, style]}>
        <Animated.Image
          source={source}
          style={[styles.image, { width, height }, animatedStyle]}
          resizeMode="contain"
          {...rest}
        />
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
})
