# CI/CD (GitHubにPushされたら自動でBuildして公開)
① GitHubにローカルから ```Push```

② PushされるとWebHookでサーバにリクエストが飛ぶので ```Pull```

③ ```Pull``` したコードを ```Build```

④ ビルドしたファイルを公開ディレクトリにコピー(```Deploy```)

> ![exp](https://user-images.githubusercontent.com/29032673/72495403-ed2b9780-3869-11ea-8147-e540521560c6.png)
