# 🚨 緊急：畜産業の動画を表示させる手順

## 問題
畜産業の動画IDがSupabaseデータベースに登録されていないため、動画が表示されません。

## 解決方法（5分で完了）

### ステップ1: Supabase Dashboardにアクセス
1. https://supabase.com/dashboard にアクセス
2. プロジェクト「sugu-study」を選択
3. 左メニューから「SQL Editor」をクリック

### ステップ2: SQLスクリプトを実行
1. 「New query」をクリック
2. 以下のファイルの内容をコピー＆ペースト：
   ```
   LIVESTOCK_VIDEO_IDS_SETUP.sql
   ```
3. 「Run」ボタンをクリック

### ステップ3: 確認
実行後、以下のように表示されれば成功：

```
✅ livestock-ch1-01 (日本語版・インドネシア語版)
✅ livestock-ch1-02 (日本語版・インドネシア語版)
✅ livestock-ch1-03 (日本語版・インドネシア語版)
✅ livestock-ch1-04 (日本語版・インドネシア語版)
✅ livestock-ch1-05 (日本語版・インドネシア語版)
✅ livestock-ch2-01 (日本語版・インドネシア語版)
✅ livestock-ch2-02 (日本語版・インドネシア語版)
✅ livestock-ch2-03 (日本語版・インドネシア語版)
```

### ステップ4: ウェブサイトで確認
1. https://sugu-study.com/ja/sectors/livestock にアクセス
2. 「第一章」または「第二章」をクリック
3. レッスンをクリックして動画が再生されることを確認

## 設定される動画ID

### 第一章：畜産の特徴
- livestock-ch1-01（酪農）: 99d95ffbdb7620286d7eaa684492dae7 (JA), 064899bf823630e7f8ab164b702fe272 (ID)
- livestock-ch1-02（牛肉生産）: 6f306e5d901ce6b440ecb8a102b7a6ad (JA), 048b1e681cad2e8b7e145f025459b520 (ID)
- livestock-ch1-03（養豚）: c90be024caa2f001146b788497f4b965 (JA), e7879811ae163c954a2778898c1a3442 (ID)
- livestock-ch1-04（養鶏）: 80dda2476d68ffac8ee82f62ea42bfd4 (JA), 6d322be5a034378a0dd8d0b3a74bb2d7 (ID)
- livestock-ch1-05（その他）: 15274a5971e0f6f7dacbd3d1f853892f (JA), 3755763bb75909eb4354f68f4b0cbc53 (ID)

### 第二章：家畜と飼料に関する基礎知識
- livestock-ch2-01（乳用牛）: cdd4ec9640a814063cb6d55d30a86323 (JA), a9dcb5a1e256e0c676e5aad378421714 (ID)
- livestock-ch2-02（肉用牛）: 07a08bc2c1cb552c14ab42382f0e31d3 (JA), 1837062920cd02aee66f0949ad9464bf (ID)
- livestock-ch2-03（豚）: b0e579c2bc19f91e6b79d99d86e90bcc (JA), 4549f8f05a1b2d079e592250bc9928f8 (ID)

## トラブルシューティング

### エラーが出た場合
- 「lessons」テーブルが存在しない → マイグレーション007を先に実行
- 権限エラー → Supabaseプロジェクトのオーナー権限で実行

### それでも動画が表示されない場合
1. ブラウザのキャッシュをクリア（Cmd+Shift+R）
2. Cloudflare Streamで動画IDが有効か確認
3. RLSポリシーを確認（012_fix_lessons_rls.sql を実行）

---

**重要**: このSQLスクリプトは何度実行しても安全です（冪等性）
