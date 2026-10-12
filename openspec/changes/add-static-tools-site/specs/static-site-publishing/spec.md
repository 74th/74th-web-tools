# Spec Delta

## Purpose

静的 HTML と関連アセットを GitHub Actions 経由で公開し、共通のカスタムドメインの下で種類の異なるツールを独立した URL から利用できるようにする。

## ADDED Requirements

### Requirement: Publish static pages with GitHub Actions
配信システムは既定ブランチへの公開対象の変更および手動実行により、`pages/` をサイトルートとして GitHub Pages に配信しなければならない（MUST）。公開対象は HTML と関連する静的アセットとし、リポジトリの非公開用資料・仕様・開発設定を含めてはならない（MUST NOT）。

#### Scenario: Deploy a change
- **WHEN** 既定ブランチに `pages/` または配信ワークフローの変更が入る
- **THEN** GitHub Actions が `pages/` の内容を配信する
- **THEN** `xprivate/`、`openspec/`、`AGENTS.md`、`.git/` は公開成果物に含まれない

#### Scenario: Manual deployment
- **WHEN** 管理者が配信ワークフローを手動実行する
- **THEN** 選択された実行対象の `pages/` が GitHub Pages に配信される

### Requirement: Serve the custom domain
サイトは既存の DNS 設定を利用し、`https://tools.74th.tech/` からアクセスできなければならない（MUST）。

#### Scenario: Access the domain
- **WHEN** Pages 公開元・カスタムドメイン設定と HTTPS 証明書の準備が完了している
- **THEN** `https://tools.74th.tech/` で `pages/index.html` が表示される

### Requirement: Independent tool paths
各ツールは `pages/<tool>/index.html` を `https://tools.74th.tech/<tool>/` で提供しなければならない（MUST）。異なるツールの追加に既存ツールの URL 変更を必要としてはならない（MUST NOT）。

#### Scenario: Open the first tool directly
- **WHEN** 利用者が `https://tools.74th.tech/vscode-workspace-color/` を直接開く
- **THEN** 色設定ツールと必要なアセットが読み込まれる

#### Scenario: Add another tool
- **WHEN** 別の `pages/<tool>/index.html` と関連アセットを公開する
- **THEN** 新ツールは対応する `/<tool>/` で動作し、既存ツールの URL は維持される

### Requirement: Use a consistent dark theme
公開 HTML ページは暗い背景と読みやすい明るい文字色を使ったダークテーマで統一しなければならない（MUST）。入力・ボタン・カードなどの操作部は背景から識別でき、フォーカス状態を確認できなければならない（MUST）。

#### Scenario: Open any public page
- **WHEN** 利用者がトップページまたはツールページを開く
- **THEN** ページ全体がダークテーマで表示され、主要な文字と操作部を背景から識別できる
