"use client"

import React from "react"
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native"
import { Brain, Plus, Search, Edit2, MoreHorizontal, Clock } from "lucide-react-native"
import { ProgressRing } from "../shared/ProgressRing"

export function DeckManagerScreen() {
  const [searchQuery, setSearchQuery] = React.useState("")

  // Mock data
  const decks = [
    {
      id: "1",
      title: "Neuroscience Basics",
      count: 24,
      dueSoon: 8,
      progress: 75,
      lastStudied: "2 days ago",
    },
    {
      id: "2",
      title: "Learning Techniques",
      count: 18,
      dueSoon: 3,
      progress: 60,
      lastStudied: "4 days ago",
    },
    {
      id: "3",
      title: "Cognitive Psychology",
      count: 31,
      dueSoon: 12,
      progress: 40,
      lastStudied: "1 day ago",
    },
  ]

  const tags = [
    { id: "1", name: "neuroscience", count: 42 },
    { id: "2", name: "memory", count: 28 },
    { id: "3", name: "learning", count: 35 },
    { id: "4", name: "brain", count: 22 },
    { id: "5", name: "psychology", count: 19 },
  ]

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <View className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <Text className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">Flashcards</Text>

        <View className="relative mb-4">
          <View className="absolute inset-y-0 left-3 flex items-center justify-center">
            <Search size={18} color="#9CA3AF" />
          </View>
          <TextInput
            className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-white rounded-lg px-10 py-2"
            placeholder="Search flashcards..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row">
            <TouchableOpacity className="mr-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              <Text className="text-indigo-600 dark:text-indigo-400 font-medium">Decks</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-3 py-1 rounded-lg">
              <Text className="text-neutral-600 dark:text-neutral-400">Tags</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="flex-row items-center bg-indigo-600 px-3 py-1.5 rounded-lg">
            <Plus size={16} color="#FFFFFF" />
            <Text className="ml-1 text-white font-medium">New Deck</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Study Now</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {decks.map((deck, index) => (
              <TouchableOpacity
                key={deck.id}
                className="w-64 mr-3 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700"
              >
                <View className="flex-row items-center justify-between mb-2">
                  <View className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                    <Brain size={16} color="#6366F1" />
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-sm text-indigo-600 dark:text-indigo-400 mr-1">{deck.dueSoon} due</Text>
                    <Clock size={14} color="#6366F1" />
                  </View>
                </View>

                <Text className="text-lg font-medium text-neutral-800 dark:text-white mb-1">{deck.title}</Text>
                <Text className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                  {deck.count} cards • Last studied {deck.lastStudied}
                </Text>

                <View className="flex-row items-center">
                  <ProgressRing progress={deck.progress} size={40} strokeWidth={4} />
                  <View className="ml-3">
                    <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {deck.progress}% Mastered
                    </Text>
                    <TouchableOpacity>
                      <Text className="text-sm text-indigo-600 dark:text-indigo-400">Continue Studying</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">All Decks</Text>

          {decks.map((deck) => (
            <TouchableOpacity
              key={deck.id}
              className="flex-row items-center p-4 mb-2 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700"
            >
              <View className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <Brain size={16} color="#6366F1" />
              </View>

              <View className="ml-3 flex-1">
                <Text className="text-base font-medium text-neutral-800 dark:text-white">{deck.title}</Text>
                <Text className="text-sm text-neutral-500 dark:text-neutral-400">{deck.count} cards</Text>
              </View>

              <View className="flex-row items-center">
                <TouchableOpacity className="p-2 mr-1">
                  <Edit2 size={16} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2">
                  <MoreHorizontal size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">Tags</Text>

          <View className="flex-row flex-wrap">
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag.id}
                className="flex-row items-center bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded-lg mr-2 mb-2"
              >
                <Text className="font-medium text-neutral-800 dark:text-white mr-1">#{tag.name}</Text>
                <Text className="text-xs text-neutral-500 dark:text-neutral-400">{tag.count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
