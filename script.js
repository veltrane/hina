// Preload Images
const imagesToLoad = ['assets/buttons/arrow.png', 'assets/buttons/heart.png'];
const preloadedImages = [];

imagesToLoad.forEach(src => {
  const img = new Image();
  img.src = src;
  preloadedImages.push(img);
});

// Elements
const headingElement = document.querySelector('h1');
const inputElement = document.querySelector('input');
const buttonElement = document.querySelector('button');
const imageElement = document.querySelector('img');
const paragraphElement = document.querySelector('p');
const catElement = document.querySelector('.cat img');

// Audio & Video
const wowSound = new Audio('assets/wow.mp3');
document.querySelector('video').src = `assets/backgrounds/bg-${Math.floor(Math.random() * 2) + 1}.mp4`;

// Data
const triggerNames = ['hina', 'hinu', 'himna', 'himnu'];
const messages = [
  'u da real motu!',
  'meri pyari kaki',
  'chuchiooo 🥰',
  'hinaaaaaa',
  'meri jan ❤️'
];

let count = 0;
let timer1, timer2;

// Functions
function userInput(name) {
  clearTimeout(timer1);
  clearTimeout(timer2);
  inputElement.value = '';

  const isTrigger = triggerNames.includes(name.trim().toLowerCase());

  if (isTrigger) {
    wowSound.play().catch(() => { });
    headingElement.classList.add('hinu');
    typeWriter(messages[count]);
    countHandler();
  } else {
    headingElement.classList.remove('hinu');
    typeWriter('._.');
  }

  timer1 = setTimeout(() => {
    headingElement.classList.remove('hinu');
    headingElement.textContent = 'Try again?';
    timer2 = setTimeout(() => headingElement.textContent = 'Hey!', 10000);
  }, 10000);
}

function typeWriter(text) {
  headingElement.innerHTML = '<span class="caret">|</span>';
  let i = 0;

  const caret = headingElement.querySelector('.caret');

  const interval = setInterval(() => {
    caret.insertAdjacentText('beforebegin', text[i++]);
    if (i >= text.length) {
      clearInterval(interval);
      setTimeout(() => caret.remove(), 300);
    }
  }, 30);
}

function countHandler() {
  count = count === messages.length - 1 ? 0 : count + 1;
}

function catFetch() {
  fetch('https://api.thecatapi.com/v1/images/search')
    .then(res => res.json())
    .then(data => {
      catElement.src = data[0].url;
      catElement.onload = () => catElement.style.opacity = 1;
    });
}

// Event Listeners
buttonElement.addEventListener('click', () => userInput(inputElement.value));

document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && inputElement.value) buttonElement.click();
});

inputElement.addEventListener('input', () => {
  if (inputElement.value.length > 8) {
    paragraphElement.classList.remove('shake');
    void paragraphElement.offsetWidth;
    paragraphElement.classList.add('shake');
    paragraphElement.addEventListener('animationend', () => paragraphElement.classList.remove('shake'), { once: true });
  }
  inputElement.value = inputElement.value.replace(/\s/g, '').slice(0, 8);
  const isTrigger = triggerNames.includes(inputElement.value.trim().toLowerCase());
  imageElement.src = isTrigger ? 'assets/buttons/heart.png' : 'assets/buttons/arrow.png';
});

document.querySelector('.cat').addEventListener('click', () => catFetch());

catFetch();
