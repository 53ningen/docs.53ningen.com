# docs.53ningen.com

- Markdown で記述できる個人向けドキュメント管理システム
- 開発に関するドキュメントは [mdwiki 開発メモ](https://docs.53ningen.com/mdwiki) に集約

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

デプロイ完了後、作成された Cognito ユーザープールの自己サインアップの無効化する
