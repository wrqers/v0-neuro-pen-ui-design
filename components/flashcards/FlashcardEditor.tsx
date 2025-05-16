"use client"

import React from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from "react-native"
import { ArrowLeft, Sparkles, Save } from "lucide-react-native"
import { TagChip } from "../shared/TagChip"

export function FlashcardEditor() {
  const { width } = useWindowDimensions()
  const isTablet = width >= 768
  const [question, setQuestion] = React.useState("")
  const [answer, setAnswer] = React.useState("")
  const [tags, setTags] = React.useState(["neuroscience", "learning"])

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <View className="flex-row items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-2">
            <ArrowLeft size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-neutral-800 dark:text-white">New Flashcard</Text>
        </View>

        <TouchableOpacity className="bg-indigo-600 py-2 px-4 rounded-lg flex-row items-center">
          <Save size={18} color="#FFFFFF" />
          <Text className="ml-2 text-white font-medium">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className={`p-4 ${isTablet ? "max-w-2xl mx-auto" : ""}`}>
          <View className="mb-6">
            <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Tags</Text>
            <View className="flex-row flex-wrap mb-2">
              {tags.map((tag, index) => (
                <TagChip
                  key={index}
                  label={tag}
                  onRemove={() => {
                    setTags(tags.filter((_, i) => i !== index))
                  }}
                />
              ))}
              <TouchableOpacity>
                <View className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 mr-2 mb-2">
                  <TextInput
                    className="text-sm text-neutral-600 dark:text-neutral-300"
                    placeholder="Add tag..."
                    placeholderTextColor="#9CA3AF"
                    onSubmitEditing={(e) => {
                      if (e.nativeEvent.text.trim()) {
                        setTags([...tags, e.nativeEvent.text.trim()])
                        e.nativeEvent.text = ""
                      }
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Question</Text>
            <View className="relative">
              <TextInput
                className="bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 text-neutral-800 dark:text-white min-h-[120px]"
                placeholder="Enter the question..."
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                value={question}
                onChangeText={setQuestion}
              />
              <TouchableOpacity className="absolute right-3 bottom-3 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg flex-row items-center">
                <Sparkles size={16} color="#6366F1" />
                <Text className="ml-1 text-sm text-indigo-600 dark:text-indigo-400">AI Assist</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Answer</Text>
            <View className="relative">
              <TextInput
                className="bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 text-neutral-800 dark:text-white min-h-[200px]"
                placeholder="Enter the answer..."
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                value={answer}
                onChangeText={setAnswer}
              />
              <TouchableOpacity className="absolute right-3 bottom-3 bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg flex-row items-center">
                <Sparkles size={16} color="#6366F1" />
                <Text className="ml-1 text-sm text-indigo-600 dark:text-indigo-400">AI Assist</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">AI Suggestions</Text>

            <View className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
              <View className="flex-row items-center mb-3">
                <Sparkles size={16} color="#6366F1" />
                <Text className="ml-2 font-medium text-indigo-700 dark:text-indigo-300">Alternative Questions</Text>
              </View>

              <TouchableOpacity className="mb-2 bg-white dark:bg-neutral-800 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <Text className="text-neutral-800 dark:text-white">
                  What is the definition of neuroplasticity and why is it important for learning?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-white dark:bg-neutral-800 p-3 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <Text className="text-neutral-800 dark:text-white">
                  Explain how neuroplasticity contributes to the brain's ability to adapt and learn new information.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
