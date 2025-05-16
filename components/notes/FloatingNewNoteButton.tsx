"use client"

import React from "react"
import { View, Text, TouchableOpacity, Modal } from "react-native"
import { Plus, FileText, Brain, BookOpen, X } from "lucide-react-native"

interface FloatingNewNoteButtonProps {
  onCreateNote: () => void
  onCreateFlashcard: () => void
  onImportDocument: () => void
}

export function FloatingNewNoteButton({
  onCreateNote,
  onCreateFlashcard,
  onImportDocument,
}: FloatingNewNoteButtonProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <>
      <TouchableOpacity
        className="absolute bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full items-center justify-center shadow-lg"
        onPress={() => setMenuOpen(true)}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal transparent={true} visible={menuOpen} animationType="fade" onRequestClose={() => setMenuOpen(false)}>
        <TouchableOpacity className="flex-1 bg-black/30" activeOpacity={1} onPress={() => setMenuOpen(false)}>
          <View className="flex-1 justify-end items-end p-6">
            <View className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl mb-4 w-64 overflow-hidden">
              <View className="p-3 border-b border-neutral-200 dark:border-neutral-700">
                <Text className="font-medium text-neutral-800 dark:text-white">Create New</Text>
              </View>

              <TouchableOpacity
                className="flex-row items-center p-4 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                onPress={() => {
                  setMenuOpen(false)
                  onCreateNote()
                }}
              >
                <FileText size={20} color="#6366F1" />
                <Text className="ml-3 text-neutral-800 dark:text-white">New Note</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center p-4 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                onPress={() => {
                  setMenuOpen(false)
                  onCreateFlashcard()
                }}
              >
                <Brain size={20} color="#6366F1" />
                <Text className="ml-3 text-neutral-800 dark:text-white">New Flashcard</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center p-4 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                onPress={() => {
                  setMenuOpen(false)
                  onImportDocument()
                }}
              >
                <BookOpen size={20} color="#6366F1" />
                <Text className="ml-3 text-neutral-800 dark:text-white">Import Document</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="p-2 bg-white dark:bg-neutral-800 rounded-full"
              onPress={() => setMenuOpen(false)}
            >
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}
