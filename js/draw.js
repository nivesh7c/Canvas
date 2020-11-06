var canvas = document.getElementById('art'); 
var draw = canvas.getContext('2d');
var colors = ['red',  'green', 'yellow', 'purple'];

// Handle the mouse position  
function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

// Handle the mouse Movement 
function mouseMove(event) {
  var mousePos = getMousePos(canvas, event);
  draw.lineTo(mousePos.x, mousePos.y);
  draw.stroke();
}

// Handle the mouse down event 
canvas.addEventListener('mousedown', function(event) {
  var mousePos = getMousePos(canvas, event);
  draw.beginPath();
  draw.moveTo(mousePos.x, mousePos.y);
  event.preventDefault();
  canvas.addEventListener('mousemove', mouseMove, false);
});

// Handle the mouse up event 
canvas.addEventListener('mouseup', function() {
  canvas.removeEventListener('mousemove', mouseMove, false);
}, false);

// reset canvas 
document.getElementById('reset').addEventListener('click', function() {
  draw.clearRect(0, 0, canvas.width, canvas.height);
}, false);

// Pick the Colors 
function listener(i) {
  document.getElementById(colors[i]).addEventListener('click', function() {
    draw.strokeStyle = colors[i];
  }, false);
}
// for loop for colors array 
for(var i = 0; i < colors.length; i++)
{
  listener(i);
}

// Calling on download button click
function pdf() 
{
    html2canvas(document.getElementById("art")).then(function(canvas){
        document.getElementById("art").appendChild(canvas);
        var imgdata = canvas.toDataURL("image/png");
        var doc = new jsPDF();
        doc.addImage(imgdata,"PDF", 10, 10);
        doc.save("sample.pdf");
    });
}
