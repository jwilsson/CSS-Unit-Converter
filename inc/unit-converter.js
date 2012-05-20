// CSS Unit converter 1.4 Copyright 2011-2012 Jonathan Wilsson
(function () {
	var UnitConverter = {
		fromCM: function(value, to, base, dpi) {
			var result;

			switch (to) {
				case "em":
					result = value / 0.42175176;
					break;
				case "in":
					result = value * 0.39;
					break;
				case "mm":
					result = value * 10;
					break;
				case "pc":
					result = value / 0.42175176;
					break;
				case "pt":
					result = value * 28.3464566929;
					break;
				case "%":
					result = value / base * 100 / 2.54 * dpi;
					break;
				case "px":
					result = value / 2.54 * dpi;
					break;
				case "rem":
					result = value / 0.42175176;
					break;
			}

			return result;
		},
		fromEM: function(value, to, base) {
			var result;

			switch (to) {
				case "cm":
					result = value * 0.42175176;
					break;
				case "in":
					result = value * 0.166044;
					break;
				case "mm":
					result = value / 0.237106301584;
					break;
				case "pc":
					result = value;
					break;
				case "pt":
					result = value * 11.955168;
					break;
				case "%":
					result = value * 100;
					break;
				case "px":
					result = value * base;
					break;
				case "rem":
					result = value;
					break;
			}

			return result;
		},
		fromIN: function(value, to, base, dpi) {
			var result;

			switch (to) {
				case "cm":
					result = value * 2.54;
					break;
				case "em":
					result = value / 0.166044;
					break;
				case "mm":
					result = value * 2.54 * 10;
					break;
				case "pc":
					result = value / 0.166044;
					break;
				case "pt":
					result = value / 0.014842519685;
					break;
				case "%":
					result = value / base * 100 * dpi;
					break;
				case "px":
					result = value * dpi;
					break;
				case "rem":
					result = value / 0.166044;
					break;
			}

			return result;
		},
		fromMM: function(value, to, base, dpi) {
			var result;

			switch (to) {
				case "cm":
					result = value / 10;
					break;
				case "em":
					result = value * 0.237106301584;
					break;
				case "in":
					result = value * 0.39 / 10;
					break;
				case "pc":
					result = value / 4.42175176;
					break;
				case "pt":
					result = value / 0.352777777778;
					break;
				case "%":
					result = value / base * 100 / 2.54 * dpi / 10;
					break;
				case "px":
					result = value / 2.54 * dpi / 10;
					break;
				case "rem":
					result = value * 0.237106301584;
					break;
			}

			return result;
		},
		fromPC: function(value, to, base) {
			var result;

			switch (to) {
				case "cm":
					result = value * 0.42175176;
					break;
				case "em":
					result = value;
					break;
				case "in":
					result = value * 0.166044;
					break;
				case "mm":
					result = value * 4.42175176;
					break;
				case "pt":
					result = value / 0.0836458341698;
					break;
				case "%":
					result = value * 100;
					break;
				case "px":
					result = value * base;
					break;
				case "rem":
					result = value;
					break;
			}

			return result;
		},
		fromPT: function(value, to, base) {
			var result;

			switch (to) {
				case "cm":
					result = value / 28.3464566929;
					break;
				case "em":
					result = value / 11.955168;
					break;
				case "in":
					result = value * 0.014842519685;
					break;
				case "mm":
					result = value * 0.352777777778;
					break;
				case "pc":
					result = value * 0.0836458341698;
					break;
				case "%":
					result = value / (base - 4) * 100;
					break;
				case "px":
					result = value * 96 / 72;
					break;
				case "rem":
					result = value / 11.955168;
					break;
			}

			return result;
		},
		fromPR: function(value, to, base, dpi) {
			var result;

			switch (to) {
				case "cm":
					result = value * base / 100 * 2.54 / dpi;
					break;
				case "em":
					result = value / 100;
					break;
				case "in":
					result = value * base / 100 / dpi;
					break;
				case "mm":
					result = value * base / 100 * 2.54 / dpi * 10;
					break;
				case "pc":
					result = value / 100;
					break;
				case "pt":
					result = value * (base - 4) / 100;
					break;
				case "px":
					result = value * base / 100;
					break;
				case "rem":
					result = value / 100;
					break;
			}

			return result;
		},
		fromPX: function(value, to, base, dpi) {
			var result;

			switch (to) {
				case "cm":
					result = value * 2.54 / dpi;
					break;
				case "em":
					result = value / base;
					break;
				case "in":
					result = value / dpi;
					break;
				case "mm":
					result = value * 2.54 / dpi * 10;
					break;
				case "pc":
					result = value / base;
					break;
				case "pt":
					result = value * 72 / 96;
					break;
				case "%":
					result = value / base * 100;
					break;
				case "rem":
					result = value / base;
					break;
			}

			return result;
		},
		fromREM: function(value, to, base) {
			var result;

			switch (to) {
				case "cm":
					result = value * 0.42175176;
					break;
				case "em":
					result = value;
					break;
				case "in":
					result = value * 0.166044;
					break;
				case "mm":
					result = value / 0.237106301584;
					break;
				case "pc":
					result = value;
					break;
				case "pt":
					result = value * 11.955168;
					break;
				case "%":
					result = value * 100;
					break;
				case "px":
					result = value * base;
					break;
			}

			return result;
		}
	};

	function roundNumber(number, decimals) {
		return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
	}

	function init(value, from, to, base, dpi, decimals) {
		var func = "from" + from.toUpperCase(), result = UnitConverter[func](value, to, base, dpi);

		return (isNaN(result) ? "N/A" : roundNumber(result, decimals) + to);
	}

	window.UnitConverter = init;
}());

function run() {
	document.getElementById("result").innerHTML = UnitConverter(
		document.getElementById("from").value,
		document.getElementById("from-unit").value,
		document.getElementById("to-unit").value,
		document.getElementById("base-size").value,
		document.getElementById("dpi").value,
		document.getElementById("decimals").value
	);
}

window.addEventListener("DOMContentLoaded", function () {
	// Listen for change on all <input> and <select>s
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