"use client"

import React from "react"
import { View, Text, useWindowDimensions, TouchableOpacity, ScrollView } from "react-native"
import { Plus, Grid, List, Sparkles, Save, Share2, FileText, BookOpen, Brain } from "lucide-react-native"
import { TagChip } from "../shared/TagChip"

export function ProjectCanvas() {
  const { width, height } = useWindowDimensions()
  const isTablet = width >= 768
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

  // Mock data for pinned items
  const pinnedItems = [
    {
      id: "1",
      type: "note",
      title: "Neural Networks",
      content: "The architecture and function of neural networks in relation to human cognition...",
      icon: FileText,
    },
    {
      id: "2",
      type: "document",
      title: "Cognitive Science Paper",
      content: "A study on human decision making processes under uncertainty...",
      icon: BookOpen,
    },
    {
      id: "3",
      type: "flashcard",
      title: "Memory Models",
      content: "Flashcards on different models of human memory...",
      icon: Brain,
    },
  ]

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <View className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-neutral-800 dark:text-white">Thesis Research</Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-sm text-neutral-500 dark:text-neutral-400 mr-2">Last edited 2 hours ago</Text>
            <TagChip small label="research" />
            <TagChip small label="thesis" />
          </View>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 mr-2">
            <Share2 size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 mr-2">
            <Save size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
            <Sparkles size={20} color="#6366F1" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-center justify-between p-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            className={`p-2 rounded-md mr-2 ${viewMode === "grid" ? "bg-indigo-50 dark:bg-indigo-900/30" : ""}`}
            onPress={() => setViewMode("grid")}
          >
            <Grid size={20} color={viewMode === "grid" ? "#6366F1" : "#6B7280"} />
          </TouchableOpacity>
          <TouchableOpacity
            className={`p-2 rounded-md ${viewMode === "list" ? "bg-indigo-50 dark:bg-indigo-900/30" : ""}`}
            onPress={() => setViewMode("list")}
          >
            <List size={20} color={viewMode === "list" ? "#6366F1" : "#6B7280"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="flex-row items-center bg-indigo-600 p-2 px-3 rounded-lg">
          <Plus size={16} color="#FFFFFF" />
          <Text className="ml-2 text-white font-medium">Add Item</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {viewMode === "grid" ? (
            <View className="flex-row flex-wrap">
              {pinnedItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 mb-4 mr-4"
                  style={{ width: isTablet ? width / 3 - 24 : width - 32 }}
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                      <item.icon size={16} color="#6366F1" />
                    </View>
                    <TagChip small label={item.type} />
                  </View>

                  <Text className="text-lg font-medium text-neutral-800 dark:text-white mb-2">{item.title}</Text>

                  <Text className="text-sm text-neutral-600 dark:text-neutral-300 mb-2" numberOfLines={3}>
                    {item.content}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg p-4 items-center justify-center"
                style={{
                  width: isTablet ? width / 3 - 24 : width - 32,
                  height: 180,
                }}
              >
                <Plus size={24} color="#9CA3AF" />
                <Text className="mt-2 text-neutral-500 dark:text-neutral-400">Add New Item</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {pinnedItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-4 mb-4 flex-row items-center"
                >
                  <View className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mr-3">
                    <item.icon size={18} color="#6366F1" />
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-lg font-medium text-neutral-800 dark:text-white">{item.title}</Text>
                      <TagChip small label={item.type} />
                    </View>

                    <Text className="text-sm text-neutral-600 dark:text-neutral-300 mt-1" numberOfLines={2}>
                      {item.content}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
