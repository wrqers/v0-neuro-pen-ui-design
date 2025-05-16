"use client"

import { useState } from "react"
import { View, FlatList, StyleSheet } from "react-native"
import { NotePreviewCard } from "../components/notes/NotePreviewCard"
import { FloatingNewNoteButton } from "../components/notes/FloatingNewNoteButton"
import { useTheme } from "../context/ThemeContext"
import { animations } from "../utils/animations"

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

export function NotesListScreen() {
  const { colors } = useTheme()
  const [notes, setNotes] = useState(mockNotes)

  const handleNotePress = (id: string) => {
    animations.haptics.light()
    console.log(`Note pressed: ${id}`)
    // Navigation would go here
  }

  const handleCreateNote = () => {
    animations.haptics.medium()
    console.log("Create note")
    // Navigation to note editor would go here
  }

  const handleCreateFlashcard = () => {
    animations.haptics.medium()
    console.log("Create flashcard")
    // Navigation to flashcard editor would go here
  }

  const handleImportDocument = () => {
    animations.haptics.medium()
    console.log("Import document")
    // Document import logic would go here
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <NotePreviewCard
            title={item.title}
            snippet={item.snippet}
            tags={item.tags}
            date={item.date}
            onPress={() => handleNotePress(item.id)}
            delay={index * 100} // Staggered animation
          />
        )}
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
  listContent: {
    padding: 16,
  },
})
