import { Animated, Easing } from "react-native"
import { withTiming, withSpring, withDelay, Easing as ReanimatedEasing } from "react-native-reanimated"

// Timing configurations
export const timingConfigs = {
  quick: { duration: 200 },
  normal: { duration: 300 },
  slow: { duration: 500 },
}

// Spring configurations
export const springConfigs = {
  gentle: { damping: 15, stiffness: 100 },
  bouncy: { damping: 10, stiffness: 150 },
  responsive: { damping: 20, stiffness: 300 },
}

// Easing functions
export const easingFunctions = {
  standard: Easing.bezier(0.4, 0, 0.2, 1),
  accelerate: Easing.bezier(0.4, 0, 1, 1),
  decelerate: Easing.bezier(0, 0, 0.2, 1),
  sharp: Easing.bezier(0.4, 0, 0.6, 1),
}

// Reanimated easing functions
export const reanimatedEasing = {
  standard: ReanimatedEasing.bezier(0.4, 0, 0.2, 1),
  accelerate: ReanimatedEasing.bezier(0.4, 0, 1, 1),
  decelerate: ReanimatedEasing.bezier(0, 0, 0.2, 1),
  sharp: ReanimatedEasing.bezier(0.4, 0, 0.6, 1),
}

// Animation presets for Animated API
export const animatedPresets = {
  // Fade animations
  fadeIn: (value: Animated.Value, duration = 300, delay = 0) => {
    return Animated.timing(value, {
      toValue: 1,
      duration,
      delay,
      easing: easingFunctions.standard,
      useNativeDriver: true,
    })
  },

  fadeOut: (value: Animated.Value, duration = 300, delay = 0) => {
    return Animated.timing(value, {
      toValue: 0,
      duration,
      delay,
      easing: easingFunctions.standard,
      useNativeDriver: true,
    })
  },

  // Scale animations
  scaleIn: (value: Animated.Value, duration = 300, delay = 0) => {
    return Animated.timing(value, {
      toValue: 1,
      duration,
      delay,
      easing: easingFunctions.standard,
      useNativeDriver: true,
    })
  },

  scaleOut: (value: Animated.Value, duration = 300, delay = 0) => {
    return Animated.timing(value, {
      toValue: 0,
      duration,
      delay,
      easing: easingFunctions.standard,
      useNativeDriver: true,
    })
  },

  // Slide animations
  slideInUp: (value: Animated.Value, distance = 100, duration = 300, delay = 0) => {
    return Animated.timing(value, {
      toValue: 0,
      duration,
      delay,
      easing: easingFunctions.standard,
      useNativeDriver: true,
    })
  },

  slideOutDown: (value: Animated.Value, distance = 100, duration = 300, delay = 0) => {
    return Animated.timing(value, {
      toValue: distance,
      duration,
      delay,
      easing: easingFunctions.standard,
      useNativeDriver: true,
    })
  },

  // Spring animations
  springIn: (value: Animated.Value, delay = 0) => {
    return Animated.spring(value, {
      toValue: 1,
      delay,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    })
  },

  springOut: (value: Animated.Value, delay = 0) => {
    return Animated.spring(value, {
      toValue: 0,
      delay,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    })
  },
}

// Animation presets for Reanimated
export const reanimatedPresets = {
  // Timing animations
  fadeIn: (duration = 300, delay = 0) => {
    return withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: reanimatedEasing.standard,
      }),
    )
  },

  fadeOut: (duration = 300, delay = 0) => {
    return withDelay(
      delay,
      withTiming(0, {
        duration,
        easing: reanimatedEasing.standard,
      }),
    )
  },

  // Scale animations
  scaleIn: (duration = 300, delay = 0) => {
    return withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: reanimatedEasing.standard,
      }),
    )
  },

  scaleOut: (duration = 300, delay = 0) => {
    return withDelay(
      delay,
      withTiming(0, {
        duration,
        easing: reanimatedEasing.standard,
      }),
    )
  },

  // Spring animations
  springIn: (delay = 0, config = springConfigs.gentle) => {
    return withDelay(delay, withSpring(1, config))
  },

  springOut: (delay = 0, config = springConfigs.gentle) => {
    return withDelay(delay, withSpring(0, config))
  },
}

// Staggered animation helper
export function createStaggeredAnimation(
  items: any[],
  animationCreator: (index: number) => Animated.CompositeAnimation,
  staggerDelay = 50,
) {
  return Animated.stagger(
    staggerDelay,
    items.map((_, index) => animationCreator(index)),
  )
}

// Sequence animation helper
export function createSequenceAnimation(animations: Animated.CompositeAnimation[]) {
  return Animated.sequence(animations)
}
