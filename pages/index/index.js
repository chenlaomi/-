


Page({
    data: {
     
    },
 naviToWeather: function (e) {
    wx.navigateTo({
      url: '../weather/weather'
    })
  },
  naviToPoi: function (e) {
    wx.navigateTo({
      url: '../poi/poi'
    })
  },
 
  naviToNavi: function(){
    wx.navigateTo({
      url: '../lujingsousuo/lujingsousuo'
    })
  },

  naviTokaluli: function () {
    wx.navigateTo({
      url: '../weight/weight'
    })
  },

  naviToRidingSafe: function () {
    wx.navigateTo({
      url: '../ridingsafe/ridingsafe'
    })
  },

  naviToNightSafe: function () {
    wx.navigateTo({
      url: '../nightsafe/nightsafe'
    })
  },
  
  
})