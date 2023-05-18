import { useEffect, useState } from "react"

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continuous = true
recognition.lang = "en-US"
recognition.interimResults = true
recognition.maxAlternatives = 1

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    if (!isListening) return

    function onResult(event: SpeechRecognitionEvent) {
      const combinedText = Array.from(event.results)
        .map((result) => result.item(0).transcript)
        .join(" ")

      setText(combinedText)
    }

    recognition.start()
    recognition.addEventListener("result", onResult)

    return () => {
      recognition.removeEventListener("result", onResult)
      recognition.stop()
    }
  }, [isListening])

  return {
    isListening,
    start: () => setIsListening(true),
    stop: () => setIsListening(false),
    text,
  }
}
