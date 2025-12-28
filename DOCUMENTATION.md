# Chat UI プロジェクト仕様書

## 1. プロジェクト概要
本プロジェクトは、モダンな AI チャットアプリケーションを構築するための、再利用可能なフロントエンド UI コンポーネント集です。SvelteKit をベースにし、シンプルかつ拡張性の高い設計を目指しています。

- **目的**: 任意の AI バックエンドと連携可能な、一貫性のあるユーザーインターフェースの提供。
- **ターゲット**: SvelteKit を使用して AI 連携アプリを開発するエンジニア。

## 2. 技術スタック
- **Framework**: SvelteKit (Svelte 5 Runes)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (CSS Variables)
- **Icons**: lucide-svelte
- **State Management**: Svelte Stores

## 3. 機能仕様

### 3.1 チャットインターフェース
- **メッセージ表示**: ユーザーとアシスタントのメッセージを視覚的に区別して表示。
- **リアルタイム入力**: テキスト入力中の状態管理と、送信アクションのトリガー。
- **ローディング状態**: AI の応答待ち状態をアニメーションで表示。
- **自動スクロール**: 新しいメッセージが追加された際の自動最下部スクロール。

### 3.2 サイドバー（履歴管理）
- **レスポンシブ対応**: デスクトップでは固定/折りたたみ可能、モバイルではオーバーレイ形式。
- **履歴リスト**: 過去のチャットタイトルを一覧表示。
- **新規チャット**: 新しいセッションを開始するためのアクションボタン。

## 4. コンポーネント構成（src/lib/components）

### 4.1 UI Components (Atom)
| コンポーネント | 説明 |
| :--- | :--- |
| `Button.svelte` | 各種バリアント（primary, ghost, outline等）を持つボタン。 |
| `Input.svelte` | 標準化されたスタイルを持つテキスト入力フィールド。 |
| `Avatar.svelte` | ユーザーまたは AI のアイコン表示。 |
| `Loading.svelte` | 処理中を示すドットアニメーション。 |

### 4.2 Chat Components (Molecule/Organism)
| コンポーネント | 説明 |
| :--- | :--- |
| `ChatMessage.svelte` | 個別のメッセージバルーン。Markdown 風の表示や役割別スタイル。 |
| `ChatList.svelte` | メッセージの配列を受け取り、一括表示するコンテナ。 |
| `ChatInput.svelte` | 送信ボタン付きのメッセージ入力エリア。 |

### 4.3 Layout Components
| コンポーネント | 説明 |
| :--- | :--- |
| `Sidebar.svelte` | ナビゲーションおよび履歴管理用のサイドバー。 |

## 5. データモデル（src/lib/stores/chatStore.ts）

### 5.1 Message 型
```typescript
interface Message {
    role: 'user' | 'assistant';
    content: string;
}
```

### 5.2 ストアの状態
```typescript
{
    messages: Message[];
    isLoading: boolean;
}
```

## 6. デザイン仕様
- **テーマ**: `src/app.css` の CSS 変数により管理。
- **カラーパレット**: HSL 形式を使用し、透明度や階調の調整を容易に。
- **フォント**: `Inter` を推奨フォントとして設定。
- **レスポンシブ**: 768px をブレークポイントとし、モバイルレイアウトへ切り替え。

## 7. 拡張・統合ガイド
### 7.1 AI バックエンドとの連携
`chatStore` の `addMessage` メソッドを使用し、外部 API（OpenAI, Anthropic 等）からのレスポンスをストアに反映させることで統合します。

### 7.2 スタイルのカスタマイズ
`app.css` の `:root` セクションを上書きすることで、ブランドカラーの適用が可能です。
