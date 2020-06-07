<template>
  <div class="loginBox">
    <div class="logo" >
        <img src="../../assets/logo.png"/>
    </div>
    <p class="login-title">账号登陆</p>
    <el-form ref="user" :model="user" >
      <el-form-item>
        <el-input v-model="user.userName" placeholder="用户名" />
      </el-form-item>
      <el-form-item >
        <el-input v-model="user.password" placeholder="密码" ></el-input>
      </el-form-item>
      <el-form-item >
          <el-button class="btn-login" @click="login">登陆</el-button>
          <el-button class="btn-registry" @click="registry">注册</el-button>
      </el-form-item>
    
    </el-form>
  </div>
</template>

<script>
import account from '../../api/account'
export default {
  name: "login",
  data() {
    return { user: {
      userName:'Fan123',
      password:'Fan123'
    } };
  },
  methods:{
    login(){
      account.login(this.user.userName,this.user.password);
    },
    registry(){
      this.$router.push('/registry');
    }
  }
};
</script>

<style scoped>
.btn-login{
    width:100%;
    background-color:#409eff ;
    color:white;
    margin: 0;
}

.btn-registry{
    width:100%;
    background-color:rgb(65, 184, 131) ;
    color:white;
    margin: 0;
}
.logo img{
    display:block;
    width: 100px;
    height: 100px;
    margin: 0 auto;
}

.login-title {
  text-align: center;
}

.loginBox {
  /* color: #409eff; */
  font-family: arial, "Hiragino Sans GB", "Microsoft YaHei", 微軟正黑體, "儷黑 Pro", sans-serif;
  font-size: 22px;
  position: fixed;
  top: 15%;
  bottom: 15%;
  left: 25%;
  right: 25%;
  padding: 2% 15% 5% 15%;
  background-color: white;
}


.logo img{
    display:block;
    width: 100px;
    height: 100px;
    margin: 0 auto;
}


</style>

<style>
body {
  background-color: rgb(245, 245, 245);
}


</style>