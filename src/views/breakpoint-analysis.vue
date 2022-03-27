<template>
  <div class="breakpoint-analysis">
    <div class="bara-wrapper">
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
              <el-button @click="handleClick(scope.row)" type="danger" size="small" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="right-button">
          <p>断点总数 : <span>{{ rightCount }}</span></p>
          <el-button type="primary" size="small" plain>导出表格</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [
        {
          imgSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          imgText: '原始图片',
        },
        {
          imgSrc: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          imgText: '图神经网络',
        },
      ],
      imgIndex: 1,
      lonAndLat: {
        longitude: '120°3',
        latitude: '30°33',
      },
      tableData: [
        {
          index: 1,
          type: '事故',
          degree: '严重'
        },
        {
          index: 2,
          type: '事故2',
          degree: '轻度'
        },
      ],
      rightCount: 2
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
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
