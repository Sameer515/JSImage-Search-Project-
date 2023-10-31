const accessToken =
	'fN38yE5LQQjzfCj8kUwgbssDsDLWCYKQOEsrY2Nzw_U';

const fromEL = document.querySelector('form');
const inputEL = document.getElementById('search-input');
const searResults = document.querySelector(
	'.search-results'
);
const showMore = document.getElementById(
	'show-more-button'
);

let inputData = '';
let page = 1;

async function searchImages() {
	inputData = inputEL.value;
	const url = `https://api.unsplash.com/search/photos?query=${inputData}&client_id=${accessToken}&page=${page}`;

	const response = await fetch(url);
	const data = await response.json();
	const results = data.results;
	if (page === 1) {
		searResults.innerHTML = '';
	}
	results.map((results) => {
		const imageWrapper = document.createElement('div');
		imageWrapper.classList.add('search-result');
		const image = document.createElement("img");
		image.src = results.urls.small;
		image.alt = results.alt_description;
		const imageLink = document.createElement('a');
		imageLink.href = results.links.html;
		imageLink.target = '_blank';
		imageLink.textContent = results.alt_description;

		imageWrapper.appendChild(image);
		imageWrapper.appendChild(imageLink);
		searResults.appendChild(imageWrapper);
	});
	page++;
	if (page > 1) {
		showMore.style.display = 'block';
	}
}

fromEL.addEventListener('submit', (e) => {
	e.preventDefault();
	page = 1;
	searchImages();
});

showMore.addEventListener('click', (e) => {
	searchImages();
});
