//app.js
var userinfo=require('/data/userinfo.js')
App({
  data:{
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success:function(res){
        if(res.code){
          wx.request({
            url: 'https://orange666.xyz/login',
            data:{code:res.code},
            success: function(res) {
              userinfo.id=res.data
              }
            })
           } else {
          console.log('登录失败' + res.errMsg)
        }
      }
    })

    
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})

