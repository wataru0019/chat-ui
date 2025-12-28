# Chat UI Components (SvelteKit)

このプロジェクトは、SvelteKit を使用して構築された、再利用性の高い AI チャットユーザーインターフェース一式を提供します。
コンポーネント指向で設計されており、CSS 変数によってデザインを簡単にカスタマイズできます。

## 特徴

- 🧱 **再利用可能なコンポーネント**: Shadcn UI の設計思想に基づいた、シンプルで強力な UI コンポーネント群。
- 📱 **レスポンシブデザイン**: モバイルとデスクトップの両方で最適化されたサイドバーとチャットレイアウト。
- 🎨 **カスタマイズ性**: `app.css` の CSS 変数を変更するだけで、色や丸みなどのテーマを瞬時に変更可能。
- ⚡ **Svelte 5 Runes 対応**: 最新の Svelte 機能を活用したリアクティブな設計（一部コンポーネント）。
- 🛠 **TypeScript 対応**: すべてのコンポーネントとストアで型安全性が確保されています。

## プロジェクト構造

```text
src/lib/
├── components/
│   ├── chat/        # チャット専用コンポーネント (Message, Input, List)
│   ├── layout/      # Sidebar などのレイアウト部品
│   └── ui/          # 基本的な UI 部品 (Button, Input, Avatar, Loading)
├── stores/          # チャットの状態管理 (chatStore)
└── services/        # モックAPIや外部連携サービス
```

## 導入方法

### 1. 依存関係のインストール

```sh
pnpm install
```

### 2. コンポーネントの再利用

必要なコンポーネントを自分のプロジェクトの `$lib/components` にコピーして使用してください。

```svelte
<script lang="ts">
  import ChatList from '$lib/components/chat/ChatList.svelte';
  import ChatInput from '$lib/components/chat/ChatInput.svelte';
  import { chatStore } from '$lib/stores/chatStore';
</script>

<div class="chat-container">
  <ChatList messages={$chatStore.messages} isLoading={$chatStore.isLoading} />
  <ChatInput onSend={(text) => /* AI連携ロジック */} />
</div>
```

## 開発

```sh
# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build

# プレビュー
pnpm preview
```

## カスタマイズ

`src/app.css` 内の `:root` 変数を編集することで、プロジェクト全体の色調を調整できます。

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
  /* ... */
}
```

## ライセンス

MIT
