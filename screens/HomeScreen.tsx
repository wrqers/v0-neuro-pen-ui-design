"use client"

import type React from "react"
import { useState } from "react"
import { View, StyleSheet, Text, ScrollView, useWindowDimensions, RefreshControl } from "react-native"
import { useNavigation } from "@react-navigation/native"
import {
  FileText,
  Brain,
  BookOpen,
  Square3Stack3D,
  Search,
  Plus,
  Sparkles,
  TrendingUp,
  Clock,
  Star,
} from "lucide-react-native"
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated"
import { useTheme } from "../context/ThemeContext"
import { AnimatedCard } from "../components/ui/AnimatedCard"
import { GradientCard } from "../components/ui/GradientCard"
import { Button } from "../components/ui/Button"
import { spacing, borderRadius } from "../styles/designSystem"
import { useTapHaptics } from "../hooks/useHaptics"

// Mock data
const recentNotes = [
  {
    id: "1",
    title: "Understanding Neuroplasticity",
    snippet:
      "The brain's ability to reorganize itself by forming new neural connections throughout life. Neuroplasticity allows the neurons in the brain to compensate for injury and disease...",
    tags: ["neuroscience", "brain", "learning"],
    date: "2 hours ago",
  },
  {
    id: "2",
    title: "Learning Techniques",
    snippet:
      "Effective learning strategies based on cognitive science research. Includes spaced repetition, active recall, interleaving, and elaboration techniques...",
    tags: ["learning", "productivity"],
    date: "Yesterday",
  },
  {
    id: "3",
    title: "Memory Models",
    snippet:
      "Different models explaining how memory works, including the multi-store model, working memory model, and levels of processing theory...",
    tags: ["memory", "psychology"],
    date: "3 days ago",
  },
]

const flashcardDecks = [
  {
    id: "1",
    title: "Neuroscience Basics",
    count: 24,
    progress: 75,
    dueCards: 8,
  },
  {
    id: "2",
    title: "Learning Techniques",
    count: 18,
    progress: 60,
    dueCards: 3,
  },
  {
    id: "3",
    title: "Cognitive Psychology",
    count: 31,
    progress: 40,
    dueCards: 12,
  },
]

const projects = [
  {
    id: "1",
    title: "Thesis Research",
    description: "Research notes and materials for my thesis on cognitive development",
    lastEdited: "1 day ago",
  },
  {
    id: "2",
    title: "Learning Journal",
    description: "Tracking my learning progress and insights",
    lastEdited: "3 days ago",
  },
]

