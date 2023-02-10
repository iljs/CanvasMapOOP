# CanvasMapOOP

Graphics Library


Create Class

let canvas = new CanvasMap([object]);


Init Map

canvas.init();


Props in object:
container_id (String)
style {
  background (String) - HEX Color,
  cursor (String) - CSS Prop
},
scale {
  value {   Start Position
    x (Float),
		y (Float)
  },
  switch {  Can decrease and increase
    x (Bool),
    y (Bool)
  },
  step {    Step on decrease and increase
    x (Float),
    y (Float)
  }
},
move {
  value {   Start Position
    x (Float),
		y (Float)
  },
  switch {  Can moving
    x (Bool),
    y (Bool)
  }
},
objects []



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

{
	"type": 'polygon',
	"color": 'red',
	"startCoordinates": {
		"x": 0,
		"y": 0
	},
  "points": [
    {
      "x": 100,
      "y": 0
    },{
      "x": 100,
      "y": 100
    },{
      "x": 0,
      "y": 100
    }
  ]

