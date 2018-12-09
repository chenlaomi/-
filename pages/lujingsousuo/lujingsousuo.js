var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
const app = getApp()
Page({
  data: {
    destination: '',

  },
  getInput: function (e) {
    this.setData({
      destination: e.detail.value
    })

  },

  destination: function () {
    if (this.data.destination == '') {
      wx.showModal({
        title: '提示',
        content: '请输入目的地',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
          } else {//这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })}
    else{
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/geo?key=5bda118186b1acd33993b640f17984a1&address=' + this.data.destination,

      success: function (res) {
        if (res.data.geocodes == '') {
          wx.showModal({
            title: '提示',
            content: '请输入更为详细的目的地或正确的目的地',
            success: function (res) {
              if (res.confirm) {//这里是点击了确定以后
                console.log('用户点击确定')
              } else {//这里是点击了取消以后
                console.log('用户点击取消')
              }
            }
          })}
        else{
        console.log(res.data)

        app.globalData.destination = res.data.geocodes[0].location
        for(var i=0;i<10;i++){
          app.globalData.destinationl+= res.data.geocodes[0].location[i]
        }
        for(var i=11;i<20;i++){
          app.globalData.destinationa+= res.data.geocodes[0].location[i]
        }
        console.log(app.globalData.destinationa)

        console.log(app.globalData.destination)
        wx.navigateTo({
          url: '../navigation_ride/navigation',
        })}
      },
      fail:function(){
        wx.showModal({
          title: '提示',
          content: '请求失败，请检查网络连接',
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定')
            } else {//这里是点击了取消以后
              console.log('用户点击取消')
            }
          }
        })
      }
      
    })}
  }})