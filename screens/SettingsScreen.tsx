"use client"

import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { SettingsPanel } from "../components/shared/SettingsPanel"
import { useTheme } from "../context/ThemeContext"

export function SettingsScreen() {
  const { colors } = useTheme()
  const [showSettings, setShowSettings] = useState(true)

  const handleClose = () => {
    setShowSettings(false)
    // In a real app, this would navigate back
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {showSettings && <SettingsPanel onClose={handleClose} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
