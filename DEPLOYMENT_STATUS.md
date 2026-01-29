# デプロイ状況

## 📅 最終デプロイ: 2026-01-29

---

## ✅ 完了した変更

### 1. 多言語動画対応機能
- ✅ データベースに言語別動画IDカラム追加
- ✅ VideoPlayerコンポーネントに言語切り替えUI実装
- ✅ モバイル最適化された言語選択ボタン
- ✅ 再生位置維持機能

### 2. トップページ更新
- ✅ 「特定技能2号とは？」→「2号とは？」に変更
- ✅ 実際のCloudflare Stream動画IDを設定
  - 日本語版: `f2f7a67b989a45dd6b850b8462623c40`
  - インドネシア語版: `fdf5466f16a824fe1fce0ddf6996a99d`

### 3. 畜産業セクター追加
- ✅ 4つの章（カテゴリー）作成
- ✅ 19個のレッスン作成
- ✅ Supabaseマイグレーション実行完了

---

## 🚀 デプロイ方法

### Vercel（自動デプロイ）

GitHubにプッシュすると自動的にデプロイされます。

**最新コミット:**
```
09c1ddf - Update landing page video IDs with actual Cloudflare Stream videos
34e0445 - Fix duration to seconds and tier column name in livestock migration
c7030ed - Fix column names: display_order -> order_index in livestock migration
a2927f9 - Add livestock sector with 4 chapters and 19 lessons
5addc03 - Update landing page title and create livestock video upload guide
```

**デプロイ確認:**
1. Vercel Dashboardにアクセス: https://vercel.com/dashboard
2. プロジェクトを選択
3. 「Deployments」タブで最新のデプロイ状況を確認

---

## 📋 デプロイ後の確認事項

### 1. トップページ
- [ ] 「2号とは？」セクションが表示される
- [ ] 日本語版の動画が再生される
- [ ] 言語を切り替えるとインドネシア語版の動画に切り替わる

### 2. 畜産業セクター
- [ ] トップページで畜産業（🐄）が表示される
- [ ] 畜産業をクリックすると4つの章が表示される
- [ ] 各章をクリックするとレッスン一覧が表示される
- [ ] レッスンをクリックするとページが開く（動画はまだ未設定）

### 3. 多言語対応
- [ ] 日本語、インドネシア語、ベトナム語、英語の切り替えが機能する
- [ ] 各言語でコンテンツが正しく表示される

---

## 🎬 次のステップ

### 畜産業の動画アップロード
1. Cloudflare Streamに38本の動画をアップロード
2. Video IDを記録
3. Supabaseで各レッスンに動画IDを設定

### 他のセクター追加
- 漁業
- 建設
- 造船
- 自動車整備
- 航空
- 宿泊業
- 食品製造
- 外食
- 介護

---

## 🔧 トラブルシューティング

### デプロイが失敗する場合
1. Vercel Dashboardでエラーログを確認
2. ビルドエラーの場合はローカルで `npm run build` を実行して確認
3. 環境変数が正しく設定されているか確認

### 動画が再生されない場合
1. Cloudflare Streamで動画が「Ready」状態か確認
2. Video IDが正しいか確認
3. `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID` が設定されているか確認

### データが表示されない場合
1. Supabaseでマイグレーションが正しく実行されたか確認
2. RLSポリシーが正しく設定されているか確認
3. ブラウザの開発者ツールでネットワークエラーを確認

---

## 📊 現在の状況

### データベース
- ✅ Sectors: 2個（農業、畜産業）
- ✅ Categories: 8個（農業4個 + 畜産業4個）
- ✅ Lessons: 24個（農業5個 + 畜産業19個）

### 動画
- ✅ トップページ概要動画: 2本（日本語、インドネシア語）
- ⏳ 畜産業レッスン動画: 0/38本

### デプロイ環境
- ✅ Vercel: 自動デプロイ設定済み
- ✅ Supabase: 本番環境
- ✅ Cloudflare Stream: アカウント設定済み

---

## 🌐 本番環境URL

**Vercel URL:** https://your-project.vercel.app（Vercel Dashboardで確認）

---

## 📝 メモ

- GitHubへのプッシュで自動デプロイされる
- Supabaseのマイグレーションは手動実行が必要
- 環境変数はVercel Dashboardで管理
- 動画IDの設定はSupabase SQL Editorで実行
