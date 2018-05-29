var app=getApp()
var Promise = require('../../../utils/Promise.js')
var wxRequest = Promise.wxPromisify(wx.request)
var userinfo=require('../../../data/userinfo.js')
Page({

  data: {
  },

  onLoad:function(options){
    var len=0
    var that=this
    var word=[]
    wx.request({
      url: 'https://orange666.xyz/getword',
      data:{
        id:app.globalData.userid,
        book:userinfo.word_level,
      },
      success:function(res){
        userinfo.word=res.data;
        var idx = Math.floor(Math.random() * 10)
        that.setData({
          content: userinfo.word[idx].content,
          pron: userinfo.word[idx].pron,
          definition: userinfo.word[idx].definition,
        })
      }
    })
//console.log(wordno)

  },


  show: function () {
    this.setData({
      showNot: true
    })
  },


  next: function(){
      var idx = Math.floor(Math.random() * 10)

      this.setData({
        showNot:false,
        content: userinfo.word[idx].content,
        pron: userinfo.word[idx].pron,
        definition: userinfo.word[idx].definition,
      })
  }
  
 
})