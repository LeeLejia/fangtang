<template>
    <div class="body">
      <div class="setting">
        <div class="setting-title">个人资料</div>
        <div class="setting-item personal">
          <Form :model="person" label-position="left" :label-width="50" @submit.native.prevent>
            <FormItem label="昵称">
              <Input v-model="person.displayName" style="width: 200px" />
            </FormItem>
            <FormItem label="邮箱">
              <Input v-model="person.email" style="width: 200px" :readonly="true" />
            </FormItem>
            <FormItem label="手机">
              <Input v-model="person.mobile" style="width: 200px" :readonly="true" />
            </FormItem>
          </Form>
          <div class="edit-avatar">
            <Avatar :src="person.avatar" size="large" shape="square" icon="person" class="avatar"/>
            <Button :disabled="isLoading" @click.stop="handleAvatar">修改头像</Button>
            <input type="file" ref="fileUpload" style="display: none" @change="onAvatarUpload" />
          </div>
        </div>
      </div>
      <div class="setting">
        <div class="setting-title">消息通知</div>
        <div class="setting-item switches">
          <div class="switch">
            <label>邮件通知</label>
            <i-switch v-model="dontNotice"></i-switch>
          </div>
          <div class="switch">
            <label>微信通知</label>
            <i-switch v-model="mute"></i-switch>
          </div>
        </div>
      </div>
      <div class="setting">
        <div class="setting-title">修改密码</div>
        <div class="setting-item">
          <Form :model="password" label-position="left" :label-width="80" :rules="ruleCustom" @submit.native.prevent>
            <FormItem label="原密码">
              <Input type="password" v-model="password.oldPassword" style="width: 170px" />
            </FormItem>
            <FormItem label="新密码">
              <Input type="password" v-model="password.newPassword1" style="max-width: 170px" />
            </FormItem>
            <FormItem label="再次确认" prop="newPassword2">
              <Input type="password" v-model="password.newPassword2" style="max-width: 170px" />
            </FormItem>
          </Form>
        </div>
      </div>
      <div class="setting">
        <div class="setting-title">更多选项</div>
        <div class="setting-item more">
          <Button type="ghost" v-if="clearCacheConfirm" @click.stop="clearCacheConfirm = false">取消</Button>
          <Button :type="clearCacheConfirm ? 'error' : 'ghost'" @click.stop="handleCacheClear(clearCacheConfirm)">{{ clearCacheConfirm ? '确认清除缓存' : '清除缓存' }}</Button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { Button, Form, FormItem, Input, Switch, Avatar } from 'iview'
import fileApi from 'Api/file-api'
import userApi from 'Api/user-api'

