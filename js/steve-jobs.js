/* Steve jobs' book */

var screentype = 'double';
var w = window.innerWidth;
var h = window.innerHeight;
var insidew = 460;
var insideh = 649;
var adjustw=480;
var adjusth=669;

function resize() {
	location.reload();
	
}	
window.onresize = resize;

function updateDepth(book, newPage) {
	var shiftvalue = 20;

	// if (w<1150){
	// 	shiftvalue = 25;
	// }

	var page = book.turn('page'),
		pages = book.turn('pages'),
		depthWidth = 16*Math.min(1, page*2/pages);

		newPage = newPage || page;

	if ((newPage>3)&&screentype=="single") {
		document.querySelector('.p31').style.display = "block";
	} 

	if ((newPage<pages-3)&&screentype=="single") {
		document.querySelector('.p31').style.display = "none";
	}

	if (newPage>3)
		$('.sj-book .p2 .depth').css({
			width: depthWidth,
			left: shiftvalue - depthWidth
		});
	else
		$('.sj-book .p2 .depth').css({width: 0});

		depthWidth = 16*Math.min(1, (pages-page)*2/pages);

	if (newPage<pages-3)
		$('.sj-book .p31 .depth').css({
			width: depthWidth,
			right: shiftvalue - depthWidth
		});
	else
		$('.sj-book .p31 .depth').css({width: 0});

}

function loadPage(page) {

	$.ajax({url: 'pages/page' + page + '.html'}).
		done(function(pageHtml) {
			$('.sj-book .p' + page).html(pageHtml.replace('samples/steve-jobs/', ''));
		});

}

function addPage(page, book) {

	var id, pages = book.turn('pages');

	if (!book.turn('hasPage', page)) {

		var element = $('<div />',
			{'class': 'own-size',
				css: {width: insidew, height: insideh}
			}).

			html('<div class="gradient"></div><div class="loader"></div>');

		if (book.turn('addPage', element, page)) {
			loadPage(page);
		}

	}
}

function numberOfViews(book) {

	return book.turn('pages') / 2 + 1;

}

function getViewNumber(book, page) {

	return parseInt((page || book.turn('page'))/2 + 1, 10);

}


function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}

function setPreview(view) {

	var previewWidth = 115,
		previewHeight = 73,
		previewSrc = 'pages/preview.jpg',
		preview = $(_thumbPreview.children(':first')),
		numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2,
		width = (numPages==1) ? previewWidth/2 : previewWidth;

	_thumbPreview.
		addClass('no-transition').
		css({width: width + 15,
			height: previewHeight + 15,
			top: -previewHeight - 30,
			left: ($($('#slider').children(':first')).width() - width - 15)/2
		});

	preview.css({
		width: width,
		height: previewHeight
	});

	if (preview.css('background-image')==='' ||
		preview.css('background-image')=='none') {

		preview.css({backgroundImage: 'url(' + previewSrc + ')'});

		setTimeout(function(){
			_thumbPreview.removeClass('no-transition');
		}, 0);

	}

	preview.css({backgroundPosition:
		'0px -'+((view-1)*previewHeight)+'px'
	});
}

function isChrome() {

	// Chrome's unsolved bug
	// http://code.google.com/p/chromium/issues/detail?id=128488

	return navigator.userAgent.indexOf('Chrome')!=-1;

}


