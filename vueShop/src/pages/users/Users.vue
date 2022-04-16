<template>
  <div>
    <!-- 主体 顶部面包屑 -->
    <myBreadcrumb
      :paramsPathValOne="'用户管理'"
      :paramsPathValTwo="'用户列表'"
    ></myBreadcrumb>
    <!-- 主体内容 卡片效果 -->
    <el-card body-style="width:100%;padding-right:40px">
      <!-- 搜索框 + 添加用户页面 -->
      <div class="searchBox">
        <el-input
          placeholder="请输入内容"
          v-model="params.query"
          class="input-with-select"
          @change="searchClick"
          clearable
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button
          type="primary"
          class="addUserBtn"
          @click="addUserDialogFormVisible = true"
          >添加用户</el-button
        >
        <div class="batchBtnS">
          <el-button
            type="success"
            class="batchBtnPub"
            @click="importChangePages"
            >批量导入</el-button
          >
          <el-button
            type="success"
            class="batchBtnPub"
            @click="importChangePages"
            >导出</el-button
          >
        </div>
      </div>
      <!-- 用户列表 -->
      <el-table :data="userTableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column
          label="角色"
          prop="role_name"
          width="180"
        ></el-table-column>
        <el-table-column
          label="手机号"
          prop="mobile"
          width="180"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          prop="email"
          width="180"
        ></el-table-column>
        <!-- 用户状态 -->
        <el-table-column label="状态" prop="mg_state" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="switchChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="create_time" width="190">
          <template slot-scope="scope">
            <!-- 调用过滤器，将获取到的JSON时间格式改为时间格式 -->
            {{ scope.row.create_time | myfilter }}
          </template>
        </el-table-column>
        <!-- 用户操作 -->
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="left"
            >
              <el-button
                type="primary"
                icon="el-icon-zoom-in"
                circle
                @click="assignRolesDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-edit"
                circle
                @click="openUpdataUserDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteUsers(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页效果 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 对话框---------------------------- -->
    <!-- 分配角色 对话框 -->
    <el-dialog title="分配角色" :visible.sync="assignRolesDialogFormVisible">
      <!-- 嵌入修改用户表单 -->
      <el-form label-width="100px" :model="assignRolesData" status-icon>
        <el-form-item label="用户名称：">
          <el-input disabled v-model="assignRolesData.username"></el-input>
        </el-form-item>
        <el-form-item label="用户角色：">
          <el-select
            ref="selectRef"
            :disabled="selectShowClose"
            v-model="selectValue"
            style="width: 100%"
            @change="changeOption"
          >
            <el-option
              v-for="item in rolesStlectData"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 判断 -->
      <div slot="footer" class="dialog-footer" v-if="selectSubmitShowClose">
        <el-button type="primary" @click="updataUsersRoles">确 定</el-button>
        <el-button type="info" @click="assignRolesDialogFormVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
    <!-- 添加用户 对话框 -->
    <el-dialog title="添加用户" :visible.sync="addUserDialogFormVisible">
      <!-- 嵌入添加用户表单 -->
      <el-form
        :model="addUserForm"
        ref="addUserFormRef"
        :rules="addUserFormRules"
        label-width="80px"
        status-icon
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input type="number" v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 判断 -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUserSubmit">确 定</el-button>
        <el-button type="info" @click="addUserDialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="warning" @click="$refs.addUserFormRef.resetFields()"
          >重置</el-button
        >
      </div>
    </el-dialog>
    <!-- 修改用户 对话框 -->
    <el-dialog title="修改用户参数" :visible.sync="updataUserDialogFormVisible">
      <!-- 嵌入修改用户表单 -->
      <el-form
        :model="updataUserFromData"
        ref="updataUserFormRef"
        :rules="updataUserFormRules"
        label-width="80px"
        status-icon
      >
        <el-form-item label="用户名称">
          <el-input v-model="updataUserFromData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="updataUserFromData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            type="number"
            v-model="updataUserFromData.mobile"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 判断 -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updataUsers">确 定</el-button>
        <el-button type="info" @click="updataUserDialogFormVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myBreadcrumb from '../../components/Breadcrumb.vue'
