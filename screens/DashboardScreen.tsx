"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, RefreshControl, TouchableOpacity, StatusBar, Platform, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "../context/ThemeContext"
import Button from "../components/ui/Button"
import GradientCard from "../components/ui/GradientCard"
import AnimatedList from "../components/ui/AnimatedList"
import useHaptics from "../hooks/useHaptics"
import { spacing, typography, borderRadius } from "../styles/designSystem"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { Svg, Circle } from "react-native-svg"

// Mock data
const recentNotes = [
  { id: "1", title: "Machine Learning Fundamentals", date: "2 hours ago", tags: ["AI", "ML"] },
  { id: "2", title: "React Native Animation Techniques", date: "1 day ago", tags: ["React", "Mobile"] },
  { id: "3", title: "Cognitive Science Research", date: "3 days ago", tags: ["Science", "Research"] },
  { id: "4", title: "Design Systems for Mobile Apps", date: "1 week ago", tags: ["Design", "UX"] },
]

const flashcardDecks = [
  { id: "1", title: "Neuroscience Terms", cards: 42, progress: 0.75 },
  { id: "2", title: "Programming Concepts", cards: 28, progress: 0.3 },
  { id: "3", title: "Design Principles", cards: 15, progress: 0.9 },
]

const projects = [
  { id: "1", title: "Research Paper", items: 12, collaborators: 2 },
  { id: "2", title: "App Development", items: 8, collaborators: 3 },
  { id: "3", title: "Learning Journal", items: 24, collaborators: 0 },
]

