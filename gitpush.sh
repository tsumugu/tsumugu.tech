mv "trash---.babelrc" ".babelrc"

git add .
git commit -m $1
git push origin master

mv ".babelrc" "trash---.babelrc"