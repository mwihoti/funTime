const buttonA = document.querySelector('#button_A');
const headingA = document.querySelector('#heading_A');


buttonA.addEventListener('click', () => {
    alert(`Hello ${prompt("What is your name.?")}, nice to see you!`);
    headingA.textContent = `Welcome ${prompt("What is your name?")}`
})