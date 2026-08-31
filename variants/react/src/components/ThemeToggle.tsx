import { useEffect, useState } from 'react'
import { readItem, writeItem } from '../lib/storage'

type Choice = 'system' | 'light' | 'dark'
const KEY = 'ins-and-outs:theme'
const CHOICES: Choice[] = ['system', 'light', 'dark']
const LABELS: Record<Choice, string> = { system: 'Auto', light: 'Light', dark: 'Dark' }

function apply(choice: Choice) {
  const root = document.documentElement
  if (choice === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', choice)
}

export function ThemeToggle() {
  const [choice, setChoice] = useState<Choice>(() => {
    const stored = readItem(KEY)
    return stored === 'light' || stored === 'dark' ? stored : 'system'
  })

  useEffect(() => {
    apply(choice)
    writeItem(KEY, choice)
  }, [choice])

  return (
    <div className="themeToggle" role="group" aria-label="Colour theme">
      {CHOICES.map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={choice === value}
          onClick={() => setChoice(value)}
        >
          {LABELS[value]}
        </button>
      ))}
    </div>
  )
}
