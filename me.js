import { config } from './config/default.js';
import { ls } from './getLocalStorage.js';

const username = document.querySelector('#username');
const fullName = document.querySelector('#fullName');
const bio = document.querySelector('#bio');
const editProfileBtn = document.querySelector('.editProfile');
const sosmedContainer = document.querySelector('.sosmed');
const listHobby = document.querySelector('.list-hobby');

window.addEventListener('load', async function (e) {
  const response = await fetch(
    `${config.apiURL}/user/${ls.hobbyAuth.userProfileId}`,
    {
      credentials: 'include',
      headers: {
        ...config.fetchOption.headers,
      },
    },
  );
  const data = await response.json();
  console.log(data);

  username.value = data.username;
  fullName.value = data.fullName;
  bio.textContent = data.bio;
  Object.keys(data.sosmed).forEach((key) => {
    sosmedContainer.insertAdjacentHTML(
      'beforeend',
      `<button type="button" class="btn btn-outline-danger mt-5"><a href="${
        key === 'instagram'
          ? 'https://www.instagram.com/' + data.sosmed.instagram
          : key === 'tiktok'
          ? 'https://www.tiktok.com/@' + data.sosmed.tiktok
          : key === 'linkedin'
          ? 'https://www.linkedin/in/' + data.sosmed.linkedin
          : data.sosmed.website
      }">${key}</a></button>`,
    );
  });
  console.log(data.hobby, data.hobbies);
  data.hobbies.forEach((hobby) => {
    listHobby.insertAdjacentHTML(
      'beforeend',
      `<button type="button" class="btn btn-outline-danger mt-5">
        <a href="listHobby.html?hobbyId=${hobby.id}">${hobby.name}</a>
      </button>`,
    );
  });
});

editProfileBtn.addEventListener('click', (e) => {
  e.preventDefault();
  location.href = 'profile.html';
});
