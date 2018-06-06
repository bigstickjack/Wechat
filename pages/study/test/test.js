var app=getApp()
var Promise = require('../../../utils/Promise.js')
var wxRequest = Promise.wxPromisify(wx.request)
var userinfo=require('../../../data/userinfo.js')
Page({

  data: {
    word:[],
    order:[],
    tag:0,
    choice:[],
    answer:[],
    answer_tag:0,
    right_answer:[],
    right_answer_tag:0,
    speed:3000,
    select_box_bg:[],
    border_color:''
    

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
        that.data.word=res.data;
        that.data.order = that.randomList(10)
        that.setword()
        
        
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
  },
  
  randomList:function(n){
      var order= []
      var tag= []
      for(var i= 0;i<10;i++){
      order[i] = tag[i] = 0
    }
    for (var i = 0; i < 10; i++) {
      var idx = Math.floor(Math.random() * 10)
      while (tag[idx] != 0) {
        idx = (idx+1) % 10
      }
      tag[idx] = 1
      order[i] = idx
    }
    return order;
 },
  randomchoose:function(n){
    var li=[]
    var list=this.data.order.slice(0)
    var tag = 0
    for(var i=0;i<list.length;i++){
      if(list[i]==n)list.splice(i,1)
    }

    while(tag<3){
      var idx = Math.floor(Math.random()*list.length)
      li[tag]=list[idx]
      list.splice(idx,1)
     // console.log(list)
      tag++
    }
    return li
    
  },

  setword:function(){
     var that=this
     var choice=[]
     if(that.data.tag<10){
       var choice_order = that.randomchoose(that.data.order[that.data.tag])
      // console.log(choice_order)
       var right_tag=Math.floor(Math.random()*4)
       var choice_tag=0
       choice[right_tag]=that.data.word[that.data.order[that.data.tag]].definition
       //console.log(that.data.order[that.data.tag])
      
       var param={}
       var string='right_answer['+that.data.right_answer_tag+']'
       param[string]=choice[right_tag]
       that.setData(param)
       that.data.right_answer_tag++


       for(var i=0;i<4;i++){
         if(i==right_tag)continue
         choice[i]=that.data.word[choice_order[choice_tag++]].definition
       }
       // console.log(choice)

       that.setData({
         content: that.data.word[that.data.order[that.data.tag]].content,
         pron: that.data.word[that.data.order[that.data.tag]].pron,
         definition: that.data.word[that.data.order[that.data.tag]].definition,
         choice:choice
       })
       that.data.tag++
       that.setData({
         'select_box_bg[0]': 0,
         'select_box_bg[1]': 0,
         'select_box_bg[2]': 0,
         'select_box_bg[3]': 0,
       })
       setTimeout(that.setword,that.data.speed)
     } 
     if(that.data.tag==10){
       that.data.tag++
       // console.log(that.data.answer)
       // console.log(that.data.right_answer)
       for(var i=0;i<10;i++){
         if(that.data.answer[i]==that.data.right_answer[i]){
           userinfo.accuracy++
         }
       }
       that.testover()
     }
  },

  testover:function(){
    wx.redirectTo({
      url: '../over/over',
    })
  },

  pitchon:function(e){
    var param={}
    var string = 'select_box_bg[' + e.target.dataset.bg_tag + ']'

    for(var i=0;i<4;i++){
      this.setData({
        'select_box_bg[0]':0,
        'select_box_bg[1]': 0,
        'select_box_bg[2]': 0,
        'select_box_bg[3]': 0,
        
      })
    }
    param[string]='green'
    this.setData(param)
    // if(this.data.select_box_bg[e.target.dataset.bg_tag]){
    //   param[string]=0
    // }else{
    //   param[string] = 'green'
    // }
    // this.setData(param)  
  

    if(this.data.answer_tag<this.data.tag){
      var param = {}
      var string = 'answer[' + this.data.answer_tag + ']'
      param[string] = e.target.dataset.text
      this.setData(param)
      this.data.answer_tag++
    }  
    if(this.data.answer_tag==this.data.tag){
      var param = {}
      var string = 'answer[' + (this.data.answer_tag-1) + ']'
      param[string] = e.target.dataset.text
      this.setData(param)
    }
  }
})


