"use client"
import { useState } from "react"

export function TopBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-4 text-center text-sm relative">
      <div className="flex items-center justify-center space-x-2">
        <span className="font-medium">Today deal sale off 70%</span>
        <span className="opacity-80">End in</span>
        <span className="font-bold">00 days 00:00:00</span>
        <span className="opacity-80">Hurry Up</span>
        <span className="ml-2">→</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-white/20 rounded p-1 transition-colors"
      >
        <span className="text-xs">close</span>
      </button>
    </div>
  )
}
