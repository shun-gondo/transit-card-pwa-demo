import type { Transaction } from '../types/transaction'

/**
 * 学習用のローカルモックデータ。実在の駅・店舗・鉄道会社とは一切関係ない。
 * 時系列順（古い→新しい）に記録し、balanceAfter は直前残高からの積み上げで
 * 矛盾なく計算してある。表示時は新しい順に並べ替えて利用する。
 */
const chronological: Transaction[] = [
  {
    id: 'txn-001',
    type: 'charge',
    occurredAt: '2026-07-08T09:15:00+09:00',
    title: 'チャージ（デモ入金）',
    amount: 4000,
    balanceAfter: 4000,
  },
  {
    id: 'txn-002',
    type: 'train',
    occurredAt: '2026-07-08T09:20:00+09:00',
    title: '北町駅 → 中央公園駅',
    amount: -170,
    balanceAfter: 3830,
  },
  {
    id: 'txn-003',
    type: 'shopping',
    occurredAt: '2026-07-09T12:40:00+09:00',
    title: 'Demo Market',
    amount: -450,
    balanceAfter: 3380,
  },
  {
    id: 'txn-004',
    type: 'bus',
    occurredAt: '2026-07-10T18:05:00+09:00',
    title: '中央公園 → 北町（バス）',
    amount: -180,
    balanceAfter: 3200,
  },
  {
    id: 'txn-005',
    type: 'train',
    occurredAt: '2026-07-12T08:30:00+09:00',
    title: '北町駅 → 東通り駅',
    amount: -210,
    balanceAfter: 2990,
  },
  {
    id: 'txn-006',
    type: 'shopping',
    occurredAt: '2026-07-13T19:50:00+09:00',
    title: 'Transit Cafe',
    amount: -620,
    balanceAfter: 2370,
  },
  {
    id: 'txn-007',
    type: 'adjustment',
    occurredAt: '2026-07-13T20:10:00+09:00',
    title: '取消・調整（Transit Cafe 誤操作分）',
    amount: 620,
    balanceAfter: 2990,
    note: '店舗側の操作誤りによる取消（デモ用データ）',
  },
  {
    id: 'txn-008',
    type: 'train',
    occurredAt: '2026-07-14T07:45:00+09:00',
    title: '北町駅 → 中央公園駅',
    amount: -210,
    balanceAfter: 2780,
  },
  {
    id: 'txn-009',
    type: 'charge',
    occurredAt: '2026-07-14T21:00:00+09:00',
    title: 'チャージ（デモ入金）',
    amount: 3000,
    balanceAfter: 5780,
  },
]

/** 新しい順（画面表示用の既定順） */
export const mockTransactions: Transaction[] = [...chronological].reverse()
