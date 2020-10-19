document.addEventListener('DOMContentLoaded', () => {
	const navbar = document.querySelectorAll('.sidenav');
	M.Sidenav.init(navbar);
	loadNav();

	function loadNav() {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status != 200) return;
				document.querySelectorAll('.topnav, .sidenav').forEach((e) => {
					e.innerHTML = xhttp.responseText;
				});
				document.querySelectorAll('.sidenav a, .topnav a').forEach((e) => {
					e.addEventListener('click', function (event) {
						const sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();

						page = event.target.getAttribute('href').substr(1);
						loadPage(page);
					});
				});
			}
		};
		xhttp.open('GET', 'nav.html', true);
		xhttp.send();
	}
	let page = window.location.hash.substr(1);
	if (page == '') page = 'home';
	loadPage(page);

	function loadPage(page) {
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status == 200) {
					let content = document.querySelector('.body-content');
					content.innerHTML = xhttp.responseText;
					if (page === 'home') {
						// parallax
						const parallax = document.querySelectorAll('.parallax');
						M.Parallax.init(parallax);
						// scroll
						const scrollspy = document.querySelectorAll('.scrollspy');
						M.ScrollSpy.init(scrollspy, {
							scrollOffset: 50,
						});
					} else if (page === 'menu') {
						// lightbox
						const materialbox = document.querySelectorAll('.materialboxed');
						M.Materialbox.init(materialbox);
					} else if (page === 'contact') {
						const parallaxContact = document.querySelectorAll('.parallax');
						M.Parallax.init(parallaxContact);
					} else if (page === 'recipe') {
						const parallaxRecipe = document.querySelectorAll('.parallax');
						M.Parallax.init(parallaxRecipe);
					}
				} else if (this.status == 404) {
					content.innerHTML = '<p>Page not found.</p>';
				} else {
					content.innerHTML = '<p>Ups.. page cannot be access';
				}
			}
		};
		xhttp.open('GET', `pages/${page}.html`, true);
		xhttp.send();
	}
});
