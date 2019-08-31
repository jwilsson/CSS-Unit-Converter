import UnitConverter from './unit-converter';

const converter = new UnitConverter();

const onInput = () => {
    const result = converter.convert({
        base: document.querySelector('.base-size').value,
        decimals: document.querySelector('.decimals').value,
        dpi: document.querySelector('.dpi').value,
        from: document.querySelector('.from-unit').value,
        to: document.querySelector('.to-unit').value,
        value: document.querySelector('.from').value,
    });

    document.querySelector('.result').textContent = result || 'N/A';
};

window.addEventListener('DOMContentLoaded', () => {
    const fragment = document.createDocumentFragment();
    const from = document.querySelector('.from');

    from.value = localStorage.getItem(from.name) || '';

    converter.getUnits().forEach((unit) => {
        const option = document.createElement('option');

        option.value = unit;
        option.textContent = unit;

        fragment.appendChild(option);
    });

    // Select the correct value
    const selects = document.querySelectorAll('select');

    selects.forEach((select) => {
        const unit = localStorage.getItem(select.name);
        let selected;

        if (unit) {
            selected = fragment.querySelector(`[value='${unit}']`);
            selected.defaultSelected = true;
        }

        select.appendChild(fragment.cloneNode(true));

        if (selected) {
            selected.defaultSelected = false;
        }
    });

    const settings = document.querySelectorAll('.settings input');

    settings.forEach((setting) => {
        setting.value = localStorage.getItem(setting.name) || setting.value;
    });

    const inputs = document.querySelectorAll('input, select');

    inputs.forEach((element) => {
        element.addEventListener('input', onInput);
    });

    document.querySelector('.toggle').addEventListener('click', () => {
        document.querySelector('.settings').classList.toggle('show');
    });

    // Save all values once every 30 seconds
    setInterval(() => {
        inputs.forEach((element) => {
            localStorage.setItem(element.name, element.value);
        });
    }, 30000);
});
