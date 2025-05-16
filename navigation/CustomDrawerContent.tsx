"use client"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../context/ThemeContext"
import useHaptics from "../hooks/useHaptics"
import { spacing, typography, borderRadius } from "../styles/designSystem"
import { Feather } from "@expo/vector-icons"

const CustomDrawerContent = (props: any) => {
  const { colors, isDark, toggleTheme } = useTheme()
  const haptics = useHaptics()

  const menuItems = [
    { icon: "home", label: "Dashboard", screen: "Dashboard" },
    { icon: "edit-3", label: "Notes", screen: "Notes" },
    { icon: "layers", label: "Flashcards", screen: "Flashcards" },
    { icon: "file-text", label: "Documents", screen: "Documents" },
    { icon: "grid", label: "Knowledge Board", screen: "Projects" },
  ]

  const bottomMenuItems = [
    { icon: "settings", label: "Settings", screen: "Settings" },
    { icon: "help-circle", label: "Help", screen: "Help" },
  ]

  const handleNavigation = (screen: string) => {
    haptics.light()
    props.navigation.navigate(screen)
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient colors={isDark ? ["#374151", "#1F2937"] : ["#F9FAFB", "#F3F4F6"]} style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: "https://i.pravatar.cc/150?img=12" }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>Alex Johnson</Text>
            <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>alex@example.com</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Main Menu */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              props.state.index === index && {
                backgroundColor: colors.primary + "15",
              },
            ]}
            onPress={() => handleNavigation(item.screen)}
          >
            <Feather
              name={item.icon as any}
              size={20}
              color={props.state.index === index ? colors.primary : colors.textSecondary}
            />
            <Text
              style={[
                styles.menuItemText,
                {
                  color: props.state.index === index ? colors.primary : colors.text,
                },
              ]}
            >
              {item.label}
            </Text>
            {props.state.index === index && (
              <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />
            )}
          </TouchableOpacity>
        ))}

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Bottom Menu */}
        {bottomMenuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={() => handleNavigation(item.screen)}>
            <Feather name={item.icon as any} size={20} color={colors.textSecondary} />
            <Text style={[styles.menuItemText, { color: colors.text }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.themeToggle, { backgroundColor: colors.surface }]}
          onPress={() => {
            toggleTheme()
            haptics.medium()
          }}
        >
          <Feather name={isDark ? "sun" : "moon"} size={18} color={colors.text} />
          <Text style={[styles.themeToggleText, { color: colors.text }]}>{isDark ? "Light Mode" : "Dark Mode"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileInfo: {
    marginLeft: spacing.md,
  },
  profileName: {
    fontSize: typography.fontSize.lg,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: typography.fontSize.sm,
  },
  menuContainer: {
    flex: 1,
    paddingTop: spacing.md,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    position: "relative",
  },
  menuItemText: {
    marginLeft: spacing.md,
    fontSize: typography.fontSize.md,
    fontWeight: "500",
  },
  activeIndicator: {
    position: "absolute",
    left: 0,
    top: "25%",
    bottom: "25%",
    width: 3,
    borderTopRightRadius: borderRadius.sm,
    borderBottomRightRadius: borderRadius.sm,
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
    marginHorizontal: spacing.lg,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
  },
  themeToggle: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  themeToggleText: {
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.sm,
    fontWeight: "500",
  },
})

export default CustomDrawerContent
