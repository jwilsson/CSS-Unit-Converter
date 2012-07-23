// CSS Unit converter 1.5 Copyright 2011-2012 Jonathan Wilsson
function roundNumber (number, decimals) {
	return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

function convert (value, from, to, base, dpi, decimals) {
	var units = from + "-" + to, result, formulas = {
		"cm-em": value / 0.42175176,
		"cm-in": value * 0.39,
		"cm-mm": value * 10,
		"cm-pc": value / 0.42175176,
		"cm-pt": value * 28.3464566929,
		"cm-%": value / base * 100 / 2.54 * dpi,
		"cm-px": value / 2.54 * dpi,
		"cm-rem": value / 0.42175176,
	
		"em-cm": value * 0.42175176,
		"em-in": value * 0.166044,
		"em-mm": value / 0.237106301584,
		"em-pc": value,
		"em-pt": value * 11.955168,
		"em-%": value * 100,
		"em-px": value * base,
		"em-rem": value,
	
		"in-cm": value * 2.54,
		"in-em": value / 0.166044,
		"in-mm": value * 2.54 * 10,
		"in-pc": value / 0.166044,
		"in-pt": value / 0.014842519685,
		"in-%": value / base * 100 * dpi,
		"in-px": value * dpi,
		"in-rem": value / 0.166044,
	
		"mm-cm": value / 10,
		"mm-em": value * 0.237106301584,
		"mm-in": value * 0.39 / 10,
		"mm-pc": value / 4.42175176,
		"mm-pt": value / 0.352777777778,
		"mm-%": value / base * 100 / 2.54 * dpi / 10,
		"mm-px": value / 2.54 * dpi / 10,
		"mm-rem": value * 0.237106301584,
	
		"pc-cm": value * 0.42175176,
		"pc-em": value,
		"pc-in": value * 0.166044,
		"pc-mm": value * 4.42175176,
		"pc-pt": value / 0.0836458341698,
		"pc-%": value * 100,
		"pc-px": value * base,
		"pc-rem": value,
	
		"pt-cm": value / 28.3464566929,
		"pt-em": value / 11.955168,
		"pt-in": value * 0.014842519685,
		"pt-mm": value * 0.352777777778,
		"pt-pc": value * 0.0836458341698,
		"pt-%": value / (base - 4) * 100,
		"pt-px": value * 96 / 72,
		"pt-rem": value / 11.955168,
	
		"%-cm": value * base / 100 * 2.54 / dpi,
		"%-em": value / 100,
		"%-in": value * base / 100 / dpi,
		"%-mm": value * base / 100 * 2.54 / dpi * 10,
		"%-pc": value / 100,
		"%-pt": value * (base - 4) / 100,
		"%-px": value * base / 100,
		"%-rem": value / 100,
	
		"px-cm": value * 2.54 / dpi,
		"px-em": value / base,
		"px-in": value / dpi,
		"px-mm": value * 2.54 / dpi * 10,
		"px-pc": value / base,
		"px-pt": value * 72 / 96,
		"px-%": value / base * 100,
		"px-rem": value / base,
	
		"rem-cm": value * 0.42175176,
		"rem-em": value,
		"rem-in": value * 0.166044,
		"rem-mm": value / 0.237106301584,
		"rem-pc": value,
		"rem-pt": value * 11.955168,
		"rem-%": value * 100,
		"rem-px": value * base
	};

	result = formulas[units] || false;

	return (isNaN(result) ? "N/A" : roundNumber(result, decimals) + to);
}

function run() {
	document.getElementById("result").innerHTML = convert(
		document.getElementById("from").value,
		document.getElementById("from-unit").value,
		document.getElementById("to-unit").value,
		document.getElementById("base-size").value,
		document.getElementById("dpi").value,
		document.getElementById("decimals").value
	);
}

window.addEventListener("DOMContentLoaded", function () {
	// Listen for change on all <input>s and <select>s
	var elems = document.querySelectorAll("input, select"), i, len = elems.length;

	for (i = 0; i < len; i++) {
		elems[i].addEventListener("keyup", run, false);
		elems[i].addEventListener("change", run, false);
	}

	// Toogle display of setting forms
	document.getElementById("toggle").addEventListener("click", function (e) {
		var settings = document.getElementById("settings");

		e.preventDefault();

		settings.className = (settings.className === "" ? "show" : "");
	});
}, false);