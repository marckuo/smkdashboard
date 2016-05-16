var socket;
var vol;
function setup() {
//   console.log(volume);
  createCanvas(710, 200);
//   // Create an Audio input
//   mic = new p5.AudioIn();
  socket = io(window.location.origin);
//   // start the Audio Input.
//   // By default, it does not .connect() (to the computer speakers)
//   mic.start();
  socket.on('sound',
    function(data){
      vol = data;
    }
);
}
//
function draw() {
  background(200);
//   var $output = $('#testing');
//   //$output.text("this is working");
//   // Get the overall volume (between 0 and 1.0)
//   var vol = mic.getLevel();
//   //socket.emit(vol)//?????????

  ellipse(width/2, height/2, 10+vol*200, 10+vol*200);

}
