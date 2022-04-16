<template>
  <div style="height: 100%">
    <!-- 主体 顶部面包屑 -->
    <my-breadcrumb :paramsPathValOne="'权限管理'" :paramsPathValTwo="'权限列表'"></my-breadcrumb>
    <!-- 主体内容 卡片效果 -->
    <el-card>
      <el-table :data="rightsTableData" border style="width: 100%" height="529" class="tableSty">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column label="权限说明" prop="authName"></el-table-column>
        <el-table-column label="权限路径" prop="path" width="180"></el-table-column>
        <el-table-column label="权限层级" prop="level" width="180">
          <template slot-scope="scope">
            <!-- 一级标签 -->
            <el-tag v-if="(scope.row.level = '0')" type="success" disable-transitions>一级</el-tag>
            <!-- 二级标签 -->
            <el-tag v-else-if="(scope.row.level = '1')" type="success" disable-transitions>二级</el-tag>
            <!-- 三级标签 -->
            <el-tag v-else-if="(scope.row.level = '2')" type="success" disable-transitions>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
      rightsTableData: []
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    getRightsList() {
      this.$http.rightsAPI.rights('list').then((res) => {
        this.rightsTableData = res.data.data
      })
    }
  }
}
</script>
<style lang='less' scoped>
</style>
