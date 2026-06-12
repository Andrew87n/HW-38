const API_KEY = '55677073-704cce82e77e75776fe73cc92'; // Вставте сюди свій ключ
const BASE_URL = 'https://pixabay.com/api/';

let searchQuery = '';
let page = 1;

const refs = {
  searchForm: document.getElementById('search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.getElementById('load-more-btn'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// 1. Функція обробки пошуку
async function onSearch(event) {
  event.preventDefault();

  searchQuery = event.currentTarget.elements.query.value.trim();
  if (!searchQuery) return;

  page = 1;
  clearGallery();
  hideLoadMoreBtn();

  await fetchAndRenderImages();
}

// 2. Функція обробки пагінації
async function onLoadMore() {
  page += 1;
  await fetchAndRenderImages();
}

// 3. Асинхронний запит до API та рендер
async function fetchAndRenderImages() {
  try {
    const data = await fetchImages(searchQuery, page);
    
    if (data.hits.length === 0) {
      alert('Нічого не знайдено за цим запитом.');
      return;
    }

    renderGallery(data.hits);
    showLoadMoreBtn();
    scrollToBottom();
  } catch (error) {
    console.error('Сталася помилка при завантаженні даних:', error);
    alert('Не вдалося завантажити зображення. Спробуйте пізніше.');
  }
}

// 4. Безпосередній HTTP-запит
async function fetchImages(query, pageNumber) {
  const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${encodeURIComponent(query)}&page=${pageNumber}&per_page=12&key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// 5. Рендер карток у DOM
function renderGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, likes, views, comments, downloads, tags }) => {
    return `
      <li>
        <div class="photo-card">
          <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="stats">
            <p class="stats-item">
              <i class="material-icons">thumb_up</i>
              ${likes}
            </p>
            <p class="stats-item">
              <i class="material-icons">visibility</i>
              ${views}
            </p>
            <p class="stats-item">
              <i class="material-icons">comment</i>
              ${comments}
            </p>
            <p class="stats-item">
              <i class="material-icons">cloud_download</i>
              ${downloads}
            </p>
          </div>
        </div>
      </li>
    `;
  }).join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

// Допоміжні функції інтерфейсу
function clearGallery() {
  refs.gallery.innerHTML = '';
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('hidden');
}

function scrollToBottom() {
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
