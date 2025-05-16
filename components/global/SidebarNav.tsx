import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { Book, FileText, Square3Stack3D, Settings, Brain, BookOpen } from "lucide-react-native"

const navItems = [
  { icon: FileText, label: "Notes", active: true },
  { icon: Brain, label: "Flashcards" },
  { icon: BookOpen, label: "Documents" },
  { icon: Square3Stack3D, label: "Projects" },
  { icon: Settings, label: "Settings" },
]

export function SidebarNav() {
  return (
    <View className="w-64 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700">
      <View className="p-4">
        <View className="flex-row items-center mb-6">
          <Book size={24} color="#6366F1" />
          <Text className="ml-2 text-xl font-bold text-indigo-600 dark:text-indigo-400">NeuroPen</Text>
        </View>

        <ScrollView className="flex-1">
          {navItems.map((item, index) => (
            <NavItem key={index} Icon={item.icon} label={item.label} active={item.active} />
          ))}
        </ScrollView>
      </View>

      <View className="mt-auto p-4 border-t border-neutral-200 dark:border-neutral-700">
        <TouchableOpacity className="flex-row items-center py-2">
          <View className="h-8 w-8 rounded-full bg-indigo-100 items-center justify-center">
            <Text className="text-indigo-600 font-medium">JD</Text>
          </View>
          <View className="ml-2">
            <Text className="font-medium text-neutral-800 dark:text-white">Jane Doe</Text>
            <Text className="text-xs text-neutral-500 dark:text-neutral-400">Premium</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function NavItem({ Icon, label, active }: { Icon: any; label: string; active?: boolean }) {
  return (
    <TouchableOpacity
      className={`flex-row items-center py-3 px-4 rounded-lg mb-1 ${
        active ? "bg-indigo-50 dark:bg-indigo-900/30" : ""
      }`}
    >
      <Icon size={20} color={active ? "#6366F1" : "#6B7280"} />
      <Text
        className={`ml-3 ${
          active ? "font-medium text-indigo-600 dark:text-indigo-400" : "text-neutral-600 dark:text-neutral-300"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
