<template>
  <div class="loginBox">
    <div class="loginFrame">
      <!-- 登陆功能盒子 -->
      <div class="fontBox">
        <!-- LOGO -->
        <div class="frameImg" style="overflow: hidden">
          <img src="./../assets/img/touxiang2.jpg" alt="" class="imgLogo" />
        </div>
        <div class="loginFrom">
          <!-- 登录表单 -->
          <el-form
            ref="formRef"
            :model="loginData"
            :rules="rulesFrom"
            label-width="0px"
          >
            <el-form-item prop="username">
              <el-input
                placeholder="用户名"
                prefix-icon="el-icon-search"
                v-model="loginData.username"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="密码"
                prefix-icon="el-icon-search"
                v-model="loginData.password"
                prop="password"
              >
              </el-input>
            </el-form-item>
            <el-form-item size="large" class="fromBtn">
              <el-button type="primary" @click="fromOnSubmit">登陆</el-button>
              <el-button @click="fromResetFields">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        username: 'admin',
        password: '123456'
      },
      rulesFrom: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交表单
    fromOnSubmit() {
      this.$refs.formRef.validate(async (val) => {
        // 验证账号密码格式，判断结果不为 true 直接返回
        if (!val) return this.$message.error('确认账号密码正确性')
        // 请求后台 登陆返回 判断是否进入下一个页面
        await this.$http.loginAPI.login(this.loginData)
          .then((res) => {
            // 保存 token 值
            window.sessionStorage.token = JSON.stringify(res.data.data.token)
            // 页面跳转
            this.$router.push('/home')
          })
          .catch(() => {
            this.$message.error('账号密码有误')
          })
      })
    },
    // 重置 from 表单
    fromResetFields() {
      this.$refs.formRef.resetFields()
    }
  }
}
</script>
<style lang='less' scoped>
.loginBox {
  width: 100%;
  height: 100%;
  background-color: rgb(88, 55, 236);
}
.loginFrame {
  height: 480px;
  width: 480px;
  background-color: #fff;
  border-radius: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  .imgLogo {
    width: 200px;
  }
  .fontBox {
    .frameImg {
      width: 200px;
      height: 200px;
      background-color: #fff;
      position: fixed;
      top: -20%;
      left: 30%;
      border-radius: 100px;
      box-shadow: 0px 0px 10px #b6b6b6;
    }
    .loginFrom {
      margin-top: 200px;
      width: 380px;
      height: 230px;
    }
    .fromBtn {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
