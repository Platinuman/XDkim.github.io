function $(id){
        return document.getElementById(id);
}
var canvas = $('can');
var context = canvas.getContext('2d');
var mouseDown = false;
var circlesMoving = -1;
var circleCoords = [688,480];
var circleTexts = ["","0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 ", "0\t\t\t\t\t\t1\t\t\t\t\t\t2\t\t\t\t\t\t3\t\t\t\t\t\t4\t\t\t\t\t\t5\t\t\t\t\t\t6\t\t\t\t\t\t7\t\t\t\t\t\t8\t\t\t\t\t\t9\t\t\t\t\t\t10\t\t\t\t\t\t11\t\t\t\t\t\t12+\t\t\t\t\t\t", "MON\t\t\t\t\t\t\t\tTUE\t\t\t\t\t\t\t\tWED\t\t\t\t\t\t\t\tTHU\t\t\t\t\t\t\t\tFRI\t\t\t\t\t\t\t\tSAT\t\t\t\t\t\t\t\tSUN\t\t\t\t\t\t\t\t"];
var circleRads = [125,179,242,300];
var textStartRads = [0,0,0,0];
var circleColors = ['#ffffff','#61c8d6','#c6da3f','#ed3594'];
var lastAng = 0;
var lineAngle = 0;
function getWeekdayInt(){
   var f = getWheelFloat(3);
   var fScaled = f * 7;
   return getClosestInt(fScaled) % 7;
}
function getHoursSleptInt(){
    var f = getWheelFloat(2);
   var fScaled = f * 13;
   return getClosestInt(fScaled) % 13;
}
function getTimeOfDayInt(){
    var f = getWheelFloat(1);
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
        context.strokeStyle = '#ffffff';
        context.lineWidth = 5;
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
   context.font = "30px comfortaaregular";
   addCircles();
}
function mouseDowned(event){
   //console.log(getHoursSleptFloat());
   mouseDown = true;
   var x = event.pageX;
   var y = event.pageY;
   //console.log(x);
   //console.log(y);
   var d = distToCenter(x,y);
   circleMoving = -1;
   var i;
   for(i = circleRads.length - 1; i > 0; i--){
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
   while(angDif > 2.5){
      angDif -= Math.PI;
   }
   while(angDif < -2.5){
      angDif += Math.PI;
   }
   textStartRads[circleMoving] += angDif;
   lastAng = ang;
   addCircles();
   if(circleMoving == 3){
      $("dayField").innerHTML = convertWeekday(getWeekdayInt());
   }
   else if(circleMoving == 2){
      var hrs = getHoursSleptInt();
      if(hrs < 12){
         $("sleepField").innerHTML = hrs;
      }
      else{
         $("sleepField").innerHTML = "12+";
      }
   }
   else if (circleMoving == 1){
      var tm = getTimeOfDayInt();
      if(tm  == 0){
         $("timeField").innerHTML = "12:00 AM";
      }
      else if(tm < 12){
         $("timeField").innerHTML = tm + ":00 AM";
      }
      else if(tm == 12){
         $("timeField").innerHTML = "12:00 PM";
      }
      else{
         $("timeField").innerHTML = (tm % 12) + ":00 PM";
      }
   }
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
      drawCircle(300, 350, circleRads[i], circleColors[i]);
      context.font = "30px comfortaaregular";
      context.fillStyle = "#ffffff";
      context.fillTextCircle(circleTexts[i],300,350,circleRads[i] - 38,textStartRads[i]);
   }
changeColor(circleColors[3]);

context.beginPath();

    context.moveTo(300, 45);
    context.lineTo(300-20, 10);
    context.lineTo(300+20, 10);
    context.fill();
    context.font="70px comfortaaregular";
    context.fillText(predict(getWeekdayFloat, getTimeOfDayFloat, getHoursSleptFloat), 688-60, 480+20);

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
function convertWeekday(i){
   switch(i){
      case 0:
         return "Mon";
         break;
      case 1:
         return "Tue";
         break;
      case 2:
         return "Wed";
         break;
      case 3:
         return "Thu";
         break;
      case 4:
         return "Fri";
         break;
      case 5:
         return "Sat";
         break;
      case 6:
         return "Sun";
         break;
   }
}

//Start Canvas
startCanvas();

