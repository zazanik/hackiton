var socket = io('http://10.0.0.219:7124');

socket.on('connection', function(data){
	socket.emit('message', 'hello there');
	console.log(data);
});


socket.on('message', function(data){
	console.log(data);
});

var data = [
        {
            "id": "T1",
            "value": "8"
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
        {
            "id": "O2",
            "value": true
        }
    ]
;

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

var firstChar;
var idNumberChar;
var infoIcon = $('body').find('.info-icon');
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
                        clone.find('.icon').addClass('fa-thermometer-half green');
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
                    clone.find('.result').html('Open');
                } else {
                    clone.find('.icon').addClass('fa-window-maximize green');
                    clone.find('.result').html('Close');
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

    var office = '.office-' + idNumberChar;

    var container = $('body').find(office);

	$('body').find(id).remove();
    clone = $(infoIcon).clone();
    clone.addClass(id).removeClass('hidden');
	    
    clone.find('.result').html(value);

	if (callback) {
		callback(clone);
	}
    
    container.append(clone);
}
