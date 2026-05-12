# hono-react1

pnpm で モノレポの練習。

- hono(apps/api) で API を作って
- hono/client を使って APIにアクセスする
  - client1 (apps/client1) と
  - react SPA (apps/web)

## 実行

プロジェクトルートで

```sh
pnpm -r i
pnpm -r build
pnpm start
```

localhost:3000 で API が動くので、別シェルで

```sh
cd apps/client1
# GET /hello
pnpm run ex1
node dist/ex1.js
# GET /goodbye
pnpm run ex2
node dist/ex2.js
```

みたいなノリで実行。
