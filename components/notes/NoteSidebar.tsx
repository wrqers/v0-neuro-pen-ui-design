import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { FileText, Hash, Link as LinkIcon, Brain } from "lucide-react-native"
import { CollapsibleSection } from "../shared/CollapsibleSection"

export function NoteSidebar() {
  // Mock data
  const outline = ["Introduction", "Key Concepts", "Research", "Applications", "Conclusion"]
  const relatedConcepts = [
    "Synaptic Pruning",
    "Hebbian Learning",
    "Neural Networks",
    "Brain Plasticity",
    "Cognitive Flexibility",
  ]
  const backlinks = ["Learning Techniques", "Brain Injury Recovery", "Cognitive Development"]

  return (
    <View className="w-72 border-l border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
      <ScrollView>
        <View className="p-4">
          <CollapsibleSection title="Document Outline" icon={FileText} defaultOpen>
            {outline.map((item, index) => (
              <TouchableOpacity key={index} className="py-2 px-3 flex-row items-center">
                <Text className="text-sm text-neutral-700 dark:text-neutral-300">{item}</Text>
              </TouchableOpacity>
            ))}
          </CollapsibleSection>

          <CollapsibleSection title="Related Concepts" icon={Brain} defaultOpen>
            {relatedConcepts.map((concept, index) => (
              <TouchableOpacity
                key={index}
                className="py-2 px-3 flex-row items-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
              >
                <Hash size={14} color="#6366F1" />
                <Text className="ml-2 text-sm text-indigo-600 dark:text-indigo-400">{concept}</Text>
              </TouchableOpacity>
            ))}
          </CollapsibleSection>

          <CollapsibleSection title="Backlinks" icon={LinkIcon}>
            {backlinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                className="py-2 px-3 flex-row items-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
              >
                <FileText size={14} color="#6B7280" />
                <Text className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">{link}</Text>
              </TouchableOpacity>
            ))}
          </CollapsibleSection>
        </View>
      </ScrollView>
    </View>
  )
}
