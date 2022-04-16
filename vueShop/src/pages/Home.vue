<template>
  <div style="height: 100%" direction="vertical">
    <!-- 布局容器 -->
    <el-container style="height: 100%">
      <!-- 头部内容 -->
      <el-header style="background-color: #62a3f8">
        <span></span>
        <span>不说话的周淑怡</span>
        <el-button type="warning">账户</el-button>
        <el-button type="danger" @click="btnOut">退出</el-button>
      </el-header>
      <!-- aside + main 内容 -->
      <el-container>
        <!-- aside 左侧侧边栏内容 -->
        <el-aside :style="{ width: isCollapse === true ? '60px' : '200px' }">
          <!-- 左侧折叠栏顶部 -->
          <div class="showNoneDiv" @click="changeIsCollapse">|||</div>
          <!-- 功能导航 -->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            :collapse="isCollapse"
            :unique-opened="true"
            :collapse-transition="false"
            :router="true"
          >
            <!-- 一左侧侧边栏 一级导航 -->
            <el-submenu
              :index="index + ''"
              v-for="(item, index) in menusList"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span style="fontsize: 900px">{{ item.authName }}</span>
              </template>
              <!-- 一左侧侧边栏 二级导航 -->
              <el-menu-item
                :index="item2.id + ''"
                v-for="item2 in item.children"
                :key="item2.id"
                background-color="#fff"
                @click="routerPages(item2.path)"
                >{{ item2.authName }}
              </el-menu-item>
            </el-submenu>
            <!-- 增加自定义一级导航 EXCEL的导入 -->
            <el-submenu index="z1-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span style="fontsize: 900px">数据批量处理</span>
              </template>
              <!-- 增加自定义 二级导航 -->
              <el-menu-item index="z2-1" @click="$router.push('/exceldata')">
                导入
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- main 主体内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false, // 默认打开左侧折叠栏
      menusList: '' // 左侧侧边栏 列表
    }
  },
  created() {
    this.getMenusList()
  },
  methods: {
    // 获取左侧列表框
    async getMenusList() {
      await this.$http.usersAPI.menus().then((res) => {
        this.menusList = res.data.data
      })
    },
    // 页面左侧 侧边栏顶部 折叠缩小侧边栏效果
    changeIsCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 退出账号
    btnOut() {
      // 删除 token 并且跳转到 login 页面
      window.sessionStorage.removeItem('token')
      this.$router.push('login')
    },
    // 切换 users 页面
    routerPages(pathVal) {
      // 传递过来的路由 进行跳转
      this.$router.push(`${pathVal}`)
    }
  }
}
</script>
<style lang='less' scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  padding: 0;
  display: flex;
  span:nth-child(1) {
    background-color: #fff;
    height: 100%;
    width: 200px;
    background: url(./../assets/img/touxiang.jpg) no-repeat;
    background-size: 200px;
  }
  span:nth-child(2) {
    flex: 1;
    line-height: 60px;
    height: 100%;
    font-size: 32px;
    font-weight: bold;
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  display: flex;
  flex-direction: column;
  // 清楚侧边栏边框
  ul:nth-of-type(1) {
    border: none !important;
  }
  .showNoneDiv {
    height: 18px;
    width: 100%;
    background-color: rgb(133, 85, 22);
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    line-height: 15px;
    cursor: pointer;
  }
  .el-menu {
    flex: 1;
    // 设置单击 menu-item 改变当前选中item背景颜色
    .el-menu-item.is-active {
      background-color: #434a50 !important;
      color: #fff;
    }
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.el-submenu {
  text-align: left;
}
</style>
