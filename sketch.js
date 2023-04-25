/*

Welcome to the Olaf’s Winter Wonderland Challenge! It’s a simple platform game in javascript.

Let me describe some parts of my code here. I’ve added three major extensions and one minor. 

We can start with enemies. I have introduced flames as enemies, and each time Olaf gets too near to them, he dies.
A nice addition is a shouting sound. Later in the game enemies are moving in groups, sometimes with different ranges so 
it creates a little bit of extra difficulty.

Next, we can go to the platforms. I have created ice-like platforms that allow Olaf to get higher and gain extra points 
by getting some extra ice cream and coins (each ice cream gives 1 point and each coin gives 5 points). 

Final, a major extension is a sound. I have added background sound, dying in contact with enemy sound, 
dying in the canyon sound, reaching final point sound, jumping sound, gaining coins sound, 
munching ice cream sound and adding life sound. It was a little bit complicated to initialise all of these sounds to play exactly when wanted, 
especially falling to the canyon sound, since I have allowed my game character to go ‘’underground’’ but I have figured it out. 

As for the minor extension, I have decided that live adding will be useful, so, during the game, you can find two hearts 
that are adding 1 live each on the counter.

Enjoy your play!


*/



var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var treePos_y;
var collectables;

var game_score;
var ice_cream_store;
var ice_cream;
var lives;
var heart;
var coins;

var platforms;
var enemies;

var gameSound;
var jumpSound;
var winSound;
var gameOverSound;
var coinsSound;
var munch;
var addLiveSound;
var screamSound;
var plummetingSound;

var img;
var platformImg;
var heartImg;
var coinsImg;



function preload()
{
    
    ice_cream=loadImage('assets/ice_cream.png')
    //load platform image
    platformImg=loadImage('assets/icetiles.png');
    //load enemy img
    img=loadImage('assets/flame.png')  ;
    //load heart image
    heartImg=loadImage('assets/heart.png');
    //load coins image
    coinsImg=loadImage('assets/coins.png');
   

    //sound format
    soundFormats('mp3','wav');
    
    //load game sound 
    gameSound = loadSound('assets/Frozen.mp3');
    gameSound.setVolume(0.015);
    //load jump sounds here
    jumpSound = loadSound('assets/jumpSnow.wav');
    jumpSound.setVolume(0.05);
    //load game over sound
    gameOverSound = loadSound('assets/gameOver.mp3');
    gameOverSound.setVolume(0.1);
    // load win sound
    winSound = loadSound('assets/win.wav');
    winSound.setVolume(0.1);
    //load coins sound
    coinsSound = loadSound('assets/coinsSound.wav');
    coinsSound.setVolume(0.1);
    //load munching sound
    munch = loadSound('assets/munch.wav');
    munch.setVolume(0.03);
    //load add live sound
    addLiveSound = loadSound('assets/addLive.wav');
    addLiveSound.setVolume(0.03);
    // load scream sound
    screamSound = loadSound('assets/scream.wav');
    screamSound.setVolume(0.01);
    //load plummeting sound
    plummetingSound = loadSound('assets/plummeting.mp3');
    plummetingSound.setVolume(0.005);
    
}


