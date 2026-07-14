import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isStandaloneDisplay(): boolean {
  const iosNavigator = navigator as Navigator & { standalone?: boolean }
  return window.matchMedia('(display-mode: standalone)').matches || iosNavigator.standalone === true
}

function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

interface UseInstallPromptResult {
  isInstalled: boolean
  /** Android/Chrome等、ブラウザ標準のインストールプロンプトを表示できるか */
  canPromptInstall: boolean
  /** iOS Safariはbeforeinstallpromptを発火しないため、手順文言の表示要否を判定する */
  showIOSInstructions: boolean
  promptInstall: () => Promise<void>
}

export function useInstallPrompt(): UseInstallPromptResult {
  const [deferredEvent, setDeferredEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(isStandaloneDisplay())

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault()
      setDeferredEvent(event as BeforeInstallPromptEvent)
    }
    function handleAppInstalled() {
      setIsInstalled(true)
      setDeferredEvent(null)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const canPromptInstall = deferredEvent !== null
  const showIOSInstructions = isIOS() && !isInstalled && !canPromptInstall

  async function promptInstall(): Promise<void> {
    if (!deferredEvent) return
    await deferredEvent.prompt()
    await deferredEvent.userChoice
    setDeferredEvent(null)
  }

  return { isInstalled, canPromptInstall, showIOSInstructions, promptInstall }
}