export function HomeScreen() {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const { width } = useWindowDimensions()
  const isTablet = width >= 768
  const triggerHaptics = useTapHaptics()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  const handleNotePress = (id: string) => {
    triggerHaptics("light")
    navigation.navigate("NoteDetail", { id })
  }

  const handleDeckPress = (id: string) => {
    triggerHaptics("light")
    navigation.navigate("FlashcardReview", { id })
  }

  const handleProjectPress = (id: string) => {
    triggerHaptics("light")
    navigation.navigate("ProjectCanvas", { id })
  }

  const handleCreateNote = () => {
    triggerHaptics("medium")
    navigation.navigate("NoteEditor")
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={colors.primary}
          colors={[colors.primary]}
        />
      }
    >
      {/* Welcome Section */}
      <Animated.View entering={FadeInDown.duration(600).springify()}>
        <GradientCard
          title="Welcome back!"
          subtitle="Continue where you left off"
          colors={colors.gradientPrimary}
          style={styles.welcomeCard}
        >
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <TrendingUp size={20} color="white" />
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
            <View style={styles.statItem}>
              <Clock size={20} color="white" />
              <Text style={styles.statValue}>23</Text>
              <Text style={styles.statLabel}>Due Cards</Text>
            </View>
            <View style={styles.statItem}>
              <Star size={20} color="white" />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Streaks</Text>
            </View>
          </View>

          <View style={styles.welcomeActions}>
            <Button
              title="Quick Review"
              variant="secondary"
              leftIcon={<Brain size={16} color={colors.foreground} />}
              style={styles.welcomeButton}
              onPress={() => navigation.navigate("FlashcardReview")}
            />
            <Button
              title="New Note"
              variant="secondary"
              leftIcon={<Plus size={16} color={colors.foreground} />}
              style={styles.welcomeButton}
              onPress={handleCreateNote}
            />
          </View>
        </GradientCard>
      </Animated.View>

      {/* Quick Actions */}
      <Animated.View style={styles.quickActionsContainer} entering={FadeInDown.delay(100).duration(600).springify()}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Quick Actions</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
          <QuickActionButton
            icon={<FileText size={24} color={colors.primary} />}
            title="New Note"
            onPress={handleCreateNote}
            delay={0}
          />
          <QuickActionButton
            icon={<Brain size={24} color={colors.accent} />}
            title="Create Flashcards"
            onPress={() => navigation.navigate("FlashcardEditor")}
            delay={50}
          />
          <QuickActionButton
            icon={<BookOpen size={24} color={colors.success} />}
            title="Import Document"
            onPress={() => navigation.navigate("DocumentsList")}
            delay={100}
          />
          <QuickActionButton
            icon={<Square3Stack3D size={24} color={colors.warning} />}
            title="New Project"
            onPress={() => navigation.navigate("ProjectCanvas")}
            delay={150}
          />
          <QuickActionButton
            icon={<Search size={24} color={colors.info} />}
            title="Search"
            onPress={() => {}}
            delay={200}
          />
        </ScrollView>
      </Animated.View>

      {/* Recent Notes */}
      <Animated.View style={styles.section} entering={FadeInDown.delay(200).duration(600).springify()}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent Notes</Text>
          <Button title="See All" variant="ghost" size="sm" onPress={() => navigation.navigate("Notes")} />
        </View>

        {recentNotes.map((note, index) => (
          <AnimatedCard
            key={note.id}
            onPress={() => handleNotePress(note.id)}
            delay={index * 100}
            animationType="slide"
            style={styles.noteCard}
          >
            <View style={styles.noteContent}>
              <Text style={[styles.noteTitle, { color: colors.foreground }]}>{note.title}</Text>
              <Text style={[styles.noteSnippet, { color: colors.foregroundSecondary }]} numberOfLines={2}>
                {note.snippet}
              </Text>

              <View style={styles.tagsContainer}>
                {note.tags.map((tag, idx) => (
                  <View key={idx} style={[styles.tag, { backgroundColor: colors.primaryLight }]}>
                    <Text style={[styles.tagText, { color: colors.primary }]}>{tag}</Text>
                  </View>
                ))}
              </View>

              <Text style={[styles.noteDate, { color: colors.foregroundTertiary }]}>{note.date}</Text>
            </View>
          </AnimatedCard>
        ))}
      </Animated.View>

      {/* Flashcard Decks */}
      <Animated.View style={styles.section} entering={FadeInDown.delay(300).duration(600).springify()}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Flashcard Decks</Text>
          <Button title="See All" variant="ghost" size="sm" onPress={() => navigation.navigate("Flashcards")} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.decksContainer}>
          {flashcardDecks.map((deck, index) => (
            <AnimatedCard
              key={deck.id}
              onPress={() => handleDeckPress(deck.id)}
              delay={index * 100}
              animationType="scale"
              style={styles.deckCard}
            >
              <View style={styles.deckContent}>
                <View style={[styles.deckIcon, { backgroundColor: colors.accentLight }]}>
                  <Brain size={24} color={colors.accent} />
                </View>

                <Text style={[styles.deckTitle, { color: colors.foreground }]}>{deck.title}</Text>

                <View style={styles.deckStats}>
                  <Text style={[styles.deckCount, { color: colors.foregroundSecondary }]}>{deck.count} cards</Text>
                  <View style={[styles.dueIndicator, { backgroundColor: colors.warning }]}>
                    <Text style={styles.dueText}>{deck.dueCards} due</Text>
                  </View>
                </View>

                <View style={[styles.progressBar, { backgroundColor: colors.backgroundTertiary }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        backgroundColor: colors.accent,
                        width: `${deck.progress}%`,
                      },
                    ]}
                  />
                </View>

                <Text style={[styles.progressText, { color: colors.foregroundSecondary }]}>
                  {deck.progress}% Mastered
                </Text>
              </View>
            </AnimatedCard>
          ))}

          <AnimatedCard
            delay={flashcardDecks.length * 100}
            animationType="scale"
            style={[styles.deckCard, styles.newDeckCard]}
          >
            <View style={[styles.newDeckContent, { borderColor: colors.border }]}>
              <Plus size={32} color={colors.foregroundTertiary} />
              <Text style={[styles.newDeckText, { color: colors.foregroundSecondary }]}>Create New Deck</Text>
            </View>
          </AnimatedCard>
        </ScrollView>
      </Animated.View>

      {/* Projects */}
      <Animated.View style={styles.section} entering={FadeInDown.delay(400).duration(600).springify()}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Projects</Text>
          <Button title="See All" variant="ghost" size="sm" onPress={() => navigation.navigate("Projects")} />
        </View>

        {projects.map((project, index) => (
          <AnimatedCard
            key={project.id}
            onPress={() => handleProjectPress(project.id)}
            delay={index * 100}
            animationType="fade"
            style={styles.projectCard}
          >
            <View style={styles.projectContent}>
              <View style={[styles.projectIcon, { backgroundColor: colors.warningLight }]}>
                <Square3Stack3D size={24} color={colors.warning} />
              </View>

              <View style={styles.projectInfo}>
                <Text style={[styles.projectTitle, { color: colors.foreground }]}>{project.title}</Text>
                <Text style={[styles.projectDescription, { color: colors.foregroundSecondary }]} numberOfLines={2}>
                  {project.description}
                </Text>
                <Text style={[styles.projectDate, { color: colors.foregroundTertiary }]}>
                  Last edited {project.lastEdited}
                </Text>
              </View>
            </View>
          </AnimatedCard>
        ))}

        <Button
          title="Create New Project"
          variant="outline"
          leftIcon={<Plus size={16} color={colors.primary} />}
          style={styles.newProjectButton}
          fullWidth
          onPress={() => navigation.navigate("ProjectCanvas")}
        />
      </Animated.View>

      {/* AI Assistant */}
      <Animated.View
        style={[styles.section, styles.aiSection]}
        entering={FadeInDown.delay(500).duration(600).springify()}
      >
        <GradientCard colors={colors.gradientAccent} style={styles.aiCard}>
          <View style={styles.aiContent}>
            <Sparkles size={32} color="white" />
            <Text style={styles.aiTitle}>AI Assistant</Text>
            <Text style={styles.aiDescription}>
              Get help with your notes, flashcards, and projects using our AI assistant.
            </Text>
            <Button title="Ask AI" variant="secondary" style={styles.aiButton} onPress={() => {}} />
          </View>
        </GradientCard>
      </Animated.View>
    </ScrollView>
  )
}