function setup()
{
	createCanvas(1024, 576);
  

    startGame();
    gameSound.play()
    

    floorPos_y = (height * 3) / 4;
     gameChar_x = width / 2;
     gameChar_y = floorPos_y-100;
     treePos_y = 282;
   
     // Variable to control the background scrolling.
     scrollPos = 0;
   
     // Variable to store the real position of the gameChar in the game
     // world. Needed for collision detection.
     gameChar_world_x = gameChar_x - scrollPos;
      
   
     // Boolean variables to control the movement of the game character.
     isLeft = false;
     isRight = false;
     isFalling = false;
     isPlummeting = false;
     game_score = 0;
     lives = 3;
   
     // Initialise arrays of scenery objects.

     //TREES
    trees_x = [
       100, 250, 500, 650, 950, 1390, 1560, 1840, 2130, 2450, 2900, 3100, 3380,
       3500, 3710, 3900, 4150, 4400, 4650, 4790, 4900
     ];

     //CLOUDS
    clouds = [
       { x_pos: 120, y_pos: 100 },
       { x_pos: 400, y_pos: 150 },
       { x_pos: 600, y_pos: 100 },
       { x_pos: 900, y_pos: 150 },
       { x_pos: 600, y_pos: 100 },
       { x_pos: 900, y_pos: 150 },
       { x_pos: 1600, y_pos: 100 },
       { x_pos: 1400, y_pos: 150 },
       { x_pos: 1900, y_pos: 150 },
       { x_pos: 2400, y_pos: 150 },
       { x_pos: 2600, y_pos: 100 },
       { x_pos: 2900, y_pos: 150 },
       { x_pos: 3400, y_pos: 150 },
       { x_pos: 3600, y_pos: 100 },
       { x_pos: 3900, y_pos: 150 },
       { x_pos: 4200, y_pos: 100 },
       { x_pos: 4700, y_pos: 150 },

  // MOUNTAINS
     ];
    mountains = [
       { x_pos: 10, y_pos: 432 },
       { x_pos: 400, y_pos: 432 },
       { x_pos: 800, y_pos: 432 },
       { x_pos: 1200, y_pos: 432 },
       { x_pos: 1600, y_pos: 432 },
       { x_pos: 1900, y_pos: 432 },
       { x_pos: 2400, y_pos: 432 },
       { x_pos: 2800, y_pos: 432 },
       { x_pos: 3700, y_pos: 432 },
       { x_pos: 4300, y_pos: 432 },
       { x_pos: 4700, y_pos: 432 },
     ];

     //CANYONS
    canyons = [
       { x_pos: 10, width: 80 },
       { x_pos: 270, width: 80 },
       { x_pos: 730, width: 80 },
       { x_pos: 1010, width: 80 },
       { x_pos: 1270, width: 80 },
       { x_pos: 1730, width: 80 },
       { x_pos: 2010, width: 80 },
       { x_pos: 2270, width: 80 },
       { x_pos: 2730, width: 80 },
       { x_pos: 3010, width: 80 },
       { x_pos: 3570, width: 80 },
       { x_pos: 3730, width: 80 },
       { x_pos: 4030, width: 80 },
       { x_pos: 4230, width: 80 },
       { x_pos: 4530, width: 80 }, 
       { x_pos: 4800, width: 80 },
     ];

     //ICECREAMS
    collectables = [
       { x_pos: 140, y_pos: floorPos_y, isFound: false },
       { x_pos: 180, y_pos: floorPos_y-120, isFound: false },
       { x_pos: 380, y_pos: floorPos_y, isFound: false },
       { x_pos: 600, y_pos: floorPos_y - 160, isFound: false },
       { x_pos: 700, y_pos: floorPos_y - 50, isFound: false },
       { x_pos: 900, y_pos: floorPos_y, isFound: false },
       { x_pos: 1000, y_pos: floorPos_y-200, isFound: false },
       { x_pos: 1250, y_pos: floorPos_y - 50, isFound: false },
       { x_pos: 1480, y_pos: floorPos_y-100, isFound: false },
       { x_pos: 1570, y_pos: floorPos_y-160, isFound: false },
       { x_pos: 1400, y_pos: floorPos_y, isFound: false },
       { x_pos: 1900, y_pos: floorPos_y, isFound: false },
       { x_pos: 2100, y_pos: floorPos_y-270, isFound: false },
       { x_pos: 2310, y_pos: floorPos_y+80, isFound: false },
       { x_pos: 2400, y_pos: floorPos_y+80, isFound: false },
       { x_pos: 2450, y_pos: floorPos_y+80, isFound: false },
       { x_pos: 2500, y_pos: floorPos_y+80, isFound: false },
       { x_pos: 2550, y_pos: floorPos_y+80, isFound: false },
       { x_pos: 2600, y_pos: floorPos_y+80, isFound: false },
       { x_pos: 2650, y_pos: floorPos_y+80, isFound: false },
       { x_pos: 2700, y_pos: floorPos_y - 50, isFound: false },
       { x_pos: 2950, y_pos: floorPos_y - 120, isFound: false },
       { x_pos: 3020, y_pos: floorPos_y - 170, isFound: false },
       { x_pos: 2950, y_pos: floorPos_y - 270, isFound: false },
       { x_pos: 3300, y_pos: floorPos_y, isFound: false },
       { x_pos: 3540, y_pos: floorPos_y - 50, isFound: false },
       { x_pos: 3850, y_pos: floorPos_y, isFound: false },
       { x_pos: 4100, y_pos: floorPos_y - 160, isFound: false },
       { x_pos: 4190, y_pos: floorPos_y - 220, isFound: false },
       { x_pos: 4260, y_pos: floorPos_y - 280, isFound: false },
     ];

     //COINS
    coins=[
      {x_pos:1440, y_pos: floorPos_y-330, isFound: false},
      {x_pos:1470, y_pos: floorPos_y-330, isFound: false},
      {x_pos:1500, y_pos: floorPos_y-330, isFound: false},
      {x_pos:2300, y_pos: floorPos_y-300, isFound: false},
      {x_pos:2300, y_pos: floorPos_y-270, isFound: false},
      {x_pos:3240, y_pos:floorPos_y-320, isFound:false},
      {x_pos:3660, y_pos:floorPos_y-370, isFound:false},
      {x_pos:3660, y_pos:floorPos_y-330, isFound:false},
      {x_pos:3660, y_pos:floorPos_y-290, isFound:false},
      {x_pos:3660, y_pos:floorPos_y-250, isFound:false},
      {x_pos:3660, y_pos:floorPos_y-210, isFound:false},
      {x_pos:3660, y_pos:floorPos_y-170, isFound:false},
      {x_pos:3660, y_pos:floorPos_y-130, isFound:false},
      {x_pos:4800, y_pos:floorPos_y-220, isFound:false},
    ];

    //FINAL POINT
    ice_cream_store = { isReached: false, x_pos: 5000 };

    //HEARTS
    heart=[ 
      {x_pos:1730, y_pos:floorPos_y-200, isFound:false},
      {x_pos:3240, y_pos:floorPos_y-270, isFound:false}
      ];

    //ENEMIES
    enemies = [];
     enemies.push(new Enemy(100, floorPos_y-10, 100));
     enemies.push(new Enemy(350, floorPos_y-10, 100));
     enemies.push(new Enemy(670, floorPos_y-10, 40));
     enemies.push(new Enemy(1120, floorPos_y-10, 100));
     enemies.push(new Enemy(1170, floorPos_y-10, 100));
     enemies.push(new Enemy(1500, floorPos_y-10, 100));
     enemies.push(new Enemy(1550, floorPos_y-10, 100));
     enemies.push(new Enemy(2110, floorPos_y-10, 100));
     enemies.push(new Enemy(2350, floorPos_y-10, 140));
     enemies.push(new Enemy(2400, floorPos_y-10, 130));
     enemies.push(new Enemy(2450, floorPos_y-10, 80));
     enemies.push(new Enemy(2500, floorPos_y-10, 150));
     enemies.push(new Enemy(2900, floorPos_y-10, 100));
     enemies.push(new Enemy(3010, floorPos_y-170, 80));
     enemies.push(new Enemy(3210, floorPos_y-90, 50));
     enemies.push(new Enemy(3210, floorPos_y-170, 100));
     enemies.push(new Enemy(3360, floorPos_y-10, 100));
     enemies.push(new Enemy(3800, floorPos_y-10, 40));
     enemies.push(new Enemy(3960, floorPos_y-10, 40));
     enemies.push(new Enemy(4310, floorPos_y-10, 60));
     enemies.push(new Enemy(4340, floorPos_y-10, 60));
     enemies.push(new Enemy(4390, floorPos_y-10, 40));
     enemies.push(new Enemy(4420, floorPos_y-10, 50));
     enemies.push(new Enemy(4450, floorPos_y-10, 60));
     enemies.push(new Enemy(4620, floorPos_y-10, 60));
     enemies.push(new Enemy(4640, floorPos_y-10, 60));
     enemies.push(new Enemy(4700, floorPos_y-10, 40));
     enemies.push(new Enemy(4720, floorPos_y-10, 50));
     enemies.push(new Enemy(4720, floorPos_y-10, 60));
     enemies.push(new Enemy(4660, floorPos_y-230, 40));

    //PLATFORMS
    platforms = [];
     platforms.push(createPlatforms(150,floorPos_y-80,150));
     platforms.push(createPlatforms(550, floorPos_y-80,100));
     platforms.push(createPlatforms(950, floorPos_y-80, 100));
     platforms.push(createPlatforms(1450, floorPos_y-80, 100));
     platforms.push(createPlatforms(1550, floorPos_y-160, 100));
     platforms.push(createPlatforms(1550, floorPos_y-240, 100));
     platforms.push(createPlatforms(2000, floorPos_y-160, 100));
     platforms.push(createPlatforms(2100, floorPos_y-80, 100));
     platforms.push(createPlatforms(2100, floorPos_y-220, 100));
     platforms.push(createPlatforms(2900, floorPos_y-220, 100));
     platforms.push(createPlatforms(3000, floorPos_y-160, 100));
     platforms.push(createPlatforms(2900, floorPos_y-80, 100));
     platforms.push(createPlatforms(3200, floorPos_y-80, 100));
     platforms.push(createPlatforms(3200, floorPos_y-160, 150));
     platforms.push(createPlatforms(3200, floorPos_y-220, 100));
     platforms.push(createPlatforms(3250, floorPos_y-290, 100));
     platforms.push(createPlatforms(3300, floorPos_y-370, 100));
     platforms.push(createPlatforms(4080, floorPos_y-80, 100));
     platforms.push(createPlatforms(4080, floorPos_y-160, 100));
     platforms.push(createPlatforms(4160, floorPos_y-220, 100));
     platforms.push(createPlatforms(4220, floorPos_y-280, 100));
     platforms.push(createPlatforms(4350, floorPos_y-90, 150));
     platforms.push(createPlatforms(4590, floorPos_y-220, 200));
     
   }
   
