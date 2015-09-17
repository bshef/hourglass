// Variables and Constants

//	Colors
var deepPurple = '#673AB7';
var amber = '#FFC107';

//	Margin for drawing within the canvas
var margin = 10;

//	Hourglass vertices, counter-clockwise
var vertices = [
	{x: 0 + margin, y: 0 + margin},
	{x: (canvas.width / 2) - margin, y: canvas.height / 2},
	{x: 0 + margin, y: canvas.height - margin},
	{x: canvas.width - margin, y: canvas.height - margin},
	{x: canvas.width - (canvas.width / 2) + margin, y: canvas.height / 2},
	{x: canvas.width - margin, y: 0 + margin}
];

//
//	Hourglass Logic
//

//	Draws the hourglass
function drawHourGlass(topGrains, bottomGrains) {
	var canvas = document.getElementById('canvas');
	if(!canvas) {
		return;
	}

	//	Get context
	var ctx = canvas.getContext("2d");

	//	Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);	

	//	Draw hourglass shape
	drawHourGlassShape(ctx);

	// Draw TOP sand grains
	var numberOfTopGrains = topGrains ? topGrains : getNumberOfGrains('top');
	var numberOfBottomGrains = bottomGrains ? bottomGrains : getNumberOfGrains('bottom');

	for(var t = 0; t < numberOfTopGrains; t++) {
		drawUpperSandGrain(ctx);
	}

	// Draw BOTTOM sand grains
	for(var b = 0; b < numberOfBottomGrains; b++) {
		drawLowerSandGrain(ctx);
	}
}

//	Draws a simple hourglass shape
function drawHourGlassShape(context) {
	//	Six Lines
	drawHourGlassLine(context, vertices[0], vertices[1]);
	drawHourGlassLine(context, vertices[1], vertices[2]);
	drawHourGlassLine(context, vertices[2], vertices[3]);
	drawHourGlassLine(context, vertices[3], vertices[4]);
	drawHourGlassLine(context, vertices[4], vertices[5]);
	drawHourGlassLine(context, vertices[5], vertices[0]);
}

//	Get the value specified for the number of grains in the top or bottom
function getNumberOfGrains(topOrBottom) {
	var number = 32;
	var grainsField = document.getElementById(topOrBottom.toLowerCase() + 'Grains');
	if(grainsField) {
		number = grainsField.value;
	}

	return number;
}

//	Utility function to draw a line on the canvas
function drawLine(context, startX, startY, endX, endY, width, color) {
	context.beginPath();
	context.lineJoin = 'round';
	context.lineWidth = width.toString();
	if(color) {
		context.strokeStyle = color;
	}
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);	
	context.stroke();
}

//	Utility function to draw a circle on the canvas
function drawCircle(context, centerX, centerY, radius, color) {
	context.beginPath();
	if(color) {
		context.strokeStyle = color;
		context.fillStyle = color;
	}
	context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
	context.stroke();
	context.fill();
}

//	Draw a dot specifically representing a sand grain
function drawSandGrain(context, center) {
	drawCircle(context, center.x, center.y, 1, amber);
}

//	Draw a sand grain somewhere within the upper portion of the hourglass
function drawUpperSandGrain(context) {
	var center = randomTriangleCoordinate(vertices[0], vertices[1], vertices[5]);
	drawSandGrain(context, center);
}

function drawLowerSandGrain(context) {
	var center = randomTriangleCoordinate(vertices[1], vertices[2], vertices[3]);
	drawSandGrain(context, center);
}

//	Draw a line specifically to make up the hourglass shape
function drawHourGlassLine(context, startVertex, endVertex) {
	drawLine(context, startVertex.x, startVertex.y, endVertex.x, endVertex.y, 2, deepPurple);
}

//	Generate a random number between floor and ceiling
function randomInt(floor, ceiling) {
	return Math.floor((Math.random() * ceiling) + floor);
}

//	Returns a random X,Y coordinate within the specified triangle.
//	Assumes the triangle is drawn counter-clockwise.
//	Note: Canvas coordinates have origin (0,0) in top-left corner.
function getRandomCoordinatesWithinTriangle(v0, v1, v2) {
	var xFloor = v0.x + margin;
	var xCeiling = v2.x - margin;
	var yCeiling = v1.y - margin;
	var yFloor = v0.y + margin;

	var x = randomInt(xFloor, xCeiling);
	var y = randomInt(yFloor, yCeiling);

	return {x: x, y: y};
}

//	Returns a random X,Y coordinate within the specified triangle.
//	Reference: http://stackoverflow.com/a/19654424/1950344
function randomTriangleCoordinate(a, b, c) {
	var r1 = Math.random();
	var r2 = Math.random();

	var x = (1 - Math.sqrt(r1)) * a.x + (Math.sqrt(r1) * (1 - r2)) * b.x + (Math.sqrt(r1) * r2) * c.x;
	var y = (1 - Math.sqrt(r1)) * a.y + (Math.sqrt(r1) * (1 - r2)) * b.y + (Math.sqrt(r1) * r2) * c.y;

	return {x: x, y: y};
}