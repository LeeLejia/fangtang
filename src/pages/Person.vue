<template>
    <Layout class="container">
        <Sider hide-trigger class="sider" >
            <Menu mode="vertical" theme="light" width="auto" @on-select="select">
                <Submenu v-for="item in menus" :name="item.name" :key="item.name">
                    <template slot="title">
                        <Icon :type="item.icon"></Icon>
                        {{item.name}}
                    </template>
                    <MenuItem v-for="option in item.options" :name="item.name+'/'+option.name" :key="item.name+'/'+option.name" @click.native="setRoute(option.url)">{{option.name}}</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '24px 0'}" v-if="this.selectedMenu">
                <BreadcrumbItem v-for="item in breadcrumb" :key="item">{{item}}</BreadcrumbItem>
            </Breadcrumb>
            <Content class="content">
                <router-view></router-view>
            </Content>
        </Layout>
    </Layout>
</template>
<style scoped>
    .container{
        width:100%;
        height:100%;
    }
    .sider{
        background: #fff;
        min-height:calc(100% - 150px);
    }
    .content{
        padding: 24px;
        background: #fff;
        /*min-height:calc(100% - 120px);*/
    }
</style>
<script>
export default {
  data() {
    return {
      menus: [],
      selectedMenu: '',
    }
  },
  created() {
    this.setMenus()
  },
  computed: {
    breadcrumb() {
      return ['个人中心', ...this.selectedMenu.split('/')]
    },
  },
  methods: {
    select(value) {
      this.selectedMenu = value
    },
    async setMenus() {
      this.menus = [
        {
          icon: 'ios-navigate',
          name: '应用列表',
          options: [
            { name: '应用列表' },
            { name: '我的链接', url: '/link' },
            { name: '文件管理' },
            { name: '应用日志' },
          ],
        },
        {
          icon: 'ios-navigate',
          name: '任务中心',
          options: [
            { name: '发布任务', url: '/pushTask' },
            { name: '我的任务' },
          ],
        },
        {
          icon: 'ios-navigate',
          name: '消息中心',
          options: [
            { name: '我的消息' },
            { name: '我的任务' },
          ],
        },
        {
          icon: 'ios-navigate',
          name: '个人信息',
          options: [
            { name: '账号信息' },
          ],
        },
      ]
    },
    setRoute(url) {
      this.$router.push(`/person${url}`)
      console.log(`route to ${url}`)
    },
  },
}
</script>
