export type TransactionType = 'train' | 'bus' | 'shopping' | 'charge' | 'adjustment'

export interface Transaction {
  id: string
  type: TransactionType
  /** ISO8601形式の日時 */
  occurredAt: string
  /** 区間（例: "北町駅 → 中央公園駅"）または店舗名 */
  title: string
  /** 円。利用は負の値、チャージ・取消/調整は正の値 */
  amount: number
  /** この取引が反映された後の残高（円） */
  balanceAfter: number
  note?: string
}

export interface CardState {
  balance: number
  /** ISO8601形式の日時 */
  lastUpdatedAt: string
  holderAlias: string
}
