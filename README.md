# Transit Pass Demo

交通系ICカードアプリの操作体験（残高中心のホーム画面、利用履歴の確認）を参考にした、**フロントエンド学習用のPWA（Progressive Web App）デモ**です。

> **本アプリはフロントエンド学習用のデモです。実在する交通事業者、交通系ICカードおよび決済サービスとは関係ありません。**

## 目次

- [学習目的](#学習目的)
- [公式サービスではないことについて](#公式サービスではないことについて)
- [使用技術](#使用技術)
- [主要機能](#主要機能)
- [画面構成](#画面構成)
- [ディレクトリ構成](#ディレクトリ構成)
- [必要環境](#必要環境)
- [セットアップ手順](#セットアップ手順)
- [開発サーバーの起動](#開発サーバーの起動)
- [Lint / Format / 型チェック / ビルド](#lint--format--型チェック--ビルド)
- [GitHub Pagesへの公開](#github-pagesへの公開)
- [GitHub Actionsについて](#github-actionsについて)
- [PWAのインストール方法](#pwaのインストール方法)
- [オフライン動作の確認方法](#オフライン動作の確認方法)
- [手動テスト項目](#手動テスト項目)
- [制約事項](#制約事項)
- [今後の拡張案](#今後の拡張案)
- [ライセンス](#ライセンス)
- [公開URL](#公開url)

## 学習目的

React / TypeScript / Vite / React Router / PWA（Web App Manifest・Service Worker）/ GitHub Actions による GitHub Pages 自動デプロイ、という一連のフロントエンド構成を、小規模かつ実践に近いテーマ（残高表示・利用履歴一覧）を題材に一通り体験することを目的とした個人学習用リポジトリです。

## 公式サービスではないことについて

このアプリは**特定の交通事業者・交通系ICカード・決済サービスの公式アプリではありません**。また、それらと提携・協力関係にもありません。

- サービス名・ロゴ・カードデザイン・アイコンはすべてオリジナルです。
- 実在するICカードのサービス名、鉄道会社の名称・ロゴ、公式アプリの画像素材、Apple Payのロゴ等は一切使用していません。
- 画面内に表示される駅名・店舗名（例: 北町駅、中央公園駅、Transit Cafe、Demo Market）はすべて架空のものです。
- 表示されるデータはすべてローカルのモックデータであり、実際の決済・入金・通信は一切行われません。

## 使用技術

| 分類         | 技術                       | 採用理由                                                                                                                                              |
| ------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| UIライブラリ | React                      | 要件で指定、コンポーネント分割がしやすい                                                                                                              |
| ビルドツール | Vite                       | 高速な開発サーバーとビルド、PWAプラグインとの親和性                                                                                                   |
| 言語         | TypeScript                 | 取引データ等の型安全性を確保                                                                                                                          |
| ルーティング | React Router（HashRouter） | GitHub Pagesのサブパス配信でリロード・直リンクが安定して動作するため                                                                                  |
| PWA          | vite-plugin-pwa            | Viteの`base`設定を自動的に考慮し、manifest/Service Workerを生成できる定番プラグイン。開発時はSW無効化がデフォルトで、キャッシュ起因の混乱を避けられる |
| スタイリング | CSS Modules                | 追加パッケージ不要でスコープ付きCSSを実現できるVite標準機能                                                                                           |
| Lint         | ESLint + typescript-eslint | 型を考慮したLintルール                                                                                                                                |
| Format       | Prettier                   | コードスタイルの統一                                                                                                                                  |
| CI/CD        | GitHub Actions             | PRチェックとGitHub Pagesへの自動デプロイ                                                                                                              |

状態管理ライブラリ（Redux等）やテストフレームワーク（Vitest, Jest, Playwright等）は、要件に基づき採用していません。状態管理はReact標準の`useState` / `useMemo` / `Context` / カスタムフックのみで構成しています。

## 主要機能

- 残高表示（`Intl.NumberFormat`による日本円表記）と最終更新日時の表示
- 残高更新（外部通信は行わず、ローカルモックデータの再読込・更新時刻の更新のみ）
- 入金ボタン（実際の決済は行われず、デモである旨のモーダルを表示）
- 最近の利用履歴3件の表示とすべての履歴への導線
- 日付ごとにグルーピングされた利用履歴一覧（鉄道・バス・買い物・チャージ・取消/調整を視覚的に区別）
- 学習用デモである旨の注意書き（閉じた状態はlocalStorageに保存）
- PWAインストール案内（Android/デスクトップは`beforeinstallprompt`、iOS Safariは手順文言で案内）
- ローディング状態・空データ状態・エラー状態・404（不正URL）への対応

## 画面構成

1. **ホーム画面**（`/`）: アプリ名、オリジナルデザインのICカード、残高、最終更新日時、残高更新ボタン、最近の利用履歴3件、履歴一覧へのボタン、入金ボタン、注意書き、PWAインストール案内
2. **利用履歴画面**（`/history`）: ホームへ戻る導線、現在残高、日付グルーピングされた履歴一覧（空の場合は空状態を表示）
3. **404ページ**: 不正なURLへのアクセス時に表示し、ホームへ戻る導線を提供

## ディレクトリ構成

```
transit-card-pwa-demo/
├── .github/workflows/ci-deploy.yml   # GitHub Actions（Lint/Build/Deploy）
├── design/                            # アイコンのSVGソース（ビルド非対象）
├── public/
│   ├── icons/                         # PWAアイコン（オリジナルSVGから生成したPNG）
│   └── favicon.svg
├── src/
│   ├── main.tsx / App.tsx / router.tsx
│   ├── styles/                        # デザイントークン・グローバルCSS
│   ├── components/                    # 再利用可能なUIコンポーネント（コンポーネントごとにフォルダ分割）
│   ├── pages/                         # HomePage / HistoryPage / NotFoundPage
│   ├── context/                       # 残高状態を保持するCardContext
│   ├── hooks/                         # useCard, useInstallPrompt など
│   ├── data/                          # モックデータ（mockTransactions.ts, mockCard.ts）
│   ├── types/                         # Transaction, CardState などの型定義
│   └── utils/                         # 通貨・日付フォーマットユーティリティ
├── vite.config.ts
├── eslint.config.js
├── .prettierrc
└── package.json
```

## 必要環境

- Node.js 22 系（Active LTS）
- npm（Node.jsに同梱のもの）

`node@23`のような奇数メジャーバージョン（非LTS）は動作対象外です。バージョン管理には[nvm](https://github.com/nvm-sh/nvm)や`brew install node@22`等の利用を推奨します。

## セットアップ手順

```bash
git clone <このリポジトリのURL>
cd transit-card-pwa-demo
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

`http://localhost:5173/transit-card-pwa-demo/` （`vite.config.ts`の`base`設定に合わせたパス）で確認できます。

## Lint / Format / 型チェック / ビルド

```bash
npm run lint          # ESLint
npm run lint:fix      # ESLint（自動修正）
npm run format        # Prettierで整形
npm run format:check  # Prettierチェック（差分があれば失敗）
npm run typecheck     # TypeScript型チェック（tsc --noEmit）
npm run build         # 本番ビルド（dist/ 生成）
npm run preview       # ビルド成果物をローカルで確認
```

## GitHub Pagesへの公開

`vite.config.ts`の`base`をリポジトリ名に合わせて`/transit-card-pwa-demo/`に設定しています。`main`ブランチへのPushをトリガーに、GitHub Actionsが自動でビルド・デプロイを行います。

初回のみ、リポジトリの **Settings > Pages > Build and deployment > Source** を **GitHub Actions** に設定してください。

## GitHub Actionsについて

`.github/workflows/ci-deploy.yml` に2つのジョブを定義しています。

- **quality**（`pull_request` → `main` および `push` → `main` の両方で実行）: `npm ci` → ESLint → Prettierチェック → 型チェック → 本番ビルド。Pull Requestではここで終了し、Pagesへのデプロイは行いません。
- **deploy**（`push` → `main` のときのみ、`quality`の成功が条件）: `quality`が生成したビルド成果物をそのまま使い回し、GitHub Pages公式アクション（`configure-pages` / `upload-pages-artifact` / `deploy-pages`）でデプロイします。ビルドの重複実行を避けています。

`workflow_dispatch`にも対応しており、手動での再実行が可能です。

## PWAのインストール方法

- **Android Chrome / デスクトップChrome等**: ホーム画面に表示される「ホーム画面に追加できます」という案内、またはブラウザのインストールメニューから追加できます。
- **iOS Safari**: `beforeinstallprompt`に対応していないため、共有ボタン（□に↑）から「ホーム画面に追加」を選択してください。

## オフライン動作の確認方法

1. `npm run build && npm run preview` でビルド成果物を起動し、一度ページを開いてService Workerの登録を待つ
2. ブラウザのDevTools（Application/Network タブ）で「Offline」に設定、またはネットワークを切断する
3. ページを再読み込みし、アプリシェル（最低限の画面）が表示されることを確認する

## 手動テスト項目

テストフレームワークは導入していないため、変更時は以下を手動で確認してください。

- [ ] ホーム画面の表示（カード・残高・最終更新日時・注意書き）
- [ ] 「残高を更新」でローディング表示のあと最終更新日時が更新される
- [ ] 「入金する」でデモである旨のモーダルが表示され、残高が変化しない
- [ ] 最近の利用履歴3件が表示され、「利用履歴をすべて見る」で `/history` に遷移する
- [ ] 利用履歴画面で日付グルーピング・鉄道/バス/買い物/チャージ/取消の視覚的区別ができている
- [ ] 履歴画面から「戻る」でホームへ遷移する
- [ ] 存在しないURL（例: `/#/unknown`）で404ページが表示される
- [ ] ブラウザの再読み込みで画面が崩れない（ホーム / 履歴 / 404 それぞれ）
- [ ] スマートフォン幅（375px前後）とPC幅の両方でレイアウトが崩れない
- [ ] キーボード操作のみでボタン・リンク・モーダルの開閉ができる
- [ ] `prefers-reduced-motion`を有効にした状態でアニメーションが抑制される
- [ ] PWAとしてインストールでき、スタンドアロン表示で起動する
- [ ] オフライン時にアプリシェルが表示される（上記手順を参照）

## 制約事項

- 実在の交通系ICカード・決済システム・鉄道会社のシステムとは一切接続していません。
- 表示データはすべてローカルのモックデータであり、サーバーサイド・データベースは存在しません。
- テストフレームワークは意図的に導入していません（学習目的のスコープ外としています）。
- 依存関係の一部（`vite-plugin-pwa`が利用する`workbox-build`の推移的依存）に、`npm install`時点で非推奨(deprecated)警告が出る場合がありますが、`npm audit`では脆弱性0件を確認しています。これは第三者パッケージの内部依存によるもので、本プロジェクトの依存関係選定では最新の安定版を採用しています。

## 今後の拡張案

- ダークモード対応
- 複数カード（デモ用の複数プロファイル）切り替え
- 利用履歴の検索・絞り込みUI
- 設定画面（表示通貨や言語切り替えなど、学習目的での拡張）

## ライセンス

[MIT License](./LICENSE)

学習用サンプルとして、利用・改変・再配布の条件がシンプルで広く理解されているMIT Licenseを採用しています。これはソースコードに対するライセンスであり、本プロジェクトが実在の交通事業者・ブランドの権利を主張・保有するものではありません。

## 公開URL

<!-- GitHub Pagesへのデプロイ後、実際のURLに置き換えてください -->

https://shun-gondo.github.io/transit-card-pwa-demo/
