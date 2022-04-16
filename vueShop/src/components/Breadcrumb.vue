<template>
  <div>
    <!-- 面包屑组件 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ paramsPathValOne }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ paramsPathValTwo }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'myBreadcrumb',
  props: ['paramsPathValOne', 'paramsPathValTwo']
}
</script>
<style lang='less' scoped>
.aFontStyle{
    font-weight: normal;
}
</style>
