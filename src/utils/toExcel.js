// 导出excel (按照参数格式进行导出数据)
export function exportExcel (params) {
    /* 参数注释 - params
    *  例： let params = {
              header: ['标题1',...],         //表格头部
              filterVal: ['标题1字段',...],   //表格头部字段
              title: '文件名称',              //需要导出的表格标题
              tableData: tableData          //需要导出的数据
            }
    * */
    require.ensure([], () => {
        let { export_json_to_excel } = require('@/vendor/Export2Excel')
        let data = formatJson(params.filterVal, params.tableData) // 数据格式化
        export_json_to_excel(params.header, data, params.title,) // 导出文件
    })
}
// 数据格式化
function formatJson (filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
}
