console.log("ica7.js loaded!");

const themeBtn = document.querySelector('#theme');
const clearBtn = document.querySelector('#clearStorage');
const body = document.body;
const navButtons = document.querySelectorAll('.gallery-nav button');
const photos = document.querySelectorAll('.photo-card');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) body.dataset.theme = savedTheme;

const lastFilter = localStorage.getItem('lastFilter');

themeBtn.addEventListener('click', () => {
  const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = newTheme; 
  console.log("themeChanged");
  localStorage.setItem('theme', newTheme);
});

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    photos.forEach(photo => {
      photo.style.display = (filter === 'all' || photo.dataset.category === filter) ? '' : 'none';
    });
    localStorage.setItem('lastFilter', filter);
  });
});

if (lastFilter) {
  const btn = Array.from(navButtons).find(b => b.dataset.filter === lastFilter);
  if (btn) btn.click();
} else {
  navButtons[0].click(); 
}

clearBtn.addEventListener('click', () => {
  localStorage.removeItem('theme');
  localStorage.removeItem('lastFilter');
  body.dataset.theme = 'light';
  navButtons[0].click();
  alert('Your preferences have been cleared!');
});

const LAST_SAVE_KEY = 'lastSaved';
const now = Date.now();
const lastSaved = localStorage.getItem(LAST_SAVE_KEY);
if (!lastSaved || now - lastSaved > 7 * 24 * 60 * 60 * 1000) {
  localStorage.removeItem('theme');
  localStorage.removeItem('lastFilter');
}
localStorage.setItem(LAST_SAVE_KEY, now);