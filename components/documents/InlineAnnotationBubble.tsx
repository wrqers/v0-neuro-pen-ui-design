"use client"

import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { MessageSquare } from "lucide-react-native"

interface InlineAnnotationBubbleProps {
  text: string
  relatedText?: string
  page: number
  expanded?: boolean
}

export function InlineAnnotationBubble({
  text,
  relatedText,
  page,
  expanded: initialExpanded = false,
}: InlineAnnotationBubbleProps) {
  const [expanded, setExpanded] = React.useState(initialExpanded)

  return (
    <View>
      <View className="flex-row items-start mb-2">
        <View className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
          <MessageSquare size={16} color="#6366F1" />
        </View>
        <View className="flex-1 ml-2">
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text className="text-sm text-neutral-700 dark:text-neutral-300 mb-1">{text}</Text>
          </TouchableOpacity>
          <Text className="text-xs text-neutral-500 dark:text-neutral-400">Page {page}</Text>
        </View>
      </View>

      {expanded && relatedText && (
        <View className="ml-8 p-3 bg-neutral-50 dark:bg-neutral-700/30 rounded-lg border-l-2 border-indigo-400 mb-2">
          <Text className="text-sm italic text-neutral-600 dark:text-neutral-400">"{relatedText}"</Text>
        </View>
      )}
    </View>
  )
}
