const CACHE_NAME = 'burgerIndo';
let urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/menu.html',
	'/pages/recipe.html',
	'/pages/contact.html',
	'/css/materialize.min.css',
	'/css/style.css',
	'/js/materialize.min.js',
	'/js/script.js',
	'/js/sw-register.js',
	'/icon-192x192.png',
	'/icon-512x512.png',
	'/manifest.json',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
	'/assets/1.png',
	'/assets/2.png',
	'/assets/3.png',
	'/assets/4.png',
	'/assets/5.png',
	'/assets/6.png',
	'/assets/7.png',
	'/assets/8.png',
	'/assets/9.png',
	'/assets/10.png',
	'/assets/11.png',
	'/assets/12.png',
	'/assets/13.png',
	'/assets/14.png',
	'/assets/15.png',
	'/assets/16.png',
	'/assets/17.png',
	'/assets/18.png',
	'/assets/19.png',
	'/assets/20.png',
	'/assets/21.png',
	'/assets/22.png',
	'/assets/23.png',
	'/assets/24.png',
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache);
		}),
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						console.log(`ServiceWorker: cache ${cacheName} dihapus`);
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request, { cacheName: CACHE_NAME }).then((response) => {
			if (response) {
				return response;
			}
			return fetch(event.request);
		}),
	);
});
