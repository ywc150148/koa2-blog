git init
git add .
git status
git commit -m "first commit"
git remote add origin https://github.com/ywc150148/koa2-blog.git
git push -u origin master
git pull 拉取线上版本覆盖本地


防止触发手打路径：

// 进入项目目录
cd /home/admin/node

// 删除应用静态文件
rm -rf /home/admin/node/koa2-blog/static/dist

// 复制打包好的文件到应用静态目录
cp -r -f /home/admin/node/vuecli3-blog/dist /home/admin/node/koa2-blog/static

