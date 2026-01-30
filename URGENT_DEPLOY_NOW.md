# 🚨 緊急デプロイ手順

## 問題の確認

本番環境を確認しました：
```
https://sugu-study-56144068988.asia-northeast1.run.app/sectors/agriculture
```

### 発見された問題
- ❌ 古いコードがデプロイされている
- ❌ トップページの動画が古いVideo ID
- ❌ 畜産業セクターが表示されない
- ❌ 言語切り替えボタンが表示されない
- ❌ 第一章・第二章の動画が設定されていない

---

## 🚀 今すぐデプロイする方法

### 方法1: Cloud Consoleからトリガーを実行（最も簡単）

#### ステップ1: Cloud Build トリガーページを開く

```
https://console.cloud.google.com/cloud-build/triggers?project=sugu-study
```

#### ステップ2: トリガーを実行

1. **`deploy-main`** トリガーを見つける
2. 右側の **「実行」ボタン**（▶️アイコン）をクリック
3. 確認ダイアログで **「実行」** をクリック

#### ステップ3: ビルド状況を確認

自動的にビルドページに移動します。または：
```
https://console.cloud.google.com/cloud-build/builds?project=sugu-study
```

**待ち時間:** 約5〜10分

#### ステップ4: デプロイ完了を確認

ビルドが完了したら（緑のチェックマーク✅）：

1. **Cloud Runサービスページを開く**
   ```
   https://console.cloud.google.com/run/detail/asia-northeast1/sugu-study?project=sugu-study
   ```

2. **最新リビジョンを確認**
   - デプロイ時刻が最新になっているか確認

3. **本番環境を確認**
   ```
   https://sugu-study-56144068988.asia-northeast1.run.app
   ```

---

### 方法2: 空コミットでトリガー発火

ターミナルで実行：

```bash
cd /Users/kabe/sugustudy
git commit --allow-empty -m "Deploy latest changes to production"
git push
```

これで自動的にCloud Buildが実行されます。

---

## ✅ デプロイ後の確認項目

### トップページ
- [ ] 「2号とは？」のタイトルが表示される
- [ ] 動画が再生される（Video ID: `f2f7a67b989a45dd6b850b8462623c40`）
- [ ] 言語切り替えで動画が変わる

### 畜産業セクター
- [ ] トップページに「畜産業」（🐄）が表示される
- [ ] 畜産業をクリックすると4つの章が表示される
- [ ] 第一章に5つのレッスンが表示される
- [ ] 第二章に6つのレッスンが表示される

### レッスンページ
- [ ] レッスンを開くと動画プレイヤーが表示される
- [ ] 動画プレイヤーの上部に言語切り替えボタンが表示される
- [ ] 🇯🇵日本語 / 🇮🇩Indonesia のボタンが表示される
- [ ] 動画が再生される

### 第一章のレッスン（動画あり）
- [ ] 1. 酪農（乳用牛）- 動画再生OK
- [ ] 2. 牛肉生産（肉用牛）- 動画再生OK
- [ ] 3. 養豚 - 動画再生OK
- [ ] 4. 養鶏 - 動画再生OK
- [ ] 5. その他 - 動画再生OK

### 第二章のレッスン（動画あり）
- [ ] 1. 乳用牛 - 動画再生OK
- [ ] 2. 肉用牛 - 動画再生OK
- [ ] 3. 豚 - 動画再生OK

---

## 📊 デプロイされる変更内容

### 最新のGitコミット

```
0a4cb18 - Add deployment status check guide
0f203c3 - Add deployment troubleshooting guide
dd89aea - Add deployment checklist for livestock videos
e8555ee - Add livestock chapter 1 and 2 video IDs (8 lessons, 16 videos)
b464614 - Add comprehensive GCP deployment instructions
7b23bdf - Update GCP project ID to sugu-study
09c1ddf - Update landing page video IDs with actual Cloudflare Stream videos
```

### 主な変更点

1. **トップページ動画の更新**
   - 日本語版: `f2f7a67b989a45dd6b850b8462623c40`
   - インドネシア語版: `fdf5466f16a824fe1fce0ddf6996a99d`

2. **畜産業セクターの追加**
   - 4つの章（カテゴリー）
   - 19個のレッスン

3. **多言語動画対応**
   - 言語切り替えボタン（モバイル最適化）
   - 日本語・インドネシア語の動画切り替え
   - 再生位置維持機能

4. **畜産業の動画設定**
   - 第一章: 5レッスン × 2言語 = 10動画
   - 第二章: 3レッスン × 2言語 = 6動画

---

## 🐛 トラブルシューティング

### ビルドが失敗する場合

1. **ビルドログを確認**
   ```
   https://console.cloud.google.com/cloud-build/builds?project=sugu-study
   ```

2. **失敗したビルドをクリック**してエラーメッセージを確認

3. **よくあるエラー:**

   **エラー1: npm install失敗**
   ```
   ERROR: npm ERR! code ENOENT
   ```
   → `package-lock.json`の問題。再度トリガーを実行

   **エラー2: TypeScriptエラー**
   ```
   ERROR: Type error
   ```
   → コードの型エラー。ローカルで `npm run build` を実行して確認

   **エラー3: Docker build失敗**
   ```
   ERROR: failed to solve
   ```
   → Dockerfileの問題。`Dockerfile`を確認

### デプロイは成功するが変更が反映されない場合

1. **ブラウザのキャッシュをクリア**
   - Chrome/Edge: `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows)
   - Safari: `Cmd+Option+R`

2. **Cloud Runのトラフィック配分を確認**
   ```
   https://console.cloud.google.com/run/detail/asia-northeast1/sugu-study?project=sugu-study
   ```
   - 最新リビジョンに100%のトラフィックが向いているか確認

3. **シークレットモードで確認**
   - 新しいシークレットウィンドウで本番環境にアクセス

---

## ⏱️ デプロイタイムライン

```
0分: トリガー実行
↓
1-3分: Dockerイメージビルド
↓
3-5分: Container Registryにプッシュ
↓
5-8分: Cloud Runにデプロイ
↓
8-10分: デプロイ完了 ✅
```

---

## 📞 デプロイ後の報告

デプロイ完了後、以下を確認して報告してください：

1. **ビルドステータス**
   - ✅ 成功 / ❌ 失敗

2. **Cloud Runリビジョン**
   - 最新リビジョンのデプロイ時刻

3. **本番環境の確認**
   - トップページの動画が再生される？
   - 畜産業セクターが表示される？
   - レッスンの動画が再生される？
   - 言語切り替えが機能する？

---

## 🎯 期待される結果

### デプロイ成功後

1. **トップページ**
   ```
   https://sugu-study-56144068988.asia-northeast1.run.app
   ```
   - 「2号とは？」の動画が再生される
   - 畜産業（🐄）が表示される

2. **畜産業セクター**
   ```
   https://sugu-study-56144068988.asia-northeast1.run.app/sectors/livestock
   ```
   - 4つの章が表示される
   - 各章にレッスンが表示される

3. **レッスンページ**
   ```
   https://sugu-study-56144068988.asia-northeast1.run.app/ja/learn/livestock-ch1-01
   ```
   - 動画プレイヤーが表示される
   - 言語切り替えボタンが表示される
   - 動画が再生される

---

**今すぐCloud Consoleからトリガーを実行してください！** 🚀

```
https://console.cloud.google.com/cloud-build/triggers?project=sugu-study
```

「実行」ボタンをクリックするだけです！
