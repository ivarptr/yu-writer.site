"use strict";

(function() {

    function showScreenVideo(src) {
        var videoElement = document.querySelector('.screenshot .photo video');
        if (videoElement !== null) {
            videoElement.style.display = 'block';
        }else {
            videoElement = document.createElement('VIDEO');
            var parentElement = document.querySelector('.screenshot .photo');
            parentElement.appendChild(videoElement);

            // see also
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
            videoElement.setAttribute('controls', '');
            videoElement.setAttribute('src', src);
            //videoElement.load();
        }

        videoElement.play();

        var imageElement = document.querySelector('.screenshot .photo img');
        imageElement.style.display = 'none';
    }

    function showScreenshot(src) {
        var imageElement = document.querySelector('.screenshot .photo img');
        imageElement.style.display = 'block';
        imageElement.setAttribute('src', src);

        var videoElement = document.querySelector('.screenshot .photo video');
        if (videoElement !== null) {
            // see also
            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
            videoElement.pause();
            videoElement.style.display = 'none';
        }
    }

    function thumbClick(item) {
        var thumbListElement = document.querySelector('.thumb-list');
        var thumbElementList = thumbListElement.querySelectorAll('ul > li');
        var thumbElements = Array.prototype.slice.call(thumbElementList, 0);

        for (var idx in thumbElements) {
            var thumbElement = thumbElements[idx];
            if (item !== thumbElement && thumbElement.classList.contains('selected')) {
                thumbElement.classList.remove('selected');
            }
        }

        item.classList.add('selected');

        if (item.classList.contains('video')) {
            var videoSrc = 'resources/media/' + item.dataset.url;
            showScreenVideo(videoSrc);
        }else {
            var imageSrc = 'resources/images/' + item.dataset.url;
            showScreenshot(imageSrc);
        }
    }

    function bindEvents() {
        var thumbListElement = document.querySelector('.thumb-list');
        var thumbElementList = thumbListElement.querySelectorAll('ul > li');
        var thumbElements = Array.prototype.slice.call(thumbElementList, 0);

        for (var idx in thumbElements) {
            thumbElements[idx].addEventListener('click', function(event) {
                thumbClick(event.currentTarget);
            });
        }
    }

    function init() {
        bindEvents();
    }

    // start
    init();
})();
