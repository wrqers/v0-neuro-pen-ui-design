import { View, Text, Image, TouchableOpacity } from "react-native"
import { ExternalLink } from "lucide-react-native"

interface LinkPreviewCardProps {
  title: string
  description: string
  imageUrl: string
  url: string
  onPress: () => void
}

export function LinkPreviewCard({ title, description, imageUrl, url, onPress }: LinkPreviewCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden mb-3"
    >
      {imageUrl && <Image source={{ uri: imageUrl }} className="w-20 h-full" resizeMode="cover" />}

      <View className="flex-1 p-3">
        <Text className="font-medium text-neutral-800 dark:text-white mb-1" numberOfLines={1}>
          {title}
        </Text>

        <Text className="text-sm text-neutral-600 dark:text-neutral-300 mb-2" numberOfLines={2}>
          {description}
        </Text>

        <View className="flex-row items-center">
          <ExternalLink size={12} color="#9CA3AF" />
          <Text className="ml-1 text-xs text-neutral-500 dark:text-neutral-400" numberOfLines={1}>
            {url}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
