// Responsive parts

const body = $('body');
const hamburger = $('#hamburger');
const nav = $('#nav');
const title = $('#title');

hamburger.click(function(e) {
	nav.toggle();
	title.toggle();
	if(body.width() > 750){
		(hamburger.position().left > body.width()*0.1)
			? hamburger.css('left', '2%')
			: hamburger.css('left', '60%');
	} else {
		(hamburger.position().left > body.width()*0.1)
			? hamburger.css('left', '2%')
			: hamburger.css('left', '70%');
	}
	e.stopPropagation;
});

body.click(function(e) {
	if(!($(e.target).is('#hamburger') 
		|| $(e.target).is('#nav') 
		|| $(e.target).is('li')
		|| $(e.target).is('input')
	)){
		if(body.width() < 1008) {
			nav.hide();
			title.show();
			hamburger.css('left', '2%');
		}
	}
});