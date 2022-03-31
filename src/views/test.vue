<template>
  <div>
    <el-button @click="useExportUtil">用封装的导出工具导出excel</el-button>
  </div>
</template>
<script>
import { exportExcel } from '../utils/toExcel'

export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    };
  },
  methods: {
    // 触发导出事件
    useExportUtil(){
      let params = {
        header: ['名称', '时间', '地址'],  // 表格头部的标题
        filterVal: ['name', 'date', 'address',], // 对应头部标题的字段
        title: '2019统计',   // 导出文件的名字
        tableData: this.tableData  // 需要导出的数据
      }
      exportExcel(params)
    }
  }
}
</script>
