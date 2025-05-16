"use client"
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Animated, { useAnimatedStyle, withTiming, withSpring } from "react-native-reanimated"
import { useTheme } from "../context/ThemeContext"
import { animations } from "../utils/animations"

export function TabBar({ state, descriptors, navigation }: any) {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          paddingBottom: Platform.OS === "ios" ? insets.bottom : 8,
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key]
        const label = options.tabBarLabel || options.title || route.name
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            animations.haptics.light()
            navigation.navigate(route.name)
          }
        }

        return (
          <TabItem key={route.key} label={label} icon={options.tabBarIcon} isFocused={isFocused} onPress={onPress} />
        )
      })}
    </View>
  )
}

function TabItem({ label, icon, isFocused, onPress }: any) {
  const { colors } = useTheme()

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isFocused ? 1.1 : 1, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
    }
  }, [isFocused])

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isFocused ? 1 : 0.7, { duration: 200 }),
      transform: [
        {
          translateY: withTiming(isFocused ? 0 : 2, { duration: 200 }),
        },
      ],
    }
  }, [isFocused])

  return (
    <TouchableOpacity style={styles.tab} onPress={onPress} activeOpacity={0.7}>
      <Animated.View style={animatedIconStyle}>
        {icon({ color: isFocused ? colors.primary : colors.foregroundSecondary, size: 24 })}
      </Animated.View>

      <Animated.Text
        style={[
          styles.label,
          {
            color: isFocused ? colors.primary : colors.foregroundSecondary,
            fontWeight: isFocused ? "600" : "normal",
          },
          animatedLabelStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
})
