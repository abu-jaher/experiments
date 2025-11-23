((w) => {
	"use strict";

	const tag = 'cv-4-23';
	const window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w;
	const qa = document.cookie.indexOf('cfQA') > -1;
	const log = qa ? Function.prototype.bind.call(console.log, console, '[CONV] TAF 4.23 |') : () => { };

	const utils = {
		waitUntil: (condition, wait = 6000) => {
			return new Promise((resolve, reject) => {
				let stop = false;

				const timeout =
					wait &&
					setTimeout(() => {
						stop = true;
						reject(new Error('Timeout waiting for condition'));
					}, wait);

				const check = () => {
					if (stop) return;
					if (!condition()) return requestAnimationFrame(check);

					clearTimeout(timeout);
					resolve(condition());
				};

				requestAnimationFrame(check);
			});
		},

		init: () => {
			try {
				utils.waitUntil(() => document.body, 0).then((docBody) => {
					docBody.classList.add(tag);
				});
				initVariation();

				log('running v1');
			} catch (err) {
				log(err.message);
			}
		},
	}

	const cv_searchField = `
        <div class="${tag}__search-field">
            <input type="text" class="${tag}__search" id="${tag}__search" placeholder="Search by journal title" autocomplete="off">
            <ul class="${tag}__suggestions"></ul>
        </div>
    `;

	const initVariation = () => {
		fetch("https://d1mgcpums0qvsa.cloudfront.net/TAF/4.23/data.json")
			.then(response => response.json())
			.then(data => {
				let searchData = data.map(item => ({
					title: item.Title,
					titleId: item.title_id,
					canSubmit: item["Can submit to (Y/N)?"],
					url: `https://www.tandfonline.com/journals/${item.title_id}`,
				}));

				utils.waitUntil(() => document.querySelector(`.newSearchResults`), 0).then((elem) => {
					const introTitle = document.querySelector(`h1`);
					const subText = document.querySelector(`h1 + p`);
					// introTitle.textContent = `Explore our journal portfolio`;
					subText.textContent = `Explore our journal portfolio - search by title, browse alphabetically or filter by subject area.`;
					introTitle.style.opacity = 1;
					subText.style.opacity = 1;
					elem.insertAdjacentHTML('beforebegin', cv_searchField);
					let currentIndex = -1;

					const searchField = document.querySelector(".cv-4-23__search-field");
					searchField.classList.add("has-placeholder");
					const searchInput = document.querySelector(`.${tag}__search`)

					searchInput.addEventListener("input", e => {
						currentIndex = -1;
						showSuggestions(e.target.value, searchData);

						if (e.target.value.trim() !== "") {
							searchField.classList.remove("has-placeholder");
						} else {
							searchField.classList.add("has-placeholder");
						}
					});

					searchInput.addEventListener("keydown", (e) => {
						const suggestionsEl = document.querySelector(`.${tag}__suggestions`);
						const items = suggestionsEl.querySelectorAll("li");

						if (!items.length) return;

						if (e.key === "ArrowDown") {
							e.preventDefault();
							currentIndex = (currentIndex + 1) % items.length;
							setActive(items, currentIndex);
						} else if (e.key === "ArrowUp") {
							e.preventDefault();
							currentIndex = (currentIndex - 1 + items.length) % items.length;
							setActive(items, currentIndex);
						} else if (e.key === "Enter") {
							if (currentIndex >= 0 && items[currentIndex]) {
								const link = items[currentIndex].querySelector("a");
								if (link) {
									window.location.href = link.href;
								}
							}
						}
					});

					document.addEventListener('click', (e) => {
						const elem = e.target;
						if (!searchInput.contains(elem) && !document.querySelector(`.${tag}__suggestions`).contains(elem)) {
							document.querySelector(`.${tag}__suggestions`).innerHTML = "";
							document.querySelector(`.${tag}__suggestions`).style.display = `none`;
						}
					})
				})
			})
			.catch(error => console.error("Error loading JSON:", error));

	}

	const setActive = (items, index) => {
		items.forEach((item, i) => {
			item.classList.toggle("active", i === index);
		});
	}

	const showSuggestions = (query, searchData) => {
		const suggestionsEl = document.querySelector(`.${tag}__suggestions`);
		suggestionsEl.innerHTML = "";
		suggestionsEl.style.display = `none`;

		if (query.length < 2) return;
		let filteredData = searchData;

		const params = new URLSearchParams(window.location.search);
		const ejfValue = params.get('ejf');
		if (ejfValue === 'on') {
			filteredData = filteredData.filter(item => item.canSubmit === "Y");
		}

		const exactMatches = filteredData.filter(
			item => item.title.toLowerCase() === query.toLowerCase()
		);

		let partialMatches = filteredData.filter(
			item => item.title.toLowerCase().includes(query.toLowerCase()) &&
				item.title.toLowerCase() !== query.toLowerCase()
		);

		// ✅ Sort partial matches alphabetically by title
		partialMatches = partialMatches.sort((a, b) => a.title.localeCompare(b.title));

		// Combine with exact matches first
		const matches = [...exactMatches, ...partialMatches].slice(0, 9);

		if (matches.length === 0) {
			const li = document.createElement("li");
			li.innerHTML = `<a>No journals found for '<strong>${query}</strong>'</a>`;
			suggestionsEl.appendChild(li);
			suggestionsEl.style.display = `block`;
			return;
		}

		matches.forEach(item => {
			const regex = new RegExp(query, "gi");
			const highlightedTitle = item.title.replace(regex, match => `<strong>${match}</strong>`);

			const li = document.createElement("li");
			li.innerHTML = `<a href="${item.url}" target="_self">${highlightedTitle}</a>`;
			suggestionsEl.appendChild(li);
			suggestionsEl.style.display = `block`;
		});
	};


	utils.init();
})(window);