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
- [ ] 目次の depth 指定機能
- [ ] 非公開ページ作成機能
- [ ] ファイルアップロード機能
- [ ] `_` を含む LaTex 表記がエスケープされてしまう問題を修正
- [ ] コードを含むセクションを編集した際に記法を変更しないよう修正
- [ ] 数式の Overflow 時の処理
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
