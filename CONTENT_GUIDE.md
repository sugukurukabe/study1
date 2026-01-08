# Sugu-Study コンテンツアップロードガイド

このガイドでは、レッスンや試験問題をSugu-Studyに追加する方法を説明します。

## 📚 レッスンコンテンツのアップロード

### 方法1: 管理画面から追加（推奨）

1. **管理画面にアクセス**
   ```
   http://localhost:3000/admin
   ```

2. **「レッスン管理」をクリック**

3. **「新しいレッスンを追加」ボタンをクリック**

4. **フォームに入力**
   - レッスンID: `lesson-001` (ユニーク)
   - 必要Tier: 1, 2, 3 から選択
   - タイトル（日本語必須、他言語は任意）
   - 説明文
   - メディアファイルのID/パス
   - テキストコンテンツ

### 方法2: SQLで直接追加

```sql
INSERT INTO public.lessons (
  id,
  title_ja,
  description_ja,
  required_tier,
  duration_seconds,
  order_index
) VALUES (
  'lesson-001',
  '特定技能制度とは？',
  '特定技能制度の基礎知識を学びます。',
  1,
  900,
  1
);
```

## 🎥 動画コンテンツのアップロード

### Cloudflare Streamを使用

1. **Cloudflare Streamにログイン**
   - https://dash.cloudflare.com/

2. **動画をアップロード**
   - Stream → Upload
   - 動画ファイルを選択（MP4推奨）
   - アップロード完了を待つ

3. **Video IDを取得**
   - アップロード完了後、動画詳細ページを開く
   - Video ID（例: `abc123def456`）をコピー

4. **管理画面に登録**
   - レッスン追加/編集画面で「Cloudflare Stream Video ID」欄に貼り付け

### 動画の要件

- **フォーマット**: MP4, MOV, AVI など
- **推奨解像度**: 1920x1080 (Full HD) または 1280x720 (HD)
- **推奨ビットレート**: 4-8 Mbps
- **最大サイズ**: 制限なし（ストレージ料金に応じる）

## 🎧 音声コンテンツのアップロード

### Supabase Storageを使用

1. **Supabase Dashboardにログイン**
   - https://supabase.com/dashboard

2. **Storageに移動**
   - Storage → Buckets
   - `audio` バケットを選択（なければ作成）

3. **音声ファイルをアップロード**
   - 「Upload file」をクリック
   - 音声ファイルを選択（MP3推奨）
   - パスを設定: `lessons/lesson-001.mp3`

4. **管理画面に登録**
   - レッスン追加/編集画面で「音声ファイルパス」欄に `lessons/lesson-001.mp3` を入力

### 音声の要件

- **フォーマット**: MP3（推奨）, WAV, AAC
- **推奨ビットレート**: 128-192 kbps
- **推奨サンプルレート**: 44.1 kHz
- **モノラル/ステレオ**: どちらでも可

### CLIでの一括アップロード

```bash
# Supabase CLIをインストール
npm install -g supabase

# ログイン
supabase login

# 音声ファイルをアップロード
supabase storage upload audio lessons/lesson-001.mp3
```

## 📝 テキストコンテンツの作成

管理画面の「テキストコンテンツ」欄にHTMLで記述できます：

```html
<h2>レッスン内容</h2>

<h3>1. 特定技能制度とは</h3>
<p>
  特定技能制度は、日本の深刻な人手不足に対応するため、
  一定の専門性・技能を有する外国人を受け入れる制度です。
</p>

<h3>2. 特定技能1号と2号の違い</h3>
<ul>
  <li><strong>1号</strong>: 在留期間の上限あり（通算5年）</li>
  <li><strong>2号</strong>: 在留期間の更新回数に制限なし</li>
</ul>

<h3>3. 取得のメリット</h3>
<ol>
  <li>長期的に日本で働ける</li>
  <li>家族の帯同が可能</li>
  <li>永住権取得への道が開ける</li>
</ol>
```

## ❓ 試験問題のアップロード

### 管理画面から追加

1. **「試験問題管理」をクリック**

2. **「新しい問題を追加」ボタンをクリック**

3. **フォームに入力**
   - 問題ID: `q-001`
   - 問題文（日本語）
   - 選択肢 A, B, C, D
   - 正解
   - カテゴリ
   - 難易度
   - 解説

### SQLで一括追加

```sql
INSERT INTO public.exam_questions (
  id,
  question_ja,
  options,
  correct_answer,
  explanation_ja,
  category,
  difficulty
) VALUES (
  'q-001',
  '特定技能2号の在留期間の更新回数は？',
  '{"A": "1回", "B": "3回", "C": "5回", "D": "制限なし"}',
  'D',
  '特定技能2号は在留期間の更新回数に制限がありません。これにより、長期的に日本で働くことが可能です。',
  '制度の基礎',
  'easy'
);
```

### CSVからの一括インポート

サンプルCSVファイル（`questions.csv`）:

```csv
id,question_ja,option_a,option_b,option_c,option_d,correct_answer,explanation_ja,category,difficulty
q-001,特定技能2号の在留期間の更新回数は？,1回,3回,5回,制限なし,D,特定技能2号は在留期間の更新回数に制限がありません。,制度の基礎,easy
q-002,労働基準法で定められた1日の労働時間の上限は？,6時間,8時間,10時間,12時間,B,労働基準法では1日8時間が原則です。,労働法,medium
```

インポートスクリプト（`scripts/import-questions.js`）:

