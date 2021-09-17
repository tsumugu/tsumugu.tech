# [tsumugu.tech](https://tsumugu.tech)
## ◆ 使用技術
### ・Nginx - 静的ファイル配信

### ・Node.js - ビルドなど

### ・Vue.js - JavaScriptフレームワーク

## ◆ ローカルでの開発方法
### 1. パッケージのインストール
```
> npm ci
```
> ※ ``` npm ci ``` がgrpc関係のエラーで失敗するときは、
grpcだけを```--unsafe-perm```をつけて単体でインストールする。
> ```
> sudo npm install grpc@1.24.2 --unsafe-perm
> ```
### 2. 開発サーバ立ち上げ
```
> npm run dev
```
http://localhost:8080/ で開発サーバが立ち上がり、変更は自動的に反映される。
### 3. GitHubへのPush
・ Unixシェル
```
> sudo sh gitpush.sh "コミットメッセージ"
```
・ Windows
```
> gitpush "commit name"
```
## ◆ CI/CD (GitHubにPushされたら自動でBuildして公開)
① GitHubにローカルから ```Push ($ git push origin master)```

② PushされるとWebHookでサーバにリクエストが飛ぶので ```Pull ($ git pull origin master)```

③ Pullしたコードを ```Build ($ npm run build)```

④ Buildしたファイルを公開ディレクトリにコピー(```Deploy```)

> ![exp](https://user-images.githubusercontent.com/29032673/72495403-ed2b9780-3869-11ea-8147-e540521560c6.png)