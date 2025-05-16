"use client"

import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Sparkles, X, ThumbsUp, ThumbsDown, CheckCircle, Edit2 } from "lucide-react-native"

interface InlineAssistantBubbleProps {
  suggestion: string
  position?: "top" | "bottom" | "right" | "left"
  onAccept?: () => void
  onDismiss?: () => void
  onEdit?: () => void
  onFeedback?: (isPositive: boolean) => void
}

export function InlineAssistantBubble({
  suggestion,
  position = "bottom",
  onAccept,
  onDismiss,
  onEdit,
  onFeedback,
}: InlineAssistantBubbleProps) {
  const [visible, setVisible] = React.useState(true)
  const [expanded, setExpanded] = React.useState(false)

  const handleDismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    right: "left-full ml-2",
    left: "right-full mr-2",
  }

  return visible ? (
    <View className="relative">
      <TouchableOpacity className="bg-indigo-600 rounded-full p-1.5 shadow-md" onPress={() => setExpanded(!expanded)}>
        <Sparkles size={16} color="#FFFFFF" />
      </TouchableOpacity>

      {expanded && (
        <View
          className={`absolute ${positionClasses[position]} z-10 bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 w-64`}
        >
          <View className="flex-row items-center justify-between p-3 border-b border-neutral-200 dark:border-neutral-700">
            <View className="flex-row items-center">
              <Sparkles size={14} color="#6366F1" />
              <Text className="ml-1.5 font-medium text-neutral-800 dark:text-white">AI Suggestion</Text>
            </View>
            <TouchableOpacity onPress={handleDismiss}>
              <X size={14} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View className="p-3">
            <Text className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">{suggestion}</Text>

            <View className="flex-row items-center justify-between">
              <View className="flex-row">
                <TouchableOpacity
                  className="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-700 mr-1"
                  onPress={() => onFeedback?.(true)}
                >
                  <ThumbsUp size={14} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-700"
                  onPress={() => onFeedback?.(false)}
                >
                  <ThumbsDown size={14} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <View className="flex-row">
                <TouchableOpacity className="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-700 mr-1" onPress={onEdit}>
                  <Edit2 size={14} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/20"
                  onPress={() => {
                    onAccept?.()
                    handleDismiss()
                  }}
                >
                  <CheckCircle size={14} color="#10B981" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  ) : null
}
