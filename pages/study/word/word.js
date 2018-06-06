
const app=getApp()
var userinfo=require('../../../data/userinfo.js')
var Promise = require('../../../utils/Promise.js')
var wxRequest = Promise.wxPromisify(wx.request)

Page({

    data:{
      wordlist:[{
        content:'',
        definition:'',
        pron:'',
      }],
      text_left:'left',
      text_right:'right'
    },
     onLoad:function(){
          var that=this;
          if(wx.getStorageSync('word')==''){
            wx.request({
              url: 'https://orange666.xyz/getword',
              data:{
                id:app.globalData.userid,
                book:userinfo.word_level
              },
              success:function(res){
                var param = {}
                var str = ''
          //      console.log(res.data)
                for (var i = 0; i < res.data.length; i++) {
                  str = 'wordlist[' + i + '].content'
                  param[str] = res.data[i].content
                  str = 'wordlist[' + i + '].definition'
                  param[str] = res.data[i].definition
                  str = 'wordlist[' + i + '].pron'
                  param[str] = res.data[i].pron
                  that.setData(param);      //亟待解决的setData问题，先用变通的方式
               }
              }
            })
          }

          
     },

    showdetail:function(e){
      var string=this.data.wordlist[e.target.dataset.tag].definition
      var cstr = string.replace(/&/g,' ')
      wx.navigateTo({
        url: '../detail/detail?content='+this.data.wordlist[e.target.dataset.tag].content+'&definition='+cstr+'&pron='+this.data.wordlist[e.target.dataset.tag].pron
      })
    },


})