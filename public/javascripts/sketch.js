var socket;
var fft;
var binCount = 512;
var bins = new Array(binCount);

function setup() {
  mic = new p5.AudioIn();

  var smoothing = 0.6;
  fft = new p5.FFT(smoothing, binCount);

  frameRate(10);
  mic.start();
  fft.setInput(mic);
}

function draw() {
  var spectrum = fft.analyze();
  socket.emit('sound', spectrum);
}
