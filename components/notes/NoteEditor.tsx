"use client"

import React from "react"
import { View, TextInput, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native"
import { Bold, Italic, List, ListOrdered, Link, Code, Image, Sparkles } from "lucide-react-native"
import { TagChip } from "../shared/TagChip"

export function NoteEditor() {
  const [title, setTitle] = React.useState("Understanding Neuroplasticity")
  const [content, setContent] = React.useState(
    "The brain's ability to reorganize itself by forming new neural connections throughout life. Neuroplasticity allows the neurons in the brain to compensate for injury and disease and to adjust their activities in response to new situations or to changes in their environment.",
  )
  const [tags, setTags] = React.useState(["neuroscience", "brain", "learning"])
  const { width } = useWindowDimensions()
  const isTablet = width >= 768

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900 p-4">
      <ScrollView className="flex-1">
        <View className={`${isTablet ? "max-w-2xl mx-auto" : ""}`}>
          <TextInput
            className="text-3xl font-bold mb-2 text-neutral-800 dark:text-white"
            value={title}
            onChangeText={setTitle}
            placeholder="Note Title"
            placeholderTextColor="#9CA3AF"
          />

          <View className="flex-row flex-wrap mb-4">
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

          <View className="flex-row flex-wrap justify-start mb-4 border-y border-neutral-200 dark:border-neutral-700 py-2">
            {[Bold, Italic, List, ListOrdered, Link, Code, Image].map((Icon, index) => (
              <TouchableOpacity key={index} className="p-2 mr-1">
                <Icon size={20} color="#6B7280" />
              </TouchableOpacity>
            ))}
            <TouchableOpacity className="ml-auto p-2 flex-row items-center bg-indigo-50 dark:bg-indigo-900/30 rounded">
              <Sparkles size={18} color="#6366F1" />
              <TextInput
                className="ml-1 text-sm text-indigo-600 dark:text-indigo-400"
                placeholder="Ask AI..."
                placeholderTextColor="#6366F1"
              />
            </TouchableOpacity>
          </View>

          <TextInput
            className="text-base text-neutral-800 dark:text-white leading-relaxed min-h-[300px]"
            value={content}
            onChangeText={setContent}
            placeholder="Start writing..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </View>
  )
}
