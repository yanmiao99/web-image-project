<template>
  <div class="breakpoint-analysis">
    <div class="bara-wrapper" v-loading="loading" element-loading-text="请在历史记录中的详情跳转进入~">
      <div class="wrapper-left">
        <div class="wrapper-img"
             v-for="item in imgList"
             :key="item.imgText">
          <el-image :src="item.imgSrc" class="bard-img"></el-image>
          <span class="bard-img-text">{{ item.imgText }}</span>
        </div>
      </div>
      <div class="wrapper-right">
        <div class="right-title">
          图片编号 : <span> {{ imgIndex }}</span>
        </div>
        <div class="lon-and-lat">
          <p>经度 : <span>{{ lonAndLat.longitude }}</span></p>
          <p>纬度 : <span>{{ lonAndLat.latitude }}</span></p>
        </div>
        <el-table
            :data="tableData"
            height="230"
            style="width: 100%">
          <el-table-column
              prop="index"
              label="编号"
              width="100"
              align="center">
          </el-table-column>

          <el-table-column
              prop="type"
              label="断点类型"
              width="200"
              align="center">
          </el-table-column>
          <el-table-column
              prop="degree"
              label="严重程度"
              width="200"
              align="center">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <el-button @click="handlerDeleteItem(scope.row)" type="danger" size="small" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="right-button">
          <p>断点总数 : <span>{{ rightCount }}</span></p>
          <el-button type="primary" size="small" plain @click="handlerExportTable">导出表格</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../mock/tableList.js"
import {exportExcel} from "../utils/toExcel";

export default {
  data() {
    return {
      imgList: [],
      imgIndex: 1,
      lonAndLat: {
        longitude: '120°3',
        latitude: '30°33',
      },
      tableData: [],
      rightCount: 2,
      loading: false,
      id: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    if (this.id) {
      this.getData(this.id)
    } else {
      this.loading = true
    }
  },
  methods: {
    // 导出表格
    handlerExportTable() {
      // 触发导出事件
      let params = {
        header: ['编号', '断点类型', '严重程度'],  // 表格头部的标题
        filterVal: ['index', 'type', 'degree',], // 对应头部标题的字段
        title: 'content_' + this.imgIndex,   // 导出文件的名字
        tableData: this.tableData  // 需要导出的数据
      }
      exportExcel(params)
    },

    // 删除表格某一条
    handlerDeleteItem(row) {
      console.log(row);
      const url = 'api/deletedetail'
      let params = {
        deleteDetailId: row.id,
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
          this.getData(this.id)
        }
      })
    },

    // 请求数据
    getData(id) {
      const url = `api/list/${id}`
      this.$axios({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'get',
        url: url,
      }).then(res => {

        if (res.data.code !== '200') {
          this.$message({
            message: '接口错误',
            type: 'error'
          });
        } else {
          let data = res.data
          console.log(data);
          this.rightCount = data.total // 断点总数
          this.imgIndex = data.currentPic // 图片编号

          this.imgList = []
          data.data.listpic.forEach(item => {  // 图片列表
            this.imgList.push({
              imgSrc: item.piccontent,
              imgText: item.picname,
            },)
          })

          this.lonAndLat = {  // 经纬度
            longitude: data.data.longtitude,
            latitude: data.data.latitude,
          }

          // 表格
          this.tableData = []
          data.data.pointcontent.forEach(item => {
            this.tableData.push({
              index: item.pointid,
              type: item.pointtype,
              degree: item.serious
            },)
          })

          this.loading = false

        }
      })
    }
  },

}
</script>

<style scoped lang="scss">
.breakpoint-analysis {
  .bara-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    color: #666;

    .wrapper-left {
      .wrapper-img {
        width: 300px;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: #666;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 20px;

        .bard-img {
          width: 100%;
        }

        .bard-img-text {
          margin-top: 10px;
        }
      }
    }

    .wrapper-right {
      height: auto;
      width: 50%;
      background: #FAFAFA;
      padding: 20px;
      position: relative;

      .right-title {

      }

      .lon-and-lat {
        margin: 20px 0;
        border: 1px dashed #666;
        border-left: none;
        border-right: none;
        padding: 15px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      .right-button {
        border-top: 1px dashed #666;
        margin-top: 20px;
        padding: 15px 20px 20px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 20px;
        right: 20px;
      }

    }
  }

}
</style>
