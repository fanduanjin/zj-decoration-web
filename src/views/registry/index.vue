<template>
  <div class="registyBox">
    <div class="logo">
      <img src="../../assets/logo.png" />
    </div>
    <p class="login-title">账号注册</p>

    <el-form :model="user" :rules="rules" label-position="left" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="user.userName" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input v-model="user.checkPwd" />
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input type="phone" v-model="user.phoneNumber" />
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="user.validatorCode">
          <template slot="suffix">
            <el-button type="text" @click="sendCode" :disabled="btn_sendCode_disabled">{{codeMsg}}</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-registry" @click="registry">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import validator from "@/util/formatValidator";
import account from "@/api/account";
export default {
  data() {
    return {
      user: {},
      codeMsg: "发送验证码",
      btn_sendCode_disabled: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!validator.validatorUserName(value)) {
                return callback(new Error("用户名格式不正确，必须大写字母开头，长度6-16位，如：Fanduanjin"));
              }
              callback();
            },
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!validator.validatorPassword(value)) {
                return callback(new Error("密码格式不正确，必须包含数字、大小写字符，如：786793.pwd"));
              }
              callback();
            },
            trigger: "change"
          }
        ],
        checkPwd: [
          { required: true, message: "请再次输入密码",trigger:"blur" },
          {
            validator: (rule, value, callback) => {
              if (this.user.password != value) {
                return callback(new Error("两次输入密码不一致"));
              }
              callback();
            },
            trigger: "change"
          }
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (validator.validatorPhoneNumber(value)) {
                callback();
              } else {
                return callback(new Error("手机号码格式不正确"));
              }
            },
            trigger: "change"
          }
        ],
        validatorCode: {
          required: true,
          message: "请输入验证码",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    sendCode() {
      var that = this;
      if (!validator.validatorPhoneNumber(this.user.phoneNumber)) return;
      account.sendRegistryCode(this.user.phoneNumber, () => {
        that.btn_sendCode_disabled = true;
        var intervalSecod = 60;
        var interval = setInterval(() => {
          intervalSecod--;
          var msg;
          if (intervalSecod == 0) {
            msg = "发送验证码";
            that.btn_sendCode_disabled = false;
            clearInterval(interval);
          } else msg = "已发送 " + intervalSecod + "s";
          that.codeMsg = msg;
        }, 1000);
      });
    },
    registry(){
      account.registry(this.user,this.user.validatorCode);
    }
  }
};
</script>
<style scoped>
.btn-login {
  width: 100%;
  background-color: #409eff;
  color: white;
  margin: 0;
}

.btn-registry {
  width: 100%;
  background-color: rgb(65, 184, 131);
  color: white;
  margin: 0;
}
.logo img {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.login-title {
  text-align: center;
}

.registyBox {
  /* color: #409eff; */
  font-family: arial, "Hiragino Sans GB", "Microsoft YaHei", 微軟正黑體,
    "儷黑 Pro", sans-serif;
  font-size: 22px;
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 20%;
  right: 20%;
  padding: 2% 15% 5% 15%;
  background-color: white;
}

.logo img {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.btn-sendcode {
  margin-right: -4px;
  margin-bottom: 1px;
}
</style>