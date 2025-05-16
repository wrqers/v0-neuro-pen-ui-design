"use client"

import React from "react"
import { View, Text, TouchableOpacity, useWindowDimensions, ScrollView } from "react-native"
import { ChevronUp, ChevronDown, Trash2, FileText, Brain, BookOpen } from "lucide-react-native"

export function PinnedItemsTray() {
  const { width } = useWindowDimensions()
  const isTablet = width >= 768
  const [expanded, setExpanded] = React.useState(true)

  // Mock data
  const pinnedItems = [
    {
      id: "1",
      type: "note",
      title: "Neuroplasticity Notes",
      icon: FileText,
    },
    {
      id: "2",
      type: "flashcard",
      title: "Memory Models",
      icon: Brain,
    },
    {
      id: "3",
      type: "document",
      title: "Research Paper on Learning",
      icon: BookOpen,
    },
    {
      id: "4",
      type: "note",
      title: "Study Techniques",
      icon: FileText,
    },
  ]

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 shadow-lg">
      <TouchableOpacity
        className="flex-row items-center justify-center py-2 border-b border-neutral-200 dark:border-neutral-700"
        onPress={() => setExpanded(!expanded)}
      >
        {expanded ? <ChevronDown size={20} color="#6B7280" /> : <ChevronUp size={20} color="#6B7280" />}
        <Text className="ml-2 font-medium text-neutral-700 dark:text-neutral-300">Pinned Items</Text>
      </TouchableOpacity>

      {expanded && (
        <View className="p-4" style={{ maxHeight: 200 }}>
          <ScrollView
            horizontal={!isTablet}
            contentContainerStyle={{ flexWrap: isTablet ? "wrap" : "nowrap", flexDirection: isTablet ? "row" : "row" }}
          >
            {pinnedItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-3 mr-3 mb-3 flex-row items-center"
                style={{ width: isTablet ? "auto" : 200 }}
              >
                <View className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                  <item.icon size={16} color="#6366F1" />
                </View>

                <View className="ml-2 flex-1">
                  <Text className="font-medium text-neutral-800 dark:text-white" numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text className="text-xs text-neutral-500 dark:text-neutral-400">{item.type}</Text>
                </View>

                <TouchableOpacity className="ml-2 p-1">
                  <Trash2 size={16} color="#6B7280" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}
