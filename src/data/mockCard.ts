import type { CardState } from '../types/transaction'
import { mockTransactions } from './mockTransactions'

const latest = mockTransactions[0]

/** カードの初期状態。残高・最終更新日時は最新モック取引と整合させてある */
export const initialCardState: CardState = {
  balance: latest.balanceAfter,
  lastUpdatedAt: latest.occurredAt,
  holderAlias: '通勤用',
}
