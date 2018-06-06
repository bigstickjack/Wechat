

// pages/study/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var content=options.content
    var string=options.definition
    var pron=options.pron
    var definition = string.replace(/(^\s*)|(\s*$)/g, "").replace(/ /g,'&')
    that.setData({
      content: content,
      definition: definition,
      pron: pron
    })
    wx.request({
      url: 'https://api.shanbay.com/bdc/search/?word=' + that.data.content,
      data: {},
      method: 'GET',
      success: function (res) {
        that.setData({
          audio: res.data.data.audio_addresses.us[0]
        })
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function () {
      }
    })

        
  },

  read: function () {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src=this.data.audio
    innerAudioContext.onPlay(()=>{
      console.log('ok')
    })
    innerAudioContext.onError((res)=>{
      console.log(res)
    })
    innerAudioContext.play()
  }
  
})