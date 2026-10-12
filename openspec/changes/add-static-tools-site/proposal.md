# Proposal

## Why

静的 HTML で作った小さなツールを、共通のドメインから手軽に公開・利用できるようにする。最初のツールとして VS Code のワークスペース識別に使う色設定を生成・コピーできるようにする。

## What Changes

- GitHub Actions から `pages/` を GitHub Pages に配信し、`tools.74th.tech` をカスタムドメインとして利用する。
- `pages/index.html` に公開ツールの一覧を設け、各ツールを `pages/<tool>/index.html` と `/<tool>/` の対応で公開する。
- `vscode-workspace-color` にタイトルバー／Remote SSH インジケーターの切り替え、8 色のプリセット、カラーピッカー、JSON の表示とコピーを提供する。
- ルート `AGENTS.md` にツール追加時の一覧更新、全ページのリポジトリリンク、OpenSpec とページの対応ルールを記載する。
- ツールの仕様を `openspec/specs/<tool>/spec.md` にまとめ、細分化する場合は `openspec/specs/<tool>/<capability>/spec.md` に配置する。

## Capabilities

### New Capabilities

- `static-site-publishing`: 静的配信、カスタムドメイン、独立したツールの URL。
- `tool-directory`: トップページのツール一覧と全ページのリポジトリリンク。
- `vscode-workspace-color`: タイトルバーとリモートインジケーターの色設定生成・コピー。

### Modified Capabilities

なし（既存仕様なし）。

## Impact

実装対象は `.github/workflows/`、`pages/index.html`、`pages/vscode-workspace-color/`、ルート `AGENTS.md`。GitHub リポジトリの Pages 公開元・カスタムドメイン設定が必要になる。Route53 の既存 CNAME は利用し、DNS 変更は含めない。バックエンド・ビルドシステム・外部 UI ライブラリは追加しない。本変更では計画成果物のみを作成する。
