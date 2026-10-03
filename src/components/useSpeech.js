import { useCallback, useEffect, useRef, useState } from 'react'

const splitSentences = (text) =>
  (text.match(/[^.!?…]+[.!?…]+|[^.!?…]+$/g) ?? [])
    .map((part) => part.trim())
    .filter(Boolean)

function pickGreekVoice(voices) {
  const greek = voices.filter((v) => v.lang?.toLowerCase().startsWith('el'))
  if (!greek.length) return null
  return (
    greek.find((v) => /natural|premium|enhanced|google/i.test(v.name)) ??
    greek.find((v) => /google/i.test(v.name)) ??
    greek[0]
  )
}

export function useSpeech() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  const [hasGreek, setHasGreek] = useState(true)
  const [speaking, setSpeaking] = useState(false)
  const [activePart, setActivePart] = useState(-1)

  const voiceRef = useRef(null)
  const activeRef = useRef(false)

  useEffect(() => {
    if (!supported) return

    const pick = () => {
      const voices = window.speechSynthesis.getVoices()
      voiceRef.current = pickGreekVoice(voices)
      setHasGreek(Boolean(voiceRef.current))
    }

    pick()
    window.speechSynthesis.addEventListener('voiceschanged', pick)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', pick)
  }, [supported])

  const stop = useCallback(() => {
    if (!supported) return
    activeRef.current = false
    window.speechSynthesis.cancel()
    setSpeaking(false)
    setActivePart(-1)
  }, [supported])

  // Always silence speech if the component unmounts mid-utterance
  useEffect(() => {
    if (!supported) return
    return () => {
      activeRef.current = false
      window.speechSynthesis.cancel()
    }
  }, [supported])

  const speak = useCallback(
    (text, { onDone } = {}) => {
      if (!supported || !text) return

      activeRef.current = false
      window.speechSynthesis.cancel()

      const parts = splitSentences(text)
      if (!parts.length) return

      activeRef.current = true
      setSpeaking(true)
      setActivePart(0)

      let index = 0

      const next = () => {
        if (!activeRef.current) return

        if (index >= parts.length) {
          activeRef.current = false
          setSpeaking(false)
          setActivePart(-1)
          onDone?.()
          return
        }

        const utterance = new SpeechSynthesisUtterance(parts[index])
        if (voiceRef.current) utterance.voice = voiceRef.current
        utterance.lang = 'el-GR'
        utterance.rate = 1
        utterance.pitch = 1

        utterance.onend = () => {
          index += 1
          if (activeRef.current) setActivePart(index)
          next()
        }
        utterance.onerror = () => {
          activeRef.current = false
          setSpeaking(false)
          setActivePart(-1)
        }

        window.speechSynthesis.speak(utterance)
      }

      next()
    },
    [supported],
  )

  return { supported, hasGreek, speaking, activePart, speak, stop }
}
