var c = document.getElementById("bottom");
c.height = window.innerHeight;
c.width = window.innerWidth;

var drop_size = 12;
var columns = c.width/drop_size;

var chinese = "ムタ二コク1234567890シモラキリエスハヌトユABCDEF";
chinese = chinese.split("");

var drops = [];
for(var i = 0; i < columns; i++)
  drops[i] = 1; //y coordinate - same for everyone at the starting. The index contains the x coordinate

ctx = c.getContext('2d');

function draw()
{
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.font= drop_size + "px arial";
  for(var i = 0; i < drops.length; i++)
  {
    // we vary the color here
    if ((i % 19 == 0) || (i % 13 == 0)) {
      ctx.fillStyle = "#fc0";
    } else {
      ctx.fillStyle = "#900";
    }
    text = chinese[Math.floor(Math.random()*chinese.length)];
    ctx.fillText(text, i*drop_size, drops[i]*drop_size);

    if(drops[i]*drop_size > c.height && Math.random() > 0.975)
      drops[i] = 0;

    drops[i]++;
  }

}

setInterval(draw, 50);
