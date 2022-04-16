<template>
  <div style="height:100%">
    <myBreadcrumb :paramsPathValOne="'商品管理'" :paramsPathValTwo="'商品列表'"></myBreadcrumb>
    <el-card>
      <!-- 卡片搜索框输入框 -->
      <div class="searchBox">
        <el-input
          placeholder="请输入内容"
          v-model="params.query"
          class="input-with-select"
          @change="searchBtn"
          clearable
        >
          <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
        </el-input>
        <!-- 添加商品按钮 -->
        <el-button type="primary" class="searchBtn" @click="ShowAddShop">添加商品</el-button>
      </div>
      <!-- 商品表格 -->
      <vxe-table
        border
        show-header-overflow
        show-overflow
        align="left"
        header-align="center"
        :column-config="{resizable: true}"
        :row-config="{isHover: true}"
        :data="goodsListData"
      >
        <vxe-column type="seq" title="序号" width="60"></vxe-column>
        <vxe-column field="goods_name" title="商品名称"></vxe-column>
        <vxe-column
          field="goods_price"
          title="商品价格(元)"
          width="140px"
          align="right"
          header-align="center"
        ></vxe-column>
        <vxe-column
          field="goods_weight"
          title="商品重量(KG)"
          width="140px"
          align="right"
          header-align="center"
        ></vxe-column>
        <vxe-column field="upd_time" title="上新时间" width="168px" align="center">
          <template #default="{ row }">{{ row.upd_time | myfilter }}</template>
        </vxe-column>
        <vxe-column title="操作" show-overflow width="180px" align="center">
          <template #default="{ row }">
            <vxe-button status="primary" content="编辑" @click="editEvent(row)"></vxe-button>
            <vxe-button status="danger" content="删除" @click="removeEvent(row)"></vxe-button>
          </template>
        </vxe-column>
      </vxe-table>
      <!-- 分页效果 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pagenum"
        :page-sizes="[4, 6, 10, 20]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import goodsAPI from '@/api/goods'
import myBreadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    myBreadcrumb
  },
  data() {
    return {
      params: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }, // 请求参数
      goodsListData: [], // 商品数据
      total: 0, // 请求到的商品总数
      addShopFrom: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: ''
      }
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表
    getGoodsList() {
      goodsAPI.goods(this.params).then((res) => {
        if (res.data.meta.status === 200) {
          this.goodsListData = res.data.data.goods
          this.total = res.data.data.total
        } else {
        }
      })
    },
    // 搜索按钮
    searchBtn() {
      this.getGoodsList()
    },
    // 改变每页请求数
    handleSizeChange(val) {
      this.params.pagesize = val
      this.getGoodsList()
    },
    // 当前第几页
    handleCurrentChange(val) {
      this.params.pagenum = val
      this.getGoodsList()
    },
    // 点击添加商品，跳转到添加商品页面
    ShowAddShop() {
      this.$router.push('/goodsAdd')
    },
    // 删除商品
    removeEvent(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 请求后台删除商品
        goodsAPI.deleteGoods(row.goods_id).then((res) => {
          if (res.data.meta.status === 200) {
            this.getGoodsList()
            this.$message.success('删除商品成功!')
          }
        })
      })
    }
  }
}
</script>
<style lang='less' scoped>
.el-card {
  position: relative;
  .searchBox {
    height: 50px;
    margin-bottom: 10px;
    .input-with-select {
      float: left;
      width: 500px;
    }
    .searchBtn {
      float: left;
      margin-left: 40px;
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
