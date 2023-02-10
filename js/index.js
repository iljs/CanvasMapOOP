let canvas = new CanvasMap({
	"container_id": "canvas",
	"controller": "default",
	"style": {
		"background": "#0c142c",
		"cursor": "crosshair"
	},
	"scale": {
		"value": {
			"x": 1,
			"y": 1
		},
		"switch": {
			"x": true,
			"y": true
		},
		"step": {
			"x": 0.05,
			"y": 0.05
		}
	},
	"move": {
		"value": {
			"x": 0,
			"y": 0
		},
		"switch": {
			"x": true,
			"y": true
		}
	},
	"objects": [
		{
			"type": 'rect',
			"color": 'yellow',
			"isScale": true,
			"isFixed": false,
			"coordinates": {
				"x": 13,
				"y": 29
			},
			"side": {
				"x": 235,
				"y": 167
			}
		},{
			"type": 'circle',
			"color": 'red',
			"isScale": true,
			"isFixed": false,
			"coordinates": {
				"x": 300,
				"y": 400
			},
			"radius": 145
		},{
			"type": 'line',
			"color": 'blue',
			"isFixed": false,
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
		},{
			"type": 'text',
			"color": 'white',
			"text": "400",
			"size": 12,
			"fontFamily": "Montserrat",
			"isScale": true,
			"isFixed": false,
			"coordinates": {
				"x": 300,
				"y": 400
			}
		}
	]
});

canvas.init();

