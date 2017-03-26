function $(id){
	return document.getElementById(id);
}
var canvas = $('can');
var context = canvas.getContext('2d');
var mouseDown = false;
var circlesMoving = -1;
var circleCoords = [700,390];
var circleTexts = ["0\t 1\t 2\t 3\t 4\t 5\t 6\t 7\t 8\t 9\t 10\t 11\t 12\t 13\t 14\t 15\t 16\t 17\t 18\t 19\t 20\t 21\t 22\t 23\t", "0\t\t\t\t\t\t1\t\t\t\t\t\t2\t\t\t\t\t\t3\t\t\t\t\t\t4\t\t\t\t\t\t5\t\t\t\t\t\t6\t\t\t\t\t\t7\t\t\t\t\t\t8\t\t\t\t\t\t9\t\t\t\t\t\t10\t\t\t\t\t\t11\t\t\t\t\t\t12+\t\t\t\t\t\t", "Mon\t\t\t\t\t\t\t\tTue\t\t\t\t\t\t\t\tWed\t\t\t\t\t\t\t\tThu\t\t\t\t\t\t\t\tFri\t\t\t\t\t\t\t\tSat\t\t\t\t\t\t\t\tSun\t\t\t\t\t\t\t\t"];
var circleRads = [200,250,300];
var textStartRads = [0,0,0];
var circleColors = ['#61c8d6','#c6da3f','#ed3594'];
var lastAng = 0;
var lineAngle = 0;
function getWeekdayInt(){
   var f = getWheelFloat(2);
   var fScaled = f * 7;
   return getClosestInt(fScaled) % 7;
}
function getHoursSleptInt(){
    var f = getWheelFloat(1);
   var fScaled = f * 13;
   return getClosestInt(fScaled) % 13;
}
function getTimeOfDayInt(){
    var f = getWheelFloat(0);
   var fScaled = f * 24;
   return getClosestInt(fScaled) % 24;
}
function getWeekdayFloat(){
   return getWeekdayInt() / 6;
}
function getHoursSleptFloat(){
   return getHoursSleptInt() / 12;
}
function getTimeOfDayFloat(){
   return getTimeOfDayInt() / 23;
}
function getWheelFloat(n){
   var tR = textStartRads[n];
   while(tR > Math.PI * 2){
      tR -= Math.PI * 2;
   }
   while(tR < 0){
      tR += Math.PI * 2;
   }
   return (Math.PI * 2 - tR) / (Math.PI * 2);
}
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
   //console.log(getHoursSleptFloat());
   mouseDown = true;
   var x = event.pageX;
   var y = event.pageY;
   var d = distToCenter(x,y);
   circleMoving = -1;
   var i;
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
   context.lineTo(300,0);
   context.stroke();
   context.closePath();
}
function clearCanvas(){
   canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
}
function distToCenter(x, y){
   return Math.sqrt((circleCoords[0] - x) * (circleCoords[0] - x) + (circleCoords[1] - y) * (circleCoords[1] - y));
}
function getClosestInt(f){
   return Math.round(f);
}
startCanvas();