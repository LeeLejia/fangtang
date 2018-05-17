<template>
    <div class="container">
        <Form :model="formItem" :label-width="80" class="register-form" ref="registerForm">
            <h2>注册帐号</h2>
            <FormItem label="昵称">
                <Input class="form-text nick" v-model="formItem.nick" placeholder="设置你的昵称~"></Input>
            </FormItem>
            <FormItem label="角色">
                <CheckboxGroup v-model="formItem.roles">
                    <Checkbox label="employer">
                        <Icon type="social-twitter"></Icon>
                        <span>雇主</span>
                    </Checkbox>
                    <Checkbox label="developer">
                        <Icon type="social-twitter"></Icon>
                        <span>开发者</span>
                    </Checkbox>
                    <Checkbox label="admin">
                        <Icon type="social-twitter"></Icon>
                        <span>管理员</span>
                    </Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="手机">
                <Input class="form-text phone" placeholder="输入手机号" v-model="formItem.phone"></Input>
            </FormItem>
            <FormItem label="邮箱">
                <AutoComplete class="form-text email" :data="autoEmail" placeholder="输入邮箱" v-model="formItem.email"></AutoComplete>
            </FormItem>
            <FormItem label="设置密码">
                <Input type="password" class="form-text password" placeholder="密码" v-model="formItem.password"></Input>
            </FormItem>
            <FormItem label="确认密码">
                <Input type="password" class="form-text password" placeholder="确认密码" v-model="formItem.passwordConfirm"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" class="button-register" :loading="loading" size="large"  @click="handleSubmit">注册</Button>
            </FormItem>
        </Form>
    </div>
</template>
<style scoped>
.container{
    width:100%;
    /*height:100vh;*/
    background: #EDEDEE;
    /*padding-top:100px;*/
    margin-bottom:-50px;
}
h2{
    text-align: center;
    margin-bottom:20px;
}
.register-form{
    position: flex;
    flex-direction: column;
    justify-content: center;
    margin-left:auto;
    margin-right:auto;
    width: 320px;
    padding-top: 20px;
    padding-bottom:20px;
    background: #FFFFFF;
    border-radius: 5px;
}
.form-text {
    width:150px;
}
.button-register{
    width:150px;
    margin-left:5px;
}
</style>
<script>
import Api from 'Api/user-api'
import throttle from 'lodash/throttle'
import { Form, FormItem, Input, CheckboxGroup, AutoComplete, Checkbox, Button } from 'iview'

export default {
  data() {
    return {
      name: 'register',
      loading: false,
      formItem: {
        nick: '',
        roles: [],
        phone: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
    }
  },
  computed: {
    autoEmail() {
      if (this.formItem.email.indexOf('@') !== -1 || this.formItem.email === '') { return [] }
      const emails = ['@qq.com', '@gmail.com', '@163.com', '@yahoo.com', '@ask.com', '@live.com']
      return emails.map(email => this.formItem.email.concat(email))
    },
  },
  components: {
    Form, FormItem, Input, CheckboxGroup, AutoComplete, Checkbox, Button,
  },
  methods: {
    handleSubmit: throttle(async function() {
      if (this.loading || !this.check()) { return }
      this.loading = true
      Api.register(this.formItem).then((response) => {
        this.loading = false
        if (response.status) {
          this.$Message.success(response.msg || '注册成功!')
          this.$emit('changeModal', 'login')
        } else {
          this.$Message.error(response.msg || '注册失败!请重试.')
        }
      })
    }, 3000, { leading: true, trailing: true }),
    check() {
      console.log(this.formItem)
      if (this.formItem.nick.length > 15 || this.formItem.nick.length < 2) {
        this.$Message.error('昵称长度在2-15个字符!')
        return false
      }
      if (!/^[\u4e00-\u9fa50-9a-zA-Z]+$/.test(this.formItem.nick)) {
        this.$Message.error('昵称不能包含特殊字符!')
        return false
      }
      if (this.formItem.roles.length > 2 || (this.formItem.roles.length == 2 && this.formItem.roles.indexOf('admin') !== -1)) {
        this.$Message.error('管理员角色不能和其它角色一起设置')
        return false
      }
      if (this.formItem.password !== this.formItem.passwordConfirm) {
        this.$Message.error('两次输入密码不一致,请重新校验密码')
        return false
      }
      if (!/^1[3458]\d{9}$/.test(this.formItem.phone)) {
        this.$Message.error('手机号不合法')
        return false
      }
      if (!/^[0-9a-zA-Z]+@[a-z]+\.(cn|com|co|net)$/.test(this.formItem.email)) {
        this.$Message.error('邮箱不合法')
        return false
      }
      if (this.formItem.roles.length < 1) {
        this.$Message.error('请选择角色')
        return false
      }
      return true
    },
  },
}
</script>