function draw() {
  //SKY
     background(100, 155, 255); 
  //SNOWY GROUND 
     noStroke();
     fill(240, 240, 240);
     rect(0, floorPos_y, width, height / 4); 

   
     push();
     translate(scrollPos, 0);

     // Draw clouds.
     drawClouds();
   
     // Draw mountains.
     drawMountains();
   
     // Draw trees.
     drawTrees();

     // Draw canyons.
     for (var i = 0; i < canyons.length; i++) {
       drawCanyon(canyons[i]);
       checkCanyon(canyons[i]);
     }
   
     // initialise drawing ice creams
     for (var i = 0; i < collectables.length; i++) {
       if (collectables[i].isFound == false) {
         drawCollectable(collectables[i]);
         checkCollectable(collectables[i]);
       }
     }

     //draw platforms
      for(var i =0; i<platforms.length; i++){
      platforms[i].draw();
      }

    //initialise final point and checkplayerdie function
     renderIcecreamStore();
     checkPlayerDie();

     //initialise enemies
      for(var i=0; i<enemies.length;i++){
      enemies[i].draw();
      var isContactEn= enemies[i].checkContact(gameChar_world_x, gameChar_y);
     if(isContactEn){
     if(lives>0){
      lives -=1;
      startGame();
      break
      }
      else if(lives==0){
      gameOver();
          }
        }
    }

    //initialise drawing hearts
      for(var i=0; i<heart.length; i++){
      if(heart[i].isFound==false){
      drawHeart(heart[i]);
      checkHeart(heart[i]);
      }
    }

    //initialise drawing coins
      for(var i=0; i<coins.length; i++){
      if(coins[i].isFound==false){
      drawCoins(coins[i]);
      checkCoins(coins[i])
      }
    }
     
     pop();
   
  // INITIALISE THE GAME CHARACTER
   
    drawGameChar();
   
  //game score and lives
     fill(255);
     stroke(0);
     textFont("fantasy");
     textSize(18);
     text("Score:" + game_score, 100, 40);
     text("Lives:" + lives, 100, 60);
   
     if (lives == 0) {
       fill("red");
       textSize(30);
       text("Game Over . Press space to continue", width / 4, height / 2);
       lives = 0;
       drawGameChar();
       return;
       
     }

     //Reaching final point reaction
     if (ice_cream_store.isReached == true) {
       stroke("white");
       strokeWeight(5);
       fill(155, 204, 255);
       textSize(30);
       text("Level Complete.  Press 'space' to continue", width / 4, height / 2);
       text("Conrgatulation!  Your score is  " + game_score, width/4, height/2+50);
       return;
     }
     //Logic to make the game character move or the background scroll.
   
     if (isLeft) {
       if (gameChar_x > width * 0.2) {
         gameChar_x -= 5;
       } else {
         scrollPos += 5;
       }
     }
     if (isRight) {
       if (gameChar_x < width * 0.8) {
         gameChar_x += 5;
       } else {
         scrollPos -= 5; // negative for moving against the background
       }
     }
   
     // Logic to make the game character rise and fall.
     //jumping
     if (gameChar_y < floorPos_y) {
         var isContact= false;
        
         for(var i=0; i<platforms.length; i++){
             if(platforms[i].checkContact(gameChar_world_x, gameChar_y)==true){
                 isContact=true;
                 isFalling=false;
                 break;
             }
         }
         if(isContact==false){
       gameChar_y += 2;
       isFalling = true;}
     } else {
       isFalling = false;
     }
     //checking final point
     if (ice_cream_store.isReached == false) {
       checkIcecream_store();
     }
   
     // Update real position of gameChar for collision detection.
     gameChar_world_x = gameChar_x - scrollPos;
   }
   
   // ---------------------
   // Key control functions
   // ---------------------
   
