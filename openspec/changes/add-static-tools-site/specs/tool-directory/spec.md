# Spec Delta

## Purpose

トップページから公開ツールを見つけて移動できるようにし、どのページからも管理元の GitHub リポジトリにアクセスできる一貫した導線を提供する。

## ADDED Requirements

### Requirement: List published tools
`pages/index.html` は公開ツールの名称・簡単な説明・対応する `/<tool>/` へのリンクを掲載しなければならない（MUST）。ツールの追加時には一覧も更新しなければならない（MUST）。

#### Scenario: Find the color tool
- **WHEN** 利用者がサイトのトップページを開く
- **THEN** `vscode-workspace-color` の名称・説明・リンクが表示される
- **THEN** リンクから `/vscode-workspace-color/` を開ける

#### Scenario: Discover a newly published tool
- **WHEN** 新しいツールをサイトに追加する
- **THEN** トップページにもそのツールの名称・説明・URL が掲載される

### Requirement: Repository link on every page
トップページと各ツールのすべての公開 HTML ページは `https://github.com/74th/74th-web-tools` への利用者に見えるリンクを掲載しなければならない（MUST）。

#### Scenario: Open the repository
- **WHEN** 利用者が任意の公開ページでリポジトリリンクを選択する
- **THEN** `https://github.com/74th/74th-web-tools` を開ける
