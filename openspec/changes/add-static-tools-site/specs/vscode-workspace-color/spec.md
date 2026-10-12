# Spec Delta

## Purpose

VS Code のタイトルバーと Remote SSH 接続を示すステータスバーのインジケーターについて、好みの背景色を選び、設定に貼り付けられる JSON を生成・コピーできるようにする。

## ADDED Requirements

### Requirement: Switch configuration targets
ツールはタイトルバーと Remote SSH インジケーターのタブを提供し、選択中の対象だけの設定を表示しなければならない（MUST）。初期選択はタイトルバーとし、各タブの色選択は切り替え後も保持しなければならない（MUST）。

#### Scenario: Initial state
- **WHEN** ページを新しく開く
- **THEN** タイトルバータブが選択され、背景色 `#1769D2` の設定が表示される

#### Scenario: Switch and return
- **WHEN** タイトルバーの色を変更し Remote SSH タブに初めて切り替える
- **THEN** Remote SSH の初期背景色 `#7641C5` の設定が表示される
- **THEN** タイトルバーに戻ると変更した色が保持される

### Requirement: Choose preset or custom colors
両タブは 11 色のプリセットと任意の背景色を選べるカラーピッカーを提供しなければならない（MUST）。選択中の色の HEX と JSON は変更に追随しなければならない（MUST）。背景色が `#FFFFFF` のとき前景色は `#000000`、それ以外では `#FFFFFF` としなければならない（MUST）。プレビューの文字色も同じルールに従わなければならない（MUST）。

#### Scenario: Select any preset
- **WHEN** どちらかのタブでプリセットを選ぶ
- **THEN** 次の対応どおりの背景色と HEX が選択され、表示 JSON が更新される

| No. | 色 | HEX |
|---|---|---|
| 01 | ブルー | `#1769D2` |
| 02 | シアン | `#008FAF` |
| 03 | グリーン | `#16834A` |
| 04 | オレンジ | `#C65A0A` |
| 05 | レッド | `#C42B36` |
| 06 | パープル | `#7641C5` |
| 07 | ピンク | `#C12C85` |
| 08 | イエロー | `#A17A00` |
| 09 | グレー | `#6B7280` |
| 10 | ホワイト | `#FFFFFF` |
| 11 | ブラック | `#000000` |

#### Scenario: Use a custom color
- **WHEN** カラーピッカーでプリセット以外の `#123456` を選ぶ
- **THEN** 選択中のタブの背景色と表示 JSON が `#123456` に更新され、前景色は `#FFFFFF` のままである

#### Scenario: White background uses black foreground
- **WHEN** どちらかのタブでホワイトのプリセットを選ぶ
- **THEN** 背景色は `#FFFFFF`、対応する JSON の前景色は `#000000` になる
- **THEN** 対応するプレビュー領域の文字色も黒になる

### Requirement: Preview title bar and Remote SSH colors
ツールは VS Code のタイトルバー、左側のアクティビティバーと Explorer、エディター、下部ステータスバーを模したプレビューを表示しなければならない（MUST）。プレビューのタイトルバーと Remote SSH インジケーターは、それぞれの選択色を常に表示しなければならず（MUST）、Remote SSH インジケーターはステータスバーの左端に配置しなければならない（MUST）。

#### Scenario: Compare both selected colors
- **WHEN** 利用者がタイトルバーと Remote SSH の色を選ぶ
- **THEN** プレビュー上部のタイトルバーと下部左端の Remote SSH インジケーターに各色が表示される
- **THEN** 片方の色を変えても、もう片方の選択色は保持される

### Requirement: Generate title bar JSON
タイトルバータブは `workbench.colorCustomizations` 内に `titleBar.activeBackground` と `titleBar.inactiveBackground` を選択色、`titleBar.activeForeground` と `titleBar.inactiveForeground` を背景色が `#FFFFFF` の場合は `#000000`、それ以外では `#FFFFFF` とする有効な JSON を生成しなければならない（MUST）。

#### Scenario: Generate default title bar settings
- **WHEN** タイトルバーの背景色が `#1769D2` である
- **THEN** 表示・コピーする JSON は次と同じオブジェクトになる

```json
{
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#1769D2",
    "titleBar.inactiveBackground": "#1769D2",
    "titleBar.activeForeground": "#FFFFFF",
    "titleBar.inactiveForeground": "#FFFFFF"
  }
}
```

### Requirement: Generate remote indicator JSON
Remote SSH タブは `workbench.colorCustomizations` 内に `statusBarItem.remoteBackground` を選択色、`statusBarItem.remoteForeground` を背景色が `#FFFFFF` の場合は `#000000`、それ以外では `#FFFFFF` とする有効な JSON を生成しなければならない（MUST）。

#### Scenario: Generate default remote settings
- **WHEN** Remote SSH の背景色が `#7641C5` である
- **THEN** 表示・コピーする JSON は次と同じオブジェクトになる

```json
{
  "workbench.colorCustomizations": {
    "statusBarItem.remoteBackground": "#7641C5",
    "statusBarItem.remoteForeground": "#FFFFFF"
  }
}
```

### Requirement: Copy current JSON
ツールは表示中の JSON をコピーする操作と、その成功または失敗のフィードバックを提供しなければならない（MUST）。コピーできない場合にも JSON を手動選択してコピーできなければならない（MUST）。

#### Scenario: Successful copy
- **WHEN** 利用者がコピーを押し、クリップボードへの書き込みが成功する
- **THEN** 現在のタブと色に対応する表示 JSON がコピーされ、成功が通知される

#### Scenario: Clipboard unavailable
- **WHEN** クリップボード API が利用できない、または書き込みが拒否される
- **THEN** 成功とは表示せず、失敗と手動コピーの案内を表示する
- **THEN** 表示 JSON を選択して手動でコピーできる

### Requirement: Accessible controls
タブ、プリセット、カラーピッカー、コピー操作はキーボードで利用でき、色名・選択状態・入力の用途を識別できなければならない（MUST）。

#### Scenario: Operate without a pointer
- **WHEN** 利用者がキーボードでタブ切り替え、プリセット選択、コピーを行う
- **THEN** フォーカスと選択状態を確認しながら各操作を完了できる
