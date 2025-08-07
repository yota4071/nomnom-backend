# NoMoM Backend API

キッチンカー情報管理システムのバックエンドAPI

## 技術スタック

- **Runtime**: AWS Lambda (Node.js 18.x)
- **Language**: TypeScript
- **Framework**: Serverless Framework
- **Database**: PostgreSQL (AWS RDS/Aurora Serverless v2)
- **ORM**: Prisma
- **Validation**: Zod

## API エンドポイント

### ヘルスチェック
- `GET /health` - API の動作確認

### 店舗管理
- `GET /shops` - 店舗一覧取得（フィルタリング・検索対応）
- `GET /shops/{id}` - 店舗詳細取得
- `POST /shops` - 店舗登録
- `PUT /shops/{id}` - 店舗更新
- `DELETE /shops/{id}` - 店舗削除（論理削除）

## セットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
```bash
cp .env.example .env
# .env ファイルを編集してデータベース接続情報を設定
```

### 3. データベースセットアップ
```bash
# Prismaクライアント生成
npm run db:generate

# データベーススキーマを適用
npm run db:push

# サンプルデータを投入
npm run db:seed
```

## 開発

### ローカル開発サーバー起動
```bash
npm run dev
```

API は http://localhost:3001 で起動します。

### データベース操作
```bash
# Prisma Studio でデータベースを管理
npm run db:studio

# スキーマ変更後のクライアント再生成
npm run db:generate
```

## デプロイ

### 開発環境
```bash
npm run deploy:dev
```

### 本番環境
```bash
npm run deploy:prod
```

## プロジェクト構造

```
nomnom-backend/
├── prisma/
│   ├── schema.prisma        # データベーススキーマ
│   └── seed.ts             # 初期データ投入
├── src/
│   ├── handlers/           # Lambda ハンドラー
│   │   ├── health.ts       # ヘルスチェック
│   │   └── shops.ts        # 店舗関連API
│   ├── lib/                # ユーティリティ
│   │   ├── db.ts           # データベース接続
│   │   ├── response.ts     # レスポンスヘルパー
│   │   └── validator.ts    # バリデーション
│   ├── shared/             # フロントエンドと共有
│   │   └── types.ts        # 型定義
│   └── types/              # バックエンド専用型
│       └── index.ts
├── serverless.yml          # Serverless Framework 設定
├── tsconfig.json           # TypeScript 設定
└── package.json            # 依存関係・スクリプト
```

## フロントエンドとの連携

`src/shared/types.ts` の型定義をフロントエンドプロジェクトと共有してください。

## トラブルシューティング

### データベース接続エラー
- .env ファイルの DATABASE_URL が正しく設定されているか確認
- データベースサーバーが起動しているか確認

### デプロイエラー
- AWS認証情報が正しく設定されているか確認
- serverless.yml の region 設定を確認