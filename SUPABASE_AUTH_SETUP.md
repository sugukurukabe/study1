# Supabase認証設定ガイド

## 🚨 現在の問題

新規登録・ログインプロセスで以下の問題が発生する可能性があります：

1. **メール確認が必要** - デフォルトでSupabaseはメール確認を要求
2. **リダイレクトURLの問題** - ロケール（/ja/, /id/など）を考慮する必要がある

---

## ✅ 解決方法

### ステップ1: Supabaseでメール確認を無効化（開発・テスト用）

**⚠️ 注意：本番環境ではメール確認を有効にすることを推奨**

1. **Supabaseダッシュボードを開く**
   ```
   https://supabase.com/dashboard/project/tvvvwyrtakruwaylwmyb/auth/providers
   ```

2. **「Email」プロバイダーをクリック**

3. **「Confirm email」をオフにする**
   - これにより、ユーザーは即座にログインできます

4. **「Save」をクリック**

---

### ステップ2: リダイレクトURLを設定

1. **Supabase Authentication設定を開く**
   ```
   https://supabase.com/dashboard/project/tvvvwyrtakruwaylwmyb/auth/url-configuration
   ```

2. **「Redirect URLs」に以下を追加**
   ```
   https://sugu-study.com/auth/callback
   https://sugu-study.com/ja/auth/callback
   https://sugu-study.com/id/auth/callback
   https://sugu-study.com/vi/auth/callback
   https://sugu-study.com/en/auth/callback
   http://localhost:3000/auth/callback
   http://localhost:3000/ja/auth/callback
   ```

3. **「Save」をクリック**

---

### ステップ3: プロファイル自動作成トリガーを設定

Supabase SQL Editorで以下を実行：

```sql
-- プロファイル自動作成トリガー
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, current_tier)
  VALUES (
    NEW.id,
    NEW.email,
    1
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガーを作成（存在しない場合）
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 🔧 コード修正内容

### 修正1: サインアップページ
- ✅ ロケールを考慮したリダイレクト
- ✅ メール確認の有無を判定
- ✅ エラーハンドリングの改善
- ✅ コンソールログでデバッグ情報を出力

### 修正2: ログインページ
- ✅ ロケールを考慮したリダイレクト
- ✅ エラーハンドリングの改善

---

## 🧪 テスト手順

### 1. 新規登録テスト

1. `https://sugu-study.com/ja/signup` にアクセス
2. フォームに入力：
   - 氏名: テストユーザー
   - 国籍: ベトナム
   - メール: test@example.com
   - パスワード: test123456
3. 「登録」をクリック
4. `/ja/home` にリダイレクトされることを確認

### 2. ログインテスト

1. `https://sugu-study.com/ja/login` にアクセス
2. 登録したメールアドレスとパスワードを入力
3. 「ログイン」をクリック
4. `/ja/home` にリダイレクトされることを確認

### 3. Google認証テスト

1. ログインページで「Continue with Google」をクリック
2. Googleアカウントを選択
3. `/ja/home` にリダイレクトされることを確認

---

## 🐛 トラブルシューティング

### エラー: "Email not confirmed"

**原因**: メール確認が有効になっている

**解決策**: 
1. Supabaseダッシュボードで「Confirm email」をオフにする
2. または、確認メールを確認してリンクをクリック

### エラー: "Invalid redirect URL"

**原因**: リダイレクトURLがSupabaseに登録されていない

**解決策**: 
1. Supabase Authentication設定でリダイレクトURLを追加

### エラー: "Profile creation failed"

**原因**: プロファイルテーブルへの挿入権限がない

**解決策**: 
1. RLSポリシーを確認
2. トリガーで自動作成されるように設定

---

## 📊 本番環境での推奨設定

### セキュリティ

1. **メール確認を有効化**
   - スパム登録を防止
   - 有効なメールアドレスを確保

2. **パスワードポリシー**
   - 最小8文字
   - 大文字・小文字・数字を含む

3. **レート制限**
   - 1時間あたり最大5回の登録試行

### ユーザーエクスペリエンス

1. **ソーシャルログイン**
   - Google認証を有効化
   - Facebook認証（オプション）

2. **パスワードリセット**
   - メールでリセットリンクを送信

3. **多言語対応**
   - 各言語でエラーメッセージを表示

---

## 🚀 デプロイ

修正をデプロイするには：

```bash
git add .
git commit -m "Fix: Improve authentication flow with locale support"
git push
```

Cloud Buildが自動的にデプロイします（5〜10分）。
