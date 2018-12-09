const app = getApp()
Page({
  data: {
    weight:0
  },
  getInput: function (e) {
    this.setData({
      weight: e.detail.value
    })

  },

  destination: function () {
    if (this.data.weight == '') {
      wx.showModal({
        title: '提示',
        content: '你的秘密只用于计算卡路里哦~',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
          } else {//这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    }
    else if (this.data.weight <=30) {
      wx.showModal({
        title: '提示',
        content: '未满13岁小盆友不要骑车哦~(ps：这么轻除了胡乱输入就是小盆友)',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('用户点击确定')
          } else {//这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    }
    else{
      app.globalData.weight =parseInt(this.data.weight),
      wx.navigateTo({
        url: '../kaluli/kaluli',
      })
    }
  }

})