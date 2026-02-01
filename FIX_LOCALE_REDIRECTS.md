# ロケール対応リダイレクト修正リスト

## 🚨 問題

多くのページで`router.push('/path')`を使用しており、ロケールが考慮されていないため404エラーになります。

## ✅ 修正が必要なファイル

### 1. `/app/[locale]/(dashboard)/learn/[lessonId]/page.tsx` ✅ 修正済み
- `router.push('/login')` → `router.push('/${locale}/login')`
- `router.push('/learn')` → `router.push('/${locale}/learn')`

### 2. `/app/[locale]/(dashboard)/exam/simulation/page.tsx`
- `router.push('/profile/tier-upgrade')` → `router.push('/${locale}/profile/tier-upgrade')`

### 3. `/app/[locale]/(dashboard)/exam/results/page.tsx`
- `router.push('/learn')` → `router.push('/${locale}/learn')`
- `router.push('/home')` → `router.push('/${locale}/home')`

### 4. `/app/[locale]/(dashboard)/profile/kyc/page.tsx`
- `router.push('/login')` → `router.push('/${locale}/login')`
- `router.push('/profile')` → `router.push('/${locale}/profile')`

### 5. `/app/[locale]/(dashboard)/profile/tier-upgrade/page.tsx`
- `router.push('/login')` → `router.push('/${locale}/login')`
- `router.push('/profile/kyc')` → `router.push('/${locale}/profile/kyc')`
- `router.push('/profile')` → `router.push('/${locale}/profile')`

### 6. `/app/[locale]/(dashboard)/exam/drill/page.tsx`
- `router.push('/home')` → `router.push('/${locale}/home')`

## 🔧 修正方法

各ファイルで、`useParams()`を使ってロケールを取得：

```typescript
const params = useParams()
const locale = params.locale as string || 'ja'

// 使用例
router.push(`/${locale}/home`)
```

## 📝 修正スクリプト

すべてのファイルを一括で修正するには、以下のパターンを置換：

```bash
# パターン1: router.push('/xxx')
router.push('/xxx') → router.push(`/${locale}/xxx`)

# パターン2: redirect('/xxx')
redirect('/xxx') → redirect(`/${locale}/xxx`)
```
