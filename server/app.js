// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
var request= require('request')
var async=require('async');
const app = express(); 
var mysql=require('mysql');
var url=require('url');
var time=require('./util/time.js');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'Orange666',
  database : 'appInfo'
});

connection.connect();

// 实现唯一的一个中间件，对于所有请求，都输出 "Response from express"
app.use('/login',(req, res, next) => {
    request( 'https://api.weixin.qq.com/sns/jscode2session?appid=wx42722f96f225e6f0&secret=93a4e525050e787a320f27f646cc7b10&js_code='+req.url.split('=')[1]+'&grant_type=authorization_code',
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
           // console.log(body) // 请求成功的处理逻辑
            }
            //else console.log(error);      

    var info=JSON.parse(body);
    if(info['openid']!='undefined'){
        res.send(info['openid']);
        connection.query('INSERT userInfo (open_id,session_key) VALUES('+'\''+info['openid']+'\','+'\''+info['session_key']+'\')', 
        function (error, results, fields) {
                if (error) console.log(error); 
            });
        }
    }); 
});

app.use('/log',function(req,res,next){
    var learn_info=req.url.split('=');
    //console.log(req.url);
    var learn=[learn_info[1].split('&')[0],learn_info[2].split('&')[0],learn_info[3].split('&')[0],learn_info[4].split('&')[0],learn_info[5]];
    //console.log(learn);
    var sql='INSERT word_learn (content,date,userId,no,level) VALUES (?,?,?,?,?)';
    connection.query(sql,learn);
    res.send('ok');
});


app.use('/getlog',function(req,res,next){
    var info=req.url.split('=');
    var sql='select * from word_learn where userId=\''+info[1].split('&')[0]+'\''+'and level=\''+info[2]+'\'';
    console.log(sql)
    async.series(
        [
            function(callback){
                connection.query(sql,function(err,result){
                    if(err){
                    console.log(err);
                    return;
                    }
                    callback(null,result);
                });

                
            }
        ],function(err,result){
            res.send(result);
            //console.log(res.url);
     });
});

app.use('/getlevel',function(req,res,nect){
    var info=req.url.split('=');
    var sql='select * from word_level where userId=\''+info[1]+'\'';
    connection.query(sql,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        res.send(result[0])
    })
})

app.use('/word_level_log',function(req,res,next){
    var info=req.url.split('=');
    var log=[info[1].split('&')[0],info[2]];
    var sql='select * from word_level where userId=\''+log[0]+'\'';
    async.series(
        [
            function(callback){
                connection.query(sql,function(err,result){
                    if(err){
                        console.log(err);
                        return;
                    }
                    //console.log(result);
                    callback(null,result);
                })
            }
        ],function(err,result){
            //console.log(result[0])
           if(result[0][0]==undefined){
               
               var sql='INSERT word_level (userId,word_level) VALUES(?,?)';
               connection.query(sql,log);
           }
           else{
               if(log[1]!=result[0][0].word_level){
                    var sql='UPDATE word_level SET word_level = ? where userId = ?';
                    connection.query(sql,[log[1],log[0]]);
               }
           }

        });
    // connection.query('select * from word_level where ueseId=\''+log[0]+'\'');
    
    // var sql='INSERT word_level (userId,word_level) VALUES(?,?)';
    // connection.query(sql,log)
});


app.get('/getbook/CET-4',function(req,res,next){
    res.download('./data/CET-4.js');
    console.log('下载完成')
})

app.use('/getword',function(req,res,next){
    var word=require('./data/'+req.query.book+'.js');
    var sql='select * from word_learn where userId=? and level=?';
    var list=[]
    var len=0;

    if(req.query.book=='CET-4'){
        len=3162;
    }else if(req.query.book=='CET-6'){
        len=1286;
    }
    connection.query(sql,[req.query.id,req.query.book],function(err,result){
        if(err){
            console.log(err);
            return;
        }
        if(result.length==0){
            for(var i=0;i<10;i++){
                var idx = Math.floor(Math.random() * len)
                list[i]=word.word[idx];
                var tmp=[list[i].content,time.getNowDate(),req.query.id,idx,req.query.book,'no'];
                connection.query('insert word_learn (content,date,userId,no,level,is_learn) value (?,?,?,?,?,?)',tmp,function(err,result){
                    if(err){
                        console.log(err);
                        return;
                    }
                });
            }
            res.send(list);
            return;
        }
        else if(result[0].is_learn=='no'){
            for(var i=0;i<10;i++){
                list[i]=word.word[result[i].no];
            }
            res.send(list);
            return;
        }
        else{
            var wordlist=word.word;
            for(var i=0;i<result.length;i++){
                wordlist.splice(result[i].no,1);
            }
            for(var i=0;i<10;i++){
                var idx=Math.floor(Math.random()*wordlist.length);
                list[i]=wordlist[idx];
                var tmp=[list[i].content,time.getNowDate(),req.query.id,idx,req.query.book,'no'];
                connection.query('insert word_learn (content,date,userId,no,level,is_learn) value (?,?,?,?,?,?)',tmp,function(err,result){
                    if(err){
                        console.log(err);
                        return;
                    }
                });
            }
            res.send(list);
            return;
        }
    })
})



// 监听端口，等待连接
const port = 8765;
app.listen(port);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${port}`);
