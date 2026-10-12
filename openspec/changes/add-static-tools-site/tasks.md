# Tasks

## 1. 仕様構成とツール追加規約

- [x] 1.1 作成済みのルート `AGENTS.md` を更新し、`openspec/specs/<tool>/spec.md` と `pages/<tool>/index.html`、細分化した `openspec/specs/<tool>/<capability>/spec.md` と同じツール配下、`openspec/specs/tool-directory/spec.md` と `pages/index.html` の対応を記載する。配信仕様 `openspec/specs/static-site-publishing/spec.md` はツール仕様の階層外に置き、表と例が新構成に一致することを確認する。
- [x] 1.2 `AGENTS.md` にトップ一覧の更新、全 HTML のリポジトリリンク、`pages/` のみの配信ルールを記載し、新ツール追加時に必要な作業が読み取れることを確認する。
- [x] 1.3 この change の既存 delta specs を `specs/vscode-workspace-color/spec.md` と `specs/tool-directory/spec.md` に維持し、proposal の capability と delta spec の対応、および design の配置例・対応ルールが `openspec/specs/<tool>/...` と `openspec/specs/tool-directory/` に一致することを確認する。配信仕様のパスと各仕様の振る舞いは維持し、`openspec validate add-static-tools-site --strict` の成功を確認する。

## 2. 色設定ツール

- [x] 2.1 `pages/vscode-workspace-color/index.html` と必要な静的アセットを作成し、日本語の 2 タブ、初期色、タブごとの色保持を実装する。ローカル静的サーバーで初期表示と往復切り替え後の保持を確認する。
- [x] 2.2 両タブに 11 色のプリセットとカラーピッカーを実装し、各 HEX の一致と任意色 `#123456` の選択が表示に反映されることを確認する。
- [x] 2.3 選択状態に応じた整形 JSON の表示を実装し、JSON をパースしてタイトルバーの 4 キー／Remote SSH の 2 キー、背景色、前景色が仕様の例と一致することを確認する。
- [x] 2.4 表示 JSON のコピー、成功表示、失敗時の手動コピー案内を実装し、ブラウザーでコピー内容の一致と API 不在・拒否の双方で成功表示されないことを確認する。
- [x] 2.5 キーボードで操作できるタブ・プリセット・ラベル・フォーカス・ライブ領域と狭い画面でのレイアウトを整える。キーボードのみの操作とモバイル相当の幅で操作部と JSON が利用できることを確認する。
- [x] 2.6 ツールにリポジトリリンク、既存設定への JSON 統合案内、Remote SSH インジケーターの説明を追加し、リンク先と説明が生成内容に一致することを確認する。
- [x] 2.7 VS Code のタイトルバー・アクティビティバー・Explorer・エディター・ステータスバーを模したプレビューにし、Remote SSH インジケーターを左下に表示する。両色が同時に表示され、片方の変更がもう片方に影響しないことを確認する。
- [x] 2.8 ホワイト背景では生成 JSON とプレビューの文字色をブラックにし、それ以外はホワイトにする。両タブでプリセットとカスタム色の初期状態を確認する。

## 3. トップページ

- [x] 3.1 `pages/index.html` に色設定ツールの名称・説明・相対リンクとリポジトリリンクを追加し、ローカル静的サーバーでツールへの移動とすべてのリンク先を確認する。

## 4. 配信設定

- [x] 4.1 実際の既定ブランチと公式 Actions の推奨バージョンを確認し、`.github/workflows/deploy-pages.yml` に push・手動実行・最小権限・environment・concurrency・`pages/` の成果物アップロードと配信を実装する。YAML と公式構成を照合し、トリガーと公開対象を確認する。
- [x] 4.2 README にローカルプレビューコマンドと Pages 公開元・カスタムドメイン・HTTPS の設定手順を記載し、プレビューコマンドが動作し、CNAME ファイルだけに依存しない説明であることを確認する。
- [ ] 4.3 リポジトリの Pages 公開元を GitHub Actions、カスタムドメインを `tools.74th.tech` に設定し、証明書準備後に HTTPS 強制を有効にする。設定画面または API の値で確認し、既存 DNS を変更しない。

## 5. 公開後の統合確認

- [x] 5.1 既定ブランチへの反映後に Actions 配信の成功と公開成果物を確認し、`pages/` の HTML・アセットが含まれ、`xprivate/`・`openspec/`・開発設定が含まれないことを確認する。
- [ ] 5.2 `https://tools.74th.tech/` と `/vscode-workspace-color/` を直接開き、一覧からの移動、アセット読み込み、全ページのリポジトリリンク、両タブの JSON コピーが HTTPS 上で動作することを確認する。

## 6. ダークテーマ

- [x] 6.1 `AGENTS.md` に公開ページをダークテーマで統一するルールを記載する。
- [x] 6.2 色設定ツールに暗い背景・カード・入力欄と読みやすい文字色を適用し、色プレビューは選択色を維持する。
- [x] 6.3 トップページも同じダークテーマにし、ローカルプレビューでトップとツールの表示を確認する。
