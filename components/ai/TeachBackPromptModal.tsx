"use client"

import React from "react"
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView } from "react-native"
import { X, Sparkles, Lightbulb, FileQuestion, Send } from "lucide-react-native"

interface TeachBackPromptModalProps {
  visible: boolean
  onClose: () => void
  onSubmit: (text: string) => void
}

export function TeachBackPromptModal({ visible, onClose, onSubmit }: TeachBackPromptModalProps) {
  const [text, setText] = React.useState("")
  const [showFeedback, setShowFeedback] = React.useState(false)

  // Mock feedback data
  const feedback = {
    accuracy: 85,
    clarity: 90,
    suggestions: [
      "Consider adding more examples to illustrate the concept.",
      "The explanation of long-term potentiation could be more precise.",
      "You could mention the role of the hippocampus in memory formation.",
    ],
    strengths: [
      "Good overall understanding of neuroplasticity.",
      "Clear explanation of how learning changes the brain.",
      "Good use of terminology.",
    ],
  }

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text)
      setShowFeedback(true)
    }
  }

  const handleClose = () => {
    setText("")
    setShowFeedback(false)
    onClose()
  }

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={handleClose}>
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="bg-white dark:bg-neutral-800 rounded-lg shadow-2xl w-full max-w-lg">
          <View className="flex-row items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
            <View className="flex-row items-center">
              <Sparkles size={18} color="#6366F1" />
              <Text className="ml-2 text-lg font-semibold text-neutral-800 dark:text-white">Teach Back</Text>
            </View>
            <TouchableOpacity onPress={handleClose}>
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {!showFeedback ? (
            <>
              <View className="p-4">
                <View className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg mb-4">
                  <Text className="text-sm text-neutral-700 dark:text-neutral-300">
                    Explain the concept of neuroplasticity in your own words. Teaching a concept helps solidify your
                    understanding.
                  </Text>
                </View>

                <TextInput
                  className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-3 min-h-[150px] text-neutral-800 dark:text-white"
                  placeholder="Start typing your explanation..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  textAlignVertical="top"
                  value={text}
                  onChangeText={setText}
                />
              </View>

              <View className="p-4 border-t border-neutral-200 dark:border-neutral-700 flex-row items-center justify-between">
                <TouchableOpacity
                  className="flex-row items-center p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700"
                  onPress={() => setText("")}
                >
                  <X size={16} color="#6B7280" />
                  <Text className="ml-2 text-neutral-700 dark:text-neutral-300">Clear</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center p-2 px-4 rounded-lg bg-indigo-600"
                  onPress={handleSubmit}
                  disabled={!text.trim()}
                >
                  <Send size={16} color="#FFFFFF" />
                  <Text className="ml-2 text-white font-medium">Submit</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <ScrollView>
              <View className="p-4">
                <View className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-4 flex-row items-start">
                  <Lightbulb size={18} color="#10B981" />
                  <Text className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                    Here's feedback on your explanation of neuroplasticity.
                  </Text>
                </View>

                <View className="mb-4">
                  <Text className="font-medium text-neutral-800 dark:text-white mb-2">Your Explanation</Text>
                  <View className="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-3">
                    <Text className="text-sm text-neutral-700 dark:text-neutral-300">{text}</Text>
                  </View>
                </View>

                <View className="mb-4">
                  <Text className="font-medium text-neutral-800 dark:text-white mb-2">Evaluation</Text>
                  <View className="flex-row items-center mb-2">
                    <Text className="text-sm text-neutral-600 dark:text-neutral-400 flex-1">Accuracy</Text>
                    <View className="flex-row items-center">
                      <View className="h-2 w-24 bg-neutral-200 dark:bg-neutral-600 rounded-full overflow-hidden">
                        <View className="h-full bg-green-500" style={{ width: `${feedback.accuracy}%` }} />
                      </View>
                      <Text className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">{feedback.accuracy}%</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-sm text-neutral-600 dark:text-neutral-400 flex-1">Clarity</Text>
                    <View className="flex-row items-center">
                      <View className="h-2 w-24 bg-neutral-200 dark:bg-neutral-600 rounded-full overflow-hidden">
                        <View className="h-full bg-green-500" style={{ width: `${feedback.clarity}%` }} />
                      </View>
                      <Text className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">{feedback.clarity}%</Text>
                    </View>
                  </View>
                </View>

                <View className="mb-4">
                  <Text className="font-medium text-neutral-800 dark:text-white mb-2">Strengths</Text>
                  {feedback.strengths.map((strength, index) => (
                    <View key={index} className="flex-row items-start mb-1">
                      <Text className="text-green-600 mr-2">•</Text>
                      <Text className="text-sm text-neutral-700 dark:text-neutral-300">{strength}</Text>
                    </View>
                  ))}
                </View>

                <View className="mb-4">
                  <Text className="font-medium text-neutral-800 dark:text-white mb-2">Suggestions for Improvement</Text>
                  {feedback.suggestions.map((suggestion, index) => (
                    <View key={index} className="flex-row items-start mb-1">
                      <Text className="text-amber-600 mr-2">•</Text>
                      <Text className="text-sm text-neutral-700 dark:text-neutral-300">{suggestion}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className="p-4 border-t border-neutral-200 dark:border-neutral-700 flex-row items-center justify-between">
                <TouchableOpacity
                  className="flex-row items-center p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700"
                  onPress={() => setShowFeedback(false)}
                >
                  <FileQuestion size={16} color="#6B7280" />
                  <Text className="ml-2 text-neutral-700 dark:text-neutral-300">Try Again</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center p-2 px-4 rounded-lg bg-indigo-600"
                  onPress={handleClose}
                >
                  <Text className="text-white font-medium">Close</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  )
}
