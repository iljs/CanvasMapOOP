class CanvasMap{
	constructor(object){
		this.container  = object.container_id;  // DEFLINE Container ID
		this.controller = object.controller; 	// DEFLINE Controller Type

		this.style 	 	= object.style; 		// DEFLINE Canvas Style {background, cursor}

		this._scale 	= object.scale; 		// DEFLINE Scale Map
		this._move  	= object.move; 			// DEFLINE Move Map
		this.objects 	= object.objects; 		// DEFLINE Object for draw
	}

	/*

	--- Init Canvas Map ---

	*/

	init(){
		let container = document.getElementById(this.container);	// Div Container
		let canvas = document.createElement("canvas");				// Create Canvas

		canvas.id 				= this.container + "___canvas";		// Set canvas ID
    	canvas.height 			= container.offsetHeight;			// Set canvas Height
    	canvas.width 			= container.offsetWidth;			// Set canvas Width
    	canvas.style.background = this.style.background;			// Set canvas Background
    	canvas.style.cursor 	= this.style.cursor;				// Set canvas Cursor

		container.appendChild(canvas);								// Append canvas

		this.canvas 	   = canvas;								// DEFLINE Canvas Container
		this.canvasMap 	   = canvas.getContext("2d");				// DEFLINE Canvas Drawing
		this.container 	   = container;								// DEFLINE Div Container

		this.mousePosition = {"x": 0, "y": 0};						// DEFLINE Mouse Position
		this.moveStart 	   = {"x": 0, "y": 0};						// DEFLINE Mouse Start Position on move Canvas Map
		this.mapMovingNow  = false;									// DEFLINE Rights for moving Canvas Map


		this.сontroller();											// Start Controller
		this.windowEvents();										// Start <ouseEvents
		this.renderMap();											// First Render
	};




	/*

	--- Set & Get Scale Values ---

	*/

	set scale(scale){
		this._scale.value.x = (this._scale.switch.x && (scale.x > this.scaleStep.x)) ? scale.x : this._scale.value.x;
		this._scale.value.y = (this._scale.switch.y && (scale.y > this.scaleStep.y)) ? scale.y : this._scale.value.y;
	}
	set scaleStep(scaleStep){
		this._scale.step.x = scaleStep.x;
		this._scale.step.y = scaleStep.y;
	}
	set scaleSwitch(scaleSwitch){
		this._scale.switch.x = scaleSwitch.x;
		this._scale.switch.y = scaleSwitch.y;
	}

	get scale(){
		return {
			"x": this._scale.value.x,
			"y": this._scale.value.y
		}
	}
	get scaleStep(){
		return {
			"x": this._scale.step.x,
			"y": this._scale.step.y
		}
	}
	get scaleSwitch(){
		return {
			"x": this._scale.switch.x,
			"y": this._scale.switch.y
		}
	}




	/*

	--- Set & Get Move Values ---

	*/


	set move(move){
		this._move.value.x = this._move.switch.x ? Math.round(move.x) : this._move.value.x;
		this._move.value.y = this._move.switch.y ? Math.round(move.y) : this._move.value.y;
	}
	set moveSwitch(moveSwitch){
		this._move.switch.x = moveSwitch.x;
		this._move.switch.y = moveSwitch.y;
	}

	get move(){
		return {
			"x": this._move.value.x,
			"y": this._move.value.y
		}
	}
	get moveSwitch(){
		return {
			"x": this._move.switch.x,
			"y": this._move.switch.y
		}
	}



	/*

	--- Control Canvas Methods ---

	*/

	сontroller(){											// Controller 
		this.controllerMethods = {
			"increaseScaleMap": () => { 					// FUNCTION Increase Scale
				let moveRights = this.moveSwitch;			// Get move rights
				this.moveSwitch = {"x": true, "y": true};	// Set new move rights for correct work scale on canvas map

				if (this.scaleSwitch.x) {
					this.scale = {							// Set Scale
						"x": this.scale.x + this.scaleStep.x,
						"y": this.scale.y,
					};
					this.move = {							// Set Move
						"x": this.move.x + (((this.canvas.width / (this.scale.x - this.scaleStep.x)) - (this.canvas.width/this.scale.x)) / this.canvas.width * this.mousePosition.x),
						"y": this.move.y
					};			
				};
				if (this.scaleSwitch.y) {					
					this.scale = {							// Set Scale
						"x": this.scale.x,
						"y": this.scale.y + this.scaleStep.y,
					};
					this.move = {							// Set Move
						"x": this.move.x ,
						"y": this.move.y + (((this.canvas.height / (this.scale.y - this.scaleStep.y)) - (this.canvas.height/this.scale.y)) / this.canvas.height * this.mousePosition.y)
					};
				};

				this.moveSwitch = moveRights;				// Set old move rights
				this.renderMap();							// Render canvas map
			},
			"decreaseScaleMap":() => {						// FUNCTION Decrease Scale
				let moveRights = this.moveSwitch;			// Get move rights
				this.moveSwitch = {"x": true, "y": true};	// Set new move rights for correct work scale on canvas map

				if ((this.scale.x > (this.scaleStep.x*2)) && (this.scaleSwitch.x)) {
					this.scale = {							// Set Scale
						"x": this.scale.x - this.scaleStep.x,
						"y": this.scale.y,
					};
					this.move = {							// Set Move
						"x": this.move.x - (((this.canvas.width / this.scale.x) - (this.canvas.width/(this.scale.x + this.scaleStep.x)))/2),
						"y": this.move.y
					};
				};

				if ((this.scale.y > (this.scaleStep.y*2)) && (this.scaleSwitch.y)) {
					this.scale = {							// Set Scale
						"x": this.scale.x,
						"y": this.scale.y - this.scaleStep.y
					};
					this.move = {							// Set Move
						"x": this.move.x,
						"y": this.move.y - (((this.canvas.height / this.scale.y) - (this.canvas.height/(this.scale.y + this.scaleStep.y)))/2)
					};
				};

				this.moveSwitch = moveRights;				// Set old move rights
				this.renderMap();							// Render canvas map
			},
			"moveMap": (data) => {							// FUNCTION Move Canvas Map
				this.move = {
					"x": this.move.x - data.x,
					"y": this.move.y - data.y
				};
				this.renderMap();
			}
		}
	}


	/*

	--- Mouse Events ---

	*/

	windowEvents(){
		this.canvas.addEventListener('wheel', e => {	
								// EVENT Mouse Will
			e.preventDefault();
			if (e.deltaY/125 < 0) this.controllerMethods.increaseScaleMap();	// Increase Scale
			if (e.deltaY/125 > 0) this.controllerMethods.decreaseScaleMap();	// Decrease Scale
		});

		this.canvas.addEventListener('mousedown', e => {						// EVENT Mouse Down
			this.moveStart.x = e.offsetX;										// Set start coordinate X
			this.moveStart.y = e.offsetY;										// Set start coordinate Y
			this.mapMovingNow = true;											// Set right for moving map
		});

		this.canvas.addEventListener('mousemove', e => {						// EVENT Mouse Move
			this.mousePosition.x = e.offsetX;									// Set mouse position X						
			this.mousePosition.y = e.offsetY;									// Set mouse position Y						

			if (this.mapMovingNow) {
				this.controllerMethods.moveMap({
					"x": ((e.offsetX - this.moveStart.x)/this.scale.x),			// Count vector X
					"y": ((e.offsetY - this.moveStart.y)/this.scale.y)			// Count vector Y
				});

				this.moveStart.x = e.offsetX;									// Set start coordinate X
				this.moveStart.y = e.offsetY;									// Set start coordinate Y
			}
		});

		this.canvas.addEventListener('mouseup', e => {							// EVENT Mouse Up
			this.mapMovingNow = false;											// Set right for moving map
		});

		window.addEventListener("resize", e => {								// EVENT Window Resize
			this.canvas.height = this.container.offsetHeight;					// Set canvas Height
    		this.canvas.width  = this.container.offsetWidth;					// Set canvas Width	
    		this.renderMap();
		});
	}






	/*

	--- Drawing methods ---

	*/

	clearMap(){
		this.canvasMap.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawRect(object){
		this.canvasMap.beginPath();
		this.canvasMap.fillStyle = object.color;
		this.canvasMap.rect(
			Math.floor((object.isFixed) ? object.coordinates.x : (object.coordinates.x - this.move.x) * this.scale.x), 
			Math.floor((object.isFixed) ? object.coordinates.y : (object.coordinates.y - this.move.y) * this.scale.y), 
			Math.floor(object.side.x * ((object.isScale) ? this.scale.x : 1)), 
			Math.floor(object.side.y * ((object.isScale) ? this.scale.y : 1))
		);
		this.canvasMap.fill();
	}

	drawElipse(object){
		this.canvasMap.beginPath();
		this.canvasMap.fillStyle = object.color;
		this.canvasMap.ellipse(
			Math.floor((object.isFixed) ? object.coordinates.x : (object.coordinates.x - this.move.x) * this.scale.x), 
			Math.floor((object.isFixed) ? object.coordinates.y : (object.coordinates.y - this.move.y) * this.scale.y), 
			Math.floor(object.radius * ((object.isScale) ? this.scale.x : 1)), 
			Math.floor(object.radius * ((object.isScale) ? this.scale.y : 1)), 
			0, 0, 2 * Math.PI);
		this.canvasMap.fill();
	}

	drawLine(object){
		this.canvasMap.beginPath();
		this.canvasMap.strokeStyle = object.color;
		this.canvasMap.moveTo(
			Math.floor((object.isFixed) ? object.coordinates.x : (object.coordinates[0].x - this.move.x)*this.scale.x), 
			Math.floor((object.isFixed) ? object.coordinates.y : (object.coordinates[0].y - this.move.y)*this.scale.y)
		);
		this.canvasMap.lineTo(
			Math.floor((object.isFixed) ? object.coordinates.x : (object.coordinates[1].x - this.move.x)*this.scale.x), 
			Math.floor((object.isFixed) ? object.coordinates.y : (object.coordinates[1].y - this.move.y)*this.scale.y)
		);
		this.canvasMap.stroke();
	}

	drawPolygon(object){
		this.canvasMap.beginPath();
		this.canvasMap.fillStyle = object.color;
		this.canvasMap.moveTo(
			Math.floor((object.isFixed) ? object.startCoordinates.x : (object.startCoordinates.x - this.move.x)*this.scale.x), 
			Math.floor((object.isFixed) ? object.startCoordinates.y : (object.startCoordinates.y - this.move.y)*this.scale.y)
		);

		for (var i = 0; i < object.points.length; i++) {
			this.canvasMap.lineTo(
				Math.floor((object.isFixed) ? object.points[i].x : (object.points[i].x - this.move.x)*this.scale.x), 
				Math.floor((object.isFixed) ? object.points[i].y : (object.points[i].y - this.move.y)*this.scale.y)
			);
		}

		this.canvasMap.fill();
	}

	drawText(object){
		this.canvasMap.beginPath();
		this.canvasMap.font = object.size*((object.isScale) ? this.scale.y : 1) + "px " + object.fontFamily;
		this.canvasMap.fillStyle = object.color;
		this.canvasMap.fillText(
			object.text, 
			Math.floor((object.isFixed) ? object.coordinates.x : (object.coordinates.x - this.move.x)*this.scale.x), 
			Math.floor((object.isFixed) ? object.coordinates.x : (object.coordinates.y - this.move.y + object.size)*this.scale.y)
		);
	}

	renderMap(){
		this.clearMap();
		for (var i = 0; i < this.objects.length; i++) {
			if (this.objects[i].type == "rect") this.drawRect(this.objects[i]);
			if (this.objects[i].type == "circle") this.drawElipse(this.objects[i]);
			if (this.objects[i].type == "line") this.drawLine(this.objects[i]);
			if (this.objects[i].type == "text") this.drawText(this.objects[i]);
			if (this.objects[i].type == "polygon") this.drawPolygon(this.objects[i]);
		}
	}
}











/*

Object types:

{
	"type": 'rect',
	"color": 'yellow',
	"coordinates": {
		"x": 13,
		"y": 29
	},
	"side": {
		"x": 235,
		"y": 167
	}
}

{
	"type": 'circle',
	"color": 'red',
	"coordinates": {
		"x": 300,
		"y": 400
	},
	"radius": 145
}

{
	"type": 'line',
	"color": 'blue',
	"coordinates": [
		{
			"x": 890,
			"y": 400
		},
		{
			"x": 760,
			"y": 600
		},
	]
}


{
	"type": 'text',
	"color": 'white',
	"text": "400",
	"size": "12",
	"coordinates": {
		"x": 300,
		"y": 400
	}
}


*/