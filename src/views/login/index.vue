<template>
  <div class="login-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="form.account" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setToken, getToken, removeToken } from "@/utils/cookie";
import { login } from "@/api/article";
export default {
  data() {
    return {
      form: {
        account: "admin",
        password: "admin@123"
      },
      rules: {
        //校验
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert('submit!');
          // 发送请求;
          // this.$http
          //   .post("user/login", this.form)
          //   .then(res => {
          //     console.log(res);
          //       this.$router.push("/home"); //跳转
          //       // window.sessionStorage.setItem('token',res.data.data.token);//存储数据
          //       //存储token的值  一种  本地存储    二种 vuex
          //       setToken(res.data.data.token);
          //   })
          //   .catch(error => {});
          login(this.form).then(res => {
            console.log(res);
            setToken(res.data.token);
            this.$router.push("/home");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  overflow-y: hidden;
}
.login-container {
  position: relative;
  margin: auto;
  margin-top: 6%;
  width: 37%;
  height: 50%;
  background-color: aliceblue;
  border-radius: 5px;
}
.login-form {
  position: absolute;
  width: 80%;
  height: 70%;
  top: 20%;
  transform: translateX(-50%);
  left: 50%;
}
</style>

