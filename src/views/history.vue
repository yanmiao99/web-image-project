<template>
  <div class="history">
    <div class="history-wrapper" v-loading="loading" element-loading-text="数据加载中~">
      <el-table
          :data="tableData"
          border
          style="width:100%">
        <el-table-column
            prop="index"
            label="图片编号"
            width="100"
            align="center"
        >
        </el-table-column>
        <el-table-column
            prop="date"
            label="日期"
            width="150">
        </el-table-column>
        <el-table-column
            prop="longitude"
            label="经度"
            width="120">
        </el-table-column>
        <el-table-column
            prop="latitude"
            label="纬度"
            width="120">
        </el-table-column>
        <el-table-column
            prop="type"
            label="断点类型"
            width="150">
        </el-table-column>
        <el-table-column
            prop="total"
            label="总断点数"
            width="120">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button @click="handleClickClear(scope.row)" type="text" style="color: #E47470" size="small">清除
            </el-button>
            <el-button @click="handleClickDetails(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          class="history-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          background
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import '../mock/tablePaging.js'

export default {
  name: 'history',
  data() {
    return {
      tableData: [],
      currentPage: 1,// 当前页码
      total: 0,// 总条数
      pageSize: 7, // 每页的数据条数
      loading:false
    }
  },
  created() {
    this.getPageInfo(1)
  },

  methods: {
    // 点击删除某一条
    handleClickClear(row) {
      console.log(row);
      const url = 'api/delete'
      let params = {
        deletepicid: row.id,
      }
      this.$axios({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        url: url,
        data: JSON.stringify(params)
      }).then(res => {
        console.log(res);
        if (res.data.code !== '200') {
          this.$message({
            message: '删除失败',
            type: 'error'
          });
        } else {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getPageInfo(this.currentPage);
        }
      })
    },

    // 点击查看详情
    handleClickDetails(row) {
      console.log(row);
      window.localStorage.setItem('menuActive', '/breakpoint-analysis')
      this.$router.push({
        path: '/breakpoint-analysis',
        query: {
          id:row.id
        }
      })
    },

    // 请求分页数据
    getPageInfo(pageIndex) {
      this.loading = true
      const url = `api/list?page=${pageIndex}&pageSize=${this.pageSize}`
      this.$axios({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'get',
        url: url,
      }).then((res) => {
        if (res.data.code !== '200') {
          this.$message({
            message: '接口错误',
            type: 'error'
          });
        } else {
          let data = res.data
          // console.log(data);
          this.tableData = []
          data.data.forEach(item => {
            this.tableData.push({
              index: item.picid,
              date: item.picdate,
              longitude: item.longtitude,
              latitude: item.latitude,
              type: item.pointtype,
              total: item.pointnum,
              id: item.picid
            })
          })
          this.currentPage = +data.currentPage// 让当前页面等于所选页面
          this.pageSize = +data.pageSize // 让当前的页数等于数据库数量
          this.total = +data.total; // 让当前的总数等于数据库数量

          this.loading = false
        }
      }).catch(e => {
        console.log(e);
      })
    },

    // 换页执行的代码
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getPageInfo(val);
    },

    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
  },
}
</script>

<style scoped lang="scss">
.history {
  display: flex;
  justify-content: center;
  align-items: center;

  .history-wrapper {
    margin-top: 20px;
    width: 70%;

    .history-pagination {
      margin: 20px auto;
      text-align: center;
    }
  }
}
</style>
