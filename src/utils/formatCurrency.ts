const yenFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
})

const signedYenFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
  signDisplay: 'exceptZero',
})

/** 残高など、符号なしの円表記 */
export function formatYen(amount: number): string {
  return yenFormatter.format(amount)
}

/** 取引金額など、+/- を明示したい円表記 */
export function formatSignedYen(amount: number): string {
  return signedYenFormatter.format(amount)
}
