# 開発ルール

## プロジェクト

このリポジトリは、独立した静的 HTML ツールを GitHub Pages で公開するためのものです。

- リポジトリ: https://github.com/74th/74th-web-tools
- 公開ドメイン: https://tools.74th.tech/
- 公開対象: `pages/` 以下の HTML と関連する静的アセット

ツールは HTML・CSS・ブラウザーの JavaScript で構成します。ツールごとにディレクトリを分け、異なる種類のツールを独立して追加できる構造を保ってください。

## 仕様とページの対応

仕様は OpenSpec の `openspec/specs/` に置きます。このプロジェクトで `specs/<tool>/` と呼ぶ場合は `openspec/specs/<tool>/` を指します。リポジトリ直下に別の `specs/` を作らないでください。

| 対象 | 仕様 | 実装 | 公開 URL |
|---|---|---|---|
| ツール | `openspec/specs/<tool>/spec.md` | `pages/<tool>/index.html` | `https://tools.74th.tech/<tool>/` |
| ツール内の細かな機能 | `openspec/specs/<tool>/<capability>/spec.md` | 同じ `pages/<tool>/` 以下 | 同じ `https://tools.74th.tech/<tool>/` |
| ツール一覧 | `openspec/specs/tool-directory/spec.md` | `pages/index.html` | `https://tools.74th.tech/` |
| 配信 | `openspec/specs/static-site-publishing/spec.md` | `.github/workflows/` と Pages 設定 | サイト全体 |

例えば `openspec/specs/vscode-workspace-color/yarukoto/spec.md` は、`vscode-workspace-color` 内の仕様区分です。細かな仕様のディレクトリを増やしても、公開 URL にその階層を追加する必要はありません。サイト共通の capability は同名のツールページを必要としません。

## specs の組み立て方

1. 新規提案や仕様変更の前に、既存の main specs と関連する進行中の change を確認してください。関連する仕様はシナリオまで読み、既存 capability のパスを再利用します。
2. 小さなツールは `openspec/specs/<tool>/spec.md` にまとめます。独立して要件を管理する必要がある機能は `<tool>/<capability>/spec.md` に分割します。ツール名と追加する capability の各パス要素には kebab-case を使ってください。
3. 分割は利用者に見える振る舞いを単位にします。例えば `<tool>/color-selection` と `<tool>/settings-copy` のように目的が分かる名前を付け、同じ要件を親と子の仕様に重複して記載しないでください。
4. 仕様には入力・出力・利用者に見える動作・エラー時の振る舞い・受入条件を記載します。内部の関数名やライブラリの選択は設計に、実装手順はタスクに記載してください。
5. 要件は `### Requirement:`、検証可能なシナリオは `#### Scenario:` と WHEN/THEN で記述します。各要件には少なくとも一つのシナリオを付け、必須の振る舞いには SHALL または MUST を使ってください。

変更の計画は `openspec/changes/<change>/` に作成し、proposal の capability パスと delta specs のパスを一致させます。例えば `vscode-workspace-color/color-selection` の差分は `openspec/changes/<change>/specs/vscode-workspace-color/color-selection/spec.md` に置きます。

新規 capability の delta specs には Purpose と ADDED Requirements を記載します。既存要件の変更は MODIFIED Requirements に要件ブロックと全シナリオを含めます。main specs への反映は OpenSpec の sync/archive ワークフローに従ってください。計画成果物の完成と実装の完成は区別し、計画の作成だけを依頼された場合はそこで止めます。

## ツールの追加・変更

- 入口は `pages/<tool>/index.html` とし、必要な CSS・JavaScript・画像は原則としてそのツールの配下に置いてください。
- アセットは相対 URL で参照し、`/<tool>/` を直接開いても動作するようにしてください。
- ツールを追加・削除・改名したら、`pages/index.html` の名称・短い説明・リンクを更新してください。
- トップページを含むすべての公開 HTML ページに、`https://github.com/74th/74th-web-tools` への利用者に見えるリンクを掲載してください。
- タブ、入力、ボタンはキーボードで操作でき、ラベルや選択状態を確認できるようにしてください。

## 配信と確認

GitHub Actions の公開成果物は `pages/` の内容だけにしてください。`xprivate/`、`openspec/`、`AGENTS.md`、`.git/` などの開発資料を公開成果物に含めないでください。

変更したツールは `pages/` をルートとしたローカル静的サーバーで確認してください。仕様のシナリオに沿った動作、エラー時の表示、トップからの移動、ツール URL の直接アクセス、アセットとリポジトリリンク、キーボード操作、狭い画面での利用を確認します。確認結果と未確認の項目を報告してください。

配信の変更時には公開成果物の範囲とワークフローを確認し、公開後にトップページと変更したツールの HTTPS URL を確認してください。
