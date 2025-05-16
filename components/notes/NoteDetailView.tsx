import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native"
import { Edit2, ArrowLeft, BookOpen, Brain, Share2 } from "lucide-react-native"
import { TagChip } from "../shared/TagChip"
import { NoteSidebar } from "./NoteSidebar"

interface NoteDetailViewProps {
  onEdit: () => void
  onBack: () => void
}

export function NoteDetailView({ onEdit, onBack }: NoteDetailViewProps) {
  const { width } = useWindowDimensions()
  const isTablet = width >= 768

  // Mock data
  const note = {
    title: "Understanding Neuroplasticity",
    content:
      "The brain's ability to reorganize itself by forming new neural connections throughout life. Neuroplasticity allows the neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or to changes in their environment.\n\nThis capability allows for learning, adaptation, and recovery from brain injuries.\n\n## Key Concepts\n\n- **Synaptic Pruning**: The process of synapse elimination that occurs between early childhood and the onset of puberty.\n- **Hebbian Learning**: Neurons that fire together, wire together.\n- **Compensatory Masquerade**: The brain compensates for damage by reorganizing and forming new connections between intact neurons.",
    tags: ["neuroscience", "brain", "learning"],
    date: "May 10, 2024",
    lastEdited: "2 days ago",
  }

  return (
    <View className="flex-1 flex-row bg-white dark:bg-neutral-900">
      <ScrollView className={`flex-1 ${isTablet ? "pr-4" : ""}`}>
        <View className={`p-4 ${isTablet ? "max-w-2xl mx-auto" : ""}`}>
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={onBack} className="mr-2">
              <ArrowLeft size={24} color="#6B7280" />
            </TouchableOpacity>
            <View className="flex-1" />
            <View className="flex-row">
              <TouchableOpacity className="p-2 mr-2 rounded-full bg-neutral-100 dark:bg-neutral-800">
                <Share2 size={20} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity onPress={onEdit} className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <Edit2 size={20} color="#6366F1" />
              </TouchableOpacity>
            </View>
          </View>

          <Text className="text-3xl font-bold mb-2 text-neutral-800 dark:text-white">{note.title}</Text>

          <View className="flex-row flex-wrap mb-4">
            {note.tags.map((tag, index) => (
              <TagChip key={index} label={tag} />
            ))}
          </View>

          <View className="flex-row items-center mb-6">
            <Text className="text-sm text-neutral-500 dark:text-neutral-400">
              Created {note.date} • Last edited {note.lastEdited}
            </Text>
          </View>

          <Text className="text-base leading-relaxed mb-6 text-neutral-800 dark:text-white">{note.content}</Text>

          <View className="flex-row items-center justify-start mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <TouchableOpacity className="flex-row items-center mr-4 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <BookOpen size={16} color="#6B7280" />
              <Text className="ml-2 text-sm text-neutral-600 dark:text-neutral-300">Open in Document</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <Brain size={16} color="#6B7280" />
              <Text className="ml-2 text-sm text-neutral-600 dark:text-neutral-300">Create Flashcards</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {isTablet && <NoteSidebar />}
    </View>
  )
}
