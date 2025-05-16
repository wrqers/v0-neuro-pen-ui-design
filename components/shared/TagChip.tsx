import { View, Text, TouchableOpacity } from "react-native"
import { X } from "lucide-react-native"

interface TagChipProps {
  label: string
  onRemove?: () => void
  small?: boolean
}

export function TagChip({ label, onRemove, small = false }: TagChipProps) {
  return (
    <View
      className={`flex-row items-center rounded-full bg-neutral-100 dark:bg-neutral-800 ${small ? "px-2 py-0.5 mr-1" : "px-3 py-1 mr-2 mb-2"}`}
    >
      <Text className={`${small ? "text-xs" : "text-sm"} text-neutral-600 dark:text-neutral-300`}>{label}</Text>
      {onRemove && (
        <TouchableOpacity onPress={onRemove} className="ml-1">
          <X size={small ? 12 : 14} color="#6B7280" />
        </TouchableOpacity>
      )}
    </View>
  )
}
