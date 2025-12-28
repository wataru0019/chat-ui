# AIチャットUI 実装ドキュメント

このドキュメントでは、本プロジェクトで行ったAIチャットUIの実装計画と詳細についてまとめています。

## 1. 概要
SvelteKit (Svelte 5) を使用し、モダンで再利用性の高いAIチャットUIを構築しました。
バックエンド（AI統合）はスコープ外とし、モックサービスを使用して動作を確認できる構成にしています。

## 2. 実装計画
- **目的**: 汎用的で、他のプロジェクトに部品として持ち出しやすいチャットUIを作成する。
- **技術スタック**:
  - フレームワーク: SvelteKit (Svelte 5)
  - スタイリング: Scoped CSS + CSS Variables (Design Tokens)
  - アイコン: Lucide Svelte
  - マークダウン描画: Marked
- **設計方針**:
  - 原子デザイン（Atomic Design）を意識したコンポーネント分割。
  - 特定のCSSフレームワークに依存せず、標準のCSS変数でテーマ変更を可能にする。

## 3. ディレクトリ構造
```
src/
├── lib/
│   ├── components/
│   │   ├── ui/       # 基本パーツ（Button, Input, Avatar, Loading）
│   │   ├── chat/     # チャット用パーツ（Message, Input, List）
│   │   └── layout/   # レイアウト構成要素（Sidebar）
│   ├── services/     # ビジネスロジック・API通信（Mock Service）
│   └── stores/       # 状態管理（Chat Store）
└── routes/
    └── +page.svelte  # メイン画面アセンブリ
```

## 4. 実装内容
### UIコンポーネント (src/lib/components)
- **Atoms (ui/)**:
  - `Button.svelte`: デザイン変数を使用した汎用ボタン。
  - `Input.svelte`: 標準的なテキスト入力。
  - `Avatar.svelte`: ユーザー/AIのアイコン表示（フォールバック対応）。
  - `Loading.svelte`: タイピング中のアニメーション。
- **Molecules (chat/)**:
  - `ChatMessage.svelte`: `marked`を使用したマークダウン対応のメッセージ表示。
  - `ChatInput.svelte`: 改行対応のテキストエリアと送信ボタン。
  - `ChatList.svelte`: メッセージのリスト表示。
- **Organisms (layout/)**:
  - `Sidebar.svelte`: モバイル対応・開閉可能な履歴サイドバー。

### ロジック・状態管理
- `chatStore.ts`: メッセージ履歴と読込状態を管理するSvelteストア。
- `mockService.ts`: AIの応答（ストリーミング風の遅延）をシミュレートする関数。

## 5. 使い方
1. **開発サーバーの起動**:
   ```bash
   npm run dev
   ```
2. **チャットのテスト**:
   - 入力欄にメッセージを書き、送信。
   - 自分のメッセージが表示され、ローディング表示の後に「AI」からの返信が届きます。
   - メッセージが増えると自動的に下部へスクロールします。

## 6. 再利用・統合について
- **テーマ変更**: `src/app.css` の CSS 変数（`--primary`, `--background` 等）を書き換えるだけで、全体のデザインを一括変更できます。
- **バックエンド統合**: `src/lib/services/mockService.ts` を実際のAPIコール（LangChainやOpenAI SDK等）に差し替えることで、実稼働するAIチャットに変換できます。
