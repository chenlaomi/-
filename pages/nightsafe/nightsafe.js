Page({

  /**
   * 页面的初始数据
   */
  data: {

    night: "ON", //闹钟状态

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载时就获取后台的数据
    this.get_data()
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

  },
  send4: function () {
    this.data.night = ((this.data.night == "ON") ? "OFF" : "ON"),
      this.setData({
        night: this.data.night
      })
    wx.showToast({
      title: this.data.night,
      duration: 1000
    })
    this.sendRequset(this.makeObj(this.data.night, ""));
  },


  send1: function () {

    this.getDataFromOneNet1;
  },

  //Function of the function is to auto move slide  ,every second ++

  sendRequset: function (obj) {
    wx.request(obj);
  },
  makeObj: function (nig, msg) {
    var obj = {
      url: "http://api.heclouds.com/devices/505574622/datapoints?type=3",

      header: {
        "Content-Type": "application/json",
        "api-key": "LzKqUSkifsEJjL=tx6pPmPw2Cos=",
        //"Host": "api.heclouds.com"
      },
      method: "post",
      data: {
        //msuci id,playing night,playing precent

        "night": nig == "ON" ? 3 : 4,

      },
      success: function (res) {
        if (msg != "") {
          wx.showToast({
            title: msg,
            duration: 2000
          })
          //console.log(i);
        }
      }
    }
    return obj;
  },

  get_data: function () {
    // 获取数据
    var that = this;
    wx.request({
      url: 'https://api.heclouds.com/devices/505574622/datapoints?datastream_id=night&limit=1',
      header: {
        'content-type': 'application/json',
        'api-key': 'LzKqUSkifsEJjL=tx6pPmPw2Cos='
      },

      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: "OK",
          duration: 1000
        })




        that.setData({

          night: ((res.data.data.datastreams[0].datapoints[0].value) == 3 ? "ON" : "OFF"),
        })


      }
    })
  },

})