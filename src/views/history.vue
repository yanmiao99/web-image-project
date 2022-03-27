<template>
  <div class="history">
    <div class="history-wrapper">
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">清除记录</el-button>
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
export default {
  name: 'history',
  data() {
    return {
      tableData: [],
      currentPage: 1,// 当前页码
      total: 20,// 总条数
      pageSize: 7 // 每页的数据条数
    }
  },
  created() {
    this.getlivestockInfo(1);  //因为刚加载显示第一页的数据，所以为1.
    for (let i = 0; i < this.pageSize; i++) {
      this.tableData.push({
        index: i,
        date: '2016-05-02',
        longitude: "120°33'",
        latitude: "30°33'",
        type: ' 非机动车占用 ',
        total: 121
      })
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    // 请求分页数据
    getlivestockInfo(num1) {
      let params = new URLSearchParams();
      console.log(params);
      params.append('pageNum', num1);
      // params.append('total',this.tableData.total);
      this.$axios.post('url', params)         //"url"处填写后台的接口
          .then(response => {  // 请求成功
            console.log('请求成功');
            //因为后台帮助分页，所以后台需要将一些数据传到前端，当然就不止有数据了，例如：数据的总数等等
            this.tableData = response.data.data;   //response.data.data代表从后台请求到的所有的数据
            this.currentPage = num1;      //因为每次请求的页数不同，所以采用一个变量代替
            this.pageSize = this.tableData.pageSize;
            this.total = this.tableData.total;
            console.log(this.tableData.list.length);   //我后台的数据中数据是放在数组list中
          }).catch(error => {  // 请求失败
        console.log('请求失败');
        console.log(error);
      })
    },
    // 换页执行的代码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getlivestockInfo(val);
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
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
