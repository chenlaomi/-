var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
const app = getApp()
var la1 = parseFloat(app.globalData.locationa)
var la2 = parseFloat(app.globalData.locationl)
var da1 = parseFloat(app.globalData.destinationa)
var da2 = parseFloat(app.globalData.destinationl)
Page({
  data: {
    markers: [{
      iconPath: "../../img/mapicon_navi_s.png",
      id: 0,
      latitude: la1,
      longitude: la2,
      width: 23,
      height: 33
    },{
      iconPath: "../../img/mapicon_navi_e.png",
      id: 0,
        latitude: da1,
        longitude: da2,
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: [],
   
    
  },
  
  onLoad: function() {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getRidingRoute({
      origin: app.globalData.location,
      destination: app.globalData.destination,
      success: function(data){
        var points = [];
        if(data.paths && data.paths[0] && data.paths[0].steps){
          var steps = data.paths[0].steps;
          for(var i = 0; i < steps.length; i++){
            var poLen = steps[i].polyline.split(';');
            for(var j = 0;j < poLen.length; j++){
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            } 
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if(data.paths[0] && data.paths[0].distance){
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if(data.taxi_cost){
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }
          
      },
      fail: function(info){

      }
    })
  },
  goDetail: function(){
    wx.navigateTo({
      url: '../navigation_ride_detail/navigation'
    })
  },
 
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation'
    })
  },
  
})