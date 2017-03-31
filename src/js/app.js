import UnitConverter from './unit-converter';
import '../css/style.css';

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
