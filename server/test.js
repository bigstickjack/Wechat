var request = require('request');
request('https://www.baidu.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // 打印google首页
  }
  else console.log(error)
})