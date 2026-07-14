const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'short',
})

const timeFormatter = new Intl.DateTimeFormat('ja-JP', {
  hour: '2-digit',
  minute: '2-digit',
})

const dateTimeFormatter = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
})

/** 例: "2026年7月14日(火)" */
export function formatDateLabel(iso: string): string {
  return dateFormatter.format(new Date(iso))
}

/** 例: "21:00" */
export function formatTimeLabel(iso: string): string {
  return timeFormatter.format(new Date(iso))
}

/** 例: "2026/07/14 21:00"（最終更新日時などに使用） */
export function formatDateTimeLabel(iso: string): string {
  return dateTimeFormatter.format(new Date(iso))
}

/** 日付グルーピング用キー（YYYY-MM-DD、ローカルタイム基準） */
export function toDateKey(iso: string): string {
  const d = new Date(iso)
  const year = d.getFullYear()
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}