const DashboardScreen = ({ navigation }: any) => {
  const { colors, isDark } = useTheme()
  const haptics = useHaptics()
  const [refreshing, setRefreshing] = useState(false)
  const [greeting, setGreeting] = useState("")
  const scrollY = new Animated.Value(0)

  // Set greeting based on time of day
  useEffect(() => {
    const hours = new Date().getHours()
    if (hours < 12) {
      setGreeting("Good Morning")
    } else if (hours < 18) {
      setGreeting("Good Afternoon")
    } else {
      setGreeting("Good Evening")
    }
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false)
      haptics.success()
    }, 1500)
  }

  // Animated header opacity based on scroll position
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  })

  // Animated header height based on scroll position
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 100],
    extrapolate: "clamp",
  })

  // Render progress ring for flashcard decks
  const ProgressRing = ({ progress }: { progress: number }) => {
    const size = 40
    const strokeWidth = 3
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDashoffset = circumference - progress * circumference

    return (
      <View style={{ width: size, height: size }}>
        <View style={styles.progressRingBackground} />
        <Svg width={size} height={size} style={styles.progressRingSvg}>
          <Circle
            stroke={colors.primary}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </Svg>
        <View style={styles.progressRingTextContainer}>
          <Text style={[styles.progressRingText, { color: colors.primary }]}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />

      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            opacity: headerOpacity,
          },
        ]}
      >
        <LinearGradient colors={isDark ? ["#1F2937", "#111827"] : ["#F9FAFB", "#F3F4F6"]} style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <Text style={[styles.greeting, { color: colors.text }]}>{greeting}</Text>
            <Text style={[styles.username, { color: colors.text }]}>Alex</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary, colors.secondary]}
          />
        }
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <GradientCard
              style={styles.quickActionCard}
              gradientColors={["#6366F1", "#8B5CF6"]}
              onPress={() => {
                haptics.medium()
                navigation.navigate("Notes")
              }}
            >
              <View style={styles.quickActionContent}>
                <Feather name="edit-3" size={24} color="#FFFFFF" />
                <Text style={styles.quickActionText}>New Note</Text>
              </View>
            </GradientCard>

            <GradientCard
              style={styles.quickActionCard}
              gradientColors={["#EC4899", "#F472B6"]}
              onPress={() => {
                haptics.medium()
                navigation.navigate("Flashcards")
              }}
            >
              <View style={styles.quickActionContent}>
                <Feather name="layers" size={24} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Review Cards</Text>
              </View>
            </GradientCard>

            <GradientCard
              style={styles.quickActionCard}
              gradientColors={["#10B981", "#34D399"]}
              onPress={() => {
                haptics.medium()
                navigation.navigate("Documents")
              }}
            >
              <View style={styles.quickActionContent}>
                <Feather name="file-text" size={24} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Scan Document</Text>
              </View>
            </GradientCard>

            <GradientCard
              style={styles.quickActionCard}
              gradientColors={["#F59E0B", "#FBBF24"]}
              onPress={() => {
                haptics.medium()
                navigation.navigate("Projects")
              }}
            >
              <View style={styles.quickActionContent}>
                <Feather name="grid" size={24} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Knowledge Board</Text>
              </View>
            </GradientCard>
          </View>
        </View>

        {/* Recent Notes */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Notes</Text>
            <TouchableOpacity
              onPress={() => {
                haptics.selection()
                navigation.navigate("Notes")
              }}
            >
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>

          <AnimatedList
            data={recentNotes}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            animationType="slide"
            renderItem={({ item, animatedValue }) => (
              <GradientCard
                style={styles.noteCard}
                onPress={() => {
                  haptics.light()
                  navigation.navigate("NoteDetail", { id: item.id })
                }}
              >
                <Text style={[styles.noteTitle, { color: colors.text }]} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={[styles.noteDate, { color: colors.textSecondary }]}>{item.date}</Text>
                <View style={styles.tagContainer}>
                  {item.tags.map((tag, index) => (
                    <View key={index} style={[styles.tag, { backgroundColor: colors.primary + "20" }]}>
                      <Text style={[styles.tagText, { color: colors.primary }]}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </GradientCard>
            )}
          />
        </View>

        {/* Flashcard Decks */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Flashcard Decks</Text>
            <TouchableOpacity
              onPress={() => {
                haptics.selection()
                navigation.navigate("Flashcards")
              }}
            >
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>

          <AnimatedList
            data={flashcardDecks}
            animationType="fade"
            contentContainerStyle={styles.verticalListContent}
            renderItem={({ item }) => (
              <GradientCard
                style={styles.deckCard}
                onPress={() => {
                  haptics.light()
                  navigation.navigate("FlashcardDeck", { id: item.id })
                }}
              >
                <View style={styles.deckCardContent}>
                  <View style={styles.deckInfo}>
                    <Text style={[styles.deckTitle, { color: colors.text }]}>{item.title}</Text>
                    <Text style={[styles.deckSubtitle, { color: colors.textSecondary }]}>{item.cards} cards</Text>
                  </View>
                  <View style={styles.deckProgress}>
                    <ProgressRing progress={item.progress} />
                  </View>
                </View>
              </GradientCard>
            )}
          />
        </View>

        {/* Projects */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Projects</Text>
            <TouchableOpacity
              onPress={() => {
                haptics.selection()
                navigation.navigate("Projects")
              }}
            >
              <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>

          <AnimatedList
            data={projects}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            animationType="scale"
            renderItem={({ item }) => (
              <GradientCard
                style={styles.projectCard}
                gradientColors={isDark ? ["#374151", "#1F2937"] : ["#FFFFFF", "#F9FAFB"]}
                onPress={() => {
                  haptics.light()
                  navigation.navigate("ProjectDetail", { id: item.id })
                }}
              >
                <Text style={[styles.projectTitle, { color: colors.text }]}>{item.title}</Text>
                <View style={styles.projectStats}>
                  <View style={styles.projectStat}>
                    <MaterialCommunityIcons name="note-text-outline" size={16} color={colors.textSecondary} />
                    <Text style={[styles.projectStatText, { color: colors.textSecondary }]}>{item.items} items</Text>
                  </View>
                  {item.collaborators > 0 && (
                    <View style={styles.projectStat}>
                      <MaterialCommunityIcons name="account-group-outline" size={16} color={colors.textSecondary} />
                      <Text style={[styles.projectStatText, { color: colors.textSecondary }]}>
                        {item.collaborators} collaborators
                      </Text>
                    </View>
                  )}
                </View>
              </GradientCard>
            )}
          />
        </View>

        {/* Start Learning Button */}
        <View style={styles.startLearningContainer}>
          <GradientCard style={styles.startLearningCard} gradientColors={["#6366F1", "#8B5CF6"]}>
            <View style={styles.startLearningContent}>
              <Text style={styles.startLearningTitle}>Ready to learn?</Text>
              <Text style={styles.startLearningSubtitle}>Start a focused learning session with AI assistance</Text>
              <Button
                title="Start Learning"
                variant="gradient"
                gradientColors={["#FFFFFF", "#F3F4F6"]}
                textStyle={{ color: "#6366F1" }}
                onPress={() => {
                  haptics.medium()
                  navigation.navigate("LearningSession")
                }}
                icon={<Feather name="play" size={16} color="#6366F1" />}
              />
            </View>
          </GradientCard>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: "hidden",
  },
  headerGradient: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight || 0,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
  },
  greeting: {
    fontSize: typography.fontSize.lg,
    fontWeight: "500",
  },
  username: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: "bold",
    marginTop: spacing.xs,
  },
  scrollContent: {
    paddingTop: 200, // Match initial header height
    paddingBottom: spacing.xxl,
  },
  quickActionsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: spacing.md,
  },
  quickActionCard: {
    width: "48%",
    marginBottom: spacing.md,
  },
  quickActionContent: {
    alignItems: "center",
    padding: spacing.md,
  },
  quickActionText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginTop: spacing.sm,
    fontSize: typography.fontSize.md,
  },
  sectionContainer: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: typography.fontSize.sm,
    fontWeight: "600",
  },
  horizontalListContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  verticalListContent: {
    paddingHorizontal: spacing.lg,
  },
  noteCard: {
    width: 200,
    marginRight: spacing.md,
  },
  noteTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  noteDate: {
    fontSize: typography.fontSize.xs,
    marginBottom: spacing.sm,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  tagText: {
    fontSize: typography.fontSize.xs,
    fontWeight: "500",
  },
  deckCard: {
    marginBottom: spacing.md,
  },
  deckCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deckInfo: {
    flex: 1,
  },
  deckTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  deckSubtitle: {
    fontSize: typography.fontSize.sm,
  },
  deckProgress: {
    marginLeft: spacing.md,
  },
  progressRingBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 999,
    opacity: 0.2,
  },
  progressRingSvg: {
    position: "absolute",
    transform: [{ rotate: "-90deg" }],
  },
  progressRingTextContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  progressRingText: {
    fontSize: typography.fontSize.xs,
    fontWeight: "bold",
  },
  projectCard: {
    width: 180,
    marginRight: spacing.md,
  },
  projectTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  projectStats: {
    gap: spacing.xs,
  },
  projectStat: {
    flexDirection: "row",
    alignItems: "center",
  },
  projectStatText: {
    fontSize: typography.fontSize.xs,
    marginLeft: spacing.xs,
  },
  startLearningContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  startLearningCard: {
    width: "100%",
  },
  startLearningContent: {
    padding: spacing.md,
    alignItems: "center",
  },
  startLearningTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: spacing.xs,
  },
  startLearningSubtitle: {
    fontSize: typography.fontSize.sm,
    color: "#FFFFFF",
    opacity: 0.9,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
})

export default DashboardScreen
