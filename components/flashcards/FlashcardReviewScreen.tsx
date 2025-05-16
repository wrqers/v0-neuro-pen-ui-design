"use client"

import React from "react"
import { View, Text, TouchableOpacity, Animated, useWindowDimensions } from "react-native"
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, HelpCircle } from "lucide-react-native"
import { ReviewProgressMeter } from "./ReviewProgressMeter"

export function FlashcardReviewScreen() {
  const { width } = useWindowDimensions()
  const isTablet = width >= 768
  const [flipped, setFlipped] = React.useState(false)
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0)

  // Animations
  const flipAnim = React.useRef(new Animated.Value(0)).current
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  })
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  })

  // Mock data
  const cards = [
    {
      question: "What is neuroplasticity?",
      answer:
        "Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life. This capability allows for learning, adaptation, and recovery from brain injuries.",
    },
    {
      question: "What is the role of the hippocampus in learning?",
      answer:
        "The hippocampus plays a crucial role in the formation of new memories, particularly declarative memories (facts and events). It helps transfer information from short-term to long-term memory.",
    },
    {
      question: "What are the main types of learning?",
      answer:
        "1. Explicit Learning: Conscious, intentional acquisition of knowledge\n2. Implicit Learning: Unconscious acquisition of knowledge\n3. Observational Learning: Learning by observing others\n4. Experiential Learning: Learning through experience and reflection",
    },
  ]

  const flipCard = () => {
    if (!flipped) {
      Animated.timing(flipAnim, {
        toValue: 180,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(flipAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
    setFlipped(!flipped)
  }

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      if (flipped) {
        flipCard()
      }
    }
  }

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      if (flipped) {
        flipCard()
      }
    }
  }

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  }

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  }

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-900 p-4">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity className="p-2">
          <ArrowLeft size={24} color="#6B7280" />
        </TouchableOpacity>

        <Text className="text-lg font-medium text-neutral-800 dark:text-white">
          Neuroscience Basics • Card {currentCardIndex + 1} of {cards.length}
        </Text>

        <View className="w-8" />
      </View>

      <View className="flex-1 items-center justify-center">
        <ReviewProgressMeter
          total={cards.length}
          reviewed={currentCardIndex}
          correct={Math.floor(currentCardIndex * 0.7)}
          className="mb-6"
        />

        <TouchableOpacity activeOpacity={0.9} onPress={flipCard}>
          <View className={`relative ${isTablet ? "w-[500px] h-[300px]" : "w-full h-60"}`}>
            <Animated.View
              className="absolute inset-0 items-center justify-center bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg backface-hidden border border-neutral-200 dark:border-neutral-700"
              style={frontAnimatedStyle}
            >
              <Text className="text-2xl font-medium text-center text-neutral-800 dark:text-white mb-4">
                {cards[currentCardIndex].question}
              </Text>
              <Text className="text-sm text-neutral-500 dark:text-neutral-400 text-center mt-auto">
                Tap to reveal answer
              </Text>
            </Animated.View>

            <Animated.View
              className="absolute inset-0 items-center justify-center bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg backface-hidden border border-neutral-200 dark:border-neutral-700"
              style={[backAnimatedStyle, { backfaceVisibility: "hidden" }]}
            >
              <Text className="text-xl text-center text-neutral-800 dark:text-white">
                {cards[currentCardIndex].answer}
              </Text>
            </Animated.View>
          </View>
        </TouchableOpacity>

        <View className="flex-row items-center justify-center mt-6 space-x-4">
          <TouchableOpacity
            className="p-4 rounded-full bg-white dark:bg-neutral-800 shadow border border-neutral-200 dark:border-neutral-700"
            onPress={prevCard}
            disabled={currentCardIndex === 0}
          >
            <ArrowLeft size={24} color={currentCardIndex === 0 ? "#9CA3AF" : "#6B7280"} />
          </TouchableOpacity>

          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              className="p-3 rounded-full bg-red-100 dark:bg-red-900/20"
              disabled={!flipped}
              style={{ opacity: flipped ? 1 : 0.5 }}
            >
              <XCircle size={28} color="#EF4444" />
            </TouchableOpacity>

            <TouchableOpacity
              className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20"
              disabled={!flipped}
              style={{ opacity: flipped ? 1 : 0.5 }}
            >
              <HelpCircle size={28} color="#F59E0B" />
            </TouchableOpacity>

            <TouchableOpacity
              className="p-3 rounded-full bg-green-100 dark:bg-green-900/20"
              disabled={!flipped}
              style={{ opacity: flipped ? 1 : 0.5 }}
            >
              <CheckCircle size={28} color="#10B981" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="p-4 rounded-full bg-white dark:bg-neutral-800 shadow border border-neutral-200 dark:border-neutral-700"
            onPress={nextCard}
            disabled={currentCardIndex === cards.length - 1}
          >
            <ArrowRight size={24} color={currentCardIndex === cards.length - 1 ? "#9CA3AF" : "#6B7280"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
