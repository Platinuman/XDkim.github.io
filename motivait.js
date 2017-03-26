function $(id){
	return document.getElementById(id);
}
var canvas = $('can');
var context = canvas.getContext('2d');
var mouseDown = false;
var circlesMoving = -1;
var circleCoords = [300,300];
var circleTexts = ["Test1", "Test2", "Test3"];
var circleRads = [200,250,300];
var textStartRads = [0,0,0];
var circleColors = ['#f92672','#a6322e','#66d9ef'];
var lastAng = 0;
var lineAngle = 0;
function drawCircle(x,y,radius,color){
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI);
	changeColor(color);
	context.fill();
	changeColor('#000000');
	context.stroke();
}
CanvasRenderingContext2D.prototype.fillTextCircle = function(text,x,y,radius,startRotation){
   var numRadsPerLetter = 2 * Math.PI / text.length;
   this.save();
   this.translate(x,y);
   this.rotate(startRotation);

   for(var i=0;i<text.length;i++){
      this.save();
      this.rotate(i*numRadsPerLetter);

      this.fillText(text[i],0,-radius);
      this.restore();
   }
   this.restore();
}
function startCanvas(){
   //console.log('here');
   canvas.width = document.body.clientWidth-50;
   canvas.height = document.body.clientHeight-100;
   canvas.addEventListener('mousedown', mouseDowned, false);
   canvas.addEventListener('mousemove', mouseMoved, false);
   canvas.addEventListener('mouseup',mouseLifted,false);
   addCircles();
}
function mouseDowned(event){
   mouseDown = true;
   var x = event.pageX;
   var y = event.pageY;
   var d = distToCenter(x,y);
   console.log(x);
   console.log(y);
   console.log(d);
   circleMoving = -1;
   var i
   for(i = circleRads.length - 1; i > -1; i--){
      if(d >= circleRads[i]){
         break;
      }
      circleMoving = i;
   }
   if(circleMoving > -1){
      lastAng = Math.atan((y - circleCoords[1]) / (x - circleCoords[0]));
   }
}
function mouseMoved(event){
   if(!mouseDown || circleMoving == -1)
      return;
   var x = event.pageX;
   var y = event.pageY;
   ang = Math.atan((y - circleCoords[1]) / (x - circleCoords[0]));
   angDif = ang - lastAng;
   textStartRads[circleMoving] += angDif;
   lastAng = ang;
   addCircles();
}
function mouseLifted(event){
   mouseDown = false;
}
function changeColor(color){
   context.fillStyle = color;
}
function addCircles(){
   clearCanvas();
   var i;
   for(i = circleRads.length - 1; i > -1; i--){
      drawCircle(circleCoords[0], circleCoords[1], circleRads[i], circleColors[i]);
      context.font = "bold 20px Serif";
      context.fillTextCircle(circleTexts[i],circleCoords[0],circleCoords[1],circleRads[i] - 20,textStartRads[i]);
   }
   changeColor('#000000');
   context.beginPath();
   context.moveTo(300,300);
   context.lineTo(300,100);
   context.stroke();
   context.closePath();
}
function clearCanvas(){
   canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
}
function distToCenter(x, y){
   return Math.sqrt((circleCoords[0] + 25 - x) * (circleCoords[0] + 25 - x) + (circleCoords[1] + 75 - y) * (circleCoords[1] + 75 - y));
}
startCanvas();

