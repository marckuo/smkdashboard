var socket;
var lastTimeSent;
var now;
var vol;
function setup() {
  // Create an Audio input
  mic = new p5.AudioIn();

  //connects a socket to the page URL
  //socket = io(window.location.origin);
  console.log(socket);
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  frameRate(15);

}

function draw() {
  now = new Date();
  vol = mic.getLevel();

  // if(lastTimeSent === undefined || now - lastTimeSent > 500){
  //   sendSound();
  //   console.log('sent');
  //   lastTimeSent = now;
  //   socket.emit('sound', vol);
  // }
  //vol stores the stream of volume information
  console.log('vol: ' + vol);

  //sends volume stream to the server, which is then sent to index.ejs
  // setTimeout(function(){
    socket.emit('sound', vol);
  //   console.log('message sent')
  // }, 10000)
}
//
// var sendSound = function(){
//   if(lastTimeSent === undefined || now - lastTimeSent > 500){
//     socket.emit('sound', vol);
//     console.log(vol);
//     lastTimeSent = now;
//   }
// }
