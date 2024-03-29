let indexImg = 0;
let parentImg = null;
let viewport = document.querySelector('meta[name="viewport"]');

let category = document.querySelector(`${document.getElementById("ACTIVE").href.slice(document.getElementById("ACTIVE").href.indexOf("#"))}`);
category.classList.add("ACTIVE");
for (let a of document.querySelectorAll(".navbar-options")) {
	a.addEventListener("click", async e => {
		for (let ad of document.querySelectorAll(".navbar-options")) {
			ad.style.translate = "0 0";
			ad.id = ""
			document.querySelector(`${ad.href.slice(ad.href.indexOf("#"))}`).classList.remove("ACTIVE");
		}
		a.id = "ACTIVE";
		let category = document.querySelector(`${a.href.slice(a.href.indexOf("#"))}`);
		category.classList.add("ACTIVE");
		e.preventDefault();
	})
	let childArray = Array.from(document.querySelector(".navbar").children)
	a.addEventListener('mouseover', async e => {
		if (a.id == "ACTIVE") return;
		for (let ad of document.querySelectorAll(".navbar-options")) {
			let amount = 6 * (ad.id == "ACTIVE" ? 2 : 1);
			if (ad != a) ad.style.translate = (childArray.indexOf(ad) < childArray.indexOf(a) ? `-${amount}% 0` : `${amount}% 0`);
		}
	})
	a.addEventListener('mouseout', async e => {
		for (let ad of document.querySelectorAll(".navbar-options")) {
			if (ad != a) ad.style.translate = "0 0";
		}
	})
}

for (let div of document.querySelectorAll(".gallery-space-comics > img")) {
	let childArray = Array.from(document.querySelector(".gallery-space-comics").children)
	div.addEventListener("click", async e => {
		for (let imgs of document.querySelectorAll(".gallery-space-comics > img")) {
			imgs.id = ""
			imgs.style.translate = "0 0";
		}
		div.id = "ACTIVE";
		for (let diver of document.querySelectorAll(".gallery-space-comics > .gallery-space")) diver.style.display = "none"
		document.querySelector(`.gallery-space.${div.className}`).style.display = "inherit";
		document.querySelector(`.gallery-space.${div.className}`).id = "ACTIVEBOX";
	})
	div.addEventListener('mouseover', async e => {
		if (div.id == "ACTIVE") return;
		for (let ad of document.querySelectorAll(".gallery-space-comics > img")) {
			let amount = 6 * (ad.id == "ACTIVE" ? 2 : 1);
			if (ad != div) ad.style.translate = (childArray.indexOf(ad) < childArray.indexOf(div) ? `-${amount}% 0` : `${amount}% 0`);
		}
	})
	div.addEventListener('mouseout', async e => {
		for (let ad of document.querySelectorAll(".gallery-space-comics > img")) {
			if (ad != div) ad.style.translate = "0 0";
		}
	})
}

for (let img of document.querySelectorAll(".gallery-space > img, .gallery-space > .credited > img")) {
	img.addEventListener("click", async e => {
		parentImg = img.parentElement.querySelectorAll("img");
		indexImg = Array.from(parentImg).indexOf(img);
		document.querySelector(".fullscreen-image").style.display = "flex";
		document.querySelector(".fullscreen-image-content").src = img.src;
		document.querySelector(".fullscreen-image-lens").src = img.src;
		document.body.style.height = "100%";
		document.body.style.overflowY = "hidden";
		viewport.content = "initial-zoom: 1.0, max-scale=12";
	})
	img.addEventListener("mouseover", async e => {
		for (let img2 of document.querySelectorAll(".gallery-space > img")) {
			let top = img2.getBoundingClientRect().top - img.getBoundingClientRect().top;
			let left = img2.getBoundingClientRect().left - img.getBoundingClientRect().left;
			if (Math.abs((left + top) / 2) < 100) img2.style.translate = `${left / 100}px ${top / 100}px`
		}
	})
	img.addEventListener("mouseout", async e => {
		for (let img2 of document.querySelectorAll(".gallery-space > img")) {
			img2.style.translate = `0 0`;
		}
	})
}

document.querySelector(".fullscreen-image").addEventListener("mousedown", async e => {
	document.querySelector(".fullscreen-image").style.display = "none";
	document.body.style.height = "auto";
	document.body.style.overflowY = "scroll";
	viewport.content = 'width=device-width, initial-zoom=1, max-scale=12';
	return true;
})


document.querySelector("#LEFT.fullscreen-image-button").addEventListener("click", async e => {
	indexImg = mod(indexImg - 1, parentImg.length);
	changeImage(indexImg);
	viewport.content = 'initial-zoom: 1.0, max-scale=12';
	e.stopPropagation();
})

document.querySelector("#RIGHT.fullscreen-image-button").addEventListener("click", async e => {
	indexImg = mod(indexImg + 1, parentImg.length);
	changeImage(indexImg);
	viewport.content = 'initial-zoom: 1.0, max-scale=12';
	e.stopPropagation();
})

document.querySelector("#LEFT.fullscreen-image-button").addEventListener("mousedown", async e => {
	if (e.target.className != "fullscreen-image-content") e.stopPropagation();
})

document.querySelector("#RIGHT.fullscreen-image-button").addEventListener("mousedown", async e => {
	if (e.target.className != "fullscreen-image-content") e.stopPropagation();
})

document.querySelector(".fullscreen-image-content").addEventListener("mousedown", async e => {
	document.querySelector(".fullscreen-image-lens").id = "ACTIVATE";
	let ev = new MouseEvent("mousemove", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: e.x,
        clientY: e.y
    });
	document.querySelector(".fullscreen-image-content").dispatchEvent(ev);
})

document.querySelector(".fullscreen-image").addEventListener("mouseup", async e => {
	document.querySelector(".fullscreen-image-lens").id = "";
	let ev = new MouseEvent("mousemove", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: e.x,
        clientY: e.y
    });
	document.querySelector(".fullscreen-image-content").dispatchEvent(ev);
})

document.querySelector(".fullscreen-image-content").addEventListener("mousemove", doLensStuff)
document.querySelector(".fullscreen-image-lens").addEventListener("mousemove", doLensStuff)
document.querySelector(".content").addEventListener("mousedown", e => {e.stopPropagation();})

function doLensStuff(e) {
	let lens = document.querySelector(".fullscreen-image-lens");
	let ogImg = document.querySelector(".fullscreen-image-content");
	if (lens.id == "ACTIVATE" && ((e.x > ogImg.getBoundingClientRect().left && e.x < ogImg.getBoundingClientRect().right) && (e.y > ogImg.getBoundingClientRect().top && e.y < ogImg.getBoundingClientRect().bottom))) {
		lens.style.display = "inherit"
	}
	else {
		lens.style.display = "none"
	}
	let x = e.x - ogImg.getBoundingClientRect().left;
	let y = e.y - ogImg.getBoundingClientRect().top;
	let percentX = (x / ogImg.offsetWidth) * 100;
	let percentY = (y / ogImg.offsetHeight) * 100;
	lens.style.setProperty('--zoom-x', `${percentX}%`);
	lens.style.setProperty('--zoom-y', `${percentY}%`);
	lens.style.translate = `${-(percentX - 50)}% ${-(percentY - 45)}%`
	lens.style.scale = "2 2"
}

function changeImage(index) {
	document.querySelector(".fullscreen-image-content").src = parentImg[index].src;
	document.querySelector(".fullscreen-image-lens").src = parentImg[index].src;
}

function mod(n, m) {
	return ((n % m) + m) % m;
}