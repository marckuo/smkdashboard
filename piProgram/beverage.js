var request = require('request');
var usonic = require('r-pi-usonic');

usonic.init(function (error) {
    while (true) {
	var startTime = new Date().getTime();
        if (error) {
       
        } else {
            var sensor = usonic.createSensor(24, 23, 450);
	    var distance = sensor();
	    while (distance < 17) {
     		
		distance = usonic.createSensor(24, 23, 450)();
		
		var endTime = new Date().getTime();		
	        if (endTime - startTime > (5000)) {
		    var cup = true;
		    while (cup == true) {
			distance = usonic.createSensor(24, 23, 450)()	;
		    	if (distance > 17){
				request({
				uri:'http://172.46.0.205:4000/api/temp',
				method: 'POST',
				json: true,
				body: {temp: 1,
						humid: 1}
			}, function(){
				// code 
			});
			  console.log("Coffee!");		
			  break;			
			};	
		    }	
		}
	    }
        }
    }
});

