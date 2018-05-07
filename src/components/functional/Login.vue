<template>
   <div class="container">
       <h1>登录</h1>
       <Form ref="formInline" :model="formInline" :rules="ruleInline">
           <FormItem prop="user">
               <Input type="text" @keyup.native.enter="handleSubmit('formInline')" v-model="formInline.user" placeholder="帐号">
               <Icon type="ios-person-outline" slot="prepend"></Icon>
               </Input>
           </FormItem>
           <FormItem prop="password">
               <Input type="password" @keyup.native.enter="handleSubmit('formInline')" v-model="formInline.password" placeholder="密码">
               <Icon type="ios-locked-outline" slot="prepend"></Icon>
               </Input>
           </FormItem>
           <FormItem>
               <Button type="primary" size="large" long @click="handleSubmit('formInline')">登录</Button>
           </FormItem>
       </Form>
   </div>
</template>
<style scoped>
    h1{
        text-align: center;
        margin-bottom:10px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .container{
        width:300px;
        margin-bottom:-30px;
    }
</style>
<script>
import throttle from 'lodash'
import {mapMutations, mapState} from 'vuex'
import vuex from 'vuex'
import Api from 'Api/user-api'
export default {
  data() {
    return {
      name: 'login',
      formInline: {
        user: '',
        password: '',
      },
      ruleInline: {
        user: [
          { required: true, message: '需要帐号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不少于6位', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
        user: 'user'
    }),
  },
  methods: {
    ...mapMutations({
        setUser: 'setUser',
        setAuthModal: 'setAuthModal',
    }),
    handleSubmit(name){
        this.$refs[name].validate((valid) => {
            if (valid) {
                Api.login(this.formInline.user,this.formInline.password).then(result=>{
                    if(result.status){
                        this.setUser(result.data.user)
                        this.setAuthModal(false)
                        this.$Message.success('登录成功!')
                    }else{
                        this.$Message.error(result.msg)
                    }
                })
            } else {
                this.$Message.error('请正确填写信息!')
            }
        })
    },
  },
}
</script>
