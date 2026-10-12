# 74th Web Tools

HTML、CSS、ブラウザー JavaScript で動作する静的ツール集です。公開するファイルは `pages/` に置き、ツールごとに `pages/<tool>/` を作成します。

## ローカルで見る

リポジトリのルートでプレビューコマンドを実行します。

```sh
./scripts/preview.sh
```

ブラウザーで `http://localhost:8000/` を開きます。ツールへ直接アクセスするときは `http://localhost:8000/<tool>/` を開いてください。ポートを変える場合は `PORT=8080 ./scripts/preview.sh` のように実行します。サーバーを止めるには `Ctrl+C` を押します。

## GitHub Pages を設定する

`.github/workflows/deploy-pages.yml` は `main` ブランチへの `pages/` またはワークフローの変更、および手動実行で配信します。ワークフローは `pages/` だけを成果物としてアップロードします。

リポジトリの **Settings → Pages** を開き、**Build and deployment** の **Source** に **GitHub Actions** を選びます。**Custom domain** に `tools.74th.tech` を入力して保存してください。DNS は既存の設定を利用します。CNAME ファイルをリポジトリに置くことだけに依存しないでください。

Pages が証明書を準備し、ドメインが HTTPS で開けるようになったら、**Enforce HTTPS** を有効にします。公開後、`https://tools.74th.tech/` と対象ツールの URL を確認します。
