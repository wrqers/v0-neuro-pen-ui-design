"use client"

import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Plus, Search, Filter, Trash, Archive } from "lucide-react-native"
import { useTheme } from "../../context/ThemeContext"
import { AnimatedList } from "../../components/shared/AnimatedList"
import { SwipeableCard } from "../../components/shared/SwipeableCard"
import { AnimatedButton } from "../../components/shared/AnimatedButton"
import { FloatingNewNoteButton } from "../../components/notes/FloatingNewNoteButton"
import { animations } from "../../utils/animations"

// Mock data
const mockNotes = [
  {
    id: "1",
    title: "Understanding Neuroplasticity",
    snippet:
      "The brain's ability to reorganize itself by forming new neural connections throughout life. Neuroplasticity allows the neurons in the brain to compensate for injury and disease...",
    tags: ["neuroscience", "brain", "learning"],
    date: "May 10, 2024",
  },
  {
    id: "2",
    title: "Learning Techniques",
    snippet:
      "Effective learning strategies based on cognitive science research. Includes spaced repetition, active recall, interleaving, and elaboration techniques...",
    tags: ["learning", "productivity"],
    date: "May 8, 2024",
  },
  {
    id: "3",
    title: "Memory Models",
    snippet:
      "Different models explaining how memory works, including the multi-store model, working memory model, and levels of processing theory...",
    tags: ["memory", "psychology"],
    date: "May 5, 2024",
  },
  {
    id: "4",
    title: "Cognitive Biases",
    snippet:
      "Common cognitive biases that affect decision making and learning, including confirmation bias, availability heuristic, and anchoring effect...",
    tags: ["psychology", "thinking"],
    date: "May 3, 2024",
  },
  {
    id: "5",
    title: "Study Plan for Neuroscience",
    snippet:
      "Structured approach to learning key concepts in neuroscience, from basic neural anatomy to complex cognitive functions...",
    tags: ["study", "neuroscience"],
    date: "April 30, 2024",
  },
]

export function NotesScreen() {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [notes, setNotes] = useState(mockNotes)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleRefresh = () => {
    setRefreshing(true)

    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  const handleNotePress = (id: string) => {
    animations.haptics.light()
    navigation.navigate("NoteDetail", { id })
  }

  const handleCreateNote = () => {
    animations.haptics.medium()
    navigation.navigate("NoteEditor")
  }

  const handleCreateFlashcard = () => {
    animations.haptics.medium()
    navigation.navigate("FlashcardEditor")
  }

  const handleImportDocument = () => {
    animations.haptics.medium()
    navigation.navigate("DocumentsList")
  }

  const handleArchiveNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    // In a real app, you would update the note status in the database
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    // In a real app, you would delete the note from the database
  }

  const renderNoteItem = ({ item }: { item: (typeof mockNotes)[0] }) => {
    return (
      <SwipeableCard
        onSwipeLeft={() => handleDeleteNote(item.id)}
        onSwipeRight={() => handleArchiveNote(item.id)}
        leftAction={{
          label: "Archive",
          color: colors.warning,
          icon: <Archive size={20} color="white" />,
        }}
        rightAction={{
          label: "Delete",
          color: colors.danger,
          icon: <Trash size={20} color="white" />,
        }}
      >
        <View style={styles.noteCard}>
          <Text style={[styles.noteTitle, { color: colors.foreground }]}>{item.title}</Text>
          <Text style={[styles.noteSnippet, { color: colors.foregroundSecondary }]} numberOfLines={2}>
            {item.snippet}
          </Text>

          <View style={styles.tagsContainer}>
            {item.tags.map((tag, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.tagText, { color: colors.primary }]}>{tag}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.noteDate, { color: colors.foregroundTertiary }]}>{item.date}</Text>
        </View>
      </SwipeableCard>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Notes</Text>

        <View style={styles.actions}>
          <AnimatedButton
            title="Search"
            variant="secondary"
            size="sm"
            leftIcon={<Search size={16} color={colors.foregroundSecondary} />}
            style={styles.actionButton}
            onPress={() => {}}
          />

          <AnimatedButton
            title="Filter"
            variant="secondary"
            size="sm"
            leftIcon={<Filter size={16} color={colors.foregroundSecondary} />}
            style={styles.actionButton}
            onPress={() => {}}
          />

          <AnimatedButton
            title="New Note"
            variant="primary"
            size="sm"
            leftIcon={<Plus size={16} color="white" />}
            onPress={handleCreateNote}
          />
        </View>
      </View>

      <AnimatedList
        data={notes}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        itemAnimation="slide"
        staggerDelay={80}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.foregroundSecondary }]}>
              No notes found. Create your first note!
            </Text>
            <AnimatedButton
              title="Create Note"
              variant="primary"
              leftIcon={<Plus size={16} color="white" />}
              onPress={handleCreateNote}
              style={styles.emptyButton}
            />
          </View>
        }
      />

      <FloatingNewNoteButton
        onCreateNote={handleCreateNote}
        onCreateFlashcard={handleCreateFlashcard}
        onImportDocument={handleImportDocument}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginRight: 8,
  },
  listContent: {
    padding: 16,
  },
  noteCard: {
    padding: 16,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  noteSnippet: {
    fontSize: 14,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  noteDate: {
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  emptyButton: {
    minWidth: 150,
  },
})
