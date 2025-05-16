import { View, Text, TouchableOpacity, Platform } from "react-native"
import { FileText, Brain, BookOpen, Square3Stack3D, Settings } from "lucide-react-native"

const tabItems = [
  { icon: FileText, label: "Notes", active: true },
  { icon: Brain, label: "Flashcards" },
  { icon: BookOpen, label: "Docs" },
  { icon: Square3Stack3D, label: "Projects" },
  { icon: Settings, label: "Settings" },
]

export function BottomTabNav() {
  return (
    <View
      className="flex-row justify-around bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-2 px-1"
      style={Platform.OS === "ios" ? { paddingBottom: 20 } : {}}
    >
      {tabItems.map((item, index) => (
        <TabItem key={index} Icon={item.icon} label={item.label} active={item.active} />
      ))}
    </View>
  )
}

function TabItem({ Icon, label, active }: { Icon: any; label: string; active?: boolean }) {
  return (
    <TouchableOpacity className="items-center py-1 px-3">
      <Icon size={24} color={active ? "#6366F1" : "#6B7280"} />
      <Text
        className={`text-xs mt-1 ${
          active ? "font-medium text-indigo-600 dark:text-indigo-400" : "text-neutral-600 dark:text-neutral-300"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
