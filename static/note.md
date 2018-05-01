

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