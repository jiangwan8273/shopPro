<template>
  <div>
    <!-- 主体 顶部面包屑 -->
    <my-breadcrumb :paramsPathValOnew="'权限管理'" :paramsPathValTwo="'角色列表'"></my-breadcrumb>
    <!-- 主体内容 卡片效果 -->
    <el-card>
      <div>
        <el-button type="primary" class="addRolesBut" @click="rolesAddDialogVisible = true">添加角色</el-button>
      </div>
      <vxe-table
        ref="xTable"
        border
        :row-config="{ isHover: true }"
        auto-resize
        :data="rolesTableData"
        max-height="600"
        @toggle-row-expand="toggleExpandChangeEvent"
      >
        <vxe-column field="null" type="expand" width="60">
          <template #content="{ row }">
            <div style="margin: 0 40px">
              <el-row :gutter="24" v-for="item1 in row.children" :key="item1.id" class="tagCenter">
                <!-- 一级权限标签 -->
                <el-col :span="3">
                  <el-tag>{{ item1.authName }}</el-tag>
                  <span>&nbsp;></span>
                </el-col>
                <!-- 二级 + 三级 权限标签 -->
                <el-col :span="21">
                  <el-row :gutter="24" v-for="item2 in item1.children" :key="item2.id">
                    <!-- 二级权限标签 -->
                    <el-col :span="6">
                      <div>
                        <el-tag type="success">{{ item2.authName }}</el-tag>
                        <span>&nbsp;></span>
                      </div>
                    </el-col>
                    <el-col :span="18">
                      <el-tag
                        type="warning"
                        style="float: left"
                        closable
                        :disable-transitions="false"
                        v-for="item3 in item2.children"
                        :key="item3.id"
                        @close="handleClose(item3)"
                      >{{ item3.authName }}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </template>
        </vxe-column>
        <vxe-column type="seq" title="序号" width="60"></vxe-column>
        <vxe-column field="roleName" title="角色信息"></vxe-column>
        <vxe-column field="roleDesc" title="权限说明"></vxe-column>
        <vxe-column title="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="rightsAuthorize(scope.row)">角色授权</el-button>
            <el-button type="warning" size="mini" @click="rolesUpdataDialogShow(scope.row.id)">修改角色</el-button>
            <el-button type="danger" size="mini" @click="rolesDelete(scope.row.id)">删除角色</el-button>
          </template>
        </vxe-column>
      </vxe-table>
    </el-card>
    <!-- 添加角色 对话框 -->
    <el-dialog title="添加角色" :visible.sync="rolesAddDialogVisible">
      <el-form
        :model="rolesAddData"
        :rules="rolesAddRules"
        ref="rolesAddRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="rolesAddData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="rolesAddData.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolesAddDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rolesAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 角色授权 对话框 -->
    <el-dialog
      :visible.sync="rolesRoleIdRightsDialogVisible"
      width="50%"
      @close="closeRolesRoleIdRightsDialog"
    >
      <el-tree
        ref="tree"
        :data="getRightsTreeData"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :props="defaultProps"
        :default-checked-keys="treeShowArr"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolesRoleIdRightsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rolesRoleIdRightsDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改角色 对话框 -->
    <el-dialog title="修改角色" :visible.sync="rolesUpdataDialogVisible">
      <el-form
        :model="rolesUpdataData"
        ref="rolesUpdataRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="rolesUpdataData.roleName" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="rolesUpdataData.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolesUpdataDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rolesUpdata">确 定</el-button>
      </span>
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
    return {
      rolesTableData: [], // 获取角色列表
      rolesAddDialogVisible: false, // 默认关闭 添加角色 对话框
      rolesRoleIdRightsDialogVisible: false, // 默认关闭 角色授权 对话框
      rolesUpdataDialogVisible: false, // 默认关闭 修改角色 对话框
      rolesAddData: {
        roleName: '', // 角色名称
        roleDesc: '' // 角色描述
      },
      rolesAddRules: {
        roleName: [
          { required: true, message: '角色描述不可为空', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ]
      },
      rolesUpdataData: {
        roleName: '', // 角色名称
        roleDesc: '' // 角色描述
      },
      rolesIdTemporary: '', // 角色id 暂存
      getRightsTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }, // 配置角色授权 tree 配置
      treeShowArr: [], // tree展开 数组
      toggleChangeValue: '', // 展开行，暂存ID数据
      arrDelete: {}
    }
  },
  created() {
    this.getrolesList()
    this.getRightsTreeList()
  },
  methods: {
    // 获取角色列表
    getrolesList() {
      this.$http.rolesAPI.roles().then((res) => {
        this.rolesTableData = res.data.data
      })
    },
    // 提交 添加角色 表单
    rolesAdd() {
      this.$refs.rolesAddRef.validate((val) => {
        if (val) {
          // 请求后台添加角色接口
          this.$http.rolesAPI.addRoles(this.rolesAddData).then((res) => {
            // 添加角色成功提示，关闭对话框
            if (res.data.meta.status === 201) {
              this.$message.success('添加角色成功')
              this.rolesAddDialogVisible = false
              // 刷新数据,清空缓存
              this.getrolesList()
              this.rolesAddData = {}
            } else {
              this.$message.error('添加角色失败')
            }
          })
        }
      })
    },
    // id 查询角色
    async idCheckRoles(id) {
      const { data: res } = await this.$http.rolesAPI.checkRoles(id)
      if (res.meta.status === 200) return res.data
    },
    // 打开修改用户对话框
    async rolesUpdataDialogShow(id) {
      // 调用 id 查角色方法
      const res = await this.idCheckRoles(id)
      // 获取到的值赋值给 修改角色对话框数据，最后打开对话框
      this.rolesUpdataData = res
      this.rolesIdTemporary = id
      this.rolesUpdataDialogVisible = true
    },
    // 提交 修改角色 表单
    rolesUpdata() {
      // 请求后台 修改角色 接口
      this.$http.rolesAPI
        .editRoles(this.rolesIdTemporary, this.rolesUpdataData)
        .then((res) => {
          if (res.data.meta.status === 200) {
            // 提醒用户修改成功，关闭对话框
            this.$message.success('角色修改成功')
            this.rolesUpdataDialogVisible = false
            // 清楚暂存ID
            this.rolesIdTemporary = ''
          }
        })
    },
    // 删除角色
    rolesDelete(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 请求后台接口删除角色
          this.$http.rolesAPI.deleteRoles(id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新数据
            this.getrolesList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取 树type 权限列表
    getRightsTreeList() {
      this.$http.rightsAPI.rights('tree').then((res) => {
        this.getRightsTreeData = res.data.data
      })
    },
    // 点击角色授权对话框
    rightsAuthorize(value) {
      // 获取 tree 默认打开数组
      value.children.forEach((item) => {
        item.children.forEach((twoSon) => {
          twoSon.children.forEach((threeSon) => {
            this.treeShowArr.push(threeSon.id)
          })
        })
      })
      // 设置 选中数组
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.treeShowArr)
      })
      this.rolesRoleIdRightsDialogVisible = true
    },
    closeRolesRoleIdRightsDialog() {
      // 清空角色授权对话框默认选中数组
      this.treeShowArr = []
      this.$refs.tree.setCheckedKeys([])
    },
    // 行展开事件
    async toggleExpandChangeEvent(val) {
      this.toggleChangeValue = val.row.id
      this.arrDelete = val.row
    },
    // 删除角色单个权限
    handleClose(tagDeleteID) {
      // 请求后台
      this.$http.rolesAPI
        .deleteRolesRights(this.toggleChangeValue, tagDeleteID.id)
        .then((res) => {
          if (res.data.meta.status === 200) {
            // 三级循环查找对应的要删除的元素
            this.arrDelete.children.forEach((item) => {
              item.children.forEach((twoSon) => {
                twoSon.children.forEach((threeSon) => {
                  // 如果获取到的ID和要删除的ID对得上，删除这个数组元素，做到不用刷新同步数据
                  if (threeSon.id === tagDeleteID.id) {
                    twoSon.children.splice(twoSon.children.indexOf(tagDeleteID), 1)
                  }
                })
              })
            })
            this.$message.success('成功删除用户角色')
          } else {
            this.$message.error('删除角色权限失败')
          }
        })
    }
  }
}
</script>
<style lang='less' scoped>
.addRolesBut {
  display: flex;
  align-content: flex-start;
  margin-bottom: 20px;
}
.tagCenter {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
}
.tagCenter:nth-last-child(1) {
  border-bottom: none;
}
.el-tag {
  margin: 4px 6px;
}
</style>
