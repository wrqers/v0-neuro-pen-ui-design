"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, TouchableOpacity, Platform, StyleSheet, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Search, Menu, Command } from "lucide-react-native"
import { GlobalSearchBar } from "../shared/GlobalSearchBar"
import { ThemeToggle } from "../shared/ThemeToggle"
import { useTheme } from "../../context/ThemeContext"
import { animations } from "../../utils/animations"

export function Header() {
  const [showSearch, setShowSearch] = useState(false)
  const { colors } = useTheme()

  // Animation for search bar
  const searchBarAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(searchBarAnim, {
      toValue: showSearch ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [showSearch, searchBarAnim])

  const handleSearchToggle = () => {
    if (!showSearch) {
      animations.haptics.light()
    }
    setShowSearch(!showSearch)
  }

  const searchBarTranslateY = searchBarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  })

  const searchBarOpacity = searchBarAnim

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <View style={styles.content}>
        {showSearch ? (
          <Animated.View
            style={[
              styles.searchContainer,
              { opacity: searchBarOpacity, transform: [{ translateY: searchBarTranslateY }] },
            ]}
          >
            <GlobalSearchBar onClose={handleSearchToggle} />
          </Animated.View>
        ) : (
          <>
            <View style={styles.leftSection}>
              <TouchableOpacity style={[styles.menuButton, { display: Platform.OS === "web" ? "none" : "flex" }]}>
                <Menu size={24} color={colors.foregroundSecondary} />
              </TouchableOpacity>
              <Text style={[styles.title, { color: colors.foreground }]}>NeuroPen</Text>
            </View>
            <View style={styles.rightSection}>
              <TouchableOpacity
                style={[styles.iconButton, { backgroundColor: colors.backgroundTertiary }]}
                onPress={handleSearchToggle}
              >
                <Search size={20} color={colors.foregroundSecondary} />
              </TouchableOpacity>

              <ThemeToggle className="mx-2" />

              {Platform.OS !== "web" && (
                <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.backgroundTertiary }]}>
                  <Command size={20} color={colors.foregroundSecondary} />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 9999,
  },
  searchContainer: {
    flex: 1,
  },
})
