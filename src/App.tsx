import { useSpeechRecognition } from "./useSpeechRecognition"

function App() {
  const { isListening, start, stop, text } = useSpeechRecognition()
  return (
    <div>
      <h1>Speech recognition demo</h1>
      {isListening ? (
        <button onClick={stop}>Stop</button>
      ) : (
        <button onClick={start}>Start</button>
      )}
      <p>{isListening ? "Listening..." : "Not listening"}</p>
      <p>{text}</p>
    </div>
  )
}

export default App
