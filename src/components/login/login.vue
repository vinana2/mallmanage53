<template>
  <div class="login-wrap">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="80px"
      label-position="top"
      class="login-form"
    >
      <h3>用户登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.prevent="handleLogin()"
          class="login-btn"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    //   登录请求
  async  handleLogin() {
    //   this.$http.post("login", this.ruleForm).then((res) => {
     const res = await this.$http.post("login", this.ruleForm)
        console.log(res);

        const {
          data,
          meta: { msg, status },
        } = res.data;

        if (status === 200) {
        //   登录成功
        // 0、保存token
        window.sessionStorage.setItem('token',data.token)

        // 1、跳转；home
        this.$router.push('/home')
        
        // 2、提示成功
        this.$message.success(msg);
        
        }
        else{
         this.$message.warning(msg);

        }
      

    },
  },
};
</script>

<style scoped>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}

.login-wrap .login-btn {
  width: 100%;
}
</style>