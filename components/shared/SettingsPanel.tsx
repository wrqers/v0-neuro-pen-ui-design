"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView } from "react-native"
import { Moon, Sun, Monitor, ArrowLeft, Sliders } from "lucide-react-native"
import { useTheme } from "../../context/ThemeContext"
import { animations } from "../../utils/animations"
import { AnimatedCard } from "./AnimatedCard"

interface SettingsPanelProps {
  onClose: () => void
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { themeMode, setThemeMode, colors, isDark } = useTheme()
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hapticFeedback, setHapticFeedback] = useState(true)

  const handleThemeChange = (mode: "light" | "dark" | "system") => {
    animations.haptics.light()
    setThemeMode(mode)
  }

  const toggleReducedMotion = () => {
    if (hapticFeedback) {
      animations.haptics.light()
    }
    setReducedMotion(!reducedMotion)
    // In a real app, you would store this preference and apply it
  }

  const toggleHapticFeedback = () => {
    if (hapticFeedback) {
      animations.haptics.light()
    }
    setHapticFeedback(!hapticFeedback)
    // In a real app, you would store this preference and apply it
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <ArrowLeft size={24} color={colors.foregroundSecondary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.foreground }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <AnimatedCard delay={100}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Moon size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Appearance</Text>
            </View>

            <Text style={[styles.sectionDescription, { color: colors.foregroundSecondary }]}>
              Customize how NeuroPen looks
            </Text>

            <View style={styles.themeOptions}>
              <TouchableOpacity
                style={[
                  styles.themeOption,
                  themeMode === "light" && styles.selectedThemeOption,
                  { borderColor: themeMode === "light" ? colors.primary : colors.border },
                ]}
                onPress={() => handleThemeChange("light")}
              >
                <Sun size={24} color={themeMode === "light" ? colors.primary : colors.foregroundSecondary} />
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: themeMode === "light" ? colors.primary : colors.foreground },
                  ]}
                >
                  Light
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.themeOption,
                  themeMode === "dark" && styles.selectedThemeOption,
                  { borderColor: themeMode === "dark" ? colors.primary : colors.border },
                ]}
                onPress={() => handleThemeChange("dark")}
              >
                <Moon size={24} color={themeMode === "dark" ? colors.primary : colors.foregroundSecondary} />
                <Text
                  style={[styles.themeOptionText, { color: themeMode === "dark" ? colors.primary : colors.foreground }]}
                >
                  Dark
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.themeOption,
                  themeMode === "system" && styles.selectedThemeOption,
                  { borderColor: themeMode === "system" ? colors.primary : colors.border },
                ]}
                onPress={() => handleThemeChange("system")}
              >
                <Monitor size={24} color={themeMode === "system" ? colors.primary : colors.foregroundSecondary} />
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: themeMode === "system" ? colors.primary : colors.foreground },
                  ]}
                >
                  System
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </AnimatedCard>

        <AnimatedCard delay={200}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Sliders size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Accessibility</Text>
            </View>

            <View style={styles.settingRow}>
              <View>
                <Text style={[styles.settingLabel, { color: colors.foreground }]}>Reduced Motion</Text>
                <Text style={[styles.settingDescription, { color: colors.foregroundSecondary }]}>
                  Minimize animations throughout the app
                </Text>
              </View>
              <Switch
                value={reducedMotion}
                onValueChange={toggleReducedMotion}
                trackColor={{ false: colors.backgroundTertiary, true: colors.primaryLight }}
                thumbColor={reducedMotion ? colors.primary : colors.foregroundTertiary}
              />
            </View>

            <View style={styles.settingRow}>
              <View>
                <Text style={[styles.settingLabel, { color: colors.foreground }]}>Haptic Feedback</Text>
                <Text style={[styles.settingDescription, { color: colors.foregroundSecondary }]}>
                  Subtle vibrations for interactions
                </Text>
              </View>
              <Switch
                value={hapticFeedback}
                onValueChange={toggleHapticFeedback}
                trackColor={{ false: colors.backgroundTertiary, true: colors.primaryLight }}
                thumbColor={hapticFeedback ? colors.primary : colors.foregroundTertiary}
              />
            </View>
          </View>
        </AnimatedCard>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  themeOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  themeOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginHorizontal: 4,
  },
  selectedThemeOption: {
    borderWidth: 2,
  },
  themeOptionText: {
    marginTop: 8,
    fontWeight: "500",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    maxWidth: "80%",
  },
})
