import { View, Text, TouchableOpacity } from "react-native"
import { FileText, Brain, Highlighter, BookmarkPlus, Copy, X } from "lucide-react-native"

interface HighlightToolbarProps {
  visible: boolean
  position: { x: number; y: number }
  onClose: () => void
  onCreateNote: () => void
  onCreateFlashcard: () => void
  onHighlight: () => void
  onSave: () => void
  onCopy: () => void
}

export function HighlightToolbar({
  visible,
  position,
  onClose,
  onCreateNote,
  onCreateFlashcard,
  onHighlight,
  onSave,
  onCopy,
}: HighlightToolbarProps) {
  if (!visible) return null

  return (
    <View
      className="absolute bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <View className="flex-row">
        <TouchableOpacity className="p-3 items-center justify-center" onPress={onHighlight}>
          <Highlighter size={18} color="#6366F1" />
          <Text className="text-xs mt-1 text-neutral-600 dark:text-neutral-300">Highlight</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-3 items-center justify-center" onPress={onCreateNote}>
          <FileText size={18} color="#6366F1" />
          <Text className="text-xs mt-1 text-neutral-600 dark:text-neutral-300">Note</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-3 items-center justify-center" onPress={onCreateFlashcard}>
          <Brain size={18} color="#6366F1" />
          <Text className="text-xs mt-1 text-neutral-600 dark:text-neutral-300">Flashcard</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-3 items-center justify-center" onPress={onSave}>
          <BookmarkPlus size={18} color="#6366F1" />
          <Text className="text-xs mt-1 text-neutral-600 dark:text-neutral-300">Save</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-3 items-center justify-center" onPress={onCopy}>
          <Copy size={18} color="#6366F1" />
          <Text className="text-xs mt-1 text-neutral-600 dark:text-neutral-300">Copy</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-3 items-center justify-center" onPress={onClose}>
          <X size={18} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
