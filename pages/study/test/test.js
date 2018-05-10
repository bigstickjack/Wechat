var app=getApp()
var list=require('../../../data/word-list.js')
var word_learned=require('../../../data/word_learned.js')
var Promise = require('../../../utils/Promise.js')
var wxRequest = Promise.wxPromisify(wx.request)
var userinfo=require('../../../data/userinfo.js')
// pages/study/learn/learn.js
Page({

  data: {
  },

  onLoad:function(options){
    var len=0
    var that=this
    wxRequest({
      url: 'https://orange666.xyz/getlog',
      data: { 
        code: app.globalData.userid,
        level:userinfo.word_level
      }
    }).then(function(res){
      len=res.data[0].length
      for (var i = 0; i < len; i++) {
        word_learned.wordlist[i] = res.data[0][i].no
      }
      var idx = Math.floor(Math.random() * len) + 1

      var wordno = word_learned.wordlist[idx]
      if (userinfo.word_level == 'CET-4') {
        var word = list.wordList_CET4[wordno]
       }
      else{
        var word=list.wordList_CET6[wordno];
      }
console.log(wordno)
      that.setData({
        content: word.content,
        pron: word.pron,
        definition: word.definition,
      })
    }) 
  },


  show: function () {
    this.setData({
      showNot: true
    })
  },


  next: function(){
      var len = word_learned.wordlist.length
      var idx = Math.floor(Math.random() * len) 
      var wordno = word_learned.wordlist[idx]
      if (userinfo.word_level == 'CET-4') {
        var word = list.wordList_CET4[wordno]
      }
      else {
        var word = list.wordList_CET6[wordno];
      }
      this.setData({
        showNot:false,
        content: word.content,
        pron: word.pron,
        definition: word.definition,
      })
  }
  
 
})