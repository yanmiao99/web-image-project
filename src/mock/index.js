import Mock from 'mockjs'


const Random = Mock.Random
const pageList = []

function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return year + seperator1 + month + seperator1 + strDate;
}


for (let i = 0; i < 1000; i++) {
    const page = {
        'id': i + 1,
        'index': i,
        'type': Random.cname(3),
        'lon': Random.integer(1, 100),
        'lat': Random.integer(1, 100),
        'date':getNowFormatDate(),
        'count': Random.integer(1,100)
    }

    pageList.push(page)
}

// 分页接口
Mock.mock('/list', 'post', (params) => {
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