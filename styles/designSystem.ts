import { Dimensions } from "react-native"
import { StyleSheet } from "react-native"

const { width, height } = Dimensions.get("window")

// Responsive sizing
export const responsive = {
  isTablet: width >= 768,
  width,
  height,
  scale: (size: number) => (width / 375) * size,
  verticalScale: (size: number) => (height / 812) * size,
}

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

// Typography
export const typography = {
  fontFamily: {
    regular: "System",
    medium: "System",
    bold: "System",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
}

// Colors
export const lightColors = {
  primary: "#6366F1", // Indigo
  primaryDark: "#4F46E5",
  primaryLight: "#A5B4FC",
  secondary: "#EC4899", // Pink
  secondaryDark: "#DB2777",
  secondaryLight: "#F9A8D4",
  accent: "#8B5CF6", // Violet
  accentDark: "#7C3AED",
  accentLight: "#C4B5FD",
  background: "#FFFFFF",
  card: "#F9FAFB",
  text: "#1F2937",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  notification: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  highlight: "#FEF3C7",
  surface: "#F3F4F6",
  surfaceHover: "#E5E7EB",
  divider: "#E5E7EB",
  overlay: "rgba(0, 0, 0, 0.5)",
  shadow: "rgba(0, 0, 0, 0.1)",
  backgroundTertiary: "#E5E7EB",
  foreground: "#1F2937",
  foregroundSecondary: "#6B7280",
  foregroundTertiary: "#9CA3AF",
  primaryForeground: "#FFFFFF",
  danger: "#EF4444",
  successLight: "#BBF7D0",
  warningLight: "#FEEBC8",
  info: "#3B82F6",
  infoLight: "#DBEAFE",
}

export const darkColors = {
  primary: "#818CF8", // Indigo
  primaryDark: "#6366F1",
  primaryLight: "#A5B4FC",
  secondary: "#F472B6", // Pink
  secondaryDark: "#EC4899",
  secondaryLight: "#F9A8D4",
  accent: "#A78BFA", // Violet
  accentDark: "#8B5CF6",
  accentLight: "#C4B5FD",
  background: "#111827",
  card: "#1F2937",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  border: "#374151",
  notification: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  highlight: "#78350F",
  surface: "#374151",
  surfaceHover: "#4B5563",
  divider: "#374151",
  overlay: "rgba(0, 0, 0, 0.7)",
  shadow: "rgba(0, 0, 0, 0.3)",
  backgroundTertiary: "#374151",
  foreground: "#F9FAFB",
  foregroundSecondary: "#9CA3AF",
  foregroundTertiary: "#6B7280",
  primaryForeground: "#FFFFFF",
  danger: "#EF4444",
  successLight: "#BBF7D0",
  warningLight: "#FCD34D",
  info: "#3B82F6",
  infoLight: "#DBEAFE",
}

// Gradients
export const gradients = {
  primary: ["#6366F1", "#8B5CF6"],
  secondary: ["#EC4899", "#F472B6"],
  accent: ["#8B5CF6", "#C4B5FD"],
  success: ["#10B981", "#34D399"],
  warning: ["#F59E0B", "#FBBF24"],
  error: ["#EF4444", "#F87171"],
  card: ["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.8)"],
  cardDark: ["rgba(31, 41, 55, 0.9)", "rgba(31, 41, 55, 0.8)"],
}

// Shadows
export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
}

// Border radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
}

// Animation durations
export const animationDurations = {
  fast: 200,
  normal: 300,
  slow: 500,
}

// Animation easing
export const animationEasing = {
  easeIn: "easeIn",
  easeOut: "easeOut",
  easeInOut: "easeInOut",
}

// Z-index
export const zIndex = {
  base: 1,
  drawer: 10,
  modal: 20,
  tooltip: 30,
  toast: 40,
}

// Common styles
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: lightColors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.md,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: lightColors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.md,
  },
  button: {
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
})

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

export const animations = {
  durations: animationDurations,
  easings: animationEasing,
  springs: springConfigs,
  timing: timingConfigs,
  animatedPresets,
  reanimatedPresets,
  createStaggeredAnimation,
  createSequenceAnimation,
}

export default {
  responsive,
  spacing,
  typography,
  lightColors,
  darkColors,
  gradients,
  shadows,
  borderRadius,
  animationDurations,
  animationEasing,
  zIndex,
  commonStyles,
  animations,
}
