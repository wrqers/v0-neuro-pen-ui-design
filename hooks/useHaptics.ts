import * as Haptics from "expo-haptics"
import { Platform } from "react-native"

type HapticType = "light" | "medium" | "heavy" | "success" | "warning" | "error" | "selection"

const useHaptics = () => {
  const isSupported = Platform.OS === "ios" || Platform.OS === "android"

  const trigger = async (type: HapticType = "light") => {
    if (!isSupported) return

    try {
      switch (type) {
        case "light":
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          break
        case "medium":
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          break
        case "heavy":
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          break
        case "success":
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          break
        case "warning":
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
          break
        case "error":
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
          break
        case "selection":
          await Haptics.selectionAsync()
          break
        default:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
    } catch (error) {
      console.error("Haptic feedback error:", error)
    }
  }

  return {
    trigger,
    light: () => trigger("light"),
    medium: () => trigger("medium"),
    heavy: () => trigger("heavy"),
    success: () => trigger("success"),
    warning: () => trigger("warning"),
    error: () => trigger("error"),
    selection: () => trigger("selection"),
  }
}

export default useHaptics
