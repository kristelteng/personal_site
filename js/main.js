document.addEventListener('DOMContentLoaded', function() {
	let mainNav = document.querySelectorAll('.nav-link'),
		subNav = document.querySelectorAll('.sub-link'),
		codePg = window.location.pathname.includes('/work/code/'),
		productPg = window.location.pathname.includes('/work/product/'),
		designPg = window.location.pathname.includes('/work/design/');
	
	if (codePg || productPg || designPg) {

		for (let i = 0; i < mainNav.length; i++) {
			if (mainNav[i].innerHTML === 'work') {
				mainNav[i].classList.add('current');
			}

			if (codePg && subNav[i].innerHTML === 'coding') {
				subNav[i].classList.add('current');
			} else if (productPg && subNav[i].innerHTML === 'product &amp; packaging design') {
				subNav[i].classList.add('current');
			} else if (designPg && subNav[i].innerHTML === 'branding') {
				subNav[i].classList.add('current');
			}
		}
	}
}, false);