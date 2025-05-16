"use client"

import type React from "react"
import { useEffect } from "react"
import {
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring } from "react-native-reanimated"
import { useTheme } from "../../context/ThemeContext"
import { timingConfigs, springConfigs } from "../../utils/animationPresets"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface AnimatedModalProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  animationType?: "slide" | "fade" | "scale"
  position?: "center" | "bottom"
  style?: ViewStyle
  contentStyle?: ViewStyle
  backdropOpacity?: number
  closeOnBackdropPress?: boolean
  avoidKeyboard?: boolean
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window")

export function AnimatedModal({
  visible,
  onClose,
  children,
  animationType = "slide",
  position = "center",
  style,
  contentStyle,
  backdropOpacity = 0.5,
  closeOnBackdropPress = true,
  avoidKeyboard = true,
}: AnimatedModalProps) {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  // Animation values
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(SCREEN_HEIGHT)
  const scale = useSharedValue(0.8)

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      // Show modal
      opacity.value = withTiming(1, timingConfigs.normal)

      if (animationType === "slide") {
        translateY.value = withSpring(0, springConfigs.gentle)
      } else if (animationType === "scale") {
        scale.value = withSpring(1, springConfigs.gentle)
      }
    } else {
      // Hide modal
      opacity.value = withTiming(0, timingConfigs.normal, () => {
        if (animationType === "slide") {
          translateY.value = SCREEN_HEIGHT
        } else if (animationType === "scale") {
          scale.value = 0.8
        }
      })
    }
  }, [visible, animationType])

  // Handle backdrop press
  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose()
    }
  }

  // Animated styles
  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(visible ? backdropOpacity : 0, timingConfigs.normal),
    }
  })

  const contentAnimatedStyle = useAnimatedStyle(() => {
    if (animationType === "slide") {
      return {
        transform: [{ translateY: translateY.value }],
      }
    } else if (animationType === "scale") {
      return {
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
      }
    } else {
      return {
        opacity: opacity.value,
      }
    }
  })

  // Position styles
  const positionStyle = position === "bottom" ? styles.bottomContent : styles.centerContent

  return (
    <Modal transparent visible={visible} onRequestClose={onClose} statusBarTranslucent>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled={avoidKeyboard}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View style={[styles.backdrop, { backgroundColor: "black" }, backdropStyle]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.contentWrapper,
            positionStyle,
            contentAnimatedStyle,
            style,
            position === "bottom" && { paddingBottom: insets.bottom },
          ]}
        >
          <View
            style={[
              styles.content,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
              contentStyle,
            ]}
          >
            {children}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  contentWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  centerContent: {
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  bottomContent: {
    bottom: 0,
    padding: 16,
  },
  content: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    maxWidth: 600,
    width: "100%",
  },
})
