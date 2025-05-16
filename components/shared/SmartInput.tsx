import { View, TextInput, TouchableOpacity, Text } from "react-native"
import { Search, X, Sparkles } from "lucide-react-native"

interface SmartInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  onSubmit?: () => void
  onClear?: () => void
  onAiAssist?: () => void
  className?: string
}

export function SmartInput({
  value,
  onChangeText,
  placeholder = "Search...",
  onSubmit,
  onClear,
  onAiAssist,
  className = "",
}: SmartInputProps) {
  return (
    <View
      className={`bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex-row items-center px-3 ${className}`}
    >
      <Search size={18} color="#9CA3AF" />

      <TextInput
        className="flex-1 py-2 px-2 text-neutral-800 dark:text-white"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />

      {value ? (
        <TouchableOpacity onPress={onClear}>
          <X size={18} color="#9CA3AF" />
        </TouchableOpacity>
      ) : onAiAssist ? (
        <TouchableOpacity
          className="bg-indigo-50 dark:bg-indigo-900/30 p-1 rounded-md flex-row items-center"
          onPress={onAiAssist}
        >
          <Sparkles size={16} color="#6366F1" />
          <Text className="ml-1 text-xs text-indigo-600 dark:text-indigo-400">AI</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}
