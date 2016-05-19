var vol;
dataArr;
function setup() {

  createCanvas(710, 200);


  socket.on('sound',
    function(data){
      vol = data;
      console.log('sound is being received')
    }
  );

  dataArr = new Array(100+1).join('0').split('').map(parseFloat);

  frameRate(15);
}

function draw() {
  //updates the values in the data array
  dataArr.push(vol);
  dataArr.shift();

  for(var i = 0; i < dataArr.length; i++){
    
  }

  background(200);
  console.log(vol)
  ellipse(width/2, height/2, 10+vol*200, 10+vol*200);

}
