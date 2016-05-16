var socket;
function setup() {
  // Create an Audio input
  mic = new p5.AudioIn();
  socket = io(window.location.origin);
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  var $output = $('#testing');
  //$output.text("this is working");
  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();

  socket.emit('sound', vol);//?????????

  // setTimeout(function(){
    $output.text(vol);
    // console.log(vol)
  //   socket.emit('sound', vol);
  // }, 5000);


}
