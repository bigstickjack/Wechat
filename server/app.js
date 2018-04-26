// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
var request= require('request')
// 创建一个 express 实例
const app = express();
var mysql=require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'Orange666',
  database : 'appInfo'
});
connection.connect();

// 实现唯一的一个中间件，对于所有请求，都输出 "Response from express"
app.use((req, response, next) => {
    request( 'https://api.weixin.qq.com/sns/jscode2session?appid=wx42722f96f225e6f0&secret=93a4e525050e787a320f27f646cc7b10&js_code='+req.url.split('=')[1]+'&grant_type=authorization_code',
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 请求成功的处理逻辑
            }else console.log(error);      

    var info=JSON.parse(body);
    if(typeof(info['openid'])!='undefined'){
        connection.query('INSERT userInfo (open_id,session_key) VALUES('+'\''+info['openid']+'\','+'\''+info['session_key']+'\')', 
        function (error, results, fields) {
                if (error) console.log(error); 
            });
        }
    }); 




   // "session_key":"iQ8rXxAqd3jdwrDPH\/C2mA==","openid":"objqZ5Uy27_MgPW9fM2R_NySwl4M"
});

// 监听端口，等待连接
const port = 8765;
app.listen(port);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${port}`);