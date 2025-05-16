"use client"
import { View, Text } from "react-native"
import { Calendar } from "lucide-react-native"
import { TagChip } from "../shared/TagChip"
import { AnimatedCard } from "../shared/AnimatedCard"
import { useTheme } from "../../context/ThemeContext"

interface NotePreviewCardProps {
  title: string
  snippet: string
  tags: string[]
  date: string
  onPress: () => void
  delay?: number
}

export function NotePreviewCard({ title, snippet, tags, date, onPress, delay = 0 }: NotePreviewCardProps) {
  const { colors } = useTheme()

  return (
    <AnimatedCard onPress={onPress} delay={delay}>
      <View className="p-4">
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8, color: colors.foreground }}>{title}</Text>
        <Text style={{ color: colors.foregroundSecondary, marginBottom: 12 }} numberOfLines={2}>
          {snippet}
        </Text>

        <View className="flex-row flex-wrap mb-2">
          {tags.map((tag, index) => (
            <View key={index} className="mr-1 mb-1">
              <TagChip small label={tag} />
            </View>
          ))}
        </View>

        <View className="flex-row items-center">
          <Calendar size={14} color={colors.foregroundTertiary} />
          <Text style={{ marginLeft: 4, fontSize: 12, color: colors.foregroundTertiary }}>{date}</Text>
        </View>
      </View>
    </AnimatedCard>
  )
}
