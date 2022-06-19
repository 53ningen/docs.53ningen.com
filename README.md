# docs.53ningen.com

Markdown で記述できる個人向けドキュメント管理システム

## 機能

### 実装済み

- [x] 任意のパスにドキュメントを記述できる
- [x] セクションごとに編集できる
- [x] 数式表示対応

### 未実装

- [ ] エラー処理全般
- [ ] 目次設置設定機能
- [ ] 非公開ページ作成機能
- [ ] ファイルアップロード機能

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
