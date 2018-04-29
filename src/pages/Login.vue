<template>
    <div class="out-contain">
        <div class="lg-content">
            <div class="qc-pt-login-content" id="loginBox">
                <div class="qc-pt-login-content J-commonLoginContent ">
                    <!--login start-->
                    <div class="login-tab">
                        <h1 class="login-tab-title J-txtLoginTitle">帐号登录</h1>
                        <!--邮箱手机登录　start-->
                        <div class="login-box J-loginContentBox J-qcloginBox">
                            <div class="login-form">
                                <div class="tc-msg error" style="display:none">
                                    <span class="msg-icon"></span>
                                    <div class="tip-info J-loginTip"></div>
                                </div>
                                <ul class="form-list">
                                    <li>
                                        <div class="form-input">
                                            <div class="form-unit tip-unit">
                                                <label class="input-tips" style="display: none;">手机号/邮箱/昵称</label>
                                                <input :v-model="account" type="text" class="qc-log-input-text lg J-username" placeholder="手机号/邮箱/昵称" />
                                                <ul class="tip-list J-mailSuggest" style="display:none;">
                                                </ul>
                                            </div>
                                        </div> </li>
                                    <li>
                                        <div class="form-input">
                                            <div class="form-unit">
                                                <label class="input-tips" style="display: none;">密码</label>
                                                <input type="password" :v-model="password" class="qc-log-input-text lg J-password" placeholder="密码" />
                                            </div>
                                        </div>
                                    </li>
                                    <!--验证码-->
                                    <li style="display:none" class="J-vcodeArea">
                                        <div class="form-input fm-security">
                                            <div class="form-unit">
                                                <label class="input-tips" style="display: none;">验证码</label>
                                                <input type="text" class="qc-log-input-text J-vcodeInput" placeholder="验证码" style="width:124px" />
                                                <a href="javascript:;" class="security-num J-changeVCode"> <img class="security-img J-vcodeImg" /> </a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="op-btn">
                                <input type="button"  value="登 录" class="qc-log-btn J-loginBtn"/>
                                <button type="button" class="qc-log-btn lg" style="display:none">
                                    <div class="m-loading">
                                        <div class="loading">
                                            <div class="one"></div>
                                            <div class="two"></div>
                                            <div class="three"></div>
                                        </div>
                                    </div> </button>
                                <div class="psw-info">
                                    <a :href="forgetPwd" class="forgot-psw J-link">忘记密码？</a>
                                </div>
                            </div>
                        </div>
                        <!--邮箱手机登录 end-->
                        <div class="outside-login">
                            <div class="outside-login-tit">
                                <span class="J-txtMoreLoginType">快捷登录</span>
                            </div>
                            <div class="outside-login-con">
                                <div class="outside-login-list">
                                    <a class="outside-login-btn mail J-btnSwitchLoginType" href="javascript:;" data-type="email" data-hot="login.email" hotrep="login.email"> <em><i class="mail-login-icon"></i></em> <span>邮箱账号</span> </a>
                                    <a class="outside-login-btn wx actived J-btnSwitchLoginType" data-type="wx" href="https://cloud.tencent.com/login/wechat?s_url=https%3A%2F%2Fcloud.tencent.com%2F%3FfromSource%3Dgwzcw.455790.455790.455790%26gclid%3DEAIaIQobChMIy5mktcPn1gIVBoC9Ch1ozgemEAAYAiAAEgInuPD_BwE" data-hot="login.wx"> <em><i class="wx-login-icon"></i></em> <span>微信账号</span> </a>
                                    <a class="outside-login-btn wxoa actived J-btnSwitchLoginType" data-type="wxmp" href="https://cloud.tencent.com/login/mp?s_url=https%3A%2F%2Fcloud.tencent.com%2F%3FfromSource%3Dgwzcw.455790.455790.455790%26gclid%3DEAIaIQobChMIy5mktcPn1gIVBoC9Ch1ozgemEAAYAiAAEgInuPD_BwE" data-hot="login.mp"> <em><i class="wxoa-login-icon"></i></em> <span>微信公众号</span> </a>
                                    <a class="outside-login-btn qq J-btnSwitchLoginType actived" href="javascript:;" data-type="qq" data-hot="login.qq" hotrep="login.qq"> <em><i class="qq-login-icon"></i></em> <span>QQ账号</span> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--login end-->
                    <!--注册提示 start-->
                    <div class="regist">
                        <p class="tag-line"> 注册新帐号？ <a :href="register" class="link J-link">立即注册</a> </p>
                    </div>
                    <!--注册提示 end-->
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    /*! CSS Used from: https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/login-regist/css/login-v20170405.css?t=20170808 */
    button,div,h1,input,li,p,ul{margin:0;padding:0;}
    h1{font-size:100%;}
    em,i{font-style:normal;font-weight:400;}
    button,input{font-family:PingFangSC-Light,'STHeiti Light','helvetica neue','hiragino sans gb',arial,'microsoft yahei ui','microsoft yahei',simsun,sans-serif;}
    button{box-sizing:border-box;}
    button{border:none;}
    button,input[type=button]{cursor:pointer;}
    li{list-style:none;}
    a{text-decoration:none;}
    a img,iframe,img{border-width:0;border-style:none;}
    .qc-log-btn{background-color:#00a2ff;border:none;color:#fff;border-radius:2px;outline:0;}
    .qc-log-btn:hover{background-color:#0097ee;}
    .qc-log-input-text{font-size:14px;height:45px;width:258px;display:inline-block;border:1px solid #ddd;border-radius:2px;color:#333;vertical-align:middle;padding:13px 10px 12px;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;line-height:1;}
    .qc-log-input-text::-ms-clear{display:none;}
    .qc-log-input-text:hover{border-color:#b3b3b3;outline:0;}
    .qc-log-input-text:focus{border-color:#00a2ff;outline:0;}
    .qc-log-input-text:disabled{background-color:#f0f1f2;color:#a2a2a2;background-image:none;cursor:default;}
    .qc-log-input-text:disabled:focus,.qc-log-input-text:disabled:hover{border-color:#ddd;}
    .form-input .input-tips{position:absolute;top:15px;left:12px;font-size:14px;line-height:16px;color:#999;cursor:text;display:none;text-align:left;}
    .m-loading{text-align:center;}
    .m-loading .loading>div{display:inline-block;width:10px;height:10px;border-radius:100%;background-color:#fff;-webkit-animation:bouncedelay .7s infinite ease-in-out both;animation:bouncedelay .7s infinite ease-in-out both;text-align:center;margin-left:4px;margin-right:4px;}
    .m-loading .loading .one{-webkit-animation-delay:-.32s;animation-delay:-.32s;}
    .m-loading .loading .two{-webkit-animation-delay:-.16s;animation-delay:-.16s;}
    .tip-unit .tip-list{position:absolute;top:48px;left:0;width:100%;border:1px solid #ddd;background-color:#FFF;border-radius:2px;color:#000;font-size:14px;z-index:5;max-height:370px;overflow-y:auto;box-sizing:border-box;}
    input[type=text]{-webkit-appearance:none;}
    .qc-pt-login-content{position:relative;display:inline-block;text-align:center;}
    .qc-pt-login-content .link{color:#fff;}
    .qc-pt-login-content .link:hover{text-decoration:underline;}

    .qc-pt-login-content .login-tab{display:inline-block;background:#fff;width:430px;border-radius:4px;}
    .login-tab-title{font-size:28px;font-weight:400;padding-top:25px;color:#333;}
    .login-box .login-form{padding-top:25px;}
    .login-box .op-btn{padding-bottom:10px;}
    .qc-pt-login-content .login-box.qq-box{padding-top:15px;}
    .qc-pt-login-content .login-box .qc-log-input-text{width:310px;height:40px;padding-top:11px;padding-bottom:9px;}
    .form-input .input-tips{top:12px;}
    .qc-pt-login-content .login-box .login-form .form-list{width:310px;margin:0 auto;}
    .qc-pt-login-content .login-box .login-form .form-input{padding-bottom:15px;position:relative;}
    .qc-pt-login-content .login-box .login-form .fm-security{text-align:left;}
    .qc-pt-login-content .login-box .login-form .fm-security .qc-log-input-text{width:125px;display:inline-block;vertical-align:middle;margin-right:8px;}
    .qc-pt-login-content .login-box .login-form .fm-security .security-num{display:inline-block;margin-left:7px;border:1px solid #d1d2d4;border-radius:2px;vertical-align:middle;}
    .qc-pt-login-content .login-box .login-form .fm-security .security-img{width:106px;height:26px;padding:6px 9px;display:block;}
    .qc-pt-login-content .login-box .op-btn{width:310px;margin:0 auto;}
    .qc-pt-login-content .login-box .op-btn .qc-log-btn{width:100%;height:40px;font-size:17px;-webkit-appearance:none;}
    .qc-pt-login-content .login-box .op-btn .psw-info{overflow:hidden;margin-top:15px;}
    .qc-pt-login-content .login-box .op-btn .psw-info .forgot-psw{float:right;color:#2277da;}
    .qc-pt-login-content .login-box .op-btn .psw-info .forgot-psw:hover{text-decoration:underline;}
    .qc-pt-login-content .tc-msg{font-size:12px;line-height:22px;margin:0 auto 15px;vertical-align:middle;border-radius:2px;position:relative;position:relative;color:#e1504a;background:#fee;width:310px;text-align:left;-webkit-transition:max-height .5s ease-in-out;transition:max-height .5s ease-in-out;max-height:140px;}
    .qc-pt-login-content .tc-msg .msg-icon{display:inline-block;width:16px;height:16px;background:url(https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/login-regist/css/img/slice/icon-warn-s.png) no-repeat;position:absolute;top:8px;left:10px;}
    .qc-pt-login-content .tc-msg .tip-info{padding:5px 10px 5px 35px;}
    .mail-login-icon,.qq-login-icon,.wx-login-icon,.wxoa-login-icon{display:inline-block;vertical-align:middle;width:32px;height:32px;}
    .wx-login-icon{background-image:url(https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/login-regist/css/sprite/login-v20170405-201708011445.svg);;background-position:94.14% 20.990000000000002%;background-size:1006.25% 859.375%;;background-repeat:no-repeat;}
    .qq-login-icon{background-image:url(https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/login-regist/css/sprite/login-v20170405-201708011445.svg);;background-position:72.76% 38.269999999999996%;background-size:1006.25% 859.375%;;background-repeat:no-repeat;}
    .wxoa-login-icon{background-image:url(https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/login-regist/css/sprite/login-v20170405-201708011445.svg);;background-position:96.21% 38.269999999999996%;background-size:1006.25% 859.375%;;background-repeat:no-repeat;}
    .mail-login-icon{background-image:url(https://imgcache.qq.com/open_proj/proj_qcloud_v2/gateway/login-regist/css/sprite/login-v20170405-201708011445.svg);;background-position:84.48% 38.269999999999996%;background-size:1006.25% 859.375%;;background-repeat:no-repeat;}
    .outside-login-con{font-size:0;padding-top:10px;}
    .outside-login-btn{display:inline-block;vertical-align:middle;text-align:center;width:33.3333%;}
    .outside-login-btn em{display:block;width:50px;height:50px;line-height:50px;border-radius:50%;margin:0 auto 5px;white-space:normal;}
    .outside-login-btn em:after{content:'';display:inline-block;width:0;height:100%;vertical-align:middle;overflow:hidden;}
    .outside-login-btn.mail em,.outside-login-btn.qq em{background-color:#12b7f5;}
    .outside-login-btn.wx em,.outside-login-btn.wxoa em{background-color:#25be03;}
    .outside-login-btn span{font-size:14px;color:#333;}
    .outside-login-btn:first-child,.outside-login-btn:last-child{width:33.3333%;}
    .outside-login{border-top:#dcdee3 1px solid;padding:24px 0;text-align:center;position:relative;margin:20px 60px 0;border-radius:0 0 4px 4px;}
    .outside-login-tit{position:absolute;top:-8px;left:50%;margin:0 0 0 -50px;text-align:center;width:100px;height:14px;line-height:1;color:#999;}
    .outside-login-tit span{position:relative;z-index:2;}
    .outside-login-tit:after,.outside-login-tit:before{content:'';display:block;width:100%;height:7px;position:absolute;z-index:1;}
    .outside-login-tit:before{top:0;left:0;background-color:#fff;}
    .outside-login-tit:after{top:7px;left:0;background-color:#fff;}
    .outside-login-btn:after{display:inline-block;content:'';height:100%;width:0;overflow:hidden;vertical-align:middle;}
    .outside-login-list{width:116%;margin-left:-8%;}
    .outside-login-list a{display:none;}
    .outside-login-list .actived{display:inline-block;}
    .lg-qr-txt p br{display:none;}
    .qc-pt-login-content .regist{margin-top:15px;font-size:14px;color:#d1d9e0;}
    @media screen and (max-height:700px){
        .lg-content{top:80px;}
    }
    /*! CSS Used keyframes */
    @-webkit-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(.5);opacity:1;}40%{-webkit-transform:scale(1);opacity:.8;}}
    @keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(.5);transform:scale(.5);opacity:1;}40%{transform:scale(1);-webkit-transform:scale(1);opacity:.8;}}
    /*界面容器*/
    .out-contain{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        text-align: center;
        background: #fee;
        /*background-image: url(/assets/images/background/login.jpg);*/
    }

    /*登录盒子位置*/
    .lg-content{
        position: absolute;
        margin:0 auto;
        top: 20%;
        right: 30%;
        left: 30%;
    }

    @media screen and (max-width: 400px) {
        .lg-content{
            position: absolute;
            margin:0 auto;
            top: 20%;
            right: auto;
            left: auto;
        }
    }
</style>
<script>
export default {
    data(){
        return {
            account: '',
            password: '',
            forgetPwd: 'www.cjwddz.cn/url',
            register: 'www.cjwddz.cn/url',
        }
    }
}
</script>