<template>
  <div class="login-container">
    <el-form
      autoComplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="card-box login-form"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <span class="svg-container"><i class="el-icon-star-on"></i></span>
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          autoComplete="on"
          placeholder="账户"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container"><i class="el-icon-view"></i></span>
        <el-input
          name="password"
          type="password"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.password"
          autoComplete="on"
        ></el-input>
      </el-form-item>
      <span
        v-if="!captcha"
        @click="refreshCaptcha"
      >获取验证码中...</span>
      <el-image
        style="width: 130px; height: 48px"
        :src="captcha"
        fit="contain"
        @click="refreshCaptcha"
      ></el-image>
      <el-form-item prop="verCode">
        <el-input
          name="captcha"
          v-model="loginForm.verCode"
          placeholder="验证码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          :loading="loading"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="第三方验证"
      :visible.sync="showDialog"
    >
      邮箱登录成功,请选择第三方验证
      <social-sign></social-sign>
    </el-dialog>
  </div>
</template>

<script>
import socialSign from './socialsignin';
import { fetchCaptcha } from '../../api/login';

export default {
  components: {
    socialSign,
  },
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: 'admin',
        password: 'admin',
        uuid: '',
        verCode: '',
      },
      loginRules: {
        username: [
          {
            required: true,
            message: '账户不能为空',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePass,
          },
        ],
      },
      loading: false,
      showDialog: false,
      captcha: '',
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('LoginByEmail', this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({
                path: '/',
              });
              // this.showDialog = true;
            })
            .catch(() => {
              this.loading = false;
            });
          // this.$http.post('/oauth/token', {
          //   username: this.loginForm.username,
          //   password: this.loginForm.password
          // }, {
          //   headers: {
          //     Authorization: 'Basic enV1bDp6dXVs'
          //   },
          //   emulateJSON: true,
          //   emulateHTTP: true
          // }).then(function(response) {
          //   if (response.status === 200) {
          //     this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
          //       this.loading = false;
          //       this.$router.push({
          //         path: '/'
          //       });
          //       // this.showDialog = true;
          //     }).catch(() => {
          //       this.loading = false;
          //     });
          //   } else {
          //     this.loading = false;
          //     return false;
          //   }
          // }, function(error) {
          //   console.log('server error!!');
          //   this.loading = false;
          //   return false;
          // });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1);
      // const hashObj = getQueryObject(hash);
      // const originUrl = window.location.origin;
      // history.replaceState({}, '', originUrl);
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // };
      // const codeName = hashObj[codeMap[this.auth_type]];
      // if (!codeName) {
      //   alert('第三方登录失败');
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' });
      //   });
      // }
    },
    async refreshCaptcha() {
      this.captcha = '';
      const {
        data: { captcha: captchaStr, uuid },
      } = await fetchCaptcha();
      this.loginForm.uuid = uuid;
      this.captcha = `data:image/png;base64,${captchaStr}`;
    },
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan);
    this.refreshCaptcha();
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan);
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/styles/mixin.scss';
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.login-container {
  @include relative;
  height: 100vh;
  // background-color: #2d3a4b;
  // background-color: $bg;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url('../../assets/images/login-bg.jpg');
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 12px 5px 12px 15px;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: gray;
    margin: 0 auto 18px;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    border-radius: 5px;
    position: absolute;
    right: 170px;
    top: 12%;
    width: 350px;
    padding: 15px 20px 5px 20px;
    margin: 120px auto;
    background-color: white;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .forget-pwd {
    color: #fff;
  }
}
</style>
