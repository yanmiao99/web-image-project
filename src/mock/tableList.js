import Mock from 'mockjs'

// 随机数
const Random = Mock.Random

//使用mockjs模拟数据
export default Mock.mock('/tableList', 'get', (req, res) => {
    return Mock.mock({
        "imgList|2": [{
            'name': '@cname',
            'id|+1': 1,
            "url": Random.image('200x100'),
        }],
        "list|1-10": [{
            'id|+1': 1,
            'degree': '@city(true)',
            'type': '@cname',
            'time': '@date("yyyy-MM-dd")',
        }],
        'imgIndex|0-1000': 0,
        'lon|99-112.6': 102.620655,
        'lat|26-33.6': 30.920677,
        'count|0-1000': 0,
    })
})
