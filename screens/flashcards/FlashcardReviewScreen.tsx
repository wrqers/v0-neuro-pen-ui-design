"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { ArrowLeft, CheckCircle, XCircle, HelpCircle } from "lucide-react-native"
import { GestureDetector } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated"
import { Gesture } from "react-native-gesture-handler"
import { useTheme } from "../../context/ThemeContext"
import { ReviewProgressMeter } from "../../components/flashcards/ReviewProgressMeter"
import { AnimatedButton } from "../../components/shared/AnimatedButton"
import { animations } from "../../utils/animations"
import { springConfigs } from "../../utils/animationPresets"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const ROTATION_FACTOR = 7
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3

// Mock data
const mockCards = [
  {
    id: "1",
    question: "What is neuroplasticity?",
    answer:
      "Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life. This capability allows for learning, adaptation, and recovery from brain injuries.",
  },
  {
    id: "2",
    question: "What is the role of the hippocampus in learning?",
    answer:
      "The hippocampus plays a crucial role in the formation of new memories, particularly declarative memories (facts and events). It helps transfer information from short-term to long-term memory.",
  },
  {
    id: "3",
    question: "What are the main types of learning?",
    answer:
      "1. Explicit Learning: Conscious, intentional acquisition of knowledge\n2. Implicit Learning: Unconscious acquisition of knowledge\n3. Observational Learning: Learning by observing others\n4. Experiential Learning: Learning through experience and reflection",
  },
  {
    id: "4",
    question: "What is spaced repetition?",
    answer:
      "Spaced repetition is a learning technique that involves reviewing information at increasing intervals over time. It leverages the spacing effect to improve long-term retention of information.",
  },
  {
    id: "5",
    question: "How does working memory differ from long-term memory?",
    answer:
      "Working memory is a limited capacity system for temporarily holding and manipulating information, while long-term memory has virtually unlimited capacity and can store information for a lifetime. Working memory is active and conscious, while long-term memory is largely unconscious until recalled.",
  },
]

