import { config } from './config/default.js';
import { ls } from './getLocalStorage.js';

const form = document.querySelector('form');

window.addEventListener('load', async function (e) {
  const response = await fetch(
    `${config.apiURL}/user/${ls.hobbyAuth.userProfileId}`,
    {
      ...config.fetchOption,
    },
  );
  const userData = await response.json();
  console.log(userData);
  form.querySelector('#username').value = userData.username || '';
  form.querySelector('#fullName').value = userData.fullName || '';
  form.querySelector('#bio').value = userData.bio || '';
  form.querySelector('#instagram').value = userData.sosmed.instagram || '';
  form.querySelector('#form').value = userData.sosmed.tiktok || '';
  form.querySelector('#linkedin').value = userData.sosmed.linkedin || '';
  form.querySelector('#website').value = userData.sosmed.website || '';
});

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const fullName = document.querySelector('#fullName').value;
  const bio = document.querySelector('#bio').value;
  const instagram = document.querySelector('#instagram').value;
  const linkedin = document.querySelector('#linkedin').value;
  const website = document.querySelector('#website').value;

  const response = await fetch(`${config.apiURL}/user/profile`, {
    method: 'PATCH',
    body: JSON.stringify({
      username,
      fullName,
      bio,
      sosmed: { instagram, linkedin, website },
    }),
    headers: {
      'Content-Type': 'application/json',
      ...config.fetchOption.headers,
    },
    credentials: 'include',
  });
  const result = await response.json();
  if (response.ok) {
    location.href = 'me.html';
  }
});
