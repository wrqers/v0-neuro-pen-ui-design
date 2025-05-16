"use client"

import type React from "react"
import { View, useWindowDimensions, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { SidebarNav } from "./SidebarNav"
import { BottomTabNav } from "./BottomTabNav"
import { Header } from "./Header"
import { useTheme } from "../../context/ThemeContext"
import Animated, { useAnimatedStyle, withTiming, Easing } from "react-native-reanimated"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { width } = useWindowDimensions()
  const isTablet = width >= 768
  const { isDark, colors } = useTheme()

  // Create animated styles for theme transitions
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isDark ? colors.background : colors.background, {
        duration: 300,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
    }
  }, [isDark, colors])

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {isTablet && <SidebarNav />}
          <View style={styles.mainContent}>
            <Header />
            <View style={styles.childrenContainer}>{children}</View>
            {!isTablet && <BottomTabNav />}
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  mainContent: {
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
  },
})