// Quick Action Button Component
function QuickActionButton({
  icon,
  title,
  onPress,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  onPress: () => void
  delay?: number
}) {
  const { colors } = useTheme()
  const triggerHaptics = useTapHaptics()

  const handlePress = () => {
    triggerHaptics("light")
    onPress()
  }

  return (
    <Animated.View entering={FadeInRight.delay(delay).duration(400)}>
      <AnimatedCard
        onPress={handlePress}
        style={styles.quickActionCard}
        contentStyle={styles.quickActionContent}
        animationType="scale"
      >
        <View style={styles.quickActionIcon}>{icon}</View>
        <Text style={[styles.quickActionTitle, { color: colors.foreground }]}>{title}</Text>
      </AnimatedCard>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
  },
  welcomeCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: spacing.md,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
  },
  welcomeActions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  welcomeButton: {
    marginHorizontal: spacing.xs,
    minWidth: 120,
  },
  quickActionsContainer: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  quickActionsScroll: {
    paddingRight: spacing.md,
  },
  quickActionCard: {
    marginRight: spacing.sm,
    width: 100,
    height: 100,
    borderRadius: borderRadius.md,
  },
  quickActionContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.sm,
  },
  quickActionIcon: {
    marginBottom: spacing.xs,
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  noteCard: {
    marginBottom: spacing.md,
  },
  noteContent: {
    padding: spacing.md,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  noteSnippet: {
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.xs,
  },
  tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
})