export default {
  name: 'settings',
  components: {
    Button, Form, FormItem, Input, 'i-switch': Switch, Avatar,
  },
  props: {
    meta: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
  },
  data() {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.password.newPassword1) {
        callback(new Error('密码不一致'))
      } else if (value.length < 6) {
        callback(new Error('密码位数必须大于6位'))
      } else {
        callback()
      }
    }
    return {
      ruleCustom: {
        newPassword2: [{
          validator: validatePassCheck, trigger: 'blur',
        }],
      },
      isLoading: false,
      person: {
        displayName: '',
        email: '',
        mobile: '',
        avatar: '',
      },
      dontNotice: false,
      mute: false,
      password: {
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
      },
      clearCacheConfirm: false,
    }
  },
  computed: {
    ...mapState({
      settings: state => state.settings,
      userInfo: state => state.user,
    }),
    checkDisplayNameUpdate() {
      if (this.person.displayName && this.person.displayName !== this.userInfo.displayName) {
        return true
      }
      return false
    },
    checkAppSettinigs() {
      return this.settings.notice === this.dontNotice || this.settings.sound === this.mute
    },
    checkPasswordUpdate() {
      if (this.password.oldPassword && this.password.newPassword1 && this.password.newPassword2 === this.password.newPassword1) {
        return true
      }
      return false
    },
    changed() {
      return this.checkDisplayNameUpdate || this.checkAppSettinigs || this.checkPasswordUpdate
    },
  },
  methods: {
    handleAvatar() {
      this.$refs.fileUpload.click()
    },
    handleSettings() {
      this.$store.dispatchGlobal('settings', { ...this.settings, notice: !this.dontNotice, sound: !this.mute })
    },
    async onAvatarUpload(event) {
      this.isLoading = true
      event.preventDefault()
      event.stopPropagation()
      const result = await fileApi.uploadFile(event.target.files[0])
      if (!result.status) {
        this.$Message.error(result.msg || '头像设置失败')
        this.isLoading = false
        return
      }
      // todo
      const setResult = await userApi.modifyUser({})
      if (!setResult.status) {
        this.$Message.error(setResult.msg || '头像设置失败')
        this.isLoading = false
        return
      }
      this.isLoading = false
    },
    async handleSave() {
      console.log('保存设置')
      this.isLoading = true
      if (this.checkDisplayNameUpdate) {
        await this.$fcNormal.setDisplayName(this.userInfo.id, this.person.displayName)
      }
      if (this.checkAppSettinigs) {
        this.handleSettings()
      }
      if (this.checkPasswordUpdate) {
        const response = await this.$fcNormal.setPassword(this.userInfo.id, this.password.oldPassword, this.password.newPassword2)
        this.password = {
          oldPassword: '',
          newPassword1: '',
          newPassword2: '',
        }
        if (response.status) {
          this.$Message.success('修改密码成功')
        } else {
          this.$Message.error('修改密码失败')
        }
      }
      this.$agent.delegate(this.$channel.refreshUserInfo)
      this.isLoading = false
    },
    handleLogout() {
      // todo
    },
    async exportKeys() {
      // todo
    },
    async buildPerson() {
      const displayName = this.userInfo.displayName
      const mobile = this.userInfo.phone
      const email = this.userInfo.email
      const avatar = this.userInfo.avatar
      this.person = {
        displayName,
        mobile,
        email,
        avatar,
      }
    },
    async handleCacheClear(confirm) {
      // todo
    },
  },
  created() {
    this.dontNotice = !this.settings.notice
    this.mute = !this.settings.sound
    this.buildPerson()
  },
  beforeDestroy() {
  },
  watch: {
    userInfo() {
      this.buildPerson()
    },
    settings(newVal) {
      this.dontNotice = !newVal.notice
      this.mute = !newVal.sound
    },
  },
}
</script>

<style lang="scss" scoped>
%flex-horizontal {
  display: flex;
}
%flex-vertical {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.body {
    flex: 1;
    margin: 10px 20px;
    overflow-x: auto;
    overflow-y: auto;
    .setting {
      color: #333333;
      margin: 5px auto;
      border-bottom: 1px solid #DCDCDC;
      .setting-item {
        position: relative;
        width: 90%;
        font-size: 14px;
        @extend %flex-horizontal;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        margin: 5px auto;
        padding: 0 10px;
        .avatar{
          width:100px;
          height:100px;
          margin-bottom:15px;
        }
        .edit-avatar {
          @extend %flex-vertical;
          justify-content: space-around;
          align-items: center;
        }
        .account-avatar {
          @extend %flex-horizontal;
          align-items: center;
          .name {
            margin-left: 5px;
          }
        }
        .btns {
          @extend %flex-horizontal;
          & > button {
            margin-left: 5px;
          }
        }
        .debug {
          color: #999999;
        }
        & > div {
          margin: 2px 5px;
        }
      }
      .setting-item.switches {
        width: 260px;
        @extend %flex-vertical;
        align-items: center;
        margin: 5px 0;
        .switch {
          font-size: 12px;
          @extend %flex-horizontal;
          align-items: center;
          label {
            width: 60px;
          }
        }
      }
      .setting-item.more {
        display: flex;
        justify-content: flex-end;
        > button {
            margin-left: 5px;
        }
      }
    }
  }
</style>
