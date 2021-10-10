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
		}

		subNav.forEach(nav => {
			if (codePg && nav.innerHTML === 'coding') {
				nav.classList.add('current');

			} else if (productPg && nav.innerHTML === 'product &amp; packaging') {
				nav.classList.add('current');

			} else if (designPg && nav.innerHTML === 'branding') {
				nav.classList.add('current');
			}
		});
	}
}, false);