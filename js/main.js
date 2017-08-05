// var socket = io('http://192.168.1.4:8888');

// socket.on('connection', function(data){
// 	socket.emit('message', 'hello there');
// 	console.log(data);
// });


// socket.on('message', function(data){
// 	console.log(data);
// });

var data = [
        {
            "id": "T1",
            "value": "21"
        },
        {
            "id": "W1",
            "value": 60
        },
        {
            "id": "M1",
            "value": true
        },
        {
            "id": "L1",
            "value": 40
        },
        {
            "id": "O1",
            "value": true
        },
        {
            "id": "T2",
            "value": "31"
        },
    ]
;

var infoPosition = [];

recomendParametrs = [];

recomendParametrs = {
	"temperature": {
        "cold": 20,
        "hot": 25
	},
	"wet": {
		"dry": 40,
		"damp": 80
	},
	"light": 500
}

infoPosition[1] = {
   "T": {
       "top": 115,
       "left": 105
    },
    "W": {
    	"top": 150,
    	"left": 105
    },
    "M": {
    	"top": 185,
    	"left": 105
    },
    "L": {
    	"top": 220,
    	"left": 105
    },
    "O": {
    	"top": 255,
    	"left": 105
    }
};

var firstChar;
var idNumberChar;
var infoIcon = $('body').find('.info-icon');
var container = $('body').find('.four-office-plan');
var clone;


for (var i = 0; i < data.length; i++) {
	main(data[i].id, data[i].value);
}

function main(id, value) {
    
    firstChar = id.charAt(0);
    idNumberChar = id.charAt(1);
    
    switch (firstChar) {
        case 'T': 
            renderInfoIcon(id, value, function(clone){
            	if (value > recomendParametrs.temperature.hot) {
                    clone.find('.icon').addClass('fa-thermometer-full red');
            	} else {
                    if (value < recomendParametrs.temperature.cold) {
                        clone.find('.icon').addClass('fa-thermometer-empty blue');
                    } else {
                        clone.find('.icon').addClass('fa-thermometer-full green');
                    }
                }
            });
            break;

		case 'W':
		    renderInfoIcon(id, value, function(clone){
                if (value < recomendParametrs.wet.dry && value > recomendParametrs.wet.damp) {
                    clone.find('.icon').addClass('fa-tint red');
                } else {
                    clone.find('.icon').addClass('fa-tint green');
                }
            });
		    break;

		case 'M':
		    renderInfoIcon(id, value, function(clone){
                if (value === true) {
                    clone.find('.icon').addClass('fa-user-secret red');
                    clone.find('.result').html('');    
                } else {
                    clone.find('.icon').addClass('fa-user-secret green');
                    clone.find('.result').html('');
                }
                
            });
		    break;

		case 'L':
		    renderInfoIcon(id, value, function(clone){
                if (value < recomendParametrs.light) {
                    clone.find('.icon').addClass('fa-lightbulb-o red');
                } else {
                    clone.find('.icon').addClass('fa-user-secret green');
                }
            });
		    break;

		case 'O': 
		    renderInfoIcon(id, value, function(){
                if (value === true) {
                    clone.find('.icon').addClass('fa-window-maximize red');
                    clone.find('.result').html('Opened');
                } else {
                    clone.find('.icon').addClass('fa-window-maximize green');
                    clone.find('.result').html('Closed');
                }
            });
		    break;

		default:
		    break;
    }
}

function renderInfoIcon(id, value, callback) {

	if (callback === undefined) {
		callback = false;
	}

	firstChar = id.charAt(0);
    idNumberChar = id.charAt(1);

	$('body').find(id).remove();
    clone = $(infoIcon).clone();
    clone
	    .addClass(id)
	    .removeClass('hidden')
	    .css({
    	    'top': infoPosition[idNumberChar][firstChar].top,
    	    'left': infoPosition[idNumberChar][firstChar].left
        });
    clone.find('.result').html(value);

	if (callback) {
		callback(clone);
	}
    
    container.append(clone);
}

