;(function () {
	var roundNumber = function (number, decimals) {
		return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
	},

	toArray = function (object) {
		return [].slice.call(object);
	},

	convert = function (value, from, to, base, dpi, decimals) {
		var units = from + '-' + to,
			result,
			formulas = {
				'cm-em': value / 0.42175176,
				'cm-in': value * 0.39,
				'cm-mm': value * 10,
				'cm-pc': value / 0.42175176,
				'cm-pt': value * 28.3464566929,
				'cm-%': value / base * 100 / 2.54 * dpi,
				'cm-px': value / 2.54 * dpi,

				'em-cm': value * 0.42175176,
				'em-in': value * 0.166044,
				'em-mm': value / 0.237106301584,
				'em-pc': value,
				'em-pt': value * 11.955168,
				'em-%': value * 100,
				'em-px': value * base,

				'in-cm': value * 2.54,
				'in-em': value / 0.166044,
				'in-mm': value * 2.54 * 10,
				'in-pc': value / 0.166044,
				'in-pt': value / 0.014842519685,
				'in-%': value / base * 100 * dpi,
				'in-px': value * dpi,

				'mm-cm': value / 10,
				'mm-em': value * 0.237106301584,
				'mm-in': value * 0.39 / 10,
				'mm-pc': value / 4.42175176,
				'mm-pt': value / 0.352777777778,
				'mm-%': value / base * 100 / 2.54 * dpi / 10,
				'mm-px': value / 2.54 * dpi / 10,

				'pc-cm': value * 0.42175176,
				'pc-em': value,
				'pc-in': value * 0.166044,
				'pc-mm': value * 4.42175176,
				'pc-pt': value / 0.0836458341698,
				'pc-%': value * 100,
				'pc-px': value * base,

				'pt-cm': value / 28.3464566929,
				'pt-em': value / 11.955168,
				'pt-in': value * 0.014842519685,
				'pt-mm': value * 0.352777777778,
				'pt-pc': value * 0.0836458341698,
				'pt-%': value / (base - 4) * 100,
				'pt-px': value * 96 / 72,

				'%-cm': value * base / 100 * 2.54 / dpi,
				'%-em': value / 100,
				'%-in': value * base / 100 / dpi,
				'%-mm': value * base / 100 * 2.54 / dpi * 10,
				'%-pc': value / 100,
				'%-pt': value * (base - 4) / 100,
				'%-px': value * base / 100,

				'px-cm': value * 2.54 / dpi,
				'px-em': value / base,
				'px-in': value / dpi,
				'px-mm': value * 2.54 / dpi * 10,
				'px-pc': value / base,
				'px-pt': value * 72 / 96,
				'px-%': value / base * 100
			};

		result = formulas[units] || value;

		return (isNaN(result) ? 'N/A' : roundNumber(result, decimals) + to);
	},

	setupUnits = function () {
		var selects = document.querySelectorAll('select'),
			fragment = document.createDocumentFragment(),
			options = [],
			units = ['cm', 'em', 'in', 'mm', 'pc', 'pt', '%', 'px'];

		units.forEach(function (unit) {
			var option = document.createElement('option');

			option.value = unit;
			option.textContent = unit;

			fragment.appendChild(option);
		});

		toArray(selects).forEach(function (select) {
			select.appendChild(fragment.cloneNode(true));
		});
	},

	run = function () {
		document.querySelector('.result').innerHTML = convert(
			document.querySelector('.from').value,
			document.querySelector('.from-unit').value,
			document.querySelector('.to-unit').value,
			document.querySelector('.base-size').value,
			document.querySelector('.dpi').value,
			document.querySelector('.decimals').value
		);
	};

	window.addEventListener('DOMContentLoaded', function () {
		var elements = document.querySelectorAll('input, select');

		setupUnits();

		toArray(elements).forEach(function (element) {
			element.addEventListener('change', run);
			element.addEventListener('keyup', run);
		});

		// Toogle display of setting forms
		document.querySelector('.toggle').addEventListener('click', function (e) {
			e.preventDefault();

			document.querySelector('.settings').classList.toggle('show');
		});
	});
}());