export default {
  components: {
    myBreadcrumb
  },
  data() {
    // 添加自定义 邮箱 校验规则
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else {
        if (value.match(/^\w+@\w+\.\w+$/i)) {
          callback()
        } else {
          return callback(new Error('邮箱输入有误'))
        }
      }
    }
    return {
      userTableData: [], // 获取用户列表
      params: {
        query: '',
        pagenum: 1,
        pagesize: 8
      }, // 用户参数 参数列表
      total: 0, // 分页 总页数
      rolesStlectData: [],
      addUserDialogFormVisible: false, // 添加用户对话框 默认关闭
      updataUserDialogFormVisible: false, // 修改用户对话框 默认关闭
      updataUserId: '', // 获取到的修改用户 id
      updataUserFromData: {}, // 根据ID获取导的用户数据
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }, // 添加用户参数
      addUserFormRules: {
        username: [
          {
            required: true,
            message: '用户名不能为空，且为唯一值',
            trigger: 'blur'
          },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        // 自定义邮箱校验规则 checkEmail
        email: [{ validator: checkEmail, trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号长度为 11 位', trigger: 'blur' }
        ]
      }, // 添加用户校验规则
      updataUserForm: {
        username: '',
        email: '',
        mobile: ''
      }, // 修改用户参数
      updataUserFormRules: {
        // 自定义邮箱校验规则 checkEmail
        email: [{ validator: checkEmail, trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号长度为 11 位', trigger: 'blur' }
        ]
      }, // 修改用户校验规则
      assignRolesDialogFormVisible: false, // 分配角色对话框
      assignRolesData: '', // 分配角色对话框数据
      selectValue: '', // select 默认值
      selectShowClose: false, // select选择器是否禁用，默认不禁用
      selectSubmitShowClose: true, // select选择器是否可以提交，默认可以提交
      userIDVal: '', // 当前选中用户ID，修改用户角色需要
      rolesIDVal: '' // 当前选中用户角色ID，修改用户角色需要
    }
  },
  created() {
    this.getUsersList()
    this.getrolesList()
  },
  methods: {
    // 获取用户列表
    getUsersList() {
      this.$http.usersAPI.users(this.params).then((res) => {
        // 获取 user 数据列表，赋值给 userTableData
        this.userTableData = res.data.data.users
        // 获取 总数据数量，赋值给total
        this.total = res.data.data.total
      })
    },
    // 获取角色列表
    getrolesList() {
      this.$http.rolesAPI.roles().then((res) => {
        this.rolesStlectData = res.data.data
        // 角色列表全局存储
        this.$store.commit('rolesData', res.data.data)
      })
    },
    // 搜索框查询
    searchClick() {
      this.getUsersList()
    },
    // 分页效果 修改 每页多少条 刷新数据
    handleSizeChange(val) {
      this.params.pagesize = val
      this.getUsersList()
    },
    // 分页效果 修改 当前页 刷新数据
    handleCurrentChange(val) {
      this.params.pagenum = val
      this.getUsersList()
    },
    // 改变用户状态
    async switchChange(val) {
      // 发送后台请求 改变 该用户 状态
      await this.$http.usersAPI.userState(val.id, val.mg_state).then((res) => {
        if (res.data.meta.status === 200) {
          return this.$message.success('修改用户状态成功')
        }
        this.$message.error('修改用户状态失败')
      })
    },
    // 提交添加用户对话框
    addUserSubmit() {
      this.$refs.addUserFormRef.validate(async (val) => {
        if (!val) return
        // 验证通过 请求后台添加用户数据
        await this.$http.usersAPI.userAdd(this.addUserForm).then((res) => {
          if (res.data.meta.status === 201) {
            // 关闭对话框，提醒用户添加成功,重置添加用户表单
            this.addUserDialogFormVisible = false
            this.$message.success('成功添加用户')
            this.$refs.addUserFormRef.resetFields()
            // 刷新数据
            this.getUsersList()
          } else if (res.data.meta.status === 400) {
            // 用户名重复 提醒用户
            this.$message('用户名为唯一值，请确认用户名的唯一性')
          } else {
            // 添加失败提醒用户
            this.$message.error('添加用户失败')
          }
        })
      })
    },
    // 删除用户
    deleteUsers(valId) {
      // 判断删除账号是否是超级管理员
      if (valId === 500) {
        return this.$message.error('超级管理员不可编辑')
      } else {
        this.$confirm('请仔细确认是否删除此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            // 调用接口 删除用户
            await this.$http.usersAPI.userDelete(valId).then(() => {
              // 提醒用户删除用户成功，刷新数据
              this.$message.success('已删除改用户')
              this.getUsersList()
            })
          })
          .catch(() => {
            this.$message.info('删除用户失败')
          })
      }
    },
    // 打开修改用户对话框
    async openUpdataUserDialog(valId) {
      // 打开 修改用户参数 对话框，获取到的 修改用户 ID 赋值给updataUserId
      this.updataUserDialogFormVisible = true
      this.updataUserId = valId
      // 调用 idQueryUser 自定义法封装方法获取参数
      const res = await this.MyIdQueryUser(valId)
      // 判断获取的数据正确与否，正确进行赋值 不正确return
      if (res === null) return
      this.updataUserFromData = res
    },
    // 根据用户ID，获取用户参数
    async MyIdQueryUser(valId) {
      // 获取数据正确返回数据，不正确返回null
      return await this.$http.usersAPI
        .userQuery(valId)
        .then((res) => {
          if (res.data.meta.status) {
            // return 出去获取到的正确数据
            return res.data.data
          } else {
            return null
          }
        })
        .catch(() => {
          return null
        })
    },
    // 修改用户
    updataUsers() {
      this.$refs.updataUserFormRef.validate(async (val) => {
        if (!val) return null
        // 请求接口 修改用户数据
        await this.$http.usersAPI
          .userUpdata(this.updataUserId, this.updataUserFromData)
          .then((res) => {
            if (res.data.meta.status === 200) {
              // 关闭 修改用户参数 对话框，清空暂存数据
              this.updataUserDialogFormVisible = false
              this.updataUserId = ''
              this.updataUserFromData = {}
              // 刷新数据
              this.$message.success('成功修改用户数据')
              this.getUsersList()
            } else {
              this.$message.error('更新用户数据失败')
            }
          })
          .catch(() => {
            this.$message.error('更新用户数据失败')
          })
      })
    },
    // 切换导入
    importChangePages() {
      this.$router.push('/exceldata')
    },
    // 角色分配权限
    async assignRolesDialog(id) {
      // 根据ID查询用户
      const resUser = await this.MyIdQueryUser(id)
      // 当前选中用户ID，当前选中用户角色ID
      this.userIDVal = resUser.id
      this.rolesIDVal = resUser.rid
      // 后台获取到的用户信息赋值给assignRolesData
      this.assignRolesData = resUser
      // 判断如果是超级管理员 就禁用选择框
      if (resUser.rid === 0) {
        // 超级管理员不在角色列表，当要获取超级管理员的时候，给selset中的option一个默认值
        this.selectValue = '超级管理员'
        // 禁用选择器，删除提交确认按钮
        this.selectShowClose = true
        this.selectSubmitShowClose = false
      } else {
        this.selectShowClose = false
        this.selectSubmitShowClose = true
      }
      // 请求后台获取当前点击用户 默认角色
      const resUserID = await this.$http.usersAPI.userQuery(resUser.id)
      const resRolesID = await this.$http.rolesAPI.checkRoles(
        resUserID.data.data.rid
      )
      // 超级管理员无法获取，不可进行修改
      if (resRolesID.data.meta.status !== 200) {
      } else {
        // 默认角色赋值给 selectValue
        this.selectValue = resRolesID.data.data.roleName
      }
      // 打开对话框
      this.assignRolesDialogFormVisible = true
    },
    // 更新当前选中用户角色ID
    changeOption(valId) {
      this.rolesIDVal = valId
    },
    // 分配角色确定事件
    updataUsersRoles() {
      this.$http.usersAPI
        .userPutRolesID(this.userIDVal, { rid: this.rolesIDVal })
        .then((res) => {
          if (res.data.meta.status === 200) {
            // 关闭对话框
            this.assignRolesDialogFormVisible = false
            return this.$message.success('用户角色修改成功')
          } else {
            return this.$message.error('修改用户角色失败')
          }
        })
    }
  }
}
</script>
<style lang='less' scoped>
.el-card {
  display: flex;
  position: relative;
  .searchBox {
    height: 40px;
    width: 100%;
    margin: 10px 0 20px 0;
    .el-input {
      float: left;
      width: 400px;
    }
    .addUserBtn {
      float: left;
      margin-left: 40px;
    }
    .batchBtnS {
      float: right;
      text-align: right;
      .batchBtnPub {
        margin-left: 10px;
      }
    }
  }
  .el-pagination {
    position: absolute;
    bottom: 20px;
    text-align: left;
    margin-top: 20px;
  }
}
</style>
