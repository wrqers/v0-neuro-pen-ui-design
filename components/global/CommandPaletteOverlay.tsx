import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal } from "react-native"
import { Search, File, X, Brain, BookOpen, Command, Square3Stack3D } from "lucide-react-native"

interface CommandPaletteOverlayProps {
  visible: boolean
  onClose: () => void
}

const recentItems = [
  { type: "note", title: "Neural Networks Explained", icon: File },
  { type: "flashcard", title: "Machine Learning Basics", icon: Brain },
  { type: "document", title: "Psychology Research Paper", icon: BookOpen },
  { type: "project", title: "Thesis Research", icon: Square3Stack3D },
]

const quickCommands = [
  { label: "Create New Note", shortcut: "N" },
  { label: "Create Flashcard", shortcut: "F" },
  { label: "Import Document", shortcut: "D" },
  { label: "Start New Project", shortcut: "P" },
  { label: "Search Everything", shortcut: "/" },
]

export function CommandPaletteOverlay({ visible, onClose }: CommandPaletteOverlayProps) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="w-full max-w-2xl bg-white dark:bg-neutral-800 rounded-xl shadow-xl overflow-hidden">
          <View className="border-b border-neutral-200 dark:border-neutral-700 p-4 flex-row items-center">
            <Search size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-2 text-base text-neutral-800 dark:text-white"
              placeholder="Search or use a command..."
              placeholderTextColor="#9CA3AF"
              autoFocus
            />
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <ScrollView className="max-h-96">
            <View className="p-2">
              <Text className="px-3 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">RECENT</Text>

              {recentItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <item.icon size={16} color="#6366F1" />
                  <Text className="ml-2 text-neutral-800 dark:text-white">{item.title}</Text>
                  <View className="ml-auto bg-neutral-100 dark:bg-neutral-700 rounded px-1.5 py-0.5">
                    <Text className="text-xs text-neutral-500 dark:text-neutral-400">{item.type}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View className="p-2 border-t border-neutral-200 dark:border-neutral-700">
              <Text className="px-3 py-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                QUICK COMMANDS
              </Text>

              {quickCommands.map((cmd, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <Command size={16} color="#6366F1" />
                  <Text className="ml-2 text-neutral-800 dark:text-white">{cmd.label}</Text>
                  <View className="ml-auto bg-neutral-100 dark:bg-neutral-700 rounded px-2 py-1">
                    <Text className="text-xs font-medium text-neutral-500 dark:text-neutral-400">⌘ {cmd.shortcut}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}
