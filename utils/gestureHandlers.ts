import { Dimensions } from "react-native"
import { Gesture } from "react-native-gesture-handler"
import { runOnJS, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { springConfigs, timingConfigs } from "./animationPresets"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3

export const useSwipeGesture = (onSwipeLeft?: () => void, onSwipeRight?: () => void, enabled = true) => {
  const translateX = useSharedValue(0)
  const context = useSharedValue({ x: 0 })

  const gesture = Gesture.Pan()
    .enabled(enabled)
    .onStart(() => {
      context.value = { x: translateX.value }
    })
    .onUpdate((event) => {
      translateX.value = context.value.x + event.translationX
    })
    .onEnd((event) => {
      if (event.velocityX < -500 || translateX.value < -SWIPE_THRESHOLD) {
        // Swiped left with velocity or past threshold
        translateX.value = withTiming(-SCREEN_WIDTH, timingConfigs.normal)
        if (onSwipeLeft) {
          runOnJS(onSwipeLeft)()
        }
      } else if (event.velocityX > 500 || translateX.value > SWIPE_THRESHOLD) {
        // Swiped right with velocity or past threshold
        translateX.value = withTiming(SCREEN_WIDTH, timingConfigs.normal)
        if (onSwipeRight) {
          runOnJS(onSwipeRight)()
        }
      } else {
        // Return to original position
        translateX.value = withSpring(0, springConfigs.responsive)
      }
    })

  return { gesture, translateX }
}

export const usePinchGesture = (
  onPinchStart?: () => void,
  onPinchUpdate?: (scale: number) => void,
  onPinchEnd?: (scale: number) => void,
  minScale = 0.5,
  maxScale = 3,
  enabled = true,
) => {
  const scale = useSharedValue(1)
  const savedScale = useSharedValue(1)

  const gesture = Gesture.Pinch()
    .enabled(enabled)
    .onStart(() => {
      if (onPinchStart) {
        runOnJS(onPinchStart)()
      }
      savedScale.value = scale.value
    })
    .onUpdate((event) => {
      const newScale = savedScale.value * event.scale
      scale.value = Math.min(Math.max(newScale, minScale), maxScale)
      if (onPinchUpdate) {
        runOnJS(onPinchUpdate)(scale.value)
      }
    })
    .onEnd(() => {
      if (onPinchEnd) {
        runOnJS(onPinchEnd)(scale.value)
      }
    })

  return { gesture, scale }
}

export const useDragGesture = (
  onDragStart?: () => void,
  onDragEnd?: (x: number, y: number) => void,
  enabled = true,
) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const context = useSharedValue({ x: 0, y: 0 })

  const gesture = Gesture.Pan()
    .enabled(enabled)
    .onStart(() => {
      if (onDragStart) {
        runOnJS(onDragStart)()
      }
      context.value = { x: translateX.value, y: translateY.value }
    })
    .onUpdate((event) => {
      translateX.value = context.value.x + event.translationX
      translateY.value = context.value.y + event.translationY
    })
    .onEnd(() => {
      if (onDragEnd) {
        runOnJS(onDragEnd)(translateX.value, translateY.value)
      }
    })

  return { gesture, translateX, translateY }
}

export const useRotationGesture = (
  onRotationStart?: () => void,
  onRotationEnd?: (rotation: number) => void,
  enabled = true,
) => {
  const rotation = useSharedValue(0)
  const savedRotation = useSharedValue(0)

  const gesture = Gesture.Rotation()
    .enabled(enabled)
    .onStart(() => {
      if (onRotationStart) {
        runOnJS(onRotationStart)()
      }
      savedRotation.value = rotation.value
    })
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation
    })
    .onEnd(() => {
      if (onRotationEnd) {
        runOnJS(onRotationEnd)(rotation.value)
      }
    })

  return { gesture, rotation }
}
