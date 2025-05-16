"use client"

import React from "react"
import { View, Text, ScrollView, useWindowDimensions } from "react-native"
import { ArrowLeft, ZoomIn, ZoomOut, Sparkles } from "lucide-react-native"
import { TouchableOpacity } from "react-native"
import { AnnotationList } from "./AnnotationList"

export function DocumentViewer() {
  const { width } = useWindowDimensions()
  const isTablet = width >= 768
  const [zoomLevel, setZoomLevel] = React.useState(1)

  const mockDocument = {
    title: "The Neuroscience of Learning",
    content: `
      # The Neuroscience of Learning
      
      ## Introduction
      
      Learning is the process of acquiring new understanding, knowledge, behaviors, skills, values, attitudes, and preferences. The ability to learn is possessed by humans, animals, and some machines; there is also evidence for some kind of learning in certain plants.
      
      ## Neural Mechanisms
      
      Learning requires the brain to encode, store, and retrieve information, a process known as memory formation. Several brain structures are critical to this process:
      
      - The hippocampus plays a crucial role in the formation of new memories
      - The amygdala is involved in emotional learning
      - The cerebellum is essential for procedural learning
      - The prefrontal cortex is important for working memory and executive functions
      
      ## Types of Learning
      
      1. Explicit Learning: Conscious, intentional acquisition of knowledge
      2. Implicit Learning: Unconscious acquisition of knowledge
      3. Observational Learning: Learning by observing others
      4. Experiential Learning: Learning through experience and reflection
      
      ## Neuroplasticity
      
      Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life. This capability allows for learning, adaptation, and recovery from brain injuries.
      
      ## Optimizing Learning
      
      Research has identified several strategies to enhance learning:
      
      - Spaced repetition: Reviewing material at increasing intervals
      - Active recall: Testing oneself on the material
      - Interleaving: Mixing different topics during study sessions
      - Elaboration: Explaining concepts in one's own words
      - Dual coding: Combining verbal and visual information
      
      ## Conclusion
      
      Understanding the neuroscience of learning can help educators, students, and lifelong learners optimize their learning strategies and outcomes.
    `,
  }

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900 flex-row">
      <View className={`flex-1 ${isTablet ? "border-r border-neutral-200 dark:border-neutral-700" : ""}`}>
        <View className="flex-row items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-2">
              <ArrowLeft size={20} color="#6B7280" />
            </TouchableOpacity>
            <Text className="font-medium text-neutral-800 dark:text-white">{mockDocument.title}</Text>
          </View>

          <View className="flex-row items-center">
            <TouchableOpacity
              className="p-2 rounded-md mr-2"
              onPress={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.1))}
            >
              <ZoomOut size={20} color="#6B7280" />
            </TouchableOpacity>

            <Text className="text-sm text-neutral-600 dark:text-neutral-400 mx-2">{Math.round(zoomLevel * 100)}%</Text>

            <TouchableOpacity
              className="p-2 rounded-md mr-2"
              onPress={() => setZoomLevel(Math.min(1.5, zoomLevel + 0.1))}
            >
              <ZoomIn size={20} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity className="p-2 rounded-md bg-indigo-50 dark:bg-indigo-900/30">
              <Sparkles size={20} color="#6366F1" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <View
            className="p-8 bg-white dark:bg-neutral-900"
            style={{
              transform: [{ scale: zoomLevel }],
              alignItems: "center",
            }}
          >
            <View className="max-w-2xl w-full bg-white dark:bg-neutral-900 p-8 shadow-sm border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <Text className="text-3xl font-bold mb-6 text-neutral-800 dark:text-white">
                The Neuroscience of Learning
              </Text>

              <Text className="text-xl font-semibold mt-6 mb-4 text-neutral-800 dark:text-white">Introduction</Text>
              <Text className="text-base mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Learning is the process of acquiring new understanding, knowledge, behaviors, skills, values, attitudes,
                and preferences. The ability to learn is possessed by humans, animals, and some machines; there is also
                evidence for some kind of learning in certain plants.
              </Text>

              <Text className="text-xl font-semibold mt-6 mb-4 text-neutral-800 dark:text-white">
                Neural Mechanisms
              </Text>
              <Text className="text-base mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Learning requires the brain to encode, store, and retrieve information, a process known as memory
                formation. Several brain structures are critical to this process:
              </Text>
              <View className="ml-4 mb-4">
                <Text className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  • The hippocampus plays a crucial role in the formation of new memories
                </Text>
                <Text className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  • The amygdala is involved in emotional learning
                </Text>
                <Text className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  • The cerebellum is essential for procedural learning
                </Text>
                <Text className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  • The prefrontal cortex is important for working memory and executive functions
                </Text>
              </View>

              <Text className="text-xl font-semibold mt-6 mb-4 text-neutral-800 dark:text-white">
                Types of Learning
              </Text>
              <View className="ml-4 mb-4">
                <Text className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  1. Explicit Learning: Conscious, intentional acquisition of knowledge
                </Text>
                <Text className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  2. Implicit Learning: Unconscious acquisition of knowledge
                </Text>
                <Text className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  3. Observational Learning: Learning by observing others
                </Text>
                <Text className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  4. Experiential Learning: Learning through experience and reflection
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {isTablet && <AnnotationList />}
    </View>
  )
}
