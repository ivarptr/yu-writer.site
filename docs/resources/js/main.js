"use strict";

(function() {

	//var maskElement = document.querySelector('.mask');
	var fullscreen = false;
	var fullscreenElement = null;

    // function showScreenVideo(src) {
    //     var videoElement = document.querySelector('.screenshot .photo video');
    //     if (videoElement !== null) {
    //         videoElement.style.display = 'block';
    //     }else {
    //         videoElement = document.createElement('VIDEO');
    //         var parentElement = document.querySelector('.screenshot .photo');
    //         parentElement.appendChild(videoElement);

    //         // see also
    //         // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
    //         // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
    //         videoElement.setAttribute('controls', '');
    //         videoElement.setAttribute('src', src);
    //         //videoElement.load();
    //     }

    //     videoElement.play();

    //     var imageElement = document.querySelector('.screenshot .photo img');
    //     imageElement.style.display = 'none';
    // }

    // function showScreenshot(src) {
    //     var imageElement = document.querySelector('.screenshot .photo img');
    //     imageElement.style.display = 'block';
    //     imageElement.setAttribute('src', src);

    //     var videoElement = document.querySelector('.screenshot .photo video');
    //     if (videoElement !== null) {
    //         // see also
    //         // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
    //         videoElement.pause();
    //         videoElement.style.display = 'none';
    //     }
    // }

    // function thumbClick(item) {
    //     var thumbListElement = document.querySelector('.thumb-list');
    //     var thumbElementList = thumbListElement.querySelectorAll('ul > li');
    //     var thumbElements = Array.prototype.slice.call(thumbElementList, 0);

    //     for (var idx in thumbElements) {
    //         var thumbElement = thumbElements[idx];
    //         if (item !== thumbElement && thumbElement.classList.contains('selected')) {
    //             thumbElement.classList.remove('selected');
    //         }
    //     }

    //     item.classList.add('selected');

    //     if (item.classList.contains('video')) {
    //         var videoSrc = 'resources/media/' + item.dataset.url;
    //         showScreenVideo(videoSrc);
    //     }else {
    //         var imageSrc = 'resources/images/' + item.dataset.url;
    //         showScreenshot(imageSrc);
    //     }
    // }

    // function loadWebFonts(){
    //     //<link href='https://fonts.googleapis.com/css?family=Raleway:400,100' rel='stylesheet' type='text/css'>

    //     var linkElement = document.createElement('link');
    //     linkElement.setAttribute('href', 'https://fonts.googleapis.com/css?family=Raleway');
    //     //linkElement.setAttribute('href', 'https://fonts.googleapis.com/css?family=Lato:400,200');
    //     linkElement.setAttribute('rel', 'stylesheet');
    //     linkElement.setAttribute('type', 'text/css');

    //     var headElement = document.querySelector('head');
    //     headElement.appendChild(linkElement);

    //     // window.WebFontConfig = {
    //     //     google: { families: [ 'Raleway:400,100:latin' ] }
    //     // };
    //     //
    //     // var scriptElement = document.createElement('script');
    //     // scriptElement.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    //     // scriptElement.type = 'text/javascript';
    //     // scriptElement.async = 'true';
    //     // var existScriptElement = document.getElementsByTagName('script')[0];
    //     // existScriptElement.parentNode.insertBefore(scriptElement, existScriptElement);
    // }

	function thumbClick(element, event) {
		if (fullscreen) {
			return;
		}

		fullscreen = true;
		fullscreenElement = element;
		event.preventDefault();
		event.stopPropagation();

		var rect = element.getClientRects()[0];
		
		var elementWidth = rect.width;
		var elementHeight = rect.height;

		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;

		var src = element.getAttribute('src');
		var hd = (src.indexOf('@2x') > 0);
		var image = new Image();
		image.src = src;

		var imageWidth = image.width;
		var imageHeight = image.height;

		if (hd) {
			imageWidth /= 2;
			imageHeight /= 2;
		}

		var zoomX = Math.min(windowWidth, imageWidth) / elementWidth;
		var zoomY = Math.min(windowHeight, imageHeight) / elementHeight;

		var zoom = Math.min(zoomX, zoomY);

		var left = (windowWidth - elementWidth) / 2;
		var top = (windowHeight - elementHeight) / 2;

		var offsetX = left - rect.left;
		var offsetY = top - rect.top;

		// center element first and then scale it.
		// var transform = 'translate(' + offsetX + 'px,' + offsetY + 'px)';
		// var transform = 'scale(' + zoom + ',' + zoom + ')';
		var transform = 'translate(' + offsetX + 'px,' + offsetY + 'px) scale(' + zoom + ',' + zoom + ')';

		//maskElement.style.display = 'block';
		element.parentNode.classList.remove('animate');

		setTimeout(function(){
			element.classList.add('fullscreen');
			element.style.zIndex = 99;
			element.style.transform = transform;

		}, 25);
		

		if (!hd) {
			var dot = src.indexOf('.png');
			var hdSrc = src.substring(0, dot) + '@2x' + src.substring(dot);
			var hdImage = new Image();
			hdImage.addEventListener('load', function(){
				element.setAttribute('src', hdSrc);
			});

			hdImage.src = hdSrc;
		}

	}

    function bindEvents() {
        var thumbElementList = document.querySelectorAll('.screenshot img.large');
        var thumbElements = Array.prototype.slice.call(thumbElementList, 0);

		var transitionend = function(thumbElement) {
			if (!thumbElement.parentNode.classList.contains('animate')){
				if (!thumbElement.classList.contains('fullscreen')) {
					thumbElement.style.zIndex = '';

					if (thumbElement.parentNode.classList.contains('gallery')) {
						thumbElement.parentNode.classList.add('animate');
					}
					
				}
			}
		};

        for (var idx in thumbElements) {
			var thumbElement = thumbElements[idx];

            thumbElement.addEventListener('click', function(event) {
				let element = event.currentTarget;
                thumbClick(element, event);
            });

			thumbElement.addEventListener('transitionend', function(event) {
				let element = event.currentTarget;
				transitionend(element);
			});
        }

		window.addEventListener('click', function(event){
			if (fullscreen) {
				event.preventDefault();

				fullscreenElement.style.transform = '';
				fullscreenElement.classList.remove('fullscreen');
				// fullscreenElement.style.zIndex = '';
				// maskElement.style.display = 'none';

				fullscreen = false;
			}
		});


    }

	// load web fonts
	// loadWebFonts();

	// bing events
	bindEvents();

})();
