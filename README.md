# [tsumugu.tech](https://tsumugu.tech)
## 使用技術
### ・Nginx
静的ファイル配信

### ・Node.js
ビルドなど

### ・Vue.js
JavaScriptフレームワーク
## CI/CD (GitHubにPushされたら自動でBuildして公開)
① GitHubにローカルから ```Push ($ git push origin master)```
 
② PushされるとWebHookでサーバにリクエストが飛ぶので ```Pull ($ git pull origin master)```

③ Pullしたコードを ```Build ($ npm run build)```

④ Buildしたファイルを公開ディレクトリにコピー(```Deploy```)

> ![exp](https://user-images.githubusercontent.com/29032673/72495403-ed2b9780-3869-11ea-8147-e540521560c6.png)
