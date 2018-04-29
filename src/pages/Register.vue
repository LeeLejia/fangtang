<template>
<Form :model="formItem" :label-width="80" class="register-form" ref="registerForm" :rules="rules">
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
        <Input class="form-text email" placeholder="输入邮箱" v-model="formItem.email"></Input>
    </FormItem>
    <FormItem label="设置密码">
        <Input type="password" class="form-text password" placeholder="密码" v-model="formItem.password"></Input>
    </FormItem>
    <FormItem label="确认密码">
        <Input type="password" class="form-text password" placeholder="密码" v-model="formItem.passwordConfirm"></Input>
    </FormItem>
    <FormItem>
        <Button type="primary" class="button-register" @click="handleSubmit">注册</Button>
    </FormItem>
</Form>
</template>
<style>
h2{
    text-align: center;
    margin-bottom:20px;
}
.register-form{
    width: 350px;
    margin-left:auto;
    margin-right:auto;
    margin-top: 100px;
}
.form-text {
    width:150px;
}
.button-register{
    width:120px;
}
</style>
<script>
    import Api from 'Api'
export default {
    data(){
        return {
            formItem: {
                nick: '',
                roles: [],
                phone: '',
                email: '',
                password: '',
                passwordConfirm: '',
            },
            rules: {
                nick:[
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' },
                    { type: 'string', min: 5, message: '昵称不少于5个字符', trigger: 'blur' },
                    { type: 'string', max: 5, message: '昵称不能超过15个字符', trigger: 'blur' }
                ],
                roles:[
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                ],
                passwordCOnfirm: [
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit() {
            console.log(this.formItem)
            if(this.formItem.password!==this.formItem.passwordConfirm){
                this.$Message.error('两次输入密码不一致,请重新校验密码')
                return
            }
//            this.$refs.registerForm.validate((valid) => {
//                if (valid) {
//                    this.$Message.success('Success!');
//                } else {
//                    this.$Message.error('Fail!');
//                }
//            })
            Api.register(this.formItem).then(result=>{
                if(result.status){
                    this.$Message.success('注册成功!')
                }else {
                    this.$Message.error('注册失败!请重试.')
                }
            })
        }
    }
}
</script>