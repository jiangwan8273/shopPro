const express = require("express")
const compression = require("compression")

const app = express()

// 嫌弃用Gzip压缩请求
app.use(compression())
app.use(express.static('./dist'))

app.listen(9001, () => {
  console.log('服务器地址   localhost:9001');
})