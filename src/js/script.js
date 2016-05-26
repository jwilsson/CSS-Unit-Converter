((window, document) => {
    'use strict';

    const round = (number, decimals) => {
        return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
    };

    const convert = (options) => {
        const units = `${ options.from }-${ options.to }`;
        const formulas = {
            'cm-em': options.value / 0.42175176,
            'cm-ex': options.value / 0.189788292,
            'cm-in': options.value * 0.39,
            'cm-mm': options.value * 10,
            'cm-pc': options.value / 0.42175176,
            'cm-pt': options.value * 28.3464566929,
            'cm-%': options.value / options.base * 100 / 2.54 * options.dpi,
            'cm-px': options.value / 2.54 * options.dpi,

            'em-cm': options.value * 0.42175176,
            'em-ex': options.value / 0.45,
            'em-in': options.value * 0.166044,
            'em-mm': options.value / 0.237106301584,
            'em-pc': options.value,
            'em-pt': options.value * 11.955168,
            'em-%': options.value * 100,
            'em-px': options.value * options.base,

            'ex-cm': options.value * 0.189788292,
            'ex-em': options.value * 0.45,
            'ex-in': options.value * 0.0747198,
            'ex-mm': options.value * 1.89788292,
            'ex-pc': options.value * 0.45,
            'ex-pt': options.value * 5.3798256,
            'ex-%': options.value * 45,
            'ex-px': options.value * options.base * 0.45,

            'in-cm': options.value * 2.54,
            'in-em': options.value / 0.166044,
            'in-ex': options.value / 0.0747198,
            'in-mm': options.value * 2.54 * 10,
            'in-pc': options.value / 0.166044,
            'in-pt': options.value / 0.014842519685,
            'in-%': options.value / options.base * 100 * options.dpi,
            'in-px': options.value * options.dpi,

            'mm-cm': options.value / 10,
            'mm-em': options.value * 0.237106301584,
            'mm-ex': options.value / 1.89788292,
            'mm-in': options.value * 0.39 / 10,
            'mm-pc': options.value / 4.42175176,
            'mm-pt': options.value / 0.352777777778,
            'mm-%': options.value / options.base * 100 / 2.54 * options.dpi / 10,
            'mm-px': options.value / 2.54 * options.dpi / 10,

            'pc-cm': options.value * 0.42175176,
            'pc-em': options.value,
            'pc-ex': options.value / 0.45,
            'pc-in': options.value * 0.166044,
            'pc-mm': options.value * 4.42175176,
            'pc-pt': options.value / 0.0836458341698,
            'pc-%': options.value * 100,
            'pc-px': options.value * options.base,

            'pt-cm': options.value / 28.3464566929,
            'pt-em': options.value / 11.955168,
            'pt-ex': options.value / 5.3798256,
            'pt-in': options.value * 0.014842519685,
            'pt-mm': options.value * 0.352777777778,
            'pt-pc': options.value * 0.0836458341698,
            'pt-%': options.value / (options.base - 4) * 100,
            'pt-px': options.value * 96 / 72,

            '%-cm': options.value * options.base / 100 * 2.54 / options.dpi,
            '%-em': options.value / 100,
            '%-ex': options.value / 45,
            '%-in': options.value * options.base / 100 / options.dpi,
            '%-mm': options.value * options.base / 100 * 2.54 / options.dpi * 10,
            '%-pc': options.value / 100,
            '%-pt': options.value * (options.base - 4) / 100,
            '%-px': options.value * options.base / 100,

            'px-cm': options.value * 2.54 / options.dpi,
            'px-em': options.value / options.base,
            'px-ex': options.value / options.base / 0.45,
            'px-in': options.value / options.dpi,
            'px-mm': options.value * 2.54 / options.dpi * 10,
            'px-pc': options.value / options.base,
            'px-pt': options.value * 72 / 96,
            'px-%': options.value / options.base * 100,
        };

        const result = formulas[units];

        return (isNaN(result) ? 'N/A' : round(result, options.decimals) + options.to);
    };

    const setupForm = () => {
        const settings = document.querySelectorAll('.settings input');
        const fragment = document.createDocumentFragment();
        const selects = document.querySelectorAll('select');
        const from = document.querySelector('.from');
        const units = ['cm', 'em', 'ex', 'in', 'mm', 'pc', 'pt', '%', 'px'];

        // Set from value
        from.value = localStorage.getItem(from.name) || '';

        // Add the units
        units.forEach((unit) => {
            const option = document.createElement('option');

            option.value = unit;
            option.textContent = unit;

            fragment.appendChild(option);
        });

        // Select correct value
        Reflect.apply(Array.prototype.forEach, selects, [(select) => {
            const unit = localStorage.getItem(select.name);
            let selected;

            if (unit) {
                selected = fragment.querySelector(`[value="${ unit }"]`);
                selected.defaultSelected = true;
            }

            select.appendChild(fragment.cloneNode(true));

            if (selected) {
                selected.defaultSelected = false;
            }
        }]);

        // Add settings
        Reflect.apply(Array.prototype.forEach, settings, [(setting) => {
            setting.value = localStorage.getItem(setting.name) || setting.value;
        }]);
    };

    const run = () => {
        document.querySelector('.result').textContent = convert({
            value: document.querySelector('.from').value,
            from: document.querySelector('.from-unit').value,
            to: document.querySelector('.to-unit').value,
            base: document.querySelector('.base-size').value,
            dpi: document.querySelector('.dpi').value,
            decimals: document.querySelector('.decimals').value,
        });
    };

    window.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('input, select');

        setupForm();

        Reflect.apply(Array.prototype.forEach, elements, [(element) => {
            element.addEventListener('change', run);
            element.addEventListener('keyup', run);
        }]);

        // Toogle display of setting forms
        document.querySelector('.toggle').addEventListener('click', () => {
            document.querySelector('.settings').classList.toggle('show');
        });

        // Save all values once every 30 seconds
        setInterval(() => {
            Reflect.apply(Array.prototype.forEach, elements, [(element) => {
                localStorage.setItem(element.name, element.value);
            }]);
        }, 30000);
    });
})(window, document);
