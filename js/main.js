var socket = io('http://10.0.0.206:8888');

socket.on('connection', function(data){
	socket.emit('message', 'hello there');
	console.log(data);
});


socket.on('message', function(data){
	console.log(data);
    main(data.id, data.value);
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
            "value": false
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
};

var firstChar;
var idNumberChar;
var infoIcon = $('body').find('.info-icon-prototype');
var clone;

// for (var i = 0; i < data.length; i++) {
// 	main(data[i].id, data[i].value);
// }

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
                    clone.find('.result').html('Moved');
                } else {
                    clone.find('.icon').addClass('fa-user-secret green');
                    clone.find('.result').html('died');
                }
                
            });
		    break;

		case 'L':
		    renderInfoIcon(id, value, function(clone){
                if (value < recomendParametrs.light) {
                    clone.find('.icon').addClass('fa-lightbulb-o red');
                } else {
                    clone.find('.icon').addClass('fa-lightbulb-o green');
                }
            });
		    break;

		case 'O': 
		    renderInfoIcon(id, value, function(clone){
                if (value === true) {
                    clone.find('.icon').addClass('fa-window-maximize red');
                    clone.find('.result').html('Opened');
                } else {
                    clone.addClass('hidden');
                    clone.find('.icon').addClass('fa-window-maximize green hidden');
                    clone.find('.result').html('');
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

    if ($('body').find('.'+id).length) {
        var selector = $('body').find('.'+id);

        selector.find('.result').html(value);

        if (callback) {
            callback(selector);
        }

        return true;
    }


    clone = $(infoIcon).clone();
    clone.addClass(id).removeClass('hidden info-icon-prototype');
	    
    clone.find('.result').html(value);

	if (callback) {
		callback(clone);
	}
    
    container.append(clone);
}

$('body').on('click', '.title', function(){
    $(this).next('.accordion-content').stop().slideToggle('300');
})
