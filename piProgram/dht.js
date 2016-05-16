var request = require('request');

var sensorLib = require('node-dht-sensor');
 
var sensor = {
    sensors: [ {
        name: "DHT-11",
        type: 11,
        pin: 4 
    }],
    read: function() {
        for (var a in this.sensors) {

            var b = sensorLib.readSpec(this.sensors[a].type, this.sensors[a].pin);
            console.log(this.sensors[a].name + ": " + 
              b.temperature.toFixed(1) + "C, " + 
              b.humidity.toFixed(1) + "%" + ' THIS IS b: ' + b);
			if (b.temperature && b.humidity) {request({
				uri:'http://172.46.0.205:4000/api/temp',
				method: 'POST',
				json: true,
				body: {temp: b.temperature.toFixed(1),
						humid: b.humidity.toFixed(1)}
			}, function(){
				// code 
			})}
        }
        setTimeout(function() {
            sensor.read();
	    
        }, 5000)
    }
};
 
sensor.read();
