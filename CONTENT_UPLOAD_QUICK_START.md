# 📚 コンテンツアップロード クイックスタート

## 🎯 3つの簡単なステップ

### ステップ1: メディアファイルをアップロード

#### 動画（Cloudflare Stream）
```bash
1. https://dash.cloudflare.com/ にログイン
2. Stream → Upload
3. 動画をアップロード
4. Video ID（例: abc123def456）をコピー
```

#### 音声（Supabase Storage）
```bash
1. https://supabase.com/dashboard にログイン
2. Storage → audio バケット
3. ファイルをアップロード（例: lessons/lesson-001.mp3）
4. パスをコピー
```

### ステップ2: 管理画面でレッスンを作成

```
1. http://localhost:3000/admin にアクセス
2. 「レッスン管理」→「新しいレッスンを追加」
3. フォームに入力:
   - レッスンID: lesson-001
   - タイトル: 特定技能制度とは？
   - 説明: 制度の基礎知識...
   - Video ID: （ステップ1でコピーしたID）
   - 音声パス: lessons/lesson-001.mp3
   - 必要Tier: 1（無料）
   - 時間: 900（15分）
4. 「保存」をクリック
```

### ステップ3: 試験問題を追加

```
1. 「試験問題管理」→「新しい問題を追加」
2. フォームに入力:
   - 問題ID: q-001
   - 問題文: 特定技能2号の在留期間は？
   - 選択肢 A, B, C, D
   - 正解: D
   - 解説: 更新回数に制限がありません...
   - カテゴリ: 制度の基礎
   - 難易度: easy
3. 「保存」をクリック
```

## ⚡ さらに簡単な方法：SQLで一括追加

```sql
-- Supabase Dashboard → SQL Editor で実行

-- サンプルレッスンを一括追加
-- （supabase/migrations/004_sample_data.sql の内容をコピペ）
```

## 📂 ファイル構成例

```
動画ファイル:
├── lesson-001-video.mp4  → Cloudflare Streamへ
├── lesson-002-video.mp4
└── lesson-003-video.mp4

音声ファイル:
├── lessons/lesson-001.mp3  → Supabase Storageへ
├── lessons/lesson-002.mp3
└── lessons/lesson-003.mp3
```

## ✅ コンテンツ確認

追加後、ユーザー画面で確認：
```
http://localhost:3000/learn
```

## 💡 ヒント

- **最初は無料コンテンツ（Tier 1）を充実させる**
- **動画は10-15分程度が理想**
- **音声はポッドキャスト形式で会話調に**
- **試験問題は100問以上あると良い**

詳細は `CONTENT_GUIDE.md` を参照してください！


