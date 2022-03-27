import Mock from 'mockjs'

// 随机数
const Random = Mock.Random

// 年月日
function getNowFormatDate() {
    let date = new Date();
    let Separator = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return year + Separator + month + Separator + strDate;
}

// table 分页
const pageList = []

// 生成分页数据
for (let i = 0; i < 1000; i++) {
    const page = {
        'id': i + 1,
        'index': i,
        'type': Random.cname(3),
        'lon': Random.integer(1, 100),
        'lat': Random.integer(1, 100),
        'date': getNowFormatDate(),
        'count': Random.integer(1, 100)
    }
    pageList.push(page)
}

// 分页接口
Mock.mock('/tableList', 'post', (params) => {
    const info = JSON.parse(params.body)
    console.log(info)
    // const info = params.body
    const [index, size, total] = [info.pageIndex - 1, info.pageSize, pageList.length]
    const len = total / size
    const totalPages = len - parseInt(len) > 0 ? parseInt(len) : len
    const curPageList = pageList.slice(index * size, (index + 1) * size)
    return {
        'code': '0',
        'message': 'success',
        'data': {
            'pageIndex': index,
            'pageSize': size,
            'rows': curPageList,
            'total': total,
            'totalPages': totalPages
        }
    }
})
