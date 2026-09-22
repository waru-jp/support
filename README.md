# Waru LP

`lp/` は、iOS先行公開用の静的LPと法務ページです。アプリの実データや共有tokenをブラウザへ保存せず、共有リンクはiOSアプリへ渡します。

## ローカル確認

```sh
python3 -m http.server 4173 --directory lp
```

`http://localhost:4173/` を開き、モバイル幅、キーボード操作、`prefers-reduced-motion` を確認します。

## GitHub Pages

Waru本体の非公開リポジトリから、公開用の専用リポジトリへ`lp/`を同期してGitHub Pagesで公開します。Itsuと同じく、Organization配下の`support`リポジトリを推奨します。App Store URLが確定するまでは、LPのダウンロード導線は「iOS版を準備中」と表示されます。

公開workflowへ次を設定してください。

- `WARU_PAGES_REPOSITORY`（Repository variable。例: `waru-jp/support`）
- `PAGES_DEPLOY_TOKEN`（PagesリポジトリへpushできるFine-grained PAT）
- `APPLE_TEAM_ID`（Actions secret）
- `WARU_BUNDLE_ID`（Actions secret）

PagesリポジトリではGitHub Pagesの公開元を`main`に設定し、カスタムドメイン`waru.app`を登録します。OrganizationのFreeプランでは公開リポジトリを使います。

`g/index.html` は共有リンクの直接表示用で、GitHub Pagesの`404.html`は`/g/{shareToken}`のような存在しないパスをフォールバックとして受けます。どちらもアプリ未インストール時は参加方法を案内し、インストール済み端末ではUniversal Linksがアプリを優先して開きます。`_redirects`はCloudflare等の別ホスティングへ移す場合の互換設定として残します。

Universal Linksを有効にする前に、次のコマンドでAppleのAssociated Domainsファイルを生成します。

```sh
APPLE_TEAM_ID="TEAM_ID" \
WARU_BUNDLE_ID="com.example.waru" \
./scripts/render-aasa.sh
```

生成後の `lp/.well-known/apple-app-site-association` を、`https://waru.app/.well-known/apple-app-site-association` で配信してください。Bundle IDやTeam IDが未確定の状態で公開しないでください。