```javascript
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const csv = require('csv-parser')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const questions = []

fs.createReadStream('questions.csv')
  .pipe(csv())
  .on('data', (row) => {
    questions.push({
      id: row.id,
      question_ja: row.question_ja,
      options: {
        A: row.option_a,
        B: row.option_b,
        C: row.option_c,
        D: row.option_d,
      },
      correct_answer: row.correct_answer,
      explanation_ja: row.explanation_ja,
      category: row.category,
      difficulty: row.difficulty,
    })
  })
  .on('end', async () => {
    const { error } = await supabase.from('exam_questions').insert(questions)
    if (error) console.error('Error:', error)
    else console.log(`${questions.length}問の問題をインポートしました`)
  })
```

実行:
```bash
npm install csv-parser
node scripts/import-questions.js
```

## 📦 サンプルコンテンツの追加

### サンプルデータ投入

```bash
# Supabase SQL Editorで実行
```

```sql
-- サンプルレッスン
INSERT INTO public.lessons (id, title_ja, description_ja, required_tier, duration_seconds, order_index) VALUES
('lesson-001', '特定技能制度とは？', '特定技能制度の基礎知識を学びます。制度の概要、Tier 1とTier 2の違い、取得のメリットについて解説します。', 1, 900, 1),
('lesson-002', '日本の労働法の基礎', '日本で働く上で知っておくべき労働法の基礎を学びます。労働時間、休暇、給与に関する基本的なルールを解説します。', 1, 1200, 2),
('lesson-003', '職場でのコミュニケーション', '日本の職場で円滑にコミュニケーションを取るためのポイントを学びます。報告・連絡・相談の基本について解説します。', 1, 1080, 3),
('lesson-004', '建設業の専門知識', '建設業界で必要な専門知識を学びます。安全管理、品質管理、工程管理について詳しく解説します。', 2, 1800, 4);

-- サンプル試験問題
INSERT INTO public.exam_questions (id, question_ja, options, correct_answer, explanation_ja, category, difficulty) VALUES
('q-001', '特定技能2号の在留期間の更新回数は？', '{"A": "1回", "B": "3回", "C": "5回", "D": "制限なし"}', 'D', '特定技能2号は在留期間の更新回数に制限がありません。これにより、長期的に日本で働くことが可能です。', '制度の基礎', 'easy'),
('q-002', '労働基準法で定められた1日の労働時間の上限は？', '{"A": "6時間", "B": "8時間", "C": "10時間", "D": "12時間"}', 'B', '労働基準法では1日8時間、週40時間が原則です。これを超える場合は時間外労働となります。', '労働法', 'medium'),
('q-003', '有給休暇は入社後何ヶ月で付与される？', '{"A": "3ヶ月", "B": "6ヶ月", "C": "9ヶ月", "D": "12ヶ月"}', 'B', '労働基準法により、入社後6ヶ月継続勤務し、全労働日の8割以上出勤した場合に有給休暇が付与されます。', '労働法', 'medium');
```

## 🔄 コンテンツ更新ワークフロー

### 推奨フロー

1. **動画を作成** → Cloudflare Streamにアップロード
2. **音声を作成** → Supabase Storageにアップロード  
3. **管理画面でレッスンを作成** → Video ID、音声パスを入力
4. **テキストコンテンツを記述** → HTML形式で入力
5. **プレビュー確認** → ユーザー画面で表示確認
6. **公開** → 問題なければそのまま利用可能

## 📊 コンテンツの品質チェックリスト

### レッスン
- [ ] タイトルは分かりやすいか
- [ ] 説明文は適切か
- [ ] 動画/音声の品質は良好か
- [ ] テキストに誤字脱字はないか
- [ ] 適切なTierが設定されているか
- [ ] 時間設定は正確か

### 試験問題
- [ ] 問題文は明確か
- [ ] 選択肢は適切か
- [ ] 正解は正しいか
- [ ] 解説は分かりやすいか
- [ ] カテゴリは正しいか
- [ ] 難易度は適切か

## 🎬 動画作成のベストプラクティス

### 推奨スタイル

1. **スライド + ナレーション形式**
   - PowerPointやKeynoteでスライド作成
   - AI音声またはナレーション録音
   - OBSなどで画面録画

2. **推奨ツール**
   - スライド: PowerPoint, Keynote, Canva
   - AI音声: Eleven Labs, Amazon Polly, Google TTS
   - 動画編集: DaVinci Resolve, Adobe Premiere

3. **構成**
   - イントロ（10-15秒）
   - メイン コンテンツ（10-15分）
   - まとめ（1-2分）

## 🎙️ 音声作成のベストプラクティス

### ポッドキャスト形式

1. **会話形式**
   - 講師役とインタビュアー役の対話
   - 質問 → 回答 → 補足の流れ

2. **推奨ツール**
   - 録音: Audacity（無料）, Adobe Audition
   - AI音声: ElevenLabs で2人の声を生成

3. **編集のポイント**
   - 無音部分をカット
   - ノイズ除去
   - 音量の正規化

## 📁 ファイル命名規則

### 動画
```
lesson-{id}-video.mp4
例: lesson-001-video.mp4
```

### 音声
```
lessons/lesson-{id}.mp3
例: lessons/lesson-001.mp3
```

## 💾 バックアップ

定期的にコンテンツをバックアップしましょう：

```bash
# Supabaseデータベースのバックアップ
supabase db dump -f backup.sql

# Storageファイルのダウンロード
supabase storage download audio --bucket audio --destination ./backup/audio/
```

## 🚀 デプロイ後の確認

新しいコンテンツを追加したら：

1. [ ] 管理画面で正しく表示されるか
2. [ ] ユーザー画面でアクセス可能か
3. [ ] Tier制限が正しく動作するか
4. [ ] 動画/音声が再生できるか
5. [ ] 多言語表示が正しいか

## 📞 サポート

コンテンツアップロードで問題が発生した場合：

- `DEPLOYMENT.md` を確認
- Supabase/Cloudflareのドキュメントを参照
- 管理画面のエラーメッセージを確認

---

Happy Content Creating! 🎉


