<template>
  <div>
    <myBreadcrumb :paramsPathValOne="'商品管理'" :paramsPathValTwo="'商品列表'"></myBreadcrumb>
    <el-card>
      <el-alert title="添加商品信息" type="success" center></el-alert>
      <el-steps :active="stepsActive" align-center>
        <el-step title="商品信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 表单内嵌入标签页 -->
      <el-form :model="addShopFrom" :rules="addShopRules" ref="ruleForm" class="demo-ruleForm">
        <!-- 表单验证 -->
        <el-tabs
          tab-position="left"
          style="height: 540px;"
          @tab-click="handleClick"
          :before-leave="beforeLeaveTabs"
        >
          <el-tab-pane label="商品信息">
            <el-form-item prop="goods_name">
              <h3>
                <span style="color:red">*</span>&nbsp;商品名称
              </h3>
              <el-input v-model="addShopFrom.goods_name"></el-input>
            </el-form-item>
            <el-form-item prop="goods_price">
              <h3>
                <span style="color:red">*</span>&nbsp;商品价格(元)
              </h3>
              <el-input type="number" v-model="addShopFrom.goods_price"></el-input>
            </el-form-item>
            <el-form-item prop="goods_price">
              <h3>
                <span style="color:red">*</span>&nbsp;商品重量(KG)
              </h3>
              <el-input type="number" v-model="addShopFrom.goods_weight"></el-input>
            </el-form-item>
            <el-form-item prop="goods_number">
              <h3>
                <span style="color:red">*</span>&nbsp;商品数量
              </h3>
              <el-input type="number" v-model="addShopFrom.goods_number"></el-input>
            </el-form-item>
            <el-form-item>
              <h3>
                <span style="color:red">*</span>&nbsp;商品分类
              </h3>
              <el-cascader
                style="width:100%"
                v-model="value"
                :options="categoriesOptions"
                :props="{ expandTrigger: 'hover',value:'cat_id',label:'cat_name',children:'children' }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">配置管理</el-tab-pane>
          <el-tab-pane label="商品属性">角色管理</el-tab-pane>
          <el-tab-pane label="商品图片">定时任务补偿</el-tab-pane>
          <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import myBreadcrumb from '@/components/Breadcrumb'
import categoriesAPI from '@/api/categories'
export default {
  data() {
    return {
      stepsActive: 0, // 步骤条当前激活项
      categoriesOptions: [],
      value: '',
      addShopFrom: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: ''
      },
      addShopRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          { min: 1, max: 25, message: '数字', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' },
          { min: 1, max: 25, message: '数字', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
          { min: 1, max: 25, message: '数字', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    myBreadcrumb
  },
  created() {
    this.getCategoriesList()
  },
  methods: {
    // 获取商品分类列表
    getCategoriesList() {
      categoriesAPI.categories().then((res) => {
        if (res.data.meta.status === 200) {
          this.categoriesOptions = res.data.data
        }
      })
    },
    // 左侧标签页点击事件
    handleClick(tab) {
      this.stepsActive = Number(tab.index)
    },
    // 次联机选择器，获取到的分类数组
    handleChange(value) {
      this.addShopFrom.goods_cat = value.slice(',').join()
    },
    // 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换
    beforeLeaveTabs(activeName, oldActiveName) {
      // 判断表单校验是否通过
      if (
        oldActiveName === '0' &&
        activeName === '1' &&
        this.addShopFrom.goods_cat === ''
      ) {
        this.$message.error('请先校验表单数据')
        return false
      }
      // 进入参数页面，请求分类后台参数
      if (activeName === '1') {
        categoriesAPI
          .categoriesAttributes(Number(this.addShopFrom.goods_cat[2]), {
            sel: 'many'
          })
          .then(() => {})
      }
    }
  }
}
</script>
<style lang='less' scoped>
.el-alert {
  margin-bottom: 20px;
}
.el-tabs {
  margin-top: 30px;
}
.el-form-item h3 {
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  margin: 4px 0 0 4px;
}
</style>