function keyPressed() {
     console.log(keyCode);
     if (keyCode == 37) {
       
       isLeft = true;
       
     }
     if (keyCode == 39) {
       
       isRight = true;
       
     }
     if (keyCode == 32 ) {

      if(!isFalling)
     {
       gameChar_y -= 100;
       jumpSound.play();
     }}
     
   }

   
function keyReleased() {
     if (keyCode == 37) {
       isLeft = false;
     }
     if (keyCode == 39) {
       isRight = false;
     }
   }
   
   // ------------------------------
   // Game character render function
   // ------------------------------
   
   // Function to draw the game character.
   
function drawGameChar() {
     // draw game character
     if (isLeft && isFalling) {
       // add your jumping-left code
       fill(255);
       stroke(1);
       strokeWeight(1);
       //lower body
       ellipse(gameChar_x, gameChar_y - 20, 20, 20);
       //legs
       ellipse(gameChar_x - 6, gameChar_y - 7, 7, 7);
       ellipse(gameChar_x - 12, gameChar_y - 14, 7, 7);
       //upper body
       ellipse(gameChar_x - 5, gameChar_y - 31, 15, 15);
       //head
       ellipse(gameChar_x - 9, gameChar_y - 46, 12, 17);
       fill(0);
       //button
       ellipse(gameChar_x - 9, gameChar_y - 27, 3, 3);
       //eye
       ellipse(gameChar_x - 11, gameChar_y - 48, 2, 2);
       stroke(116, 58, 8);
       strokeWeight(2);
       fill(116, 58, 8);
       //"hair"
       line(gameChar_x - 9, gameChar_y - 57, gameChar_x - 3, gameChar_y - 57);
       line(gameChar_x - 9, gameChar_y - 56, gameChar_x - 3, gameChar_y - 62);
       line(gameChar_x - 9, gameChar_y - 57, gameChar_x - 9, gameChar_y - 63);
       //arm
       line(gameChar_x - 6, gameChar_y - 30, gameChar_x - 20, gameChar_y - 35);
       //nose
       noStroke();
       fill(255, 0, 0);
       triangle(
         gameChar_x - 13,
         gameChar_y - 47,
         gameChar_x - 23,
         gameChar_y - 40,
         gameChar_x - 13,
         gameChar_y - 43
       );
     } else if (isRight && isFalling) {
       // add your jumping-right code
       fill(255);
       stroke(1);
       strokeWeight(1);
       //lower body
       ellipse(gameChar_x, gameChar_y - 20, 20, 20);
       //legs
       ellipse(gameChar_x + 6, gameChar_y - 7, 7, 7);
       ellipse(gameChar_x + 12, gameChar_y - 14, 7, 7);
       //upper body
       ellipse(gameChar_x + 5, gameChar_y - 31, 15, 15);
       //head
       ellipse(gameChar_x + 9, gameChar_y - 46, 12, 17);
       fill(0);
       //button
       ellipse(gameChar_x + 9, gameChar_y - 27, 3, 3);
       //eye
       ellipse(gameChar_x + 11, gameChar_y - 48, 2, 2);
       stroke(116, 58, 8);
       strokeWeight(2);
       fill(116, 58, 8);
       //"hair"
       line(gameChar_x + 9, gameChar_y - 57, gameChar_x + 3, gameChar_y - 57);
       line(gameChar_x + 9, gameChar_y - 56, gameChar_x + 3, gameChar_y - 62);
       line(gameChar_x + 9, gameChar_y - 57, gameChar_x + 9, gameChar_y - 63);
       //arm
       line(gameChar_x + 6, gameChar_y - 30, gameChar_x + 20, gameChar_y - 35);
       //nose
       noStroke();
       fill(255, 0, 0);
       triangle(
         gameChar_x + 13,
         gameChar_y - 47,
         gameChar_x + 23,
         gameChar_y - 40,
         gameChar_x + 13,
         gameChar_y - 43
       );
     } else if (isLeft) {
       // add your walking left code
       fill(255);
       stroke(1);
       strokeWeight(1);
       //lower body
       ellipse(gameChar_x, gameChar_y - 13, 20, 20);
       //legs
       ellipse(gameChar_x, gameChar_y, 7, 7);
       ellipse(gameChar_x - 12, gameChar_y - 7, 7, 7);
       //upper body
       ellipse(gameChar_x, gameChar_y - 26, 15, 15);
       //head
       ellipse(gameChar_x, gameChar_y - 40, 12, 17);
       fill(0);
       //button
       ellipse(gameChar_x - 4, gameChar_y - 23, 3, 3);
       //eye
       ellipse(gameChar_x - 2, gameChar_y - 42, 2, 2);
       stroke(116, 58, 8);
       strokeWeight(2);
       fill(116, 58, 8);
       //"hair"
       line(gameChar_x, gameChar_y - 51, gameChar_x - 5, gameChar_y - 56);
       line(gameChar_x, gameChar_y - 49, gameChar_x, gameChar_y - 56);
       line(gameChar_x, gameChar_y - 51, gameChar_x + 5, gameChar_y - 56);
       //arm
       line(gameChar_x, gameChar_y - 27, gameChar_x, gameChar_y - 15);
       //nose
       noStroke();
       fill(255, 0, 0);
       triangle(
         gameChar_x - 6,
         gameChar_y - 39,
         gameChar_x - 17,
         gameChar_y - 33,
         gameChar_x - 6,
         gameChar_y - 36
       );
     } else if (isRight) {
       // add your walking right code
       fill(255);
       stroke(1);
       strokeWeight(1);
       //lower body
       ellipse(gameChar_x, gameChar_y - 13, 20, 20);
       //legs
       ellipse(gameChar_x, gameChar_y, 7, 7);
       ellipse(gameChar_x + 12, gameChar_y - 7, 7, 7);
       //upper body
       ellipse(gameChar_x, gameChar_y - 26, 15, 15);
       //head
       ellipse(gameChar_x, gameChar_y - 40, 12, 17);
       fill(0);
       //button
       ellipse(gameChar_x + 4, gameChar_y - 23, 3, 3);
       //eye
       ellipse(gameChar_x + 2, gameChar_y - 42, 2, 2);
       stroke(116, 58, 8);
       strokeWeight(2);
       fill(116, 58, 8);
       //"hair"
       line(gameChar_x, gameChar_y - 51, gameChar_x - 5, gameChar_y - 56);
       line(gameChar_x, gameChar_y - 49, gameChar_x, gameChar_y - 56);
       line(gameChar_x, gameChar_y - 51, gameChar_x + 5, gameChar_y - 56);
       //arm
       line(gameChar_x, gameChar_y - 27, gameChar_x, gameChar_y - 15);
       //nose
       noStroke();
       fill(255, 0, 0);
       triangle(
         gameChar_x + 6,
         gameChar_y - 39,
         gameChar_x + 17,
         gameChar_y - 33,
         gameChar_x + 6,
         gameChar_y - 36
       );
     } else if (isFalling || isPlummeting) {
       // add your jumping facing forwards code
       fill(255);
       stroke(1);
       strokeWeight(1);
       //lower body
       ellipse(gameChar_x, gameChar_y - 23, 20, 20);
       //legs
       ellipse(gameChar_x - 7, gameChar_y - 13, 7, 7);
       ellipse(gameChar_x + 7, gameChar_y - 13, 7, 7);
       //upper body
       ellipse(gameChar_x, gameChar_y - 36, 15, 15);
       //head
       ellipse(gameChar_x, gameChar_y - 50, 12, 17);
       fill(0);
       //button
       ellipse(gameChar_x, gameChar_y - 33, 3, 3);
       //eyes
       ellipse(gameChar_x - 2, gameChar_y - 52, 2, 2);
       ellipse(gameChar_x + 2, gameChar_y - 52, 2, 2);
       stroke(116, 58, 8);
       strokeWeight(2);
       fill(116, 58, 8);
       //"hair"
       line(gameChar_x, gameChar_y - 61, gameChar_x - 5, gameChar_y - 66);
       line(gameChar_x, gameChar_y - 59, gameChar_x, gameChar_y - 66);
       line(gameChar_x, gameChar_y - 61, gameChar_x + 5, gameChar_y - 66);
       //arms
       line(gameChar_x - 7, gameChar_y - 37, gameChar_x - 15, gameChar_y - 57);
       line(gameChar_x + 7, gameChar_y - 37, gameChar_x + 15, gameChar_y - 57);
       //nose
       noStroke();
       fill(255, 0, 0);
       triangle(
         gameChar_x - 2,
         gameChar_y - 49,
         gameChar_x - 10,
         gameChar_y - 43,
         gameChar_x + 2,
         gameChar_y - 49
       );
     } else {
       // add your standing front facing code
       fill(255);
       stroke(1);
       strokeWeight(1);
       //lower body
       ellipse(gameChar_x, gameChar_y - 13, 20, 20);
       //legs
       ellipse(gameChar_x - 5, gameChar_y, 7, 7);
       ellipse(gameChar_x + 5, gameChar_y, 7, 7);
       //upper body
       ellipse(gameChar_x, gameChar_y - 26, 15, 15);
       //head
       ellipse(gameChar_x, gameChar_y - 40, 12, 17);
       fill(0);
       //button
       ellipse(gameChar_x, gameChar_y - 23, 3, 3);
       //eyes
       ellipse(gameChar_x - 2, gameChar_y - 42, 2, 2);
       ellipse(gameChar_x + 2, gameChar_y - 42, 2, 2);
       stroke(116, 58, 8);
       strokeWeight(2);
       fill(116, 58, 8);
       //"hair"
       line(gameChar_x, gameChar_y - 51, gameChar_x - 5, gameChar_y - 56);
       line(gameChar_x, gameChar_y - 49, gameChar_x, gameChar_y - 56);
       line(gameChar_x, gameChar_y - 51, gameChar_x + 5, gameChar_y - 56);
       //arms
       line(gameChar_x - 7, gameChar_y - 27, gameChar_x - 15, gameChar_y - 17);
       line(gameChar_x + 7, gameChar_y - 27, gameChar_x + 15, gameChar_y - 17);
       //nose
       noStroke();
       fill(255, 0, 0);
       triangle(
         gameChar_x - 2,
         gameChar_y - 39,
         gameChar_x - 10,
         gameChar_y - 33,
         gameChar_x + 2,
         gameChar_y - 39
       );
     }
   }
   
   // ---------------------------
   // Background render functions
   // ---------------------------
   
   // Function to draw cloud objects

