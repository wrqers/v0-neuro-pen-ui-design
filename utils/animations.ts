import { Animated, Easing, LayoutAnimation, Platform, UIManager } from "react-native"
import * as Haptics from "expo-haptics"

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

// Standard animations
export const animations = {
  // Fade in animation
  fadeIn: (duration = 300) => {
    const fadeAnim = new Animated.Value(0)

    const start = (callback?: Animated.EndCallback) => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(callback)
    }

    return {
      fadeAnim,
      style: { opacity: fadeAnim },
      start,
    }
  },

  // Fade out animation
  fadeOut: (duration = 300) => {
    const fadeAnim = new Animated.Value(1)

    const start = (callback?: Animated.EndCallback) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(callback)
    }

    return {
      fadeAnim,
      style: { opacity: fadeAnim },
      start,
    }
  },

  // Slide in from bottom
  slideInBottom: (duration = 300, distance = 50) => {
    const slideAnim = new Animated.Value(distance)

    const start = (callback?: Animated.EndCallback) => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }).start(callback)
    }

    return {
      slideAnim,
      style: { transform: [{ translateY: slideAnim }] },
      start,
    }
  },

  // Scale animation
  scale: (duration = 300, from = 0.9, to = 1) => {
    const scaleAnim = new Animated.Value(from)

    const start = (callback?: Animated.EndCallback) => {
      Animated.timing(scaleAnim, {
        toValue: to,
        duration,
        useNativeDriver: true,
        easing: Easing.elastic(1),
      }).start(callback)
    }

    return {
      scaleAnim,
      style: { transform: [{ scale: scaleAnim }] },
      start,
    }
  },

  // Layout animations
  layout: {
    // Standard layout animation
    standard: () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    },

    // Spring layout animation
    spring: () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    },

    // Custom layout animation
    custom: (duration = 300, type = "easeInEaseOut") => {
      LayoutAnimation.configureNext({
        duration,
        update: {
          type: LayoutAnimation.Types[type as keyof typeof LayoutAnimation.Types],
          property: LayoutAnimation.Properties.opacity,
        },
        delete: {
          type: LayoutAnimation.Types.easeOut,
          property: LayoutAnimation.Properties.opacity,
        },
        create: {
          type: LayoutAnimation.Types.easeIn,
          property: LayoutAnimation.Properties.opacity,
        },
      })
    },
  },

  // Haptic feedback
  haptics: {
    light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
    medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
    heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
    success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
    warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
    error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
  },
}
