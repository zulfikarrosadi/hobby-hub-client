import { config } from './config/default.js';
import { ls } from './getLocalStorage.js';

const cardContent = document.querySelector('#cardContent');
const badgeContainer = document.querySelector('.badgeContainer');
const submitHobby = document.querySelector('#submitHobby');
const errorContainer = document.querySelector('.error');

const selectedHobby = [];

window.addEventListener('load', async function (e) {
  const response = await fetch(`${config.apiURL}/hobbies`, {
    headers: {
      ...config.fetchOption.headers,
    },
    credentials: 'include',
  });
  const hobbies = await response.json();

  hobbies.data.forEach((hobby) => {
    const cardTextElement = `
    <div class="col" data-hobbyId="${hobby.id}" data-hobbyName="${hobby.name}">
      <div class="card h-100" type="button" data-hobbyId="${hobby.id}">
        <img src="${hobby.image}" class="card-img-top" data-hobbyId="${hobby.id}" data-hobbyName="${hobby.name}"/>
        <div class="card-body data-hobbyId="${hobby.id}"">
          <h5 class="card-title" data-hobbyId="${hobby.id}">${hobby.name}</h5>
          <p class="card-text" data-hobbyId="${hobby.id}">${hobby.description}</p>
        </div>
      </div>
    </div>
    `;

    cardContent.insertAdjacentHTML('afterbegin', cardTextElement);
  });
});

cardContent.addEventListener('click', function (e) {
  const hobbyId = parseInt(e.target.dataset.hobbyid, 10);
  const hobbyName = e.target.dataset.hobbyname;
  console.log(hobbyName, hobbyId);
  selectedHobby.push(hobbyId);
  if (selectedHobby.length === new Set(selectedHobby).size) {
    badgeContainer.insertAdjacentHTML(
      'afterend',
      `<span class="badge badge-secondary" data-dataHobbyId="${hobbyId}">${hobbyName}</span>`,
    );
  }
});

submitHobby.addEventListener('click', async function (e) {
  const response = await fetch(`${config.apiURL}/user/hobby`, {
    method: 'POST',
    body: JSON.stringify({ hobbyId: [...new Set(selectedHobby)] }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...config.fetchOption.headers,
    },
  });
  const data = await response.json();

  if (response.ok) {
    location.href = 'me.html';
  } else if (response.status === 400) {
    errorContainer.insertAdjacentHTML(
      'afterend',
      `<div class="alert alert-danger" id="error">Something is wrong</div>`,
    );
  }
});
