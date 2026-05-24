import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '#/components/ui/button'

type ThemeMode = 'light' | 'dark'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

function applyThemeMode(mode: ThemeMode) {
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(mode)
  document.documentElement.setAttribute('data-theme', mode)
  document.documentElement.style.colorScheme = mode
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('light')

  useEffect(() => {
    const initialMode = getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  function toggleMode() {
    const nextMode: ThemeMode = mode === 'light' ? 'dark' : 'light'
    setMode(nextMode)
    applyThemeMode(nextMode)
    window.localStorage.setItem('theme', nextMode)
  }

  useEffect(() => {
    if (import.meta.env.VITE_NODE_ENV === 'production') {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key === 'd' || event.key === 'D')) {
        event.preventDefault()
        toggleMode()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mode])

  const label = `Theme mode: ${mode}. Click to switch mode.`

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      className="rounded-full"
    >
      {mode === 'dark' ? <Moon /> : <Sun />}
    </Button>
  )
}
