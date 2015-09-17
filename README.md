# Hourglass
A simple hourglass widget for websites

## View live demo
http://bshef.github.io/hourglass/public/index.html

## How to view the demo
1. Download the ZIP of this project or clone the Git repo
2. The `hourglass` directory should contain two directories: `public` and `src`
3. In a modern browser (ie, Chrome) navigate to `...\hourglass\public\index.html` on your local machine

## Using the demo
1. Simply specify the number of grains to draw in the top and bottom using the text fields on the left
2. Press the 'draw' button to redraw the hourglass with the specified number of grains as many times as you like

## Using the code
* hourglass.js can be added as a script in any HTML page with `<script src="...hourglass.js"></script>` (using the proper path to the `hourglass.js` script, of course)
* The primary function for drawing the hourglass is `drawHourGlass()`. It takes two optional parameters `topGrains` and `bottomGrains`, but will try to pull those values from the relevant HTML fields if they are not supplied directly to the function call
* The hourglass shape is specified directly in `hourglass.js` with a set of six vertices
* Note that HTML Canvas has its origin (0, 0) located in the top left corner
