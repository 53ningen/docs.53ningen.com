# docs.53ningen.com

Markdown で記述できる個人向けドキュメント管理システム

## 機能

- [x] 任意のパスにドキュメントを記述できる
- [x] セクションごとに編集できる
- [x] 数式表示対応
- [x] 目次設置設定機能
- [x] 最近更新したページ一覧表示

### 未実装

- [ ] エラー処理/更新処理フィードバック
- [ ] 目次の depth 指定機能
- [ ] 非公開ページ作成機能
- [ ] ファイルアップロード機能
- [ ] SSR 対応

## 開発フロー

### 開発準備

```
$ git clone git@github.com:53ningen/docs.53ningen.com.git
$ amplify env pull prod
```

### デプロイ

```
$ amplify publish
```
