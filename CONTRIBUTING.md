# Sugu-Study 開発ガイド

## 🛠️ 開発環境のセットアップ

### 必要な環境

- Node.js 20+
- npm 10+
- Git

### セットアップ手順

```bash
# リポジトリをクローン
git clone <repository-url>
cd sugustudy

# 依存関係をインストール
npm install

# 環境変数を設定
cp .env.local.example .env.local
# .env.local を編集して実際の値を入力

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

## 📁 プロジェクト構造

```
/Users/kabe/sugustudy/
├── app/                      # Next.js App Router
│   ├── [locale]/            # 多言語ルーティング
│   │   ├── (public)/        # 認証不要ページ
│   │   └── (dashboard)/     # 認証必要ページ
│   ├── api/                 # API Routes
│   └── auth/                # 認証コールバック
├── components/              # Reactコンポーネント
│   ├── ui/                  # shadcn/ui基本コンポーネント
│   ├── layouts/             # レイアウトコンポーネント
│   ├── learning/            # 学習関連
│   ├── exam/                # 試験関連
│   ├── kyc/                 # KYC関連
│   ├── gamification/        # ゲーミフィケーション
│   └── ads/                 # 広告関連
├── lib/                     # ユーティリティ
│   ├── supabase/            # Supabase設定
│   ├── stores/              # Zustand状態管理
│   ├── hooks/               # カスタムフック
│   └── utils/               # ヘルパー関数
├── messages/                # 多言語翻訳ファイル
├── public/                  # 静的ファイル
├── supabase/                # Supabase設定
│   ├── migrations/          # SQLマイグレーション
│   └── functions/           # Edge Functions
└── styles/                  # グローバルスタイル
```

## 🎨 コーディング規約

### TypeScript

- 厳密な型定義を使用
- `any` の使用は最小限に
- エラーハンドリングを適切に実装

### React

- 関数コンポーネントを使用
- カスタムフックで再利用可能なロジックを抽出
- `'use client'` と `'use server'` を適切に使い分け

### スタイリング

- Tailwind CSS を使用
- shadcn/ui コンポーネントを優先
- カスタムCSSは最小限に

### 命名規則

- コンポーネント: PascalCase (例: `LessonCard.tsx`)
- 関数: camelCase (例: `handleSubmit`)
- 定数: UPPER_SNAKE_CASE (例: `MAX_FILE_SIZE`)
- ファイル: kebab-case (例: `tier-upgrade.tsx`)

## 🔄 Git ワークフロー

### ブランチ戦略

- `main`: 本番環境
- `develop`: 開発環境
- `feature/*`: 新機能
- `bugfix/*`: バグ修正
- `hotfix/*`: 緊急修正

### コミットメッセージ

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: フォーマット
- `refactor`: リファクタリング
- `test`: テスト
- `chore`: その他

例:
```
feat(learning): 音声プレーヤーに速度調整機能を追加

ユーザーが0.75x, 1x, 1.25x, 1.5xの再生速度を選択できるようになりました。

Closes #123
```

## 🧪 テスト

### 単体テスト

```bash
npm run test
```

### E2Eテスト

```bash
npm run test:e2e
```

### 型チェック

```bash
npm run type-check
```

### Lint

```bash
npm run lint
npm run lint:fix
```

## 📦 新しいコンポーネントの追加

### shadcn/ui コンポーネント

```bash
npx shadcn@latest add <component-name>
```

### カスタムコンポーネント

1. 適切なディレクトリに作成
2. TypeScript で型定義
3. Storybook (オプション) でドキュメント化

## 🌐 多言語化

### 翻訳の追加

1. `messages/ja.json` に日本語を追加
2. `messages/vi.json` にベトナム語を追加
3. `messages/id.json` にインドネシア語を追加
4. `messages/en.json` に英語を追加

### 使用方法

```typescript
import { useTranslations } from 'next-intl'

const t = useTranslations('namespace')
const text = t('key', { variable: value })
```

## 🗃️ データベース

### マイグレーションの作成

```sql
-- supabase/migrations/XXX_description.sql
-- 新しいテーブルやカラムを追加
```

### 型の更新

```bash
npm run supabase:gen-types
```

## 🚀 デプロイ

### プレビュー環境

```bash
vercel
```

### 本番環境

```bash
vercel --prod
```

## 📝 ドキュメント

- コードにコメントを適切に追加
- 複雑なロジックには説明を記載
- README.md を更新

## 🐛 バグレポート

Issue を作成する際は以下を含めてください:

- 現象の詳細な説明
- 再現手順
- 期待される動作
- 実際の動作
- スクリーンショット（あれば）
- 環境情報（ブラウザ、OS等）

## 💡 機能リクエスト

Issue を作成する際は以下を含めてください:

- 機能の概要
- ユースケース
- 期待される動作
- モックアップ（あれば）

## 👥 コントリビューション

1. Issue を作成または確認
2. ブランチを作成
3. 変更を実装
4. テストを実行
5. Pull Request を作成
6. レビューを受ける
7. マージ

## 📞 サポート

質問や問題がある場合は:

- GitHub Issues を確認
- 新しい Issue を作成
- Discord コミュニティに参加（準備中）

---

Happy Coding! 🎉


