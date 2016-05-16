var socket;
function setup() {
  // Create an Audio input
  mic = new p5.AudioIn();

  //connects a socket to the page URL
  socket = io(window.location.origin);

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  //vol stores the stream of volume information
  var vol = mic.getLevel();

  //sends volume stream to the server, which is then sent to index.ejs
  socket.emit('sound', vol);
}
