import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderMarkup } from './js/render-functions';
import { fetchImages } from './js/pixabay-api';

export const refs = {
  formSearchEl: document.querySelector('.form-search'),
  galleryListEl: document.querySelector('.gallery-list'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loader.classList.add('loader-hidden');
refs.loadMoreBtn.classList.add('hidden');

let query = '';
let page = 1;
let totalHits = 0;

refs.formSearchEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  query = refs.formSearchEl.elements.search.value.trim();
  if (!query) return;

  refs.galleryListEl.innerHTML = '';
  refs.loader.classList.remove('loader-hidden');
  refs.loadMoreBtn.classList.add('hidden');
  page = 1;

  try {
    const data = await fetchImages(query, page, 15);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: '#ef4040',
        messageColor: '#fafafb',
        position: 'topRight',
        progressBarColor: '#fafafb',
      });
      return;
    }

    refs.galleryListEl.innerHTML = renderMarkup(data.hits);
    gallery.refresh();
    if (data.hits.length === 15 && refs.galleryListEl.children.length < totalHits) {
      refs.loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({
      message: `Error: ${error.message}`,
      backgroundColor: '#ef4040',
      messageColor: '#fafafb',
      position: 'topRight',
      progressBarColor: '#fafafb',
    });
  } finally {
    refs.loader.classList.add('loader-hidden');
  }

  refs.formSearchEl.elements.search.value = '';
}

async function onLoadMore() {
  page += 1;
  refs.loader.classList.remove('loader-hidden');
  refs.loadMoreBtn.classList.add('hidden');

  try {
    const data = await fetchImages(query, page, 15);
    refs.galleryListEl.insertAdjacentHTML('beforeend', renderMarkup(data.hits));
    gallery.refresh();
    
    const { height: cardHeight } = refs.galleryListEl.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (refs.galleryListEl.children.length >= totalHits) {
      refs.loadMoreBtn.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#00a0dc',
        messageColor: '#fafafb',
        position: 'topRight',
        progressBarColor: '#fafafb',
      });
    } else if (data.hits.length === 15) {
      refs.loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({
      message: `Error: ${error.message}`,
      backgroundColor: '#ef4040',
      messageColor: '#fafafb',
      position: 'topRight',
      progressBarColor: '#fafafb',
    });
  } finally {
    refs.loader.classList.add('loader-hidden');
  }
}

const gallery = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});