
const app=getApp()
var userinfo=require('../../../data/userinfo.js')
var Promise = require('../../../utils/Promise.js')
var wxRequest = Promise.wxPromisify(wx.request)

Page({

    data:{
      wordlist:[{
        content:'',
        definition:'',
        pron:''
      }]
    },
     onLoad:function(){
          var that=this
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
                for (var i = 0; i < res.data.length; i++) {
                  str = 'wordlist[' + i + '].content'
                  param[str] = res.data[i].content
                  str = 'wordlist[' + i + '].definition'
                  param[str] = res.data[i].definition
                  str = 'wordlist[' + i + '].pron'
                  param[str] = res.data[i].pron
                  that.setData(param);      //亟待解决的setData问题，先用变通的方法
                }
                
              }
            })
          }


     }
      
        
        // var that = this;
        // wx.request({
        //     url: 'https://api.shanbay.com/bdc/search/?word=' + word,
        //     data: {},
        //     method: 'GET',
        //     success: function (res) {
        //         console.log(res)
        //         that.setData({
        //             content: res.data.data.content,
        //             audio: res.data.data.audio_addresses.us[0],
        //             pron: res.data.data.pron,
        //             definition: res.data.data.definition
        //         })
        //         // wx.downloadFile({
        //         //     url: res.data.data.audio_addresses.us[0], 
        //         //     success: function (res) {
        //         //         wx.playVoice({
        //         //             filePath: res.tempFilePath
        //         //         })
        //         //     }
        //         // })
        //     },
        //     fail: function () {
        //     },
        //     complete: function () {
        //     }
        // })
   // },
    // read: function () {
    //     console.log(this.data.audio)
    //     wx.playVoice({
    //         filePath: this.data.audio,
    //         success: function (res) {
    //             console.log('ok')
    //         },
    //         fail: function () {
    //             // fail
    //         },
    //         complete: function () {
    //             // complete
    //         }
    //     })
    // }
})