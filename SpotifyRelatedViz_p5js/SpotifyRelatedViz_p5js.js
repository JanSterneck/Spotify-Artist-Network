//------------GOALS-------------//
//1. open up at mouseClick
//2. hover over bubbles to fill
//3. relative size (bubbles of smaller artists being visible without bubbles of bigger artists getting too big)
//4. artist search (realtime data)
//5. click on related artist to make him/her the main artist
//6. SVG

var related;
var amount = 10;
var toggleNames = true;

//fetch .json data
  function preload() {
   related = loadJSON("data.json");
}

//basics
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textSize(20);
  smooth();

//User Interface
  sliderRange(1, 20);
  gui = createGui("CONTROL");
  gui.addGlobals("amount");
  gui.addGlobals("toggleNames"); 
  gui.addButton("save", function () {
    save("spotifyViz.png");
  }
  );
}

function draw() {
  background(24, 24, 24);
  var angle = 360/amount;

  for (var i = 0; i < amount; i++) {
    var name = related.artists[i].name;
    var pop = related.artists[i].popularity;
    var followers = related.artists[i].followers.total;
    followers = followers/5000;

    var x = width/2 + cos(radians(angle*i)) * (pop*5);
    var y = height/2 + sin(radians(angle*i)) * (pop*5);

    //MAIN
    fill(30, 215, 96);
    noFill();
    ellipse(width/2, height/2, 40, 40);
    fill(255);
    fill(5);
    textAlign(CENTER);
    textFont('Montserrat');
    //text("MAIN", width/2, height/2+50);

    fill(30, 215, 96);
    ellipse(x, y, followers, followers);

    //LINES
    var xCenter = width/2 + cos(radians(angle*i)) * (30);
    var yCenter = height/2 + sin(radians(angle*i)) * (30);

    stroke(30, 215, 96, 50);
    line(xCenter, yCenter, x, y);


    
    if (toggleNames==true) {
      fill(255);
      textSize(15);
      textFont('Montserrat');
      textAlign(CENTER);
      text(name, x, y+10+followers/2, 0, 100);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}