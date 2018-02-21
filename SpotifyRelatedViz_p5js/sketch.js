//------------GOALS-------------//
//1. artist search (realtime data) 
//2. SVG
//3. relative size (bubbles of smaller artists being visible without bubbles of bigger artists getting too big)
//4. hover over bubbles to fill
//5. open up at mouseClick
//6. click on related artist to make him/her the main artist



var related;
var amount = 10;
var toggleNames = true;
var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQAAD-dFCq5GsEMdbEq5v8b4ETrU1ihO_mVgAoqtWZN_HVKldrpaGGhEI79T8joOiLCYjqwQIqpMYqn9sq3oTt2sTUgq1rqJS79cuHA75zZnGP6yp5vcJhmZJBtVwQkse75E1e0k5qFl52iyaCsr');

//fetch .json data
  function preload() {
//???
}

function setup() {
	// i like my canvas like my browser window 
	// SVG renderer (requires p5.svg.js)
	createCanvas(windowWidth, windowHeight, SVG);
	//some practical settings i like to use as default
	
	noStroke();
  	textSize(20);
  	smooth();

	//colorMode(HSB, 360, 100, 100, 1)
	//ellipseMode(CENTER);
	//rectMode(CENTER);
	//angleMode(DEGREES);

	//more setup code here

	//User Interface
  sliderRange(1, 20);
  gui = createGui("CONTROL");
  gui.addGlobals("amount");
  gui.addGlobals("toggleNames"); 
  gui.addButton("save", function () {
  	spotifyApi.setAccessToken('<here_your_access_token>');
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
    followers = followers/20000;

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

    fill(30, 215, 96,70);
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