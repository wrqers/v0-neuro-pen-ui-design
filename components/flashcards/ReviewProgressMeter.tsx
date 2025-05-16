import { View, Text } from "react-native"
import { ProgressRing } from "../shared/ProgressRing"

interface ReviewProgressMeterProps {
  total: number
  reviewed: number
  correct: number
  className?: string
}

export function ReviewProgressMeter({ total, reviewed, correct, className = "" }: ReviewProgressMeterProps) {
  const percentComplete = Math.round((reviewed / total) * 100)
  const percentCorrect = reviewed > 0 ? Math.round((correct / reviewed) * 100) : 0

  return (
    <View className={`flex-row items-center justify-center space-x-6 ${className}`}>
      <View className="items-center">
        <ProgressRing progress={percentComplete} size={60} strokeWidth={6} color="#6366F1" />
        <Text className="mt-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">Progress</Text>
        <Text className="text-sm font-bold text-neutral-800 dark:text-white">{percentComplete}%</Text>
      </View>

      <View className="items-center">
        <ProgressRing progress={percentCorrect} size={60} strokeWidth={6} color="#10B981" />
        <Text className="mt-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">Accuracy</Text>
        <Text className="text-sm font-bold text-neutral-800 dark:text-white">{percentCorrect}%</Text>
      </View>
    </View>
  )
}
