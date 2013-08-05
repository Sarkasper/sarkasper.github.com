$(document).ready(function (){
	
	// header shadow
	
	var header = $('header');
	
    $(window).scroll(function(){
    	if ($(window).scrollTop() > 10) {
    		header.addClass('shadow');
    	} else {
    		header.removeClass('shadow');
    	}
    });
	
	// rotating text
	
   	setInterval(function(){
   		var text = $('#rotatingText');
   		var width = text.width();
   		var visible = $('#rotatingText em:visible');
   		var newWidth = visible.next('em').width();
   		text.css('width', width);
   		text.animate({width: newWidth}, 300);
   		$('#rotatingText em:first-child').fadeOut(300, function(){
   			$(this).next('em').fadeIn(300).end().appendTo('#rotatingText');
   		});
   	}, 4000);
	
	// map
	
	if ($('#map').length > 0) {		

		var map, infoBubble;
        var mapCenter = new google.maps.LatLng(33.42845, -117.61278);
        var image = '../assets/img/map-marker.png';
        var styles = [
			{
				stylers: [
				  { visibility: "on" },
				  { lightness: 42 },
				  { saturation: -100 },
				  { gamma: 1 }
				]
		    }
		  ];
		
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: mapCenter,
			mapTypeControl: false,
			styles: styles,
			mapTypeId: google.maps.MapTypeId.ROADMAP
        });
       
        var marker = new google.maps.Marker({
			map: map,
			position: mapCenter,
			icon: image,
			draggable: false,
			visible: true
        });

        var contentString = '<div id="mapContent">'+
        '<h1>Rareview</h1>'+
        '<a href="#" title="View in Street View" id="streetView" onClick="panorama.setVisible(true);return false;">(street view)</a>'+
        '<ul><li><i class="iconPhone"></i>1 949 234 6631</li><li><i class="iconEmail"></i><a href="mailto:hello@rareview.com" title="Send us an email">hello@rareview.com</a></li><li><i class="iconAddy"></i>107 Avenida De La Estrella 103-C<br />San Clemente, CA 92672<br /></li></ul>' +
        '</div>';

        infoBubble = new InfoBubble({
        	content: contentString,
        	hideCloseButton: true,
        	padding: 20,
			maxWidth: 430
        });

        infoBubble.open(map, marker);
        
        // show/close info window
		
		google.maps.event.addListener(map, 'click', function () {
			infoBubble.close();
		});

		google.maps.event.addListener(marker, 'click', function () {
			infoBubble.open(map);
		});
        
        // street view
		
		var sidewalkView = new google.maps.LatLng(33.42765, -117.61198);

		panorama = map.getStreetView();
		panorama.setPosition(sidewalkView);
		panorama.setOptions({
			mode: 'html5',
			addressControl: false
		});
		panorama.setPov({
			heading: 55,
			zoom: 1,
			pitch: 0
		});
	
	}
	
});