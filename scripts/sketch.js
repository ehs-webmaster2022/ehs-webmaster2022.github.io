let floor1;
let floor2;

let floor1ColorMap;
let floor2ColorMap;

let floorNumber;
let floor;
let floorColorMap;

let canvas;

let cameraX = 0, cameraY = 0;
let dragX = 0, dragY = 0;

let select = 52;

function preload () {
     floor1 = loadImage ("assets/ectc-floor-plans/1/floor.PNG");
     floor2 = loadImage ("assets/ectc-floor-plans/2/floor.PNG");

     floor1ColorMap = loadImage ("assets/ectc-floor-plans/1/color-map.png");
     floor2ColorMap = loadImage ("assets/ectc-floor-plans/2/color-map.png");
}

function windowResized () {
     resizeCanvas ($("#canvas-container").width (), $("#canvas-container").height ());

     console.log ("resizing");
}

function setup () {

     floor = floor1;
     floorColorMap = floor1ColorMap;
     floorNumber = 1;

     canvas = createCanvas ($("#canvas-container").width (), $("#canvas-container").height ());
     canvas.parent ("#canvas-container");
     canvas.id ("virtual-open-house-canvas");
     resizeCanvas ($("#canvas-container").width (), $("#canvas-container").height ());

     floor1ColorMap.loadPixels ();
     floor2ColorMap.loadPixels ();


}

function draw () {

     mouseX = int (mouseX);
     mouseY = int (mouseY);

     cameraX = int (constrain (cameraX, -width / 2, width / 2));
     cameraY = int (constrain (cameraY, -height / 2, height / 2));

     select = floorColorMap.pixels[((mouseY - cameraY) * floorColorMap.width + (mouseX - cameraX)) * 4] / 5 + 1;

     background (31);
     translate (cameraX, cameraY);

     image (floor, 0, 0);

     if (select != 52) {
          $("#virtual-open-house-canvas").css ({cursor: "pointer"});
     } else {
          $("#virtual-open-house-canvas").css ({cursor: "move"});
     }
}

function mouseClicked () {
     if (select == 51) {
          if (floorNumber == 1) {
               floorNumber = 2;
               floor = floor2;
               floorColorMap = floor2ColorMap;
          } else {
               floorNumber = 1;
               floor = floor1;
               floorColorMap = floor1ColorMap;
          }
     } else {
          if (select != 52) {

               console.log (select);

               let url = "room-descriptions/room" + select + ".html";
               $.get (url)

                    .done (function () {

                         $("#room-description").load ("room-descriptions/room" + select + ".html");

                    }).fail (function () {

                         $("#room-description").load ("room-descriptions/no-description.html");

                    });

               url = "assets/rooms/room" + select + ".png";
               $.get (url)

                    .done (function () {

                         console.log ("changing");

                         $("#room-image").children ().attr ("src", url + "");

                    }).fail (function () {

                         $("#room-image").children ().attr ("src", "assets/ehs-logo-greyscale.png");

                    });

          } else {
               //$("#room-description").load ("room-descriptions/start.html");
               //$("#room-image").children ().attr ("src", "assets/ehs-logo-greyscale.png");
          }
     }
}

function mousePressed () {
     dragX = mouseX;
     dragY = mouseY;
}

function mouseDragged () {

     if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
          cameraX += int (mouseX - dragX);
          cameraY += int (mouseY - dragY);
     }

     dragX = mouseX;
     dragY = mouseY;

}