export function FlashcardReviewScreen() {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [cards, setCards] = useState(mockCards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [completed, setCompleted] = useState<Record<string, "correct" | "incorrect" | "hard">>({})

  // Animation values
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const rotation = useSharedValue(0)
  const flipRotation = useSharedValue(0)
  const cardScale = useSharedValue(1)

  // Current card
  const currentCard = cards[currentIndex]

  // Stats
  const totalReviewed = Object.keys(completed).length
  const totalCorrect = Object.values(completed).filter((status) => status === "correct").length

  // Reset card position
  const resetCardPosition = () => {
    translateX.value = withSpring(0, springConfigs.gentle)
    translateY.value = withSpring(0, springConfigs.gentle)
    rotation.value = withSpring(0, springConfigs.gentle)
  }

  // Handle card flip
  const handleFlip = () => {
    if (!isFlipped) {
      animations.haptics.light()
      flipRotation.value = withTiming(180, { duration: 300 })
    } else {
      flipRotation.value = withTiming(0, { duration: 300 })
    }
    setIsFlipped(!isFlipped)
  }

  // Handle card result
  const handleCardResult = (result: "correct" | "incorrect" | "hard") => {
    if (!currentCard) return

    // Update completed cards
    setCompleted((prev) => ({
      ...prev,
      [currentCard.id]: result,
    }))

    // Animate card off screen
    const direction = result === "correct" ? 1 : result === "incorrect" ? -1 : 0

    if (direction !== 0) {
      translateX.value = withTiming(direction * SCREEN_WIDTH * 1.5, { duration: 300 })
    } else {
      translateY.value = withTiming(-SCREEN_WIDTH, { duration: 300 })
    }

    // Move to next card after animation
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setIsFlipped(false)
        flipRotation.value = 0
        translateX.value = 0
        translateY.value = 0
        rotation.value = 0
      } else {
        // End of deck
        // In a real app, you would navigate to a summary screen
        console.log("End of deck")
      }
    }, 300)

    // Haptic feedback
    switch (result) {
      case "correct":
        animations.haptics.success()
        break
      case "incorrect":
        animations.haptics.error()
        break
      case "hard":
        animations.haptics.warning()
        break
    }
  }

  // Swipe gesture
  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Only allow swiping when card is flipped (answer is showing)
      if (!isFlipped) return

      translateX.value = event.translationX
      translateY.value = event.translationY

      // Add rotation based on horizontal movement
      rotation.value = (translateX.value / SCREEN_WIDTH) * ROTATION_FACTOR
    })
    .onEnd((event) => {
      if (!isFlipped) return

      if (translateX.value < -SWIPE_THRESHOLD) {
        // Swiped left (incorrect)
        runOnJS(handleCardResult)("incorrect")
      } else if (translateX.value > SWIPE_THRESHOLD) {
        // Swiped right (correct)
        runOnJS(handleCardResult)("correct")
      } else if (translateY.value < -SWIPE_THRESHOLD) {
        // Swiped up (hard)
        runOnJS(handleCardResult)("hard")
      } else {
        // Reset position
        runOnJS(resetCardPosition)()
      }
    })

  // Tap gesture for flipping
  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(handleFlip)()
  })

  // Combined gesture
  const gesture = Gesture.Exclusive(swipeGesture, tapGesture)

  // Animated styles
  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}deg` },
        { scale: cardScale.value },
      ],
    }
  })

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [0, 180], Extrapolation.CLAMP)

    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: flipRotation.value > 90 ? 0 : 1,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backfaceVisibility: "hidden",
    }
  })

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [180, 360], Extrapolation.CLAMP)

    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity: flipRotation.value > 90 ? 1 : 0,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backfaceVisibility: "hidden",
    }
  })

  // Status indicator styles
  const correctIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP)

    return {
      opacity,
    }
  })

  const incorrectIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [0, -SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP)

    return {
      opacity,
    }
  })

  const hardIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, -SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP)

    return {
      opacity,
    }
  })

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.foregroundSecondary} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.foreground }]}>
          Neuroscience Basics • Card {currentIndex + 1} of {cards.length}
        </Text>

        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <ReviewProgressMeter total={cards.length} reviewed={totalReviewed} correct={totalCorrect} className="mb-6" />

        {currentCard && (
          <View style={styles.cardContainer}>
            {/* Status indicators */}
            <Animated.View style={[styles.statusIndicator, styles.correctIndicator, correctIndicatorStyle]}>
              <CheckCircle size={48} color="white" />
              <Text style={styles.statusText}>Correct</Text>
            </Animated.View>

            <Animated.View style={[styles.statusIndicator, styles.incorrectIndicator, incorrectIndicatorStyle]}>
              <XCircle size={48} color="white" />
              <Text style={styles.statusText}>Incorrect</Text>
            </Animated.View>

            <Animated.View style={[styles.statusIndicator, styles.hardIndicator, hardIndicatorStyle]}>
              <HelpCircle size={48} color="white" />
              <Text style={styles.statusText}>Hard</Text>
            </Animated.View>

            {/* Card */}
            <GestureDetector gesture={gesture}>
              <Animated.View style={[styles.card, cardStyle]}>
                {/* Front side (question) */}
                <Animated.View
                  style={[styles.cardSide, { backgroundColor: colors.card, borderColor: colors.border }, frontStyle]}
                >
                  <Text style={[styles.questionText, { color: colors.foreground }]}>{currentCard.question}</Text>

                  <Text style={[styles.flipHint, { color: colors.foregroundTertiary }]}>Tap to reveal answer</Text>
                </Animated.View>

                {/* Back side (answer) */}
                <Animated.View
                  style={[styles.cardSide, { backgroundColor: colors.card, borderColor: colors.border }, backStyle]}
                >
                  <Text style={[styles.answerText, { color: colors.foreground }]}>{currentCard.answer}</Text>

                  <Text style={[styles.swipeHint, { color: colors.foregroundTertiary }]}>
                    Swipe to rate your answer
                  </Text>
                </Animated.View>
              </Animated.View>
            </GestureDetector>
          </View>
        )}

        <View style={styles.actions}>
          <AnimatedButton
            title="Incorrect"
            variant="outline"
            leftIcon={<XCircle size={16} color={colors.danger} />}
            style={[styles.actionButton, { borderColor: colors.danger }]}
            textStyle={{ color: colors.danger }}
            disabled={!isFlipped}
            onPress={() => handleCardResult("incorrect")}
          />

          <AnimatedButton
            title="Hard"
            variant="outline"
            leftIcon={<HelpCircle size={16} color={colors.warning} />}
            style={[styles.actionButton, { borderColor: colors.warning }]}
            textStyle={{ color: colors.warning }}
            disabled={!isFlipped}
            onPress={() => handleCardResult("hard")}
          />

          <AnimatedButton
            title="Correct"
            variant="outline"
            leftIcon={<CheckCircle size={16} color={colors.success} />}
            style={[styles.actionButton, { borderColor: colors.success }]}
            textStyle={{ color: colors.success }}
            disabled={!isFlipped}
            onPress={() => handleCardResult("correct")}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: "100%",
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  card: {
    width: "100%",
    maxWidth: 500,
    height: 300,
    borderRadius: 16,
    position: "relative",
  },
  cardSide: {
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  answerText: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
  },
  flipHint: {
    fontSize: 14,
    position: "absolute",
    bottom: 16,
    textAlign: "center",
  },
  swipeHint: {
    fontSize: 14,
    position: "absolute",
    bottom: 16,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  actionButton: {
    marginHorizontal: 8,
    minWidth: 100,
  },
  statusIndicator: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  correctIndicator: {
    right: 32,
    backgroundColor: "rgba(16, 185, 129, 0.8)",
    padding: 16,
    borderRadius: 12,
  },
  incorrectIndicator: {
    left: 32,
    backgroundColor: "rgba(239, 68, 68, 0.8)",
    padding: 16,
    borderRadius: 12,
  },
  hardIndicator: {
    top: 32,
    backgroundColor: "rgba(245, 158, 11, 0.8)",
    padding: 16,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontWeight: "600",
    marginTop: 8,
  },
})
