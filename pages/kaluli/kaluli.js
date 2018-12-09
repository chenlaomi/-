
var util = require('../utils/util.js');
const app = getApp()
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');


var key = config.Config.key;
var myAmapFun = new amapFile.AMapWX({ key: key });
myAmapFun.getRegeo({
  success: (res) => {
    console.log(res, res[0].regeocodeData.formatted_address)
    app.globalData.location = res[0].longitude + ',' + res[0].latitude
    app.globalData.locationl = res[0].longitude
    app.globalData.locationa = res[0].latitude
    app.globalData.locationl2 = app.globalData.locationl;
    app.globalData.locationa2 = app.globalData.locationa;
  }
})
  ,
  setInterval(function () {
  
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getRegeo({
      success: (res) => {
        console.log(res, res[0].regeocodeData.formatted_address)
        app.globalData.location = res[0].longitude + ',' + res[0].latitude
        app.globalData.locationl = res[0].longitude
        app.globalData.locationa = res[0].latitude

      }
    }),
    
      wx.request({
        url: 'http://118.89.238.69:3000/user?lat1=' + app.globalData.locationa2 + '&lng1=' + app.globalData.locationl2 + '&lat2=' + app.globalData.locationa + '&lng2=' + app.globalData.locationl,
      
        success: function (res) {
          
          app.globalData.dangqianqixing += parseInt(res.data);
          
          app.globalData.locationl2 = app.globalData.locationl;
          app.globalData.locationa2 = app.globalData.locationa;
          console.log(app.globalData.dangqianqixing)
          app.globalData.velocity = parseInt(res.data)/10;
          app.globalData.kaluli = app.globalData.dangqianqixing*app.globalData.weight/1000*0.6142
          
        }
      })
  }, 10000),
setInterval(function () {

  wx.request({
    url: "http://api.heclouds.com/devices/505574622/datapoints?type=3",

    header: {
      "Content-Type": "application/json",
      "api-key": "LzKqUSkifsEJjL=tx6pPmPw2Cos=",
      //"Host": "api.heclouds.com"
    },
    method: "post",
    data: {
      //msuci id,playing night,playing precent
      
      "licheng": parseInt(app.globalData.dangqianqixing.toFixed(3)),
      "kaluli": parseInt(app.globalData.kaluli.toFixed(3)),
      "sudu": parseInt(app.globalData.velocity.toFixed(3)),

    },
    success: function (res) {
      
    }
    
    })

},10000)
getTime: (function() {
  var time = util.formatTime(new Date())
  //为页面中time赋值
  app.globalData.time=time
  //打印
  console.log(app.globalData.time)
},1000)


Page({

  /**
   * 页面的初始数据
   */
  data: {
      licheng: 0,
    sudu: 0,
    weight:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    //加载时就获取后台的数据
   this.setData({
     licheng: app.globalData.dangqianqixing,
     sudu: app.globalData.velocity,
     weight: app.globalData.kaluli,
   })
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
  

})