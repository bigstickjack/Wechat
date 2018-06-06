var userinfo=require('../../../data/userinfo.js')

// pages/study/over/over.js
Page({

  data: {
    accuracy:''
  },

  onLoad: function (options) {
    this.setData({
      accuracy:userinfo.accuracy
    })
    userinfo.accuracy=0
  },
  
  tohome:function(){
    wx.navigateBack({})
  }
})