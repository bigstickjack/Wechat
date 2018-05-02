var app = getApp()
// var qcloud = require('../../wafer2/index');
var config = require('../../config');
var animationShowHeight = 300; 





Page({
  data: {
    userInfo: {},
    flag:false,
    animationData:'',

  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载   
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '', // 分享标题
      desc: '', // 分享描述
      path: '' // 分享路径
    }
  },
  showMyWord: function () {
    wx.showModal({
      title: '提示',
      content: '此功能暂未开放，敬请期待！',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  showClause: function () {
    wx.navigateTo({
      url: './clause/clause',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  showModal:function(){
    var animation=wx.createAnimation({
      duration:200,
      timingFunction:'linear',
      delay:0
    })
    this.animation=animation
    animation.translateY(animationShowHeight).step()
    this.setData({
      animationData:animation.export(),
      flag:true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200) 

    
  },

  hideModal:function(){
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation;
    animation.translateY(animationShowHeight).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        flag: false
      })
    }.bind(this), 200)
  },

  onShow:function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        animationShowHeight = res.windowHeight
      }
    })
  },

  



  showWordRecord:function(){
    wx.navigateTo({
      url: './word-record/word-record',
    })
  }

})