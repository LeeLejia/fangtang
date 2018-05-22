<template>
    <div class="container">
        <p class="fzf">404</p>
        <p class="descript"><i>{{msg}}</i></p>
    </div>
</template>
<style>
    .container{
        text-align: center;
        diplay: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .fzf{
        margin: 10px;
        color: #657180;
        font-size: 100px;
        margin-top: 80px;
    }
    .descript{
        color: #657180;
    }
</style>
<script>
    export default {
        props: {
            msg: {
                defualt: 'Oop!你访问的链接不存在~',
                type: String,
            }
        }
    }
</script>