function drawClouds() {
     for (var i = 0; i < clouds.length; i++) {
       //cloud 1
       fill(224, 224, 224);
       ellipse(clouds[i].x_pos, clouds[i].y_pos, 100 * 0.8, 100 * 0.8);
       ellipse(
         clouds[i].x_pos + 50 * 0.8,
         clouds[i].y_pos + 10 * 0.8,
         80 * 0.8,
         80 * 0.8
       );
       ellipse(
         clouds[i].x_pos - 50 * 0.8,
         clouds[i].y_pos + 10 * 0.8,
         80 * 0.8,
         80 * 0.8
       );
       ellipse(
         clouds[i].x_pos - 90 * 0.8,
         clouds[i].y_pos + 20 * 0.8,
         60 * 0.8,
         60 * 0.8
       );
       ellipse(
         clouds[i].x_pos + 90 * 0.8,
         clouds[i].y_pos + 20 * 0.8,
         60 * 0.8,
         60 * 0.8
       );
       //cloud 2
       fill(154, 153, 161, );
       ellipse(
         clouds[i].x_pos - 100 * 0.8,
         clouds[i].y_pos + 30 * 0.8,
         50 * 0.8,
         50 * 0.8
       );
       ellipse(
         clouds[i].x_pos - 125 * 0.8,
         clouds[i].y_pos + 40 * 0.8,
         30 * 0.8,
         30 * 0.8
       );
       ellipse(
         clouds[i].x_pos - 75 * 0.8,
         clouds[i].y_pos + 40 * 0.8,
         30 * 0.8,
         30 * 0.8
       );
       //cloud 3
       ellipse(
         clouds[i].x_pos + 110 * 0.8,
         clouds[i].y_pos + 30 * 0.8,
         50 * 0.8,
         50 * 0.8
       );
       ellipse(
         clouds[i].x_pos + 85 * 0.8,
         clouds[i].y_pos + 40 * 0.8,
         30 * 0.8,
         30 * 0.8
       );
       ellipse(
         clouds[i].x_pos + 135 * 0.8,
         clouds[i].y_pos + 40 * 0.8,
         30 * 0.8,
         30 * 0.8
       );
     }
   }
   
   // Function to draw mountains objects.

