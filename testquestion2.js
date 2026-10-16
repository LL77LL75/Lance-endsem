let handPose;
let hands = [];
let video;
//sprites
let platformSprite;
let ballSprite;

function preload(){

    let options = {
        flipped: false,
        runtime: "tfjs",
        modelType: "lite",
        detectorModelUrl: undefined,
        landmarkModeUrl: undefined,
    }

    handPose = ml5.handPose(options);
}
function setup () {

    new Canvas(640, 480);

    let constraints = {
        video:{
            mandatory:{
                midWidth: width,
                minHeight: height
            },
            optional: [{minFrameRate: 60}]
        },
        audio: false,
        flipped: true,
        };  

    video = createCapture(constraints);
    video.size(width, height);
    video.hide();
    handPose.detectStart(video, gotHands);

    platformSprite = new Sprite();
    platformSprite.width = 300;
    platformSprite.height = 20;
    platformSprite.collider = "static";

    ballSprite = new Sprite();
    ballSprite.bounciness = 1;
    ballSprite.collider = "static";
    ballSprite.diameter = 40;
    ballSprite.x = 320;
    ballSprite.y = 100;
}

function gotHands(results){
    hands = results;
}

function drawhands(hands){
    //loop through hands
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i].keypoints;
        //loop through keypoints
        for (let a = 0; a < 21; a++){
            let keypoint = hand[a];
            circle(width - keypoint.x,keypoint.y,30);
            if (a==4){
                platformSprite.x = width - keypoint.x;
                platformSprite.y = keypoint.y;
            }
        }
    }
}

function draw () {
    background("black");
    image(video,0,0);
    drawhands(hands);
}

function mousePressed(){
    ballSprite.collider = "dynamic";
    world.gravity.y = 1;
}