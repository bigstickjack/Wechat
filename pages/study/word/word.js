
var list = require('../../../data/word-list.js')
var word_index=require('../../../data/index.js')
const app=getApp()
var userinfo=require('../../../data/userinfo.js')
var Promise = require('../../../utils/Promise.js')
var wxRequest = Promise.wxPromisify(wx.request)

Page({
    data: {
      no:null,
      wordlist:null
    },
    onLoad: function (options) {
        var that = this

      // console.log(userinfo.word_level)
        if (userinfo.word_level=='CET-4'){
          that.setData({wordlist:list.wordList_CET4})
          var idx = Math.floor(Math.random() * 3162) + 1
        }
        else if (userinfo.word_level=='CET-6'){
          that.setData({wordlist:list.wordList_CET6})
          var idx = Math.floor(Math.random() * 1286) + 1
        }


        that.setData({no:idx})
        var word = that.data.wordlist[idx]   
        that.setData({
            content: word.content,
            pron: word.pron,
            definition: word.definition,
        })

      
    },
    show: function () {
        this.setData({
            showNot: true
        })
    },

    next: function () {

      var that=this

      var timestamp =
        Date.parse(new Date());

      timestamp = timestamp / 1000;

      var n = timestamp *1000;

      var date = new Date(n);

      var Y =
        date.getFullYear();

      var M = (date.getMonth()
        + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);

      var D = date.getDate()
        < 10 ? '0' + date.getDate() :
        date.getDate();
      date = Y + '-' + M + '-' + D;
  //console.log('单词:'+that.data.content)
      var log={
         word:that.data.content,
         date:date,
         id:app.globalData.userid,
         no:that.data.no,
         level:userinfo.word_level
      };

       wx.request({
         url: 'https://orange666.xyz/log',
         data: log,
         success: function(res) {
         },
         fail: function(error) {
           console.log(error)
         },
       })
      

        that.setData({
            showNot: false
        })
        if (userinfo.word_level == 'CET-4') {
          var idx = Math.floor(Math.random() * 3162) + 1
        }
        else if (userinfo.word_level == 'CET-6') {
          var idx = Math.floor(Math.random() * 1286) + 1
        }
        that.setData({no:idx})
        var word = that.data.wordlist[idx]  
    
        that.setData({
            content: word.content,
            pron: word.pron,
            definition: word.definition,
        })
        
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
    },
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