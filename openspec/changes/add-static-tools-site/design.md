# Design

## Context

動機と機能範囲は `proposal.md` を参照。現在のリポジトリには配信ワークフロー・公開 HTML・既存の main specs がなく、OpenSpec はローカルの spec-driven 構成である。Route53 の `tools.74th.tech → 74th.github.io` は設定済みという依頼内容を前提とする。

## Goals / Non-Goals

**Goals:** HTML・CSS・ブラウザーの JavaScript だけで動作し、ツールのディレクトリを追加すれば配信できる構造にする。公開成果物と開発資料の境界を `pages/` に固定する。公開ページは暗色の背景と明るい文字色を使うダークテーマで統一する。

**Non-Goals:** バックエンド、フレームワーク、利用者の設定ファイルへの直接書き込み、両タブの設定を統合する出力、白以外の色に対する前景色の自動調整、色の永続保存、DNS の変更。

## Decisions

### 1. GitHub Pages の公式 Actions 配信を利用する

`.github/workflows/deploy-pages.yml` に、実際の既定ブランチへの push（`pages/**` とワークフロー自身を対象）と `workflow_dispatch` を設定する。`actions/checkout`、`actions/configure-pages`、`actions/upload-pages-artifact`、`actions/deploy-pages` の公式推奨構成を実装時に確認し、`pages/` のみをアップロードする。ビルドは不要。権限は `contents: read`、`pages: write`、`id-token: write`、配信 environment は `github-pages` とし、配信結果の URL を environment に紐付ける。配信は concurrency group で直列化し、実行中の配信を途中キャンセルしない。

代替のブランチ配信は Actions による配信という要求に合わず、静的サイトジェネレーターは現時点で不要な依存を増やすため採用しない。

リポジトリ Settings → Pages の公開元を GitHub Actions、カスタムドメインを `tools.74th.tech` に設定する。Actions 配信では `CNAME` ファイルはカスタムドメイン設定として無視されるため、そのファイルだけに依存しない。証明書が利用可能になったら HTTPS を強制する。DNS の再作成は行わない。

参照: [公式 Actions 配信](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)、[カスタムドメイン設定](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)。

### 2. ツール単位の静的ディレクトリと手動一覧

`pages/index.html` に名前・説明・`./vscode-workspace-color/` へのリンクを掲載する。各ツールは `pages/<tool>/index.html` を入口にし、必要な CSS・JavaScript はその配下に置き、アセット参照を相対 URL にする。トップページとすべての HTML に GitHub リポジトリへの見えるリンクを設ける。

一覧の自動生成や共通アプリのルーティングは採用しない。手動一覧は単純でビルドなしで確認でき、独立したディレクトリは異なる種類のツールを干渉なく追加できる。

### 6. すべての公開ページをダークテーマにする

トップページとツールページはチャコール系の背景、明るい文字、暗色のカード・入力欄、青系のアクセントを使う。選択した VS Code の色を示すプレビューは、利用者が選んだ色をそのまま反映する。公開 HTML で `color-scheme: dark` を指定し、ネイティブ入力も暗色 UI に合わせる。テーマ切り替えは設けず、サイト全体を常にダークテーマで表示する。

### 3. OpenSpec と公開ディレクトリの対応を AGENTS.md に記録する

依頼中の `specs/` は OpenSpec の `openspec/specs/` を指すものとして扱う。ツール仕様は `openspec/specs/<tool>/spec.md`、細分化が必要になったら `openspec/specs/<tool>/<capability>/spec.md` とする。どちらも公開先は `pages/<tool>/` と `https://tools.74th.tech/<tool>/`。例えば `vscode-workspace-color/yarukoto` は同じツールの仕様区分であり、URL の追加階層にはしない。

今回のツール仕様は一つの capability にまとめる。配信とトップページを表す `static-site-publishing`、`tool-directory` はサイト共通の仕様であり、同名のツールディレクトリを作る対象にはしない。別のトップレベル `specs/` を設ける代替は OpenSpec の標準構成と二重管理になるため採用しない。

実装時にルート `AGENTS.md` に、この対応、ツール追加時の一覧更新、全ページの `https://github.com/74th/74th-web-tools` リンク、`pages/` だけが配信対象というルールを記載する。main specs は通常の sync/archive フローで反映し、この提案では change の delta specs のみ作成する。

### 4. タブごとの色状態から JSON を生成する

日本語 UI にタイトルバーと Remote SSH インジケーターの 2 タブを設ける。初期選択はタイトルバー、初期色はタイトルバー `#1769D2`、Remote SSH `#7641C5`。タブごとに色を保持し、双方で同じ 11 色のプリセットと `<input type="color">` を使う。任意色の入力はネイティブピッカーに任せ、表示 HEX は大文字の `#RRGGBB` に正規化する。自由形式の HEX 入力欄は今回追加しない。

選択対象と背景色からオブジェクトを作り `JSON.stringify(..., null, 2)` で整形する。タイトルバーは active/inactive の背景・前景 4 キー、Remote SSH は remoteBackground/remoteForeground 2 キーのみ。背景色が白なら前景色を黒、それ以外なら白にする。プレビュー文字色にも同じ規則を適用する。JSON は選択可能なテキストとして表示し、コピーは表示と同じ内容を使う。

プレビューは VS Code のタイトルバー、左側のアクティビティバーと Explorer、エディター、下部ステータスバーを模す。タイトルバー色と Remote SSH 色を同時に見比べられるようにし、Remote SSH インジケーターはステータスバー左端に置く。各領域の色は対応するタブの状態を独立して反映する。

両タブの一括出力や毎回の色リセットは採用しない。タブごとの状態保持により対象を行き来して設定を検討できる。リロード時の保存は要求に含まれないため初期状態に戻す。

参照: [VS Code Theme Color](https://code.visualstudio.com/api/references/theme-color)。生成した断片を既存の `workbench.colorCustomizations` に統合する案内と、Remote SSH の対象がステータスバー全体ではなくリモートインジケーターである説明を表示する。

### 5. コピー失敗とキーボード操作を扱う

利用者のクリックで `navigator.clipboard.writeText` を実行し、成功後に成功表示を行う。API 不在または拒否では手動コピーを案内し、表示 JSON は引き続き選択可能にする。非推奨 API による自動フォールバックは不要。

タブには tablist/tab/tabpanel と選択状態、矢印キーによる移動を用意する。プリセットは色名と HEX を持つボタン、ピッカーにはラベル、コピー結果にはライブ領域を設ける。小さい画面で JSON の横スクロールを許可し、操作部は折り返す。

## Risks / Trade-offs

- [Pages 設定または証明書準備が未完了だとドメインで利用できない] → コードの検証とリポジトリ設定・公開確認を分け、完了状況を明記する。
- [白以外の淡い背景色で白文字が読みにくい] → 選択色と HEX を明示して利用者が判断できるようにする。
- [Clipboard API が拒否される] → 失敗表示と手動選択によるコピーを提供する。
- [一覧更新やリンク追加が漏れる] → AGENTS.md に規約を記載し、受入確認に含める。

## Migration Plan

1. 実装で静的ページ・AGENTS.md・配信ワークフローを追加し、ローカルの静的サーバーで動作とリンクを確認する。
2. 既定ブランチと Pages 設定を確認して公開元・カスタムドメインを設定し、既存 DNS を利用する。
3. 既定ブランチへの反映後、Actions の成果物・配信結果・トップとツールの HTTPS URL を確認する。
4. ロールバックは問題のあるコミットを戻して再配信する。配信経路そのものに問題がある場合はワークフローを停止し、必要に応じて Pages 公開を停止する。DNS はそのまま維持する。
