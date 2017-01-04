((window, document) => {
    'use strict';

    class UnitConverter {
        constructor () {
            const fragment = document.createDocumentFragment();

            // Set from value
            const from = document.querySelector('.from');

            from.value = localStorage.getItem(from.name) || '';

            // Build list of units
            const units = ['ch', 'cm', 'em', 'ex', 'in', 'mm', 'pc', 'pt', '%', 'px', 'q'];

            units.forEach((unit) => {
                const option = document.createElement('option');

                option.value = unit;
                option.textContent = unit;

                fragment.appendChild(option);
            });

            // Select the correct value
            const selects = document.querySelectorAll('select');

            Array.from(selects).forEach((select) => {
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
            });

            // Add the setting values
            const settings = document.querySelectorAll('.settings input');

            Array.from(settings).forEach((setting) => {
                setting.value = localStorage.getItem(setting.name) || setting.value;
            });
        }

        round (number, decimals) {
            return Math.round(number * 10 ** decimals) / 10 ** decimals;
        }

        convert (options) {
            /* eslint-disable sort-keys */
            const formulas = {
                'ch-cm': options.value * 0.21087588,
                'ch-em': options.value * 0.5,
                'ch-ex': options.value / 0.9,
                'ch-in': options.value * 0.083022,
                'ch-mm': options.value * 2.1087588,
                'ch-pc': options.value * 0.5,
                'ch-pt': options.value * 5.977584,
                'ch-%': options.value * 50,
                'ch-px': options.value * options.base * 0.5,
                'ch-q': options.value * 8.4350352,

                'cm-ch': options.value / 0.21087588,
                'cm-em': options.value / 0.42175176,
                'cm-ex': options.value / 0.189788292,
                'cm-in': options.value * 0.39,
                'cm-mm': options.value * 10,
                'cm-pc': options.value / 0.42175176,
                'cm-pt': options.value * 28.3464566929,
                'cm-%': options.value / options.base * 100 / 2.54 * options.dpi,
                'cm-px': options.value / 2.54 * options.dpi,
                'cm-q': options.value * 40,

                'em-ch': options.value / 0.5,
                'em-cm': options.value * 0.42175176,
                'em-ex': options.value / 0.45,
                'em-in': options.value * 0.166044,
                'em-mm': options.value / 0.237106301584,
                'em-pc': options.value,
                'em-pt': options.value * 11.955168,
                'em-%': options.value * 100,
                'em-px': options.value * options.base,
                'em-q': options.value, // Todo

                'ex-ch': options.value * 0.9,
                'ex-cm': options.value * 0.189788292,
                'ex-em': options.value * 0.45,
                'ex-in': options.value * 0.0747198,
                'ex-mm': options.value * 1.89788292,
                'ex-pc': options.value * 0.45,
                'ex-pt': options.value * 5.3798256,
                'ex-%': options.value * 45,
                'ex-px': options.value * options.base * 0.45,
                'ex-q': options.value, // Todo

                'in-ch': options.value / 0.083022,
                'in-cm': options.value * 2.54,
                'in-em': options.value / 0.166044,
                'in-ex': options.value / 0.0747198,
                'in-mm': options.value * 2.54 * 10,
                'in-pc': options.value / 0.166044,
                'in-pt': options.value / 0.014842519685,
                'in-%': options.value / options.base * 100 * options.dpi,
                'in-px': options.value * options.dpi,
                'in-q': options.value * 101.6,

                'mm-ch': options.value / 2.1087588,
                'mm-cm': options.value / 10,
                'mm-em': options.value * 0.237106301584,
                'mm-ex': options.value / 1.89788292,
                'mm-in': options.value * 0.39 / 10,
                'mm-pc': options.value / 4.42175176,
                'mm-pt': options.value / 0.352777777778,
                'mm-%': options.value / options.base * 100 / 2.54 * options.dpi / 10,
                'mm-px': options.value / 2.54 * options.dpi / 10,
                'mm-q': options.value * 4,

                'pc-ch': options.value / 0.5,
                'pc-cm': options.value * 0.42175176,
                'pc-em': options.value,
                'pc-ex': options.value / 0.45,
                'pc-in': options.value * 0.166044,
                'pc-mm': options.value * 4.42175176,
                'pc-pt': options.value / 0.0836458341698,
                'pc-%': options.value * 100,
                'pc-px': options.value * options.base,
                'pc-q': options.value, // Todo

                'pt-ch': options.value / 5.977584,
                'pt-cm': options.value / 28.3464566929,
                'pt-em': options.value / 11.955168,
                'pt-ex': options.value / 5.3798256,
                'pt-in': options.value * 0.014842519685,
                'pt-mm': options.value * 0.352777777778,
                'pt-pc': options.value * 0.0836458341698,
                'pt-%': options.value / (options.base - 4) * 100,
                'pt-px': options.value * 96 / 72,
                'pt-q': options.value, // Todo

                '%-ch': options.value / 50,
                '%-cm': options.value * options.base / 100 * 2.54 / options.dpi,
                '%-em': options.value / 100,
                '%-ex': options.value / 45,
                '%-in': options.value * options.base / 100 / options.dpi,
                '%-mm': options.value * options.base / 100 * 2.54 / options.dpi * 10,
                '%-pc': options.value / 100,
                '%-pt': options.value * (options.base - 4) / 100,
                '%-px': options.value * options.base / 100,
                '%-q': options.value, // Todo

                'px-ch': options.value / options.base / 0.5,
                'px-cm': options.value * 2.54 / options.dpi,
                'px-em': options.value / options.base,
                'px-ex': options.value / options.base / 0.45,
                'px-in': options.value / options.dpi,
                'px-mm': options.value * 2.54 / options.dpi * 10,
                'px-pc': options.value / options.base,
                'px-pt': options.value * 72 / 96,
                'px-%': options.value / options.base * 100,
                'px-q': options.value, // Todo

                'q-ch': options.value / 8.4350352,
                'q-cm': options.value / 40,
                'q-em': options.value, // Todo
                'q-ex': options.value, // Todo
                'q-in': options.value / 101.6,
                'q-mm': options.value / 4,
                'q-pc': options.value, // Todo
                'q-pt': options.value, // Todo
                'q-%': options.value, // Todo
                'q-px': options.value, // Todo
            };

            const units = `${ options.from }-${ options.to }`;
            const result = formulas[units];

            return (isNaN(result) ? 'N/A' : this.round(result, options.decimals) + options.to);
        }

        onInput () {
            document.querySelector('.result').textContent = this.convert({
                base: document.querySelector('.base-size').value,
                decimals: document.querySelector('.decimals').value,
                dpi: document.querySelector('.dpi').value,
                from: document.querySelector('.from-unit').value,
                to: document.querySelector('.to-unit').value,
                value: document.querySelector('.from').value,
            });
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('input, select');
        const converter = new UnitConverter();
        const onInput = converter.onInput.bind(converter);

        Array.from(elements).forEach((element) => {
            element.addEventListener('input', onInput);
        });

        // Toogle display of setting inputs
        document.querySelector('.toggle').addEventListener('click', () => {
            document.querySelector('.settings').classList.toggle('show');
        });

        // Save all values once every 30 seconds
        setInterval(() => {
            Array.from(elements).forEach((element) => {
                localStorage.setItem(element.name, element.value);
            });
        }, 30000);
    });
})(window, document);
