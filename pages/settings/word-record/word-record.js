var app=getApp()
var userinfo=require('../../../data/userinfo.js')
// pages/settings/word-record/word-record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordlog:[{
      content:'',
      date:''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that=this;
    wx.request({
      url: 'https://orange666.xyz/getlog',
      data:{
        id:app.globalData.userid,
        level:userinfo.word_level},
      success:function(res){
        //console.log(wordlog[0].length);
        var param={}
        var str=''
        for(var i=0;i<res.data[0].length;i++){
          str='wordlog['+i+'].content'
          param[str]=res.data[0][i].content
          str='wordlog['+i+'].level'
          param[str]=res.data[0][i].level
          str='wordlog['+i+'].date'
          param[str]=res.data[0][i].date
          that.setData(param);      //亟待解决的setData问题，先用变通的方法
        }
      }
    })
    console.log(this.wordlog)


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})