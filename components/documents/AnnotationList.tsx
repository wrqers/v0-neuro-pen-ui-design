"use client"

import React from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { FileText, Highlighter, Info, ArrowUpRight, Sparkles } from "lucide-react-native"
import { CollapsibleSection } from "../shared/CollapsibleSection"
import { InlineAnnotationBubble } from "./InlineAnnotationBubble"

export function AnnotationList() {
  const [searchQuery, setSearchQuery] = React.useState("")

  // Mock data
  const highlights = [
    {
      id: "1",
      text: "Learning is the process of acquiring new understanding, knowledge, behaviors, skills, values, attitudes, and preferences.",
      color: "yellow",
      page: 1,
    },
    {
      id: "2",
      text: "The hippocampus plays a crucial role in the formation of new memories",
      color: "green",
      page: 1,
    },
    {
      id: "3",
      text: "Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life.",
      color: "blue",
      page: 2,
    },
  ]

  const notes = [
    {
      id: "1",
      text: "Connect this with the concept of spaced repetition for my study methods.",
      relatedText: "Spaced repetition: Reviewing material at increasing intervals",
      page: 3,
    },
    {
      id: "2",
      text: "This relates to how emotions affect memory formation.",
      relatedText: "The amygdala is involved in emotional learning",
      page: 1,
    },
  ]

  const aiSummaries = [
    {
      id: "1",
      title: "Key Takeaways",
      content:
        "This document explains how learning works in the brain, focusing on neural mechanisms, types of learning, and neuroplasticity. It highlights effective learning strategies like spaced repetition and active recall.",
    },
    {
      id: "2",
      title: "Important Concepts",
      content:
        "1. Neuroplasticity\n2. Explicit vs. Implicit Learning\n3. Memory formation\n4. Optimized learning techniques",
    },
  ]

  return (
    <View className="w-80 bg-white dark:bg-neutral-800 border-l border-neutral-200 dark:border-neutral-700">
      <View className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex-row items-center">
        <Text className="text-lg font-medium text-neutral-800 dark:text-white mr-auto">Annotations</Text>
        <TouchableOpacity className="p-2 rounded-md bg-indigo-50 dark:bg-indigo-900/30 ml-2">
          <Sparkles size={18} color="#6366F1" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className="p-4">
          <CollapsibleSection title="AI Summary" icon={Info} defaultOpen>
            {aiSummaries.map((summary) => (
              <View key={summary.id} className="mb-3 p-3 bg-neutral-50 dark:bg-neutral-700/30 rounded-lg">
                <Text className="font-medium text-neutral-800 dark:text-white mb-1">{summary.title}</Text>
                <Text className="text-sm text-neutral-600 dark:text-neutral-300">{summary.content}</Text>
                <TouchableOpacity className="mt-2 flex-row items-center">
                  <Text className="text-xs text-indigo-600 dark:text-indigo-400 mr-1">Expand</Text>
                  <ArrowUpRight size={12} color="#6366F1" />
                </TouchableOpacity>
              </View>
            ))}
          </CollapsibleSection>

          <CollapsibleSection title="Highlights" icon={Highlighter} defaultOpen>
            {highlights.map((highlight) => (
              <TouchableOpacity
                key={highlight.id}
                className="mb-3 p-3 border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10 rounded-r-lg"
              >
                <Text className="text-sm text-neutral-700 dark:text-neutral-300">"{highlight.text}"</Text>
                <Text className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Page {highlight.page}</Text>
              </TouchableOpacity>
            ))}
          </CollapsibleSection>

          <CollapsibleSection title="Notes" icon={FileText} defaultOpen>
            {notes.map((note) => (
              <TouchableOpacity key={note.id} className="mb-3">
                <InlineAnnotationBubble text={note.text} relatedText={note.relatedText} page={note.page} />
              </TouchableOpacity>
            ))}
          </CollapsibleSection>
        </View>
      </ScrollView>
    </View>
  )
}