function drawMountains() {
     for (var i = 0; i < mountains.length; i++) {
       //big mountain 1
       fill(99, 106, 136);
       triangle(
         mountains[i].x_pos,
         mountains[i].y_pos,
         mountains[i].x_pos + 170 * 0.95,
         mountains[i].y_pos - 282 * 0.95,
         mountains[i].x_pos + 340 * 0.95,
         mountains[i].y_pos
       );
       //big mountain 2
       fill(110, 118, 150);
       triangle(
         mountains[i].x_pos - 30,
         mountains[i].y_pos,
         mountains[i].x_pos + 60 * 0.95,
         mountains[i].y_pos - 232 * 0.95,
         mountains[i].x_pos + 170 * 0.95,
         mountains[i].y_pos
       );
       //medium mountain 3
       fill(133, 137, 166);
       triangle(
         mountains[i].x_pos + 20,
         mountains[i].y_pos,
         mountains[i].x_pos + 160 * 0.95,
         mountains[i].y_pos - 152 * 0.95,
         mountains[i].x_pos + 280 * 0.95,
         mountains[i].y_pos
       );
     }
   }
   
   // Function to draw trees objects.

function drawTrees() {
     for (var i = 0; i < trees_x.length; i++) {
       //trunk
       fill(43, 24, 14);
       rect(trees_x[i] - 10, treePos_y + 90, 20, 60);
       //branches
       noFill();
       stroke(43, 24, 14);
       strokeWeight(5);
       bezier(
         trees_x[i] + 8,
         treePos_y + 90,
         trees_x[i] + 50,
         treePos_y + 60,
         trees_x[i] + 60,
         treePos_y + 10,
         trees_x[i] + 60,
         treePos_y + 10
       );
       bezier(
         trees_x[i] - 8,
         treePos_y + 90,
         trees_x[i] - 50,
         treePos_y + 60,
         trees_x[i] - 60,
         treePos_y + 10,
         trees_x[i] - 60,
         treePos_y + 10
       );
       bezier(
         trees_x[i] + 3,
         treePos_y + 90,
         trees_x[i] + 30,
         treePos_y + 30,
         trees_x[i] + 30,
         treePos_y + 30,
         trees_x[i] + 30,
         treePos_y - 5
       );
       bezier(
         trees_x[i] - 3,
         treePos_y + 90,
         trees_x[i] - 30,
         treePos_y + 30,
         trees_x[i] - 30,
         treePos_y + 30,
         trees_x[i] - 30,
         treePos_y - 5
       );
       bezier(
         trees_x[i] - 25,
         treePos_y + 75,
         trees_x[i] - 50,
         treePos_y + 90,
         trees_x[i] - 50,
         treePos_y + 80,
         trees_x[i] - 65,
         treePos_y + 70
       );
       bezier(
         trees_x[i] + 25,
         treePos_y + 75,
         trees_x[i] + 50,
         treePos_y + 90,
         trees_x[i] + 50,
         treePos_y + 80,
         trees_x[i] + 65,
         treePos_y + 70
       );
       bezier(
         trees_x[i] - 25,
         treePos_y + 75,
         trees_x[i] - 50,
         treePos_y + 90,
         trees_x[i] - 50,
         treePos_y + 80,
         trees_x[i] - 65,
         treePos_y + 70
       );
       bezier(
         trees_x[i] - 25,
         treePos_y + 40,
         trees_x[i] - 10,
         treePos_y + 35,
         trees_x[i] - 10,
         treePos_y + 45,
         trees_x[i],
         treePos_y + 30
       );
       bezier(
         trees_x[i] + 27,
         treePos_y + 20,
         trees_x[i],
         treePos_y + 10,
         trees_x[i] - 10,
         treePos_y + 10,
         trees_x[i],
         treePos_y
       );
       //snow on trees
       noStroke();
       fill(255, 200);
       //first snow from the left
       ellipse(trees_x[i] - 44, treePos_y + 79, 10, 7);
       ellipse(trees_x[i] - 49, treePos_y + 81, 8, 5);
       ellipse(trees_x[i] - 39, treePos_y + 81, 8, 5);
       //second snow from the left
       ellipse(trees_x[i] - 10, treePos_y + 35, 10, 7);
       ellipse(trees_x[i] - 14, treePos_y + 37, 8, 5);
       ellipse(trees_x[i] - 6, treePos_y + 33, 8, 5);
       //third snow from the left
       ellipse(trees_x[i] + 16, treePos_y + 10, 15, 10);
       ellipse(trees_x[i] + 10, treePos_y + 9, 13, 8);
       ellipse(trees_x[i] + 20, treePos_y + 14, 13, 8);
       //fourth snow from the left
       ellipse(trees_x[i] + 45, treePos_y + 76, 15, 10);
       ellipse(trees_x[i] + 40, treePos_y + 79, 13, 8);
       ellipse(trees_x[i] + 50, treePos_y + 79, 13, 8);
     }
   }
   
   
