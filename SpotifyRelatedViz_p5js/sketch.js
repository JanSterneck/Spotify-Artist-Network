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
    save("spotifyViz.png");
  }
  );
		
    var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQAmWyOJh2NlhVNmqcyc4XXyKiRkGOzult1ZAi3rWAiiw_BORh6i5P0D7RU3GcWjuPOKJ_pHvgBnVDYUODSw2sJY4Ua3uGsU6LGK55gIbH7fJWO2V2uJjNdAL335Jp5c1zfBE0QtenMrxlOT4S5XNyGOmVaC7a1NpQ');

var relatedArtists = new Array();
var button = document.querySelector('button');
var searchBox = document.querySelector('input');

var search = function(query) {
  spotifyApi.searchArtists(query)
    .then(function(data) {
        var id = (data.artists.items[0].id);
        return id;
    })
    .then(function(id) {
      var related = spotifyApi.getArtistRelatedArtists(id);
      return related;
    })
    .then(function(related) {
      //return draw(related);
      return console.log(related);
    })
    .catch(function() {
      console.log('error');
    });
}

button.addEventListener('click', function() {
  var query = searchBox.value;

  search(query);
});

}


function draw(related) {
  background(24, 24, 24);
  var angle = 360/amount;

  for (var i = 0; i < amount; i++) {
    var name = related[i].name;
    var pop = related[i].popularity;
    var followers = related[i].followers.total;
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