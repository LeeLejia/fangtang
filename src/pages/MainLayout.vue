
<template>
    <Layout class="layout">
        <Header>
            <Menu mode="horizontal" theme="dark" active-name="1" @on-select="select">
                <img class="layout-logo" v-icon="'logo'"></img>
                <div class="layout-nav">
                    <MenuItem name="home">
                        <Icon type="home"></Icon>
                        主页
                    </MenuItem>
                    <MenuItem name="task">
                        <Icon type="social-wordpress-outline"></Icon>
                        任务大厅
                    </MenuItem>
                    <MenuItem name="about">
                        <Icon type="social-twitch-outline"></Icon>
                        关于
                    </MenuItem>
                    <MenuItem name="person">
                        <Icon type="person"></Icon>
                        个人中心
                    </MenuItem>
                </div>
            </Menu>
        </Header>
        <Layout class="container">
            <!--content-->
            <router-view class="router-view"></router-view>
        </Layout>
    </Layout>
</template>
<script>
export default {
    methods: {
        select(value){
            if(value==='home'){
                this.$router.push(`/home`)
            }else if(value==='task'){
                this.$router.push(`/taskHall`)
            }else if(value==='about'){
                this.$router.push(`/about`)
            }else if(value==='person'){
                this.$router.push(`/person`)
            }
        }
    }
}
</script>
<style scoped lang="less">
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height:100vh;
}
.container{
    background: #fff;
    .router-view{
        background: #fff;
    }
}
.layout-logo{
    width: 100px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 20px 0 auto;
}
</style>
