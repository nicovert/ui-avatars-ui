//Functions
const refreshImage = () => {
	const options = getOptionsObject();
	setCookie(options);
	const imageURL = generate(options);

	const svg = document.getElementById('svgRender');
	svg.src = imageURL;
	svg.onload = () => {
		// Get the canvas and its context
      	const canvas = document.getElementById('canvasRender');
      	const ctx = canvas.getContext('2d');
      	// Set the canvas dimensions to the SVG image dimensions
      	canvas.width = svg.width;
      	canvas.height = svg.height;
      	// Draw the SVG image onto the canvas
      	ctx.drawImage(svg, 0, 0);
	}
};

const getOptionsObject = () => {
	const options = {
		name: document.getElementById("name").value,
		size: document.getElementById("size").value,
		fontSize: document.getElementById("fontSize").value,
		length: document.getElementById("length").value,
		rounded: document.getElementById("checkRounded").checked,
		bold: document.getElementById("checkBold").checked,
		uppercase: document.getElementById("checkUppercase").checked,
		background: document.getElementById("background").value,
		color: document.getElementById("color").value,
		format: document.getElementById("checkFormat").checked,
		//Dark Mode
		dark: document.getElementById("checkDark").checked,
	};

	return options;
};

const generate = (options) => {
	const {
		name = "Generate",
		size = "512",
		fontSize = "0.5",
		length = "2",
		rounded = false,
		bold = false,
		uppercase = true,
		background = "0060DF",
		color = "ffffff",
		format = true,
	} = options;

	if (format) {
		//Set SVG to display, hide canvas
		document.getElementById("svgRender").style.display = "initial";
		document.getElementById("canvasRender").style.display = "none";
	} else {
		//Set canvas to display, hide SVG
		document.getElementById("svgRender").style.display = "none";
		document.getElementById("canvasRender").style.display = "initial";
	}

	const urlParams = `?name=${name}&size=${size}&font-size=${fontSize}&length=${length}&rounded=${rounded}&bold=${bold}&uppercase=${uppercase}&background=${background}&color=${color}&format=svg`;

	return `https://ui-avatars.com/api/${urlParams}`;
};

const setCookie = (options) => {
	const date = new Date();
	date.setTime(2147483647 * 1000);
	const expiresString = `expires=${date.toUTCString()}`;
	console.log("setCookie options", options);

	document.cookie = `name=${options.name};${expiresString};`;
	document.cookie = `size=${options.size};${expiresString};`;
	document.cookie = `fontSize=${options.fontSize};${expiresString};`;
	document.cookie = `length=${options.length};${expiresString};`;
	document.cookie = `checkRounded=${options.rounded};${expiresString};`;
	document.cookie = `checkBold=${options.bold};${expiresString};`;
	document.cookie = `checkUppercase=${options.uppercase};${expiresString};`;
	document.cookie = `background=${options.background};${expiresString};`;
	document.cookie = `color=${options.color};${expiresString};`;
	document.cookie = `checkFormat=${options.format};${expiresString};`;

	document.cookie = `checkDark=${options.dark};${expiresString};`;
};

const getCookie = () => {
	const cookieArr = document.cookie.split(";");
	if (cookieArr[0] === "") return;

	for (var i = cookieArr.length - 1; i >= 0; i--) {
		const cookie = cookieArr[i].split("=");
		const name = cookie[0].trim();
		const value = cookie[1].trim();
		console.log("getCookie name", name, "value", value);
		if (name.startsWith("check")) {
			const bool = value === "true" ? true : false;
			document.getElementById(name).checked = bool;
		} else {
			document.getElementById(name).value = value;
		}
	}
};

const updateTheme = () => {
	const dark = document.getElementById("checkDark").checked;
	const elements = document.getElementsByTagName("*");

	if (dark) {
		for (var i = elements.length - 1; i >= 0; i--) {
			if (!elements[i].classList.contains("dark"))
				elements[i].classList.add("dark");
		}
	} else {
		for (var i = elements.length - 1; i >= 0; i--) {
			elements[i].classList.remove("dark");
		}
	}
};

//Listeners
document
	.getElementById("buttonRefresh")
	.addEventListener("click", refreshImage);
document.getElementById("checkDark").addEventListener("change", updateTheme);
window.addEventListener("load", getCookie);
window.addEventListener("load", refreshImage);
window.addEventListener("load", updateTheme);
