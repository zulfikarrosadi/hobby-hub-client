import { config } from './config/default.js';
const form = document.querySelector('form');
const header = document.querySelector('.header');
console.log(form, header);
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  console.log(e);
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const passwordConfirmation = document.querySelector(
    '#passwordConfirmation',
  ).value;

  const response = await fetch(`${config.apiURL}/register`, {
    method: 'post',
    body: JSON.stringify({
      email,
      password,
      passwordConfirmation,
    }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  const data = await response.json();

  if (response.ok) {
    localStorage.setItem(config.hobbyAuth, JSON.stringify(data));
    location.href = 'profile.html';
  } else if (response.status === 400) {
    let errorMessage;
    if (Array.isArray(data)) {
      data.forEach((error) => {
        errorMessage = error.message;
      });
    }
    header.insertAdjacentHTML(
      'afterend',
      `<div class="alert alert-danger" id="error">${errorMessage}</div>`,
    );
  }
});