// Function to draw canyon objects   

function drawCanyon(t_canyon) {
     fill(99);
     rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height);
     fill(70);
     rect(t_canyon.x_pos + 10, floorPos_y, t_canyon.width - 20, height);
     //water
     fill(123, 193, 239);
     rect(t_canyon.x_pos + 10, floorPos_y + 80, t_canyon.width - 20, height / 4);
   }
   
// Function to check character is over a canyon

function checkCanyon(t_canyon) {
     
     if (
       gameChar_world_x > t_canyon.x_pos &&
       gameChar_world_x < t_canyon.x_pos + t_canyon.width && gameChar_y>=floorPos_y
     ) {
   //   
       isPlummeting = true;
       if(isPlummeting==true && gameChar_y>floorPos_y+90){
          plummetingSound.play()}
       var helpvar =  4;
       gameChar_y+= helpvar;
       
     } 
     else {
       isPlummeting = false;
       
     }
   }
   
// Function to draw collectable objects 

function drawCollectable(t_collectable) {
    
     fill(255, 223, 128);
     noStroke();
     triangle(
       t_collectable.x_pos,
       t_collectable.y_pos,
       t_collectable.x_pos - 8,
       t_collectable.y_pos - 30,
       t_collectable.x_pos + 8,
       t_collectable.y_pos - 30
     );
     fill(165, 23, 105);
     strokeWeight(1);
     stroke(1);
     ellipse(t_collectable.x_pos, t_collectable.y_pos - 35, 20);
     fill(247, 196, 225);
     ellipse(t_collectable.x_pos, t_collectable.y_pos - 45, 18);
   }
   
// Function to check character has collected an item 

function checkCollectable(t_collectable) {
     if (
       dist(
         gameChar_world_x,
         gameChar_y,
         t_collectable.x_pos,
         t_collectable.y_pos
       ) < 50
     ) {
       t_collectable.isFound = true;
       game_score += 1;
       munch.play();
     }
   }
// functions to draw and check hearts

function drawHeart(t_heart) {
    image(heartImg, t_heart.x_pos, t_heart.y_pos, 30, 30)

  }
function checkHeart(t_heart){
    if(dist(gameChar_world_x, gameChar_y, t_heart.x_pos, t_heart.y_pos)<50){
      t_heart.isFound=true;
      lives+=1;
      addLiveSound.play();
    }
  }
// functions to draw and check coins

