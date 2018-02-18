// Responsive parts

const body = $('body');
const hamburger = $('#hamburger');
const nav = $('#nav');
const title = $('#title');
const buttons = $('#buttons');
const button = $('#button');

hamburger.click(function(e) {
	nav.toggle();
	title.toggle();
	if(body.width() > 750){
		(hamburger.position().left > body.width()*0.1)
			? hamburger.css('left', '2%')
			: hamburger.css('left', '2%');
	} else {
		(hamburger.position().left > body.width()*0.1)
			? hamburger.css('left', '2%')
			: hamburger.css('left', '2%');
	}
	e.stopPropagation;
});

$('#header').click(function(e) {
	if(body.width() < 1008) {
		nav.hide();
		title.show();
		hamburger.css('left', '2%');
	}
});

button.click(function() {
	buttons.toggle();
});