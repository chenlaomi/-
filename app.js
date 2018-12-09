App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
   
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  onShow: function () {
  },
  onHide: function () {
  },
  globalData:{
    userInfo:null,
   location:'',
   locationl:'',
   locationa:'',
   locationl2:'' ,
   locationa2:'',
   destination:'',
    destinationl: '',
    destinationa: '',
    time:'',
    weight:0,
  dangqianqixing:0,
    velocity:0,
    kaluli:0,
  }
})