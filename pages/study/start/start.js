// pages/study/start/start.js
const app=getApp()
var login=require('../../../utils/login.js')
var Promise=require('../../../utils/Promise.js')
var wxRequest = Promise.wxPromisify(wx.request)
var userinfo=require('../../../data/userinfo.js')

Page({

  data: {
  },
  onLoad:function(options){
    wx.login({
      success: function (res) {
        if (res.code) {
          wxRequest({
            url: 'https://orange666.xyz/login',
            data: { code: res.code },
          }).then(function(res){
              app.globalData.userid=res.data
          }).then(function(){
            wx.request({
              url: 'https://orange666.xyz/getlevel',
              data: { userId: app.globalData.userid },
              success: function (res) {
                userinfo.word_level=res.data.word_level;
                 console.log(res.data.word_level)
              }
            })
          })
        } else {
          console.log('登录失败' + res.errMsg)
        }
      }
    })

  },
  toStudy:function(){
    wx.navigateTo({
      url: '../word/word',
    })
    
 //   console.log('success:'+app.globalData.userid)
    
  },
  
  toTest:function(){
    wx.navigateTo({
      url:'../test/test',
    })
  }


})

