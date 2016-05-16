var socket;
var vol;
function setup() {

  createCanvas(710, 200);

  socket = io(window.location.origin);

  socket.on('sound',
    function(data){
      vol = data;
      console.log('sound is being received')
    }
  );
}

function draw() {
  background(200);
  console.log(vol)
  ellipse(width/2, height/2, 10+vol*200, 10+vol*200);

}