function drawCoins(t_coins){
    image(coinsImg, t_coins.x_pos, t_coins.y_pos, 30, 30);
  }
 function checkCoins(t_coins){
    if(dist(gameChar_world_x, gameChar_y, t_coins.x_pos, t_coins.y_pos)<40){
      t_coins.isFound=true;
      game_score+=5;
      coinsSound.play();
    }
  }

   
//drawing final point

function renderIcecreamStore() {
     if (ice_cream_store.isReached) {
       
       noStroke();
       fill(random(120, 180), random(10, 60), random(80, 130));
       rect(ice_cream_store.x_pos, floorPos_y - 100, 20, 100);
       fill(random(230, 247), random(170, 196), random(200, 225));
       rect(ice_cream_store.x_pos + 20, floorPos_y - 100, 20, 100);
       fill(random(120, 180), random(10, 60), random(80, 130));
       rect(ice_cream_store.x_pos + 40, floorPos_y - 100, 20, 100);
       fill(random(230, 247), random(170, 196), random(200, 225));
       rect(ice_cream_store.x_pos + 60, floorPos_y - 100, 20, 100);
       fill(random(120, 180), random(10, 60), random(80, 130));
       rect(ice_cream_store.x_pos + 80, floorPos_y - 100, 20, 100);
       fill(220);
       rect(ice_cream_store.x_pos + 10, floorPos_y - 80, 80, 50);
   
       fill(random(230, 247), random(170, 196), random(200, 225));
       rect(ice_cream_store.x_pos - 10, floorPos_y - 120, 120, 30);
       fill(random(120, 180), random(10, 60), random(80, 130));
       textSize(18)
       text("ICE CREAM", ice_cream_store.x_pos + 12, floorPos_y - 97);
       
     } else {
       noStroke();
       fill(165, 23, 105);
       rect(ice_cream_store.x_pos, floorPos_y - 100, 20, 100);
       fill(247, 196, 225);
       rect(ice_cream_store.x_pos + 20, floorPos_y - 100, 20, 100);
       fill(165, 23, 105);
       rect(ice_cream_store.x_pos + 40, floorPos_y - 100, 20, 100);
       fill(247, 196, 225);
       rect(ice_cream_store.x_pos + 60, floorPos_y - 100, 20, 100);
       fill(165, 23, 105);
       rect(ice_cream_store.x_pos + 80, floorPos_y - 100, 20, 100);
       fill(220);
       rect(ice_cream_store.x_pos + 10, floorPos_y - 80, 80, 50);
       fill(219, 167, 9);
       noStroke();
       triangle(
         ice_cream_store.x_pos + 30,
         floorPos_y - 30,
         ice_cream_store.x_pos + 25,
         floorPos_y - 45,
         ice_cream_store.x_pos + 35,
         floorPos_y - 45
       );
       fill(165, 23, 105);
       strokeWeight(1);
       ellipse(ice_cream_store.x_pos + 30, floorPos_y - 50, 15);
       fill(247, 196, 225);
       ellipse(ice_cream_store.x_pos + 30, floorPos_y - 60, 12);
       fill(247, 196, 225);
       rect(ice_cream_store.x_pos - 10, floorPos_y - 120, 120, 30);
       fill(165, 23, 105);
       
       text("ICE CREAM", ice_cream_store.x_pos + 12, floorPos_y - 97);
     }
     
   }
//Function to check character has reached final point

function checkIcecream_store() {
     var d = abs(gameChar_world_x - ice_cream_store.x_pos);
     if (d < 15) {
       ice_cream_store.isReached = true;
       playWin()
     }
   }

//Checking if character felt into the canyon

function checkPlayerDie(){
     if(gameChar_y==height)
     {
       console.log('died')
       lives -=1
       if(lives >0){
         startGame()
       }
       else if(lives==0){
         gameOver()
         
       }
     }
   }
//Create platforms and contact function

function createPlatforms(x, y, length){

    var p = {
            x: x,
            y: y,
            length: length,
            draw: function(){
            image(platformImg, this.x, this.y, this.length, 20)
            },
    checkContact: function(gc_x, gc_y){
      if(gc_x> this.x && gc_x < this.x + this.length){
            var d = this.y - gc_y;
            if(d>=0 && d<2){
                  return true;
              }
            }
          return false;
          }
        }
        return p;
   }

// Creating enemies and checking contact   

function Enemy(x, y, range){
     this.x=x;
     this.y=y;
     this.range=range;

     this.currentX=x;
     this.inc=1;

     this.update=function(){
       this.currentX+=this.inc;
       if(this.currentX>=this.x+this.range){
         this.inc-=1;
       }
       else if(this.currentX<this.x){
         this.inc=1;
       }
     }
     this.draw=function(){
       this.update();
       image(img, this.currentX, this.y-25, 40, 40)
     
     }
     this.checkContact=function(gc_x, gc_y){
       var d = dist(gc_x, gc_y, this.currentX, this.y)
      
       if(d<20){
         screamSound.play();
         return true;
       }
       return false;

     }
   }

//Game control functions - start, game over and play ''win'' functions   
function startGame() {
     gameChar_x = width / 2;
     gameChar_y = floorPos_y;
   }
function playWin(){
     if(ice_cream_store.isReached==true){
       gameSound.setVolume(0.0)
       winSound.play()
     }
   }
function gameOver(){
     
     gameChar_x = width/2;
     gameChar_y = floorPos_y-50;
     gameSound.setVolume(0.0);
     gameOverSound.play();
   }

   

   
   


