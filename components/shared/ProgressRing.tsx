import { View, Text } from "react-native"
import Svg, { Circle } from "react-native-svg"

interface ProgressRingProps {
  progress: number
  size: number
  strokeWidth: number
  color?: string
  bgColor?: string
  showPercentage?: boolean
}

export function ProgressRing({
  progress,
  size,
  strokeWidth,
  color = "#6366F1",
  bgColor = "#E5E7EB",
  showPercentage = true,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size}>
        <Circle stroke={bgColor} fill="none" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      {showPercentage && (
        <View className="absolute items-center justify-center">
          <Text className="text-xs font-bold text-neutral-800 dark:text-white">{progress}%</Text>
        </View>
      )}
    </View>
  )
}
