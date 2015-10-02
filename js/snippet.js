
/*

example asset ready

// assets - ball
var ballReady = false;
var ballImage = new Image();
ballImage.onload = function () {
  ballReady = true;
};
ballImage.src = "asset/ball.png";
*/
*

function function_name () {
/// only image will have alpha affected:
context.globalAlpha = 0.5;
context.drawImage(image, x, y);
context.globalAlpha = 1.0;
}
