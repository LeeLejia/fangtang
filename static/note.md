

- css文档中后边的样式会覆盖前边的样式

<div class="a b"></div>

a{
   prop1: xxx;
}
B{
   prop1: xxx;
}

prop1为 B样式.


- 防抖
```javascript
refresh: throttle(async function () {
     // ....
    }, 10000, { leading: true, trailing: true })
```

- css calc()

- 第三方组件click事件不起效时可以试试,@click.native

- vue css style避免影响组件外元素可以加scope限制作用范围


- git 高频操作

删除本地分支
git branch -D xxx

删除远程分支
git push origin :xxx

合并分支
git merge xxx

缓存修改
git stash

恢复缓存到当前分支
git stash pop

切换到分支
git checkout xxx

新建并切换到分支
git checkout -b xxx


- 使用 slot="xxx" 不会显示,除非父组件进行处理,安排

