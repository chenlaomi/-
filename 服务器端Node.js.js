var http = require('http');
var url = require('url');
var util = require('util');
var EARTH_RADIUS = 6378137.0;    //单位M
    var PI = Math.PI;
	
var lat1;
     var lng1;
     var lat2;
     var lng2;
	 
	 var EARTH_RADIUS = 6378137.0;    //单位M
    var PI = Math.PI;
    
    function getRad(d){
        return d*PI/180.0;
    }
    
    /**
     * caculate the great circle distance
     * @param {Object} lat1
     * @param {Object} lng1
     * @param {Object} lat2
     * @param {Object} lng2
     */
    function getGreatCircleDistance(lat1,lng1,lat2,lng2){
        var radLat1 = getRad(lat1);
        var radLat2 = getRad(lat2);
        
        var a = radLat1 - radLat2;
        var b = getRad(lng1) - getRad(lng2);
        
        var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s*EARTH_RADIUS;
        s = Math.round(s*10000)/10000.0;
                
        return s;
    }
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	  lat1=url.parse(req.url, true).query.lat1;
      lng1=url.parse(req.url, true).query.lng1;
      lat2=url.parse(req.url, true).query.lat2;
      lng2=url.parse(req.url, true).query.lng2;
	  console.log(lat1);console.log(lat2);console.log(lng1);console.log(lng2);
	  var respon=getGreatCircleDistance(lat1,lng1,lat2,lng2);
	  console.log(respon);
    res.end(String(respon));
	
}).listen(3000);
