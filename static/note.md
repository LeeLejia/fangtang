

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
      ....
    }, 10000, { leading: true, trailing: true })
```

- css calc()