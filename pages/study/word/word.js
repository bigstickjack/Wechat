var list = require('../../../data/word-list.js')
var word_index=require('../../../data/index.js')
var userinfo=require('../../../data/userinfo.js')

Page({
    data: {
      content:'',
    },
    onLoad: function (options) {


        var idx = Math.floor(Math.random() * 2000) + 1
        var word = list.wordList[idx]    
        this.content=word.content
        this.setData({
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

     
      var log={
         word:this.content,
         date:date,
         id:userinfo.id
      };

       wx.request({
         url: 'https://orange666.xyz/log',
         data: log,
         success: function(res) {
           console.log('SUCCESS')
         },
         fail: function(error) {
           console.log(error)
         },
       })


        this.setData({
            showNot: false
        })
        var idx = Math.floor(Math.random() * 2000) + 1
        var word = list.wordList[idx]  
        this.content=word.content  
    
        this.setData({
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