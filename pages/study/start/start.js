// pages/study/start/start.js
Page({

  data: {
    
  },

  toStudy:function(){
    wx.navigateTo({
      url: '../word/word',
    })
  },
  
  toTest:function(){
    wx.navigateTo({
      url:'../word/word',
    })
  }


})