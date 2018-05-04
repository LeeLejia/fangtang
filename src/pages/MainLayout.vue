
<template>
    <Layout class="layout">
        <Header>
            <Menu mode="horizontal" theme="dark" active-name="home" @on-select="select">
                <img class="layout-logo" v-icon="'logo'"/>
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
        <Modal title="图片预览" v-model="visible">
            <img :src="imgUrl" style="width: 100%">
        </Modal>
        <Modal v-model="verification">
            <component name="login"></component>
        </Modal>
        <Layout class="container">
            <!--content-->
            <router-view class="router-view" @openImg="openImg"></router-view>
        </Layout>
    </Layout>
</template>
<script>
import Login from '@/components/functional/Login'

export default {
  data() {
    return {
      visible: false,
      verification: true,
      verifiType: 'login',
      imgUrl: '',
    }
  },
  components: [Login],
  methods: {
    openImg(url) {
      this.imgUrl = url
      this.visible = true
    },
    select(value) {
      if (value === 'home') {
        this.$router.push('/home')
      } else if (value === 'task') {
        this.$router.push('/taskHall')
      } else if (value === 'about') {
        this.$router.push('/about')
      } else if (value === 'person') {
        this.$router.push('/person')
      }
    },
  },
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
