import { config } from './config/default.js';

const container = document.querySelector('.list-hobby');

window.addEventListener('load', async (e) => {
  const urlParams = new URLSearchParams(location.search);
  const response = await fetch(
    `${config.apiURL}/hobbies/users/${urlParams.get('hobbyId')}`,
    {
      credentials: 'include',
      headers: {
        ...config.fetchOption.headers,
      },
    },
  );
  const data = await response.json();
  data.data.users.forEach((user) => {
    container.insertAdjacentHTML(
      'beforeend',
      `<div class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${user.username}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${user.fullName}</h6>
          <p class="card-text">
           ${user.bio}
          </p>
          <a href="https://www.instagram.com/${user.sosmed.instagram}" class="card-link">Instagram</a>
          <a href="https://www.tiktok.com/@${user.sosmed.tiktok}" class="card-link">Tiktok</a>
          <a href="https://www.linkedin.com/in/${user.sosmed.linkedin}" class="card-link">LinkedIn</a>
          <a href="${user.sosmed.website}" class="card-link">Website</a>
        </div>
        </div>`,
    );
  });
});
