import { useCallback, useState } from 'react'

/** センシティブでない簡易フラグ（注意書きの既読状態など）をlocalStorageと同期する */
export function useLocalStorageBoolean(key: string, defaultValue = false) {
  const [value, setValue] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored === null ? defaultValue : stored === 'true'
    } catch {
      return defaultValue
    }
  })

  const update = useCallback(
    (next: boolean) => {
      setValue(next)
      try {
        localStorage.setItem(key, String(next))
      } catch {
        // localStorageが使用できない環境でも、メモリ上の状態のみで動作を継続する
      }
    },
    [key],
  )

  return [value, update] as const
